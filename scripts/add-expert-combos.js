const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const currentDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingNames = new Set(currentDb.map(f => f.name.toLowerCase()));

const newFunctions = [
    {
        "name": "INDEX + MATCH + MATCH",
        "category": "Lookup & Reference",
        "syntax": "=INDEX(array, MATCH(row_val, row_lookup, 0), MATCH(col_val, col_lookup, 0))",
        "summary": "Performs a powerful two-way lookup (matrix lookup) to find a value at the intersection of a specific row and column.",
        "common_errors": ["#REF! (Array dimensions don't match the row/col coordinates)"],
        "best_practice": "Essential for creating dynamic dashboards that can pull data from massive comparison tables based on user-selected criteria.",
        "parameters": [
            { "name": "INDEX", "desc": "The 2D matrix range containing the target values." },
            { "name": "MATCH (Row)", "desc": "Finds the vertical row position." },
            { "name": "MATCH (Col)", "desc": "Finds the horizontal column position." }
        ]
    },
    {
        "name": "SUMPRODUCT + LEFT/RIGHT",
        "category": "Math & Trig",
        "syntax": "=SUMPRODUCT((LEFT(range, 1)=\"A\") * values_range)",
        "summary": "Conditionally sums or counts data based on extracting specific substrings from another column without helper columns.",
        "common_errors": ["#VALUE! (Ranges are not the exact same size)"],
        "best_practice": "Use for massive datasets where you need to categorize and sum financial ledger codes starting with certain digits instantly.",
        "parameters": [
            { "name": "Condition Array", "desc": "Evaluates strings dynamically to True/False (1/0) based on substring matches." },
            { "name": "values_range", "desc": "The numeric values to multiply and sum." }
        ]
    },
    {
        "name": "IFERROR + VLOOKUP",
        "category": "Logical",
        "syntax": "=IFERROR(VLOOKUP(lookup, range, col, FALSE), \"Not Found\")",
        "summary": "The standard approach to cleanly handle missing lookup data and replace ugly #N/A errors with custom text or blank cells.",
        "common_errors": ["Masking genuine structural errors (like #REF! or #VALUE!) by blindly blanketing all errors"],
        "best_practice": "Always use IFERROR on user-facing reports to ensure blank cells or \"Not Applicable\" text instead of jarring error codes.",
        "parameters": [
            { "name": "VLOOKUP", "desc": "The primary operation that may fail." },
            { "name": "value_if_error", "desc": "The clean fallback (e.g., 0, \"N/A\", \"\") to display upon failure." }
        ]
    },
    {
        "name": "INDEX + AGGREGATE",
        "category": "Lookup & Reference",
        "syntax": "=INDEX(return_range, AGGREGATE(15, 6, (ROW(range)-ROW(first_cell)+1)/(criteria_range=criteria), k))",
        "summary": "A highly advanced formula to return multiple exact matches (the 1st, 2nd, 3rd occurrence) vertically or horizontally.",
        "common_errors": ["Complex syntax makes it difficult to audit and easy to break with typos."],
        "best_practice": "Before XLOOKUP and FILTER were introduced, this was the absolute best way to list all invoices belonging to one customer.",
        "parameters": [
            { "name": "AGGREGATE logic", "desc": "Forces errors on non-matches and returns the k-th smallest valid row number." },
            { "name": "INDEX", "desc": "Retrieves the value at the calculated row." }
        ]
    },
    {
        "name": "VLOOKUP with Multiple Criteria",
        "category": "Lookup & Reference",
        "syntax": "=VLOOKUP(crit1 & crit2, helper_column_range, 2, FALSE)",
        "summary": "A classic workaround combining two or more criteria into a unique helper column key to force VLOOKUP to find a specific row.",
        "common_errors": ["Forgetting to create or update the concatenated helper column on the source data sheet."],
        "best_practice": "While useful in older Excel, modern users should leverage XLOOKUP(crit1&crit2, col1&col2, return_col) to avoid helper columns altogether.",
        "parameters": [
            { "name": "crit1 & crit2", "desc": "The concatenated lookup string." },
            { "name": "helper_column", "desc": "The leftmost column of the table combining the criteria." }
        ]
    },
    {
        "name": "MAX + IF (Array Formula)",
        "category": "Statistical",
        "syntax": "{=MAX(IF(criteria_range=criteria, max_range))}",
        "summary": "Finds the maximum value in a range based on a specific condition (Legacy substitute for MAXIFS).",
        "common_errors": ["Forgetting to press Ctrl+Shift+Enter, resulting in #VALUE! in pre-365 Excel."],
        "best_practice": "Used to find the latest transaction date for a specific customer. Modern Excel users should transition to MAXIFS.",
        "parameters": [
            { "name": "IF", "desc": "Filters the max_range to only valid numbers." },
            { "name": "MAX", "desc": "Calculates the maximum of the filtered array." }
        ]
    },
    {
        "name": "FILTER + SORT",
        "category": "Dynamic Array",
        "syntax": "=SORT(FILTER(array, include), sort_index, sort_order)",
        "summary": "A modern dynamic array combo that extracts data meeting criteria and instantly organizes it alphabetically or numerically.",
        "common_errors": ["#CALC! (The FILTER function found no matching records to sort)"],
        "best_practice": "Creates fully automated, self-updating \"Top 10\" or custom dashboard tables without Pivot Tables.",
        "parameters": [
            { "name": "FILTER", "desc": "The dataset to extract." },
            { "name": "SORT params", "desc": "Defines which column to sort and in what direction." }
        ]
    },
    {
        "name": "TEXTJOIN + IF",
        "category": "Text",
        "syntax": "=TEXTJOIN(\", \", TRUE, IF(criteria_range=criteria, text_range, \"\"))",
        "summary": "Combines text from multiple cells into a single heavily delimited cell, but only if they meet a specific condition.",
        "common_errors": ["Accidentally including the empty strings (\"\") if ignore_empty is set to FALSE."],
        "best_practice": "Perfect for creating a comma-separated list of all project tags or team members assigned to a specific task IDs.",
        "parameters": [
            { "name": "delimiter", "desc": "The string (like a comma) separating the texts." },
            { "name": "IF array", "desc": "Conditionally outputs the text or an empty string." }
        ]
    },
    {
        "name": "CHOOSE + RANDBETWEEN",
        "category": "Logical",
        "syntax": "=CHOOSE(RANDBETWEEN(1,3), \"Option A\", \"Option B\", \"Option C\")",
        "summary": "Randomly selects an outcome from a defined list of text strings or formulas.",
        "common_errors": ["The formula recalculates constantly (volatile), changing the result every time you edit the sheet."],
        "best_practice": "Excellent for generating synthetic mock data for software testing, simulations, and random sampling.",
        "parameters": [
            { "name": "RANDBETWEEN", "desc": "Generates a random index number." },
            { "name": "CHOOSE options", "desc": "The pool of possible outcomes." }
        ]
    },
    {
        "name": "SUMPRODUCT + --(Array)",
        "category": "Math & Trig",
        "syntax": "=SUMPRODUCT(--(criteria_range1=criteria1), --(criteria_range2=criteria2))",
        "summary": "Uses double-unary operators (--) to convert True/False arrays into 1/0 arrays, allowing for complex multi-criteria counting.",
        "common_errors": ["Omitting the parentheses around the criteria equations, breaking the array logic."],
        "best_practice": "A mathematician's preferred method for counting complex logic gates (AND/OR across arrays) that COUNTIFS natively cannot handle.",
        "parameters": [
            { "name": "--(Array)", "desc": "Coerces boolean logic into mathematical matrices." },
            { "name": "SUMPRODUCT", "desc": "Multiplies and sums the binary matrices." }
        ]
    }
];

let addedCount = 0;
newFunctions.forEach(fn => {
    if (!existingNames.has(fn.name.toLowerCase())) {
        currentDb.push(fn);
        existingNames.add(fn.name.toLowerCase());
        addedCount++;
    }
});

fs.writeFileSync(dbPath, JSON.stringify(currentDb, null, 4));
console.log(`Successfully added ${addedCount} advanced combo recipes. Total is now ${currentDb.length}.`);
