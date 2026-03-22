const fs = require('fs');
const path = require('path');

const functionsFilePath = path.join(__dirname, '../data/functions.json');

const newFunctions = [
    // --- Advanced Date & Time ---
    {
        name: "NETWORKDAYS",
        category: "Date & Time",
        tags: ["Date & Time", "Working Days", "Project Management"],
        description: "Returns the number of whole working days between two dates, excluding weekends and optionally holidays.",
        promptContext: "Explain NETWORKDAYS. Provide a practical example of calculating project duration or employee working days. Emphasize how it excludes weekends. Highlight the optional 'holidays' argument."
    },
    {
        name: "WORKDAY",
        category: "Date & Time",
        tags: ["Date & Time", "Deadlines", "Project Management"],
        description: "Returns a number that represents a date that is the indicated number of working days before or after a date.",
        promptContext: "Explain WORKDAY. Focus on predicting invoice due dates or project delivery dates by skipping weekends. Contrast it briefly with NETWORKDAYS."
    },
    {
        name: "EOMONTH",
        category: "Date & Time",
        tags: ["Date & Time", "Financial", "EndOfMonth"],
        description: "Returns the serial number for the last day of the month that is the indicated number of months before or after start_date.",
        promptContext: "Explain EOMONTH (End of Month). Show how to use it for financial reporting, finding the last day of a quarter, or calculating contract expiration dates."
    },
    {
        name: "YEARFRAC",
        category: "Date & Time",
        tags: ["Date & Time", "Financial", "Age"],
        description: "Returns the year fraction representing the number of whole days between start_date and end_date.",
        promptContext: "Explain YEARFRAC. Provide an example calculating a person's exact age in years, or computing annual interest or prorated fees over a partial year."
    },
    {
        name: "DATEDIF",
        category: "Date & Time",
        tags: ["Date & Time", "Age", "Duration", "Hidden Function"],
        description: "Calculates the number of days, months, or years between two dates. This is a legacy function still widely used.",
        promptContext: "Explain DATEDIF. Emphasize that it's a 'hidden' Excel function (doesn't prompt in the formula bar). Show examples for 'Y', 'M', and 'YM' (months ignoring years) codes."
    },
    {
        name: "WEEKNUM",
        category: "Date & Time",
        tags: ["Date & Time", "Reporting", "Weekly"],
        description: "Converts a serial number to a number representing where the week falls numerically with a year.",
        promptContext: "Explain WEEKNUM. Show how it's used for weekly sales reporting. Briefly explain the 'return_type' argument (e.g., week starting on Monday vs. Sunday)."
    },

    // --- Highly requested Text combos and specifics ---
    {
        name: "FIND vs SEARCH",
        category: "Text",
        tags: ["Text", "Combo Recipe", "Comparison"],
        description: "A detailed comparison on when to use FIND (case-sensitive) versus SEARCH (supports wildcards, case-insensitive).",
        promptContext: "Write a comparative guide on FIND vs SEARCH. Provide a concrete example where FIND works but SEARCH behaves differently due to case sensitivity, and an example where SEARCH is preferred due to wildcard (*, ?) support."
    },
    {
        name: "REPLACE vs SUBSTITUTE",
        category: "Text",
        tags: ["Text", "Combo Recipe", "Comparison"],
        description: "A detailed comparison on when to use REPLACE (by position) versus SUBSTITUTE (by text match).",
        promptContext: "Write a comparative guide on REPLACE vs SUBSTITUTE. Show an example of SUBSTITUTE changing 'Old Company' to 'New Company' globally, and REPLACE changing a specific character at the 4th position of a serial number."
    },
    {
        name: "TEXTJOIN with IF",
        category: "Text",
        tags: ["Combo Recipe", "Text", "Logical"],
        description: "Combines TEXTJOIN and IF to concatenate text strings only if they meet certain criteria.",
        promptContext: "Explain how to combine TEXTJOIN and IF (Array format). Provide a practical example: concatenating the names of all employees in the 'Sales' department separated by commas."
    },

    // --- Logical & Error Handling Combos ---
    {
        name: "VLOOKUP with IFERROR",
        category: "Logical",
        tags: ["Combo Recipe", "Lookup & Reference", "Error Handling"],
        description: "A classic combo to return a clean value (like 'Not Found') instead of the ugly #N/A error when a VLOOKUP fails.",
        promptContext: "Explain how to wrap VLOOKUP inside IFERROR. Show an example where searching for an invalid Employee ID returns 'Not Found' instead of #N/A. Keep it highly practical for dashboards."
    },
    {
        name: "VLOOKUP with MATCH",
        category: "Lookup & Reference",
        tags: ["Combo Recipe", "Dynamic", "Lookup & Reference"],
        description: "Makes VLOOKUP dynamic by using MATCH to find the correct column index number.",
        promptContext: "Explain the dynamic VLOOKUP + MATCH combination. Create a scenario where the column index in VLOOKUP shouldn't be hardcoded (e.g., looking up 'Feb Sales' where columns might move). Explain how MATCH outputs the column number."
    },
    {
        name: "SUMPRODUCT with Double Unary (--)",
        category: "Math & Trig",
        tags: ["Combo Recipe", "Math & Trig", "Advanced"],
        description: "Using the double unary (--) operator in SUMPRODUCT to coerce boolean TRUE/FALSE arrays into 1s and 0s for array calculations.",
        promptContext: "Explain SUMPRODUCT with the double unary operator (--). Use a practical example with multiple criteria (e.g., finding total sales in 'Region A' for 'Product B') before SUMIFS existed, and explain why it's still powerful for array manipulations."
    },
    
    // --- Advanced Array Combos (Excel 365) ---
    {
        name: "FILTER with SORT and CHOOSECOLS",
        category: "Lookup & Reference",
        tags: ["Combo Recipe", "Array", "Excel 365"],
        description: "A powerful modern Excel 365 combo to filter data, sort the results, and extract only specific columns.",
        promptContext: "Create a modern Excel 365 dynamic array tutorial combining FILTER, SORT, and CHOOSECOLS. Scenario: Filtering a massive sales dataset for a specific region, extracting only the 'Sales Rep', 'Date', and 'Revenue' columns, and sorting by 'Revenue' descending."
    },
    {
        name: "UNIQUE with SORT",
        category: "Lookup & Reference",
        tags: ["Combo Recipe", "Array", "Excel 365"],
        description: "Extracts a list of unique values and automatically sorts them alphabetically or numerically.",
        promptContext: "Explain how to combine UNIQUE and SORT. Provide a simple example: taking a raw, messy column of categories and generating a clean, alphabetized dropdown list source."
    },

    // --- Advanced Statistical & Mathematical ---
    {
        name: "PERCENTILE.INC & QUARTILE.INC",
        category: "Statistical",
        tags: ["Statistical", "Data Analysis", "Distribution"],
        description: "Calculates the k-th percentile or specific quartile of values in a range.",
        promptContext: "Explain PERCENTILE.INC and QUARTILE.INC. Provide a real-world HR or grading example (e.g., finding the score needed to be in the top 10% or identifying the median/quartiles of a salary band)."
    },
    {
        name: "STDEV.S vs STDEV.P",
        category: "Statistical",
        tags: ["Statistical", "Data Analysis", "Math & Trig"],
        description: "Explains the difference between calculating standard deviation for a sample (.S) versus an entire population (.P).",
        promptContext: "Explain standard deviation in Excel. Clearly differentiate between STDEV.S (Sample) and STDEV.P (Population). Provide a simple data quality or manufacturing example."
    },
    {
        name: "FREQUENCY",
        category: "Statistical",
        tags: ["Statistical", "Data Analysis", "Array"],
        description: "Calculates how often values occur within a range of values, and then returns a vertical array of numbers.",
        promptContext: "Explain the FREQUENCY function. Note that it's a legacy array function (requires Ctrl+Shift+Enter in older versions). Use an example of grouping test scores into letter grade bins (0-59, 60-69, etc.)."
    },
    {
        name: "RANDARRAY",
        category: "Math & Trig",
        tags: ["Math & Trig", "Excel 365", "Dynamic Array", "Random"],
        description: "Returns an array of random numbers. You can specify the number of rows and columns to fill, minimum and maximum values.",
        promptContext: "Explain the RANDARRAY function in Excel 365. Show how to generate a 5x5 matrix of random integers between 1 and 100 for testing data models."
    },
    {
        name: "SEQUENCE",
        category: "Math & Trig",
        tags: ["Math & Trig", "Excel 365", "Dynamic Array"],
        description: "Generates a list of sequential numbers in an array, such as 1, 2, 3, 4.",
        promptContext: "Explain the SEQUENCE function. Show how it's used to quickly create an index column, or combined with DATE to generate a list of all days in a month without dragging formulas."
    },

    // --- Financial & Specialized ---
    {
        name: "NPV",
        category: "Financial",
        tags: ["Financial", "Investment", "Cash Flow"],
        description: "Calculates the net present value of an investment by using a discount rate and a series of future payments and income.",
        promptContext: "Explain the NPV (Net Present Value) function. Use a real estate or business investment cash flow scenario. Clearly explain how to handle 'Year 0' initial investment outside of the NPV formula to avoid common errors."
    },
    {
        name: "IRR",
        category: "Financial",
        tags: ["Financial", "Investment", "Cash Flow"],
        description: "Returns the internal rate of return for a series of cash flows.",
        promptContext: "Explain the IRR (Internal Rate of Return) function. Provide a startup investment or real estate example showing cash outflows and inflows, explaining how IRR reveals the annualized ROI."
    },
    {
        name: "PMT",
        category: "Financial",
        tags: ["Financial", "Loan", "Payments"],
        description: "Calculates the payment for a loan based on constant payments and a constant interest rate.",
        promptContext: "Explain the PMT function. Create a highly practical example for calculating a monthly car loan or mortgage payment. Emphasize dividing the annual interest rate by 12."
    },
    {
        name: "XNPV",
        category: "Financial",
        tags: ["Financial", "Investment", "Advanced"],
        description: "Returns the net present value for a schedule of cash flows that is not necessarily periodic.",
        promptContext: "Explain the difference between NPV and XNPV. Provide an example where cash inflows happen at irregular dates, proving why XNPV is more accurate."
    },
    {
        name: "XIRR",
        category: "Financial",
        tags: ["Financial", "Investment", "Advanced"],
        description: "Returns the internal rate of return for a schedule of cash flows that is not necessarily periodic.",
        promptContext: "Explain XIRR. Show a realistic stock trading or venture capital example where capital is injected or returned on random dates throughout the year."
    },
    {
        name: "ISBLANK",
        category: "Information",
        tags: ["Information", "Logical", "Data Cleaning"],
        description: "Returns TRUE if the value is blank.",
        promptContext: "Explain ISBLANK. Show how it's often combined with IF to prevent '0' calculations on empty cells (e.g., IF(ISBLANK(A2), '', A2*B2))."
    },
    {
        name: "ISERROR vs ISERR",
        category: "Information",
        tags: ["Information", "Combo Recipe", "Error Handling"],
        description: "A comparison of error checking: ISERROR catches any error, while ISERR catches any error EXCEPT #N/A.",
        promptContext: "Write a comparative guide on ISERROR vs ISERR. Provide a specific scenario where you want to ignore a #N/A error (because a VLOOKUP match wasn't found - which might be acceptable), but trap a #DIV/0! or #VALUE! error."
    },
    {
        name: "CELL",
        category: "Information",
        tags: ["Information", "Advanced", "Metadata"],
        description: "Returns information about the formatting, location, or contents of a cell.",
        promptContext: "Explain the CELL function. Show practical use cases like getting the file path or worksheet name using CELL('filename', A1), or checking cell protection status."
    },
    {
        name: "INFO",
        category: "Information",
        tags: ["Information", "System", "Legacy"],
        description: "Returns information about the current operating environment.",
        promptContext: "Explain the INFO function. Note it's an old function but show fun hacks like INFO('directory') or INFO('system') to output the environment details."
    },
    {
        name: "OFFSET with MATCH",
        category: "Lookup & Reference",
        tags: ["Combo Recipe", "Dynamic Range", "Lookup & Reference"],
        description: "Combines OFFSET and MATCH to dynamically define the starting point of a range.",
        promptContext: "Explain how to combine OFFSET and MATCH. Create a dynamic dashboard example where the user types 'March' and the formula uses MATCH to find the starting column for March data, then OFFSET to sum the 3 subsequent months."
    },
    {
        name: "INDIRECT with ADDRESS",
        category: "Lookup & Reference",
        tags: ["Combo Recipe", "Dynamic Range", "Lookup & Reference"],
        description: "Uses ADDRESS to build a cell reference as text, and INDIRECT to turn that text into an actual cell reference.",
        promptContext: "Explain the INDIRECT + ADDRESS combo. Warning users about volatility, show a dynamic scenario where you programmatically construct a cell reference based on row/column numbers inputted by the user."
    }
];

let existingData = [];
try {
    const rawArgs = fs.readFileSync(functionsFilePath, 'utf8');
    existingData = JSON.parse(rawArgs);
} catch (error) {
    if (error.code === 'ENOENT') {
        console.log("functions.json not found, starting fresh.");
    } else {
        console.error("Error reading functions.json:", error);
    }
}

const existingNames = new Set(existingData.map(f => f.name.toLowerCase()));
const duplicateFreeNewFunctions = newFunctions.filter(f => !existingNames.has(f.name.toLowerCase()));

const combinedData = [...existingData, ...duplicateFreeNewFunctions];

fs.writeFileSync(functionsFilePath, JSON.stringify(combinedData, null, 2));

console.log(`Successfully added ${duplicateFreeNewFunctions.length} new functions. Total is now ${combinedData.length}.`);
