const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const currentDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingNames = new Set(currentDb.map(f => f.name.toLowerCase()));

const newFunctions = [
    {
        "name": "COUNTBLANK",
        "category": "Statistical",
        "syntax": "=COUNTBLANK(range)",
        "summary": "Counts the number of empty cells in a specified range of cells.",
        "common_errors": ["Doesn't count spaces or zero-length strings (\"\")"],
        "best_practice": "Use to ensure dataset completeness before running statistical analysis.",
        "parameters": [{ "name": "range", "desc": "The range in which you want to count the blank cells." }]
    },
    {
        "name": "ISBLANK",
        "category": "Information",
        "syntax": "=ISBLANK(value)",
        "summary": "Checks whether a cell is empty, and returns TRUE or FALSE.",
        "common_errors": ["Returns FALSE if the cell contains a formula that evaluates to an empty string"],
        "best_practice": "Use it in conjunction with the IF function to conditionally format or populate alternate values for empty data.",
        "parameters": [{ "name": "value", "desc": "The cell or value to test." }]
    },
    {
        "name": "WORKDAY.INTL",
        "category": "Date & Time",
        "syntax": "=WORKDAY.INTL(start_date, days, [weekend], [holidays])",
        "summary": "Returns the serial number of the date before or after a specified number of workdays with custom weekend parameters.",
        "common_errors": ["#NUM! (Invalid start_date or days)"],
        "best_practice": "Essential for international project tracking where weekends are not strictly Saturday/Sunday.",
        "parameters": [
            { "name": "start_date", "desc": "The starting date." },
            { "name": "days", "desc": "The number of non-weekend and non-holiday days to add." },
            { "name": "weekend", "desc": "[Optional] Indicates the days of the week that are weekends." },
            { "name": "holidays", "desc": "[Optional] Dates to exclude from the working calendar." }
        ]
    },
    {
        "name": "NETWORKDAYS.INTL",
        "category": "Date & Time",
        "syntax": "=NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])",
        "summary": "Returns the number of whole workdays between two dates with custom weekend parameters.",
        "common_errors": ["#VALUE! (Invalid date strings)"],
        "best_practice": "Calculate actual business days elapsed for billing client projects operating in different geographic regions.",
        "parameters": [
            { "name": "start_date", "desc": "The start date." },
            { "name": "end_date", "desc": "The end date." },
            { "name": "weekend", "desc": "[Optional] The weekend configuration." },
            { "name": "holidays", "desc": "[Optional] A list of holiday dates." }
        ]
    },
    {
        "name": "ROMAN",
        "category": "Math & Trig",
        "syntax": "=ROMAN(number, [form])",
        "summary": "Converts an Arabic numeral to a Roman numeral, as text.",
        "common_errors": ["#VALUE! (Number is negative or greater than 3999)"],
        "best_practice": "Primarily used for stylized reporting or sequencing historical chapter titles in a list.",
        "parameters": [
            { "name": "number", "desc": "The Arabic numeral you want to convert." },
            { "name": "form", "desc": "[Optional] A number specifying the type of Roman numeral." }
        ]
    },
    {
        "name": "ARABIC",
        "category": "Math & Trig",
        "syntax": "=ARABIC(text)",
        "summary": "Converts a Roman numeral to an Arabic numeral.",
        "common_errors": ["#VALUE! (Invalid Roman numeral string)"],
        "best_practice": "Used to index and process incoming textual data that sequentially uses Roman numerals.",
        "parameters": [{ "name": "text", "desc": "A string enclosed in quotation marks, an empty string, or a reference to a cell containing text." }]
    },
    {
        "name": "BAHTTEXT",
        "category": "Math & Trig",
        "syntax": "=BAHTTEXT(number)",
        "summary": "Converts a number to Thai text and adds a suffix of 'Baht'.",
        "common_errors": ["#VALUE! (Cannot be converted to Thai currency)"],
        "best_practice": "A highly specific, legacy function mainly used when dealing with Thai financial records.",
        "parameters": [{ "name": "number", "desc": "The number to convert to Thai text." }]
    },
    {
        "name": "AGGREGATE",
        "category": "Math & Trig",
        "syntax": "=AGGREGATE(function_num, options, ref1, [ref2], ...)",
        "summary": "Returns an aggregate in a list or database, and can ignore hidden rows and error values.",
        "common_errors": ["#VALUE! (Incorrect function arguments)"],
        "best_practice": "A superior substitute to SUBTOTAL because it can ignore #N/A or #DIV/0! errors mathematically when summarizing large data blocks.",
        "parameters": [
            { "name": "function_num", "desc": "A number from 1 to 19 that specifies which function to use." },
            { "name": "options", "desc": "A numerical value that determines which values to ignore in the evaluation." },
            { "name": "ref1", "desc": "The first numeric argument for functions that take multiple numeric arguments." }
        ]
    },
    {
        "name": "SUMPRODUCT",
        "category": "Math & Trig",
        "syntax": "=SUMPRODUCT(array1, [array2], [array3], ...)",
        "summary": "Multiplies corresponding components in the given arrays, and returns the sum of those products.",
        "common_errors": ["#VALUE! (Arrays must have the same dimensions)"],
        "best_practice": "An incredibly versatile function often used as a more robust SUMIFS alternative, capable of handling arrays on closed external workbooks.",
        "parameters": [
            { "name": "array1", "desc": "The first array argument whose components you want to multiply and then add." },
            { "name": "array2", "desc": "[Optional] Component arrays to multiply." }
        ]
    },
    {
        "name": "INDEX + XMATCH",
        "category": "Lookup",
        "syntax": "=INDEX(return_array, XMATCH(lookup_value, lookup_array))",
        "summary": "The modern evolution of INDEX/MATCH. Performs a lookup by finding the relative position of an item and returning a cell from that exact position.",
        "common_errors": ["#N/A (Lookup value not found in exact sequence)"],
        "best_practice": "Preferable to standard MATCH since XMATCH searches exactly by default without requiring the trailing 0.",
        "parameters": [
            { "name": "return_array", "desc": "The array to fetch the result from." },
            { "name": "XMATCH logic", "desc": "The search parameter using XMATCH." }
        ]
    },
    {
        "name": "VLOOKUP + CHOOSE",
        "category": "Lookup",
        "syntax": "=VLOOKUP(lookup_value, CHOOSE({1,2}, return_range, lookup_range), 2, FALSE)",
        "summary": "A classic legacy workaround that forces VLOOKUP to search from right to left.",
        "common_errors": ["#VALUE! (Incorrect array constants)"],
        "best_practice": "Though useful in older versions of Excel, users with Office 365 should transition purely to XLOOKUP to achieve left-referencing.",
        "parameters": [
            { "name": "CHOOSE", "desc": "Generates a virtual array swinging the lookup column forward." },
            { "name": "rest of VLOOKUP", "desc": "Standard VLOOKUP syntax." }
        ]
    },
    {
        "name": "IF + VLOOKUP",
        "category": "Logical",
        "syntax": "=IF(ISNA(VLOOKUP(...)), \"Alternative\", VLOOKUP(...))",
        "summary": "Checks if VLOOKUP produces an error, and if not, performs the VLOOKUP. Older alternative to IFERROR.",
        "common_errors": ["Typos due to duplicating the VLOOKUP logic twice"],
        "best_practice": "Replace completely with IFERROR or use XLOOKUP's built-in [if_not_found] argument for cleaner code.",
        "parameters": [
            { "name": "IF", "desc": "Evaluates condition." },
            { "name": "ISNA", "desc": "Checks for #N/A." }
        ]
    },
    {
        "name": "FORMULATEXT",
        "category": "Lookup & Reference",
        "syntax": "=FORMULATEXT(reference)",
        "summary": "Returns a formula as a string.",
        "common_errors": ["#N/A (The referenced cell doesn't contain a formula)"],
        "best_practice": "Excellent tool for creating dynamic documentation or auditing complex financial models without breaking structures.",
        "parameters": [{ "name": "reference", "desc": "A reference to a cell or a range of cells." }]
    },
    {
        "name": "ISFORMULA",
        "category": "Information",
        "syntax": "=ISFORMULA(reference)",
        "summary": "Checks to see if a reference is to a cell containing a formula, and returns TRUE or FALSE.",
        "common_errors": ["#VALUE! (The reference is invalid)"],
        "best_practice": "Combine with Conditional Formatting to highlight hard-coded values versus formula-driven cells in financial modeling.",
        "parameters": [{ "name": "reference", "desc": "A reference to the cell you want to test." }]
    },
    {
        "name": "CELL",
        "category": "Information",
        "syntax": "=CELL(info_type, [reference])",
        "summary": "Returns information about the formatting, location, or contents of a cell.",
        "common_errors": ["#VALUE! (Invalid format info_type)"],
        "best_practice": "Use to extract the exact file path and sheet name of your current workbook: =CELL(\"filename\",A1).",
        "parameters": [
            { "name": "info_type", "desc": "A text value that specifies what type of cell information you want to return (e.g., 'address', 'col', 'filename')." },
            { "name": "reference", "desc": "[Optional] The cell that you want information about." }
        ]
    },
    {
        "name": "INFO",
        "category": "Information",
        "syntax": "=INFO(type_text)",
        "summary": "Returns information about the current operating environment.",
        "common_errors": ["#VALUE! (Type text is not recognized)"],
        "best_practice": "Can be used to determine the Excel version or operating system for macros, e.g., =INFO(\"osversion\").",
        "parameters": [{ "name": "type_text", "desc": "Text specifying the type of information you want returned." }]
    },
    {
        "name": "CONVERT",
        "category": "Engineering",
        "syntax": "=CONVERT(number, from_unit, to_unit)",
        "summary": "Converts a number from one measurement system to another (e.g., miles to kilometers, Fahrenheit to Celsius).",
        "common_errors": ["#N/A (Units are not recognized or are incompatible)"],
        "best_practice": "Keep a cheat sheet of Excel's specific case-sensitive unit abbreviations (e.g., \"C\" for Celsius, \"F\" for Fahrenheit).",
        "parameters": [
            { "name": "number", "desc": "The value in from_units to convert." },
            { "name": "from_unit", "desc": "The units for number." },
            { "name": "to_unit", "desc": "The units for the result." }
        ]
    },
    {
        "name": "CUBEVALUE",
        "category": "Cube",
        "syntax": "=CUBEVALUE(connection, [member_expression1], [member_expression2], ...)",
        "summary": "Returns an aggregated value from a cube (Power Pivot Data Model).",
        "common_errors": ["#NAME? (Connection string is incorrect)"],
        "best_practice": "Convert a Pivot Table into CUBE formulas (OLAP Tools -> Convert to Formulas) to design unrestricted dashboard layouts.",
        "parameters": [
            { "name": "connection", "desc": "A text string of the name of the connection to the cube." },
            { "name": "member_expression", "desc": "[Optional] A multidimensional expression (MDX) string." }
        ]
    },
    {
        "name": "BASE",
        "category": "Math & Trig",
        "syntax": "=BASE(Number, Radix, [Min_length])",
        "summary": "Converts a number into a text representation with the given radix (base).",
        "common_errors": ["#NUM! (Invalid number or radix)"],
        "best_practice": "Use BASE to easily convert standard decimal numbers into binary or hexadecimal strings.",
        "parameters": [
            { "name": "Number", "desc": "The number that you want to convert." },
            { "name": "Radix", "desc": "The base radix that you want to convert the number into." },
            { "name": "Min_length", "desc": "[Optional] The minimum length of the returned string." }
        ]
    },
    {
        "name": "DECIMAL",
        "category": "Math & Trig",
        "syntax": "=DECIMAL(text, radix)",
        "summary": "Converts a text representation of a number in a given base into a decimal number.",
        "common_errors": ["#NUM! (Invalid string for the given base)"],
        "best_practice": "The counterpart to BASE, making binary-to-decimal back-translations simple and quick.",
        "parameters": [
            { "name": "text", "desc": "The text string to convert." },
            { "name": "radix", "desc": "The base radix of the text string." }
        ]
    },
    {
        "name": "VLOOKUP + EXACT",
        "category": "Lookup",
        "syntax": "=INDEX(return_array, MATCH(TRUE, EXACT(lookup_value, lookup_array), 0))",
        "summary": "A combination created to force Excel into a Case-Sensitive lookup, since standard VLOOKUP ignores case.",
        "common_errors": ["#VALUE! (Requires Ctrl+Shift+Enter in legacy Excel limits)"],
        "best_practice": "Essential for environments with case-sensitive IDs (e.g., matching a2b vs. A2B in software license tracking).",
        "parameters": [
            { "name": "EXACT", "desc": "Checks if two strings are completely identical in case." },
            { "name": "MATCH", "desc": "Finds the row index." }
        ]
    },
    {
        "name": "IF + SEARCH",
        "category": "Logical",
        "syntax": "=IF(ISNUMBER(SEARCH(\"text\", A1)), \"Found\", \"Not Found\")",
        "summary": "Tests a cell to see if a specific substring exists anywhere within it.",
        "common_errors": ["Incorrect handling of #VALUE! produced when text isn't found without an evaluator."],
        "best_practice": "By pairing SEARCH with ISNUMBER, you prevent errors and safely return a clean True/False equivalent for data categorization.",
        "parameters": [
            { "name": "SEARCH", "desc": "Finds string position asynchronously." },
            { "name": "ISNUMBER", "desc": "Converts position/error to True/False logic." }
        ]
    },
    {
        "name": "INDEX + MATCH",
        "category": "Lookup",
        "syntax": "=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))",
        "summary": "The historically preferred method for lookups, allowing left-ward referencing and dynamic column changes.",
        "common_errors": ["#N/A (Mismatch between return_range and lookup_range size)"],
        "best_practice": "Replaces VLOOKUP for speed, stability on column insertions, and Left-Lookup capabilities. (Gradually being replaced by XLOOKUP)",
        "parameters": [
            { "name": "return_range", "desc": "The range indicating the output values." },
            { "name": "MATCH", "desc": "Identifies the row number." }
        ]
    },
    {
        "name": "OFFSET + MATCH",
        "category": "Lookup",
        "syntax": "=OFFSET(start_cell, MATCH(lookup, lookup_range, 0) - 1, col_offset)",
        "summary": "Dynamically retrieves a value by starting at a reference point and shifting down and right based on matches.",
        "common_errors": ["#REF! (Offsets past the edge of the worksheet)"],
        "best_practice": "Avoid excessive use of OFFSET in massive spreadsheets because it's a 'volatile' function that recalculates on every sheet change.",
        "parameters": [
            { "name": "start_cell", "desc": "Origin point." },
            { "name": "MATCH", "desc": "Determines the row height shift." }
        ]
    },
    {
        "name": "INDIRECT + MATCH",
        "category": "Lookup",
        "syntax": "=INDIRECT(\"'\" & sheet_name_cell & \"'!\" & \"A\" & MATCH(lookup, range, 0))",
        "summary": "Creates a reference from a text string to dynamically pull data across multiple varying worksheets.",
        "common_errors": ["#REF! (The sheet name text string contains typos or is missing wrapping single quotes)"],
        "best_practice": "Extremely powerful for consolidating data when tabs are named by month or region. INDIRECT is volatile, so use cautiously on large datasets.",
        "parameters": [
            { "name": "indirect string", "desc": "A concatenated formula building a cell address." },
            { "name": "MATCH", "desc": "Identifies the row offset." }
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
console.log(`Successfully added ${addedCount} new functions. Total is now ${currentDb.length}.`);
