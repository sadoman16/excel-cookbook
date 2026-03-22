const fs = require('fs');
const path = require('path');

const functionsFilePath = path.join(__dirname, '../data/functions.json');

const newFunctions = [
    // --- Mega Popular Combos (High Search Volume) ---
    {
        name: "SUMIFS Between Dates",
        category: "Math & Trig",
        tags: ["Combo Recipe", "Math & Trig", "Date & Time", "Reporting"],
        description: "How to use SUMIFS to sum values between a specific start and end date.",
        promptContext: "Create a tutorial explaining how to perform a SUMIFS between two dates. Show the syntax clearly for using '>=' and '<=' with cell references containing dates. Example: Summing sales only for Q1 2024."
    },
    {
        name: "COUNTIFS with OR Logic",
        category: "Statistical",
        tags: ["Combo Recipe", "Statistical", "Advanced"],
        description: "How to count cells that meet ONE of several criteria (OR Logic) using COUNTIFS with array constants.",
        promptContext: "Explain how to do a COUNTIFS using OR logic. Since standard COUNTIFS uses AND logic, teach the trick of using an array constant like {\"Apple\",\"Banana\"} wrapped in SUM(). Example: Counting how many tasks are 'Pending' OR 'In Progress'."
    },
    {
        name: "VLOOKUP with Wildcards",
        category: "Lookup & Reference",
        tags: ["Combo Recipe", "Lookup & Reference", "Text"],
        description: "Doing a partial match lookup using VLOOKUP and asterisk (*) wildcards.",
        promptContext: "Explain how to use wildcards (* or ?) inside VLOOKUP. Provide a practical example of searching for an invoice number or employee name when you only have a partial string. E.g., searching for '*Smith*'."
    },
    {
        name: "Nested VLOOKUP (Fallback)",
        category: "Lookup & Reference",
        tags: ["Combo Recipe", "Lookup & Reference", "Error Handling"],
        description: "Nesting a VLOOKUP inside an IFERROR to search a second table if the first table doesn't have the result.",
        promptContext: "Teach how to create a 'Fallback' VLOOKUP. Explain combining IFERROR and VLOOKUP twice: IF VLOOKUP(table 1) fails, do VLOOKUP(table 2). Great for merging old and new product catalogs."
    },
    {
        name: "XLOOKUP Bottom-Up Search",
        category: "Lookup & Reference",
        tags: ["Combo Recipe", "Lookup & Reference", "Excel 365"],
        description: "Using the search_mode argument in XLOOKUP to find the LAST occurrence of a value instead of the first.",
        promptContext: "Focus on the 'search_mode' parameter of XLOOKUP (-1). Explain a scenario where an employee has multiple salary updates in a table over time, and you need to look up their most recent (last) salary entry."
    },
    {
        name: "XLOOKUP Returning Multiple Columns",
        category: "Lookup & Reference",
        tags: ["Combo Recipe", "Lookup & Reference", "Excel 365", "Array"],
        description: "How to make a single XLOOKUP formula return an entire row or multiple columns of data dynamically.",
        promptContext: "Explain how an XLOOKUP can spill an array. Show an example looking up an Employee ID and returning their Name, Department, and Salary all in adjacent columns with one formula."
    },
    {
        name: "SUMPRODUCT (Weighted Average)",
        category: "Math & Trig",
        tags: ["Combo Recipe", "Math & Trig", "Financial"],
        description: "The classic and most robust way to calculate a weighted average using SUMPRODUCT divided by SUM.",
        promptContext: "Write the definitive guide on calculating a Weighted Average. Explain the formula SUMPRODUCT(values, weights) / SUM(weights). Provide an example grading system or portfolio return calculation."
    },

    // --- Statistical & Forecasting ---
    {
        name: "FORECAST.ETS",
        category: "Statistical",
        tags: ["Statistical", "Forecasting", "Data Analysis"],
        description: "Predicts a future value based on existing (historical) values using an Exponential Smoothing (ETS) algorithm.",
        promptContext: "Explain FORECAST.ETS for time-series forecasting. Show a real-world scenario predicting future monthly sales based on historical data, noting it accounts for seasonality."
    },
    {
        name: "TREND",
        category: "Statistical",
        tags: ["Statistical", "Forecasting", "Trend Line"],
        description: "Calculates the linear trend line and returns values along a trend line for a set of arrays.",
        promptContext: "Explain the TREND function. Contrast it briefly with FORECAST.LINEAR. Show an example of predicting overhead costs based on increasing production volume."
    },
    {
        name: "CORREL",
        category: "Statistical",
        tags: ["Statistical", "Data Analysis", "Math"],
        description: "Returns the correlation coefficient of the array1 and array2 cell ranges. Ranges from -1 to 1.",
        promptContext: "Explain CORREL (Correlation). Use a highly relatable business example: checking if there is a correlation between an advertising budget increase and weekly sales. Explain what 1, 0, and -1 mean."
    },
    {
        name: "PEARSON",
        category: "Statistical",
        tags: ["Statistical", "Data Analysis", "Math"],
        description: "Returns the Pearson product moment correlation coefficient (same functional output as CORREL).",
        promptContext: "Explain PEARSON. Mention it calculates the linear correlation. An example could be comparing student study hours to final test scores."
    },
    {
        name: "SLOPE",
        category: "Statistical",
        tags: ["Statistical", "Data Analysis", "Math"],
        description: "Returns the slope of the linear regression line through data points in 'known_y_s' and 'known_x_s'.",
        promptContext: "Explain SLOPE. Show how it's used alongside INTERCEPT to build a basic linear model. E.g., How much does sales increase for every $1 spent on ads?"
    },
    {
        name: "INTERCEPT",
        category: "Statistical",
        tags: ["Statistical", "Data Analysis", "Math"],
        description: "Calculates the point at which a line will intersect the y-axis by using linear regression.",
        promptContext: "Explain INTERCEPT. Use it with the SLOPE formula example to show what fixed costs look like when production volume is zero."
    },
    {
        name: "RSQ",
        category: "Statistical",
        tags: ["Statistical", "Data Analysis", "Math"],
        description: "Returns the square of the Pearson product moment correlation coefficient (R-squared).",
        promptContext: "Explain RSQ (R-Squared). Emphasize this is the 'Goodness of Fit' measure. Explain it tells you what percentage of the variance in Y is explained by X."
    },
    {
        name: "T.TEST",
        category: "Statistical",
        tags: ["Statistical", "Data Analysis", "Science"],
        description: "Returns the probability associated with a Student's t-Test. Used to determine whether two samples are likely to have come from the same two underlying populations that have the same mean.",
        promptContext: "Explain the T.TEST function. Show a practical A/B testing example: Did Website Design A significantly improve conversion rates compared to Website Design B, or was it just statistical noise?"
    },

    // --- Math Matrix & Specialized ---
    {
        name: "MINVERSE",
        category: "Math & Trig",
        tags: ["Math & Trig", "Matrix", "Advanced"],
        description: "Returns the inverse matrix for the matrix stored in an array.",
        promptContext: "Explain MINVERSE. Show a simple 2x2 or 3x3 matrix math example. Note it must be entered as an array formula in older Excel."
    },
    {
        name: "MMULT",
        category: "Math & Trig",
        tags: ["Math & Trig", "Matrix", "Advanced"],
        description: "Returns the matrix product of two arrays.",
        promptContext: "Explain MMULT (Matrix Multiplication). Provide a business application: multiplying an array of raw material costs by an array of recipes/products to get total cost per product."
    },
    {
        name: "MUNIT",
        category: "Math & Trig",
        tags: ["Math & Trig", "Matrix", "Excel 365"],
        description: "Returns the unit matrix or the specified dimension.",
        promptContext: "Explain MUNIT. Briefly demonstrate generating an Identity Matrix of size 3x3 (1s on the diagonal, 0s elsewhere)."
    },
    {
        name: "COMBIN",
        category: "Math & Trig",
        tags: ["Math & Trig", "Probability", "Combinations"],
        description: "Returns the number of combinations for a given number of items.",
        promptContext: "Explain COMBIN. Provide a lottery or team selection example (e.g., how many different 3-person committees can be formed from 10 people). Order doesn't matter."
    },
    {
        name: "PERMUT",
        category: "Math & Trig",
        tags: ["Math & Trig", "Probability", "Permutations"],
        description: "Returns the number of permutations for a given number of objects.",
        promptContext: "Explain PERMUT. Show how it contrasts with COMBIN (order matters here). Example: creating a 4-digit PIN code or podium finishes (1st, 2nd, 3rd) out of 8 racers."
    },

    // --- D-Functions (Database) ---
    {
        name: "DSUM",
        category: "Database",
        tags: ["Database", "Advanced", "Math & Trig"],
        description: "Adds the numbers in the field (column) of records in the list or database that match conditions that you specify.",
        promptContext: "Explain the classic DSUM function. Recreate a scenario where a separate 'criteria block' at the top of the worksheet is used to filter and sum total sales for a specific region AND product. Emphasize how easy criteria blocks are for users to change."
    },
    {
        name: "DGET",
        category: "Database",
        tags: ["Database", "Lookup & Reference", "Advanced"],
        description: "Extracts a single record from a database that matches conditions that you specify.",
        promptContext: "Explain DGET. Show how it's an alternative to VLOOKUP for specific databases, but warn that it throws a #NUM! error if more than one record matches the criteria. Use an Employee Database example."
    },
    {
        name: "DCOUNT",
        category: "Database",
        tags: ["Database", "Statistical", "Advanced"],
        description: "Counts the cells that contain numbers in the database that match the conditions you specify.",
        promptContext: "Explain DCOUNT. Create a scenario counting the number of closed tickets within a specific time frame using a criteria range block above the data."
    },
    {
        name: "DMAX",
        category: "Database",
        tags: ["Database", "Statistical", "Advanced"],
        description: "Returns the maximum value from selected database entries.",
        promptContext: "Explain DMAX. Find the highest salary in a specific department and job title using a Database criteria structure."
    },
    {
        name: "DMIN",
        category: "Database",
        tags: ["Database", "Statistical", "Advanced"],
        description: "Returns the minimum value from selected database entries.",
        promptContext: "Explain DMIN. Example: Find the lowest sales price recorded for 'Product X' from 'Warehouse Y' using the Database functions structure."
    },

    // --- Engineering Base Conversions ---
    {
        name: "BASE",
        category: "Engineering",
        tags: ["Engineering", "Text", "Math"],
        description: "Converts a number into a text representation with the given radix (base).",
        promptContext: "Explain the BASE formula. Show an example of converting base-10 coordinates into binary (base-2) or hexadecimal (base-16)."
    },
    {
        name: "DECIMAL",
        category: "Engineering",
        tags: ["Engineering", "Math", "Conversion"],
        description: "Converts a text representation of a number in a given base into a decimal number.",
        promptContext: "Explain the DECIMAL function. E.g., convert a hex color code or binary text string back into a standard decimal (base-10) integer."
    },
    {
        name: "BIN2DEC",
        category: "Engineering",
        tags: ["Engineering", "Conversion", "Binary"],
        description: "Converts a binary number to decimal.",
        promptContext: "Explain BIN2DEC (Binary to Decimal). Simple IT networking example involving IP subnets or data bits."
    },

    // --- Special Information & Error Checks ---
    {
        name: "ISFORMULA",
        category: "Information",
        tags: ["Information", "Audit", "Logical"],
        description: "Returns TRUE if there is a reference to a cell that contains a formula.",
        promptContext: "Explain ISFORMULA. Show how this is excellent for Conditional Formatting to highlight cells containing formulas, preventing accidental overwriting by users."
    },
    {
        name: "FORMULATEXT",
        category: "Information",
        tags: ["Information", "Audit", "Text"],
        description: "Returns the formula at the given reference as text.",
        promptContext: "Explain FORMULATEXT. Show how it's used by auditors or teachers to display the underlying formula of an adjacent cell right on the worksheet without clicking into it."
    },
    {
        name: "TYPE",
        category: "Information",
        tags: ["Information", "Advanced", "Validation"],
        description: "Returns a number indicating the data type of a value (1=Number, 2=Text, 4=Logical, 16=Error, 64=Array).",
        promptContext: "Explain the TYPE function. Show an advanced validation scenario where a cell MUST be a number (TYPE = 1). Provide the mapping of the output integers to data types."
    },
    {
        name: "ISREF",
        category: "Information",
        tags: ["Information", "Logical", "Validation"],
        description: "Returns TRUE if the value is a reference.",
        promptContext: "Explain ISREF. It checks if the contents refer to a valid cell or range. Show a use case with the INDIRECT function to prevent a #REF! error before attempting to calculate."
    },

    // --- More Complex Combos ---
    {
        name: "Extract Nth Word",
        category: "Text",
        tags: ["Combo Recipe", "Text", "Advanced"],
        description: "Extracting a specific 'Nth' word from a text string separated by spaces (using MID, FIND, SUBSTITUTE).",
        promptContext: "Provide the classic but complex formula for extracting the Nth word from a string (e.g., using MID, FIND, SUBSTITUTE, REPT). Example: Pulling the 3rd word from 'John Adam Smith Jr.' to get 'Smith'."
    },
    {
        name: "Remove All Spaces",
        category: "Text",
        tags: ["Combo Recipe", "Text", "Data Cleaning"],
        description: "Removing ALL blank spaces from a string, not just leading/trailing spaces.",
        promptContext: "Explain that TRIM() only removes leading/trailing/double spaces. To remove EVERY space (e.g., from a badly formatted credit card or phone number), show the SUBSTITUTE(A1, \" \", \"\") formula."
    },
    {
        name: "Calculate Quarter from Date",
        category: "Date & Time",
        tags: ["Combo Recipe", "Date & Time", "Reporting"],
        description: "A mathematical trick to convert a Date into Q1, Q2, Q3, or Q4 without nested IFs.",
        promptContext: "Show the elegant formula `=\"Q\" & ROUNDUP(MONTH(A1)/3, 0)` for calculating the fiscal/calendar quarter from a date. Explain the logic of dividing the month by 3."
    },
    {
        name: "Count Unique Words in a Cell",
        category: "Text",
        tags: ["Combo Recipe", "Text", "Advanced"],
        description: "Finding the word count of a specific cell string.",
        promptContext: "Provide the formula to count the number of words inside a single cell: `=LEN(TRIM(A1))-LEN(SUBSTITUTE(A1,\" \",\"\"))+1`. Explain the brilliant logic comparing string length with and without spaces."
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

console.log(`Successfully added ${duplicateFreeNewFunctions.length} new functions. Total DB size is now ${combinedData.length}.`);
