const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const trendingScenarios = [
    {
        "name": "IMAGE",
        "category": "Lookup & Reference",
        "syntax": "=IMAGE(source, [alt_text], [sizing], [height], [width])",
        "summary": "The new standard for inserting images directly into cells via URL. Supports dynamic resizing and alt text for accessibility.",
        "common_errors": ["#VALUE! (Invalid URL or blocked by security)", "#CONNECT! (Network issues)"],
        "best_practice": "Use for dynamic product catalogs or team rosters where images are hosted on a CDN.",
        "parameters": [
            { "name": "source", "desc": "The URL of the image file (must be HTTPS)." },
            { "name": "alt_text", "desc": "[Optional] Accessibility text for screen readers." }
        ]
    },
    {
        "name": "HYPERLINK",
        "category": "Lookup & Reference",
        "syntax": "=HYPERLINK(link_location, [friendly_name])",
        "summary": "Creates a shortcut or jump that opens a document stored on a network server, an intranet, or the Internet.",
        "common_errors": ["Cannot open the specified file (Broken path)"],
        "best_practice": "Combine with CONCAT to create dynamic links to internal folder structures or search queries.",
        "parameters": [
            { "name": "link_location", "desc": "The path and file name to the document to be opened." },
            { "name": "friendly_name", "desc": "[Optional] The jump text or numeric value that is displayed in the cell." }
        ]
    },
    {
        "name": "GETPIVOTDATA",
        "category": "Lookup & Reference",
        "syntax": "=GETPIVOTDATA(data_field, pivot_table, [field1, item1], ...)",
        "summary": "Extracts data from a PivotTable. Many people hate the auto-generation, but it's the safest way to link to pivot results that might move.",
        "common_errors": ["#REF! (The field or item is not visible in the PivotTable)"],
        "best_practice": "Use cell references for field1/item1 to build dynamic dashboards that pull from a hidden PivotTable summary.",
        "parameters": [
            { "name": "data_field", "desc": "The name of the data field that contains the data you want to retrieve." },
            { "name": "pivot_table", "desc": "A reference to any cell within the PivotTable." }
        ]
    },
    {
        "name": "SUBTOTAL",
        "category": "Math & Trig",
        "syntax": "=SUBTOTAL(function_num, ref1, [ref2], ...)",
        "summary": "Returns a subtotal in a list or database. Crucially, it can ignore rows hidden by a filter.",
        "common_errors": ["Using function_num 1-11 (ignores hidden rows) vs 101-111 (ignores manually hidden rows)"],
        "best_practice": "Use 109 (SUM) or 103 (COUNTA) to ensure your dashboard summaries only reflect the data currently filtered by the user.",
        "parameters": [
            { "name": "function_num", "desc": "The number 1-11 or 101-111 that specifies the function to use for the subtotal." },
            { "name": "ref1", "desc": "The first named range or reference for which you want the subtotal." }
        ]
    },
    {
        "name": "STOCKHISTORY",
        "category": "Financial",
        "syntax": "=STOCKHISTORY(stock, start_date, [end_date], [interval], [headers], ...)",
        "summary": "Retrieves historical price data for financial instruments over time. Ideal for trend analysis and portfolio tracking.",
        "common_errors": ["#BUSY! (Data is loading)", "#VALUE! (Invalid ticker symbol)"],
        "best_practice": "Always set [headers] to 1 to automatically title your columns for Date, Open, High, Low, etc.",
        "parameters": [
            { "name": "stock", "desc": "The ticker symbol for the stock/instrument." },
            { "name": "start_date", "desc": "The earliest date for which you want historical data." }
        ]
    },
    {
        "name": "WEBSERVICE",
        "category": "Web",
        "syntax": "=WEBSERVICE(url)",
        "summary": "Returns data from a web service on the Internet or Intranet. Often used to pull raw XML or JSON data into Excel.",
        "common_errors": ["#VALUE! (URL is too long or blocked)", "#GETTING_DATA (Server response lag)"],
        "best_practice": "Combine with FILTERXML to parse out specific fields from a large API response.",
        "parameters": [{ "name": "url", "desc": "The URL of the web service." }]
    },
    {
        "name": "FILTERXML",
        "category": "Web",
        "syntax": "=FILTERXML(xml, xpath)",
        "summary": "Returns specific data from XML content by using the specified XPath.",
        "common_errors": ["#VALUE! (XML is malformed or XPath is invalid)"],
        "best_practice": "Legacy but powerful way to parse simple structured text data returned by WEBSERVICE.",
        "parameters": [
            { "name": "xml", "desc": "A string in valid XML format." },
            { "name": "xpath", "desc": "A string in standard XPath format." }
        ]
    },
    {
        "name": "BYROW",
        "category": "Logical",
        "syntax": "=BYROW(array, lambda)",
        "summary": "Applies a LAMBDA function to each row in a given array and returns one result per row.",
        "common_errors": ["#CALC! (LAMBDA does not return a single value per row)"],
        "best_practice": "Use to perform row-level totals or checks that standard array formulas struggle with.",
        "parameters": [
            { "name": "array", "desc": "The array to be separated by row." },
            { "name": "lambda", "desc": "The custom function to apply to each row." }
        ]
    },
    {
        "name": "BYCOL",
        "category": "Logical",
        "syntax": "=BYCOL(array, lambda)",
        "summary": "Applies a LAMBDA function to each column and returns one result per column.",
        "common_errors": ["#VALUE! (Input is not a valid array)"],
        "best_practice": "Useful for summarizing vertical data blocks without dragging formulas across.",
        "parameters": [
            { "name": "array", "desc": "The array to be separated by column." },
            { "name": "lambda", "desc": "The custom function for each column." }
        ]
    },
    {
        "name": "MAP",
        "category": "Logical",
        "syntax": "=MAP(array1, lambda)",
        "summary": "Returns an array formed by mapping each value in the original arrays to a new value by applying a LAMBDA.",
        "common_errors": ["#NUM! (Exceeds recursion limits in complex maps)"],
        "best_practice": "Use when you need to transform every single cell in a grid individually (e.g., prefixing all cells with 'ID-').",
        "parameters": [
            { "name": "array1", "desc": "One or more arrays to be mapped." },
            { "name": "lambda", "desc": "A LAMBDA that takes one argument for each array passed." }
        ]
    },
    {
        "name": "REDUCE",
        "category": "Logical",
        "syntax": "=REDUCE([initial_value], array, lambda)",
        "summary": "Reduces an array to an accumulated value by applying a LAMBDA to each value and adding it to an accumulator.",
        "common_errors": ["#CALC! (Accumulator becomes too large or errors out)"],
        "best_practice": "The most powerful way to perform 'rolling' or 'running' calculations across an array (like string concatenation).",
        "parameters": [
            { "name": "initial_value", "desc": "The starting value for the accumulator." },
            { "name": "array", "desc": "The array to be reduced." }
        ]
    },
    {
        "name": "SCAN",
        "category": "Logical",
        "syntax": "=SCAN([initial_value], array, lambda)",
        "summary": "Similar to REDUCE but returns an array of all the intermediate values during the accumulation process.",
        "common_errors": ["#VALUE! (Lambda doesn't accept the right number of arguments)"],
        "best_practice": "Perfect for creating Running Totals that automatically expand with your data.",
        "parameters": [
            { "name": "initial_value", "desc": "Starting point." },
            { "name": "array", "desc": "Target data." }
        ]
    },
    {
        "name": "MAKEARRAY",
        "category": "Logical",
        "syntax": "=MAKEARRAY(rows, cols, lambda)",
        "summary": "Calculates and returns a calculated array of a specified row and column size, by applying a LAMBDA.",
        "common_errors": ["#VALUE! (Invalid row/col dimensions)"],
        "best_practice": "Use to generate custom grids like multiplication tables or calendars on the fly.",
        "parameters": [
            { "name": "rows", "desc": "Number of rows in the array." },
            { "name": "cols", "desc": "Number of columns in the array." }
        ]
    },
    {
        "name": "MROUND",
        "category": "Math & Trig",
        "syntax": "=MROUND(number, multiple)",
        "summary": "Returns a number rounded to the desired multiple. Essential for currency or material rounding.",
        "common_errors": ["#NUM! (Number and Multiple have different signs)"],
        "best_practice": "Round pricing to the nearest nickel (0.05) or project hours to the nearest quarter hour (0.25).",
        "parameters": [
            { "name": "number", "desc": "The value to round." },
            { "name": "multiple", "desc": "The multiple to which you want to round the number." }
        ]
    },
    {
        "name": "CEILING.MATH",
        "category": "Math & Trig",
        "syntax": "=CEILING.MATH(number, [significance], [mode])",
        "summary": "Rounds a number up, to the nearest integer or to the nearest multiple of significance.",
        "common_errors": ["Confusion with CEILING (MATH version is more robust for negative numbers)"],
        "best_practice": "Use for logistics to calculate 'number of full boxes' required for shipment.",
        "parameters": [
            { "name": "number", "desc": "The value to round." },
            { "name": "significance", "desc": "[Optional] The multiple to which you want to round." }
        ]
    },
    {
        "name": "FLOOR.MATH",
        "category": "Math & Trig",
        "syntax": "=FLOOR.MATH(number, [significance], [mode])",
        "summary": "Rounds a number down, toward zero, to the nearest multiple of significance.",
        "common_errors": ["Inconsistent results with negative numbers if [mode] is ignored"],
        "best_practice": "Determine the maximum number of full units that can be purchased within a budget.",
        "parameters": [
            { "name": "number", "desc": "The value to round down." }
        ]
    },
    {
        "name": "ISOWEEKNUM",
        "category": "Date & Time",
        "syntax": "=ISOWEEKNUM(date)",
        "summary": "Returns the ISO week number of the year for a given date. Preferred in European business standards.",
        "common_errors": ["#VALUE! (Not a valid date integer)"],
        "best_practice": "Use for international supply chain reports to ensure week numbers align across global offices.",
        "parameters": [{ "name": "date", "desc": "The date to evaluate." }]
    },
    {
        "name": "CHAR",
        "category": "Text",
        "syntax": "=CHAR(number)",
        "summary": "Returns the character specified by the code number from the character set used by your computer.",
        "common_errors": ["#VALUE! (Number is outside 1 to 255)"],
        "best_practice": "Use CHAR(10) to insert a line break within a formula: =\"Line 1\" & CHAR(10) & \"Line 2\".",
        "parameters": [{ "name": "number", "desc": "A number between 1 and 255 specifying which character you want." }]
    },
    {
        "name": "CODE",
        "category": "Text",
        "syntax": "=CODE(text)",
        "summary": "Returns a numeric code for the first character in a text string. The reverse of CHAR.",
        "common_errors": ["#VALUE! (Text is empty)"],
        "best_practice": "Use to identify hidden non-printing characters that are breaking your VLOOKUPs.",
        "parameters": [{ "name": "text", "desc": "The text for which you want the code of the first character." }]
    },
    {
        "name": "EXPAND",
        "category": "Lookup & Reference",
        "syntax": "=EXPAND(array, rows, [columns], [pad_with])",
        "summary": "Expands or pads an array to specified row and column dimensions.",
        "common_errors": ["#VALUE! (New dimension is smaller than original)"],
        "best_practice": "Use to standardize the size of multiple arrays before combining them with VSTACK.",
        "parameters": [
            { "name": "array", "desc": "The array to expand." },
            { "name": "rows", "desc": "Total row count of the new array." }
        ]
    },
    {
        "name": "WRAPCOLS",
        "category": "Lookup & Reference",
        "syntax": "=WRAPCOLS(vector, wrap_count, [pad_with])",
        "summary": "Wraps the provided row or column of values by columns after a specified number of elements to form a new array.",
        "common_errors": ["#VALUE! (Wrap_count is 0 or negative)"],
        "best_practice": "Transform a single flat list of items into a 2D grid/table for better readability.",
        "parameters": [
            { "name": "vector", "desc": "The 1D range of values to wrap." },
            { "name": "wrap_count", "desc": "The maximum number of values for each column." }
        ]
    },
    {
        "name": "WRAPROWS",
        "category": "Lookup & Reference",
        "syntax": "=WRAPROWS(vector, wrap_count, [pad_with])",
        "summary": "Wraps the provided row or column of values by rows after a specified number of elements.",
        "common_errors": ["#N/A (Padding empty slots if [pad_with] missing)"],
        "best_practice": "Used to convert a long vertical log of data into a structured row-based table.",
        "parameters": [
            { "name": "vector", "desc": "The range to wrap." },
            { "name": "wrap_count", "desc": "Values per row." }
        ]
    },
    {
        "name": "VALUETOTEXT",
        "category": "Text",
        "syntax": "=VALUETOTEXT(value, [format])",
        "summary": "Returns text from any value. Format 0 is concise, Format 1 returns it as a literal (escaped text).",
        "common_errors": ["#VALUE! (Complex object cannot be converted)"],
        "best_practice": "Use format 1 to see exactly how a formula perceives a value (e.g., seeing the escaped quotes in a string).",
        "parameters": [
            { "name": "value", "desc": "The value to convert." },
            { "name": "format", "desc": "[Optional] Concise (0) or Strict (1)." }
        ]
    },
    {
        "name": "ARRAYTOTEXT",
        "category": "Text",
        "syntax": "=ARRAYTOTEXT(array, [format])",
        "summary": "Returns an array of text values from any specified range and joins them.",
        "common_errors": ["Results are too long for cell limit (32,767 characters)"],
        "best_practice": "Quickly create a comma-separated list of items from a column: =ARRAYTOTEXT(A1:A10, 0).",
        "parameters": [
            { "name": "array", "desc": "The array to convert to text." }
        ]
    },
    {
        "name": "T",
        "category": "Text",
        "syntax": "=T(value)",
        "summary": "Returns the text referred to by value. If it's not text, it returns an empty string.",
        "common_errors": ["Incorrectly assuming it converts numbers to text (use TEXT function for that)"],
        "best_practice": "Use for data validation to strip out numerical noise from a column that should only contain text entries.",
        "parameters": [{ "name": "value", "desc": "The value you want to test." }]
    },
    {
        "name": "N",
        "category": "Information",
        "syntax": "=N(value)",
        "summary": "Converts a value to a number. Dates become serial numbers, TRUE becomes 1, others become 0.",
        "common_errors": ["Common confusion—it doesn't keep the number if it's already a number string (e.g. \"5\" becomes 0)"],
        "best_practice": "Use inside a formula to add a 'hidden comment' that doesn't affect the math: =A1+B1+N(\"Sum of Sales from Region A\").",
        "parameters": [{ "name": "value", "desc": "The value to convert." }]
    },
    {
        "name": "ERROR.TYPE",
        "category": "Information",
        "syntax": "=ERROR.TYPE(error_val)",
        "summary": "Returns a number corresponding to one of the error types in Excel (e.g., 1 for #NULL!, 7 for #N/A).",
        "common_errors": ["#N/A (If error_val is NOT an error)"],
        "best_practice": "Use to build specific logic for different error conditions in a complex model (e.g., only re-lookup if error is #N/A).",
        "parameters": [{ "name": "error_val", "desc": "The error value whose identifying number you want to find." }]
    },
    {
        "name": "ENCODEURL",
        "category": "Web",
        "syntax": "=ENCODEURL(text)",
        "summary": "Returns a URL-encoded string. Escapes non-ASCII characters to make them URL-safe.",
        "common_errors": ["#VALUE! (Text is already encoded or too complex)"],
        "best_practice": "Essential when building dynamic Google Search links or API endpoints via formula.",
        "parameters": [{ "name": "text", "desc": "A string to be URL encoded." }]
    },
    {
        "name": "REPT",
        "category": "Text",
        "syntax": "=REPT(text, number_times)",
        "summary": "Repeats text a given number of times. Used for padding or simple cell-based charts.",
        "common_errors": ["#VALUE! (Number_times is negative)"],
        "best_practice": "Create a simple Bar Chart in a cell: =REPT(\"|\", B1/10). Change font to 'Stencil' or 'Playbill' for a solid look.",
        "parameters": [
            { "name": "text", "desc": "The text to repeat." },
            { "name": "number_times", "desc": "A positive number specifying how many times to repeat the text." }
        ]
    },
    {
        "name": "SUBSTITUTE",
        "category": "Text",
        "syntax": "=SUBSTITUTE(text, old_text, new_text, [instance_num])",
        "summary": "Substitutes new_text for old_text in a text string. Use when you know *what* to replace, not *where*.",
        "common_errors": ["Case-sensitive (it won't replace 'apple' if you search for 'Apple')"],
        "best_practice": "Cleaning phone numbers or IDs by removing hyphens: =SUBSTITUTE(A1, \"-\", \"\").",
        "parameters": [
            { "name": "text", "desc": "The text or cell reference containing text for which you want to substitute characters." },
            { "name": "old_text", "desc": "The text you want to replace." }
        ]
    },
    {
        "name": "TRANSPOSE",
        "category": "Lookup & Reference",
        "syntax": "=TRANSPOSE(array)",
        "summary": "Returns a vertical range of cells as a horizontal range, or vice versa.",
        "common_errors": ["#VALUE! (Requires Ctrl+Shift+Enter in pre-365 Excel)"],
        "best_practice": "Use to rotate data summary tables for presentation without manually copy-pasting as transpose.",
        "parameters": [{ "name": "array", "desc": "An array or range of cells on a worksheet that you want to transpose." }]
    }
];

let addedCount = 0;
trendingScenarios.forEach(fn => {
    const exists = db.some(existing => existing.name.toUpperCase() === fn.name.toUpperCase());
    if (!exists) {
        db.push(fn);
        addedCount++;
    }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));
console.log(`Successfully added ${addedCount} trending functions. Total is now ${db.length}.`);
