const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const currentDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingNames = new Set(currentDb.map(f => f.name.toLowerCase()));

const newFunctions = [
    // 100+ Extensive and niche scenarios to feed the Daily Chef bot for the next 10 days
    { "name": "VLOOKUP Right to Left (Classic Workaround)", "category": "Lookup & Reference", "summary": "How to make VLOOKUP look backwards using the CHOOSE array trick when you cannot use XLOOKUP." },
    { "name": "INDEX MATCH Multiple Criteria Horizontal and Vertical", "category": "Lookup & Reference", "summary": "The ultimate 3D matrix lookup mapping products against dates and regions." },
    { "name": "Dynamic Running Total with SUM", "category": "Math & Trig", "summary": "Locking the top row reference in SUM to create a column of cumulative running totals." },
    { "name": "OFFSET Dynamic Dropdown Lists", "category": "Lookup & Reference", "summary": "Create Data Validation drop-downs that automatically expand when new items are typed at the bottom." },
    { "name": "INDIRECT Dependent Dropdowns", "category": "Lookup & Reference", "summary": "Select 'USA' in Cell A, and Cell B instantly limits its drop-down choices to US States only." },
    { "name": "SUMIFS with Date Ranges (Between)", "category": "Math & Trig", "summary": "Accurately sum total sales generated specifically between January 1st and January 31st." },
    { "name": "COUNTIFS with Wildcards Arrays", "category": "Statistical", "summary": "Count exactly how many users have @gmail.com or @yahoo.com emails using a single formula." },
    { "name": "Average Top 5 Scores (LARGE)", "category": "Statistical", "summary": "Combine AVERAGE and LARGE with array braces to grade only the best 5 tests out of 10." },
    { "name": "Extract First Word with LEFT and FIND", "category": "Text", "summary": "Pull just the City name from 'NewYork, NY'." },
    { "name": "Extract Nth Word with TRIM and MID", "category": "Text", "summary": "A complex substitute trick to extract exactly the 3rd word in any sentence." },
    { "name": "Remove 0 from Blank VLOOKUPs", "category": "Lookup & Reference", "summary": "Stop VLOOKUP from returning 0 when the source cell is completely empty." },
    { "name": "Count Unique Text Values", "category": "Statistical", "summary": "The classic SUMPRODUCT(1/COUNTIF) trick to count how many distinct customers visited." },
    { "name": "Calculate Age in Years and Months", "category": "Date & Time", "summary": "Use DATEDIF three times to write '14 Years, 2 Months, 5 Days'." },
    { "name": "Next Monday from Today", "category": "Date & Time", "summary": "Calculate the exact date of the upcoming Monday, great for delivery dispatch scheduling." },
    { "name": "Third Friday of the Month", "category": "Date & Time", "summary": "Automatically date-stamp stock option expiration Fridays dynamically for any year/month." },
    { "name": "Find Last Working Day of Month", "category": "Date & Time", "summary": "Combine WORKDAY and EOMONTH for accounting end-of-month closes." },
    { "name": "Find Nth Occurrence with INDEX MATCH", "category": "Lookup & Reference", "summary": "Find the 3rd time a customer purchased an item, ignoring their 1st and 2nd trips." },
    { "name": "List All Matches (INDEX AGGREGATE)", "category": "Lookup & Reference", "summary": "Spill all invoice numbers for a particular client into a list vertically." },
    { "name": "Sort by Custom Order (MATCH)", "category": "Lookup & Reference", "summary": "Sort sizes by S, M, L, XL instead of alphabetical L, M, S, XL." },
    { "name": "Add Leading Zeros (TEXT)", "category": "Text", "summary": "Force Excel to display '00123' instead of clipping the zeros to '123' on barcodes or strict IDs." },
    { "name": "Find Last Value in Column", "category": "Lookup & Reference", "summary": "The LOOKUP(2,1/(range<>''),range) wizardry to fetch the absolute bottom-most entry." },
    { "name": "Sum Every Nth Row", "category": "Math & Trig", "summary": "Combine SUMPRODUCT and MOD to sum only the Total rows recurring every 5 rows down a sheet." },
    { "name": "Highlight Duplicates (Conditional Formatting Formula)", "category": "Logical", "summary": "Use COUNTIF > 1 inside Conditional Formatting to highlight repeating text strings dynamically." },
    { "name": "Reverse a Text String", "category": "Text", "summary": "Advanced trick using MID, ROW, and INDIRECT or modern LAMBDA to flip 'apple' to 'elppa'." },
    { "name": "Remove Non-Numeric Characters", "category": "Text", "summary": "Scrub '$100 USD (Estimate)' down to pure '100' using deep text substitution combinations." },
    { "name": "Count Words in a Cell", "category": "Text", "summary": "Compare the LEN vs LEN(SUBSTITUTE) to accurately find word counts inside paragraph cells." },
    { "name": "VLOOKUP with Multiple Return Values", "category": "Lookup & Reference", "summary": "Use columns() trick inside VLOOKUP col_index to drag one formula across multiple columns." },
    { "name": "Match Two Columns Exactly", "category": "Logical", "summary": "Identify if List A has exactly the same sequence and values as List B using array booleans." },
    { "name": "Generate Sequential Dates", "category": "Date & Time", "summary": "Create a vertical calendar matrix dynamically using SEQUENCE and DATE." },
    { "name": "Extract File Name from Path", "category": "Text", "summary": "Isolate 'report.xlsx' from 'C:/Documents/Work/report.xlsx' by finding the last backslash." },
    { "name": "Find Closest Match (INDEX MATCH)", "category": "Lookup & Reference", "summary": "Find the closest matching pricing tier to $45.70 when exact matches don't exist." },
    { "name": "IF OR AND Complex Gates", "category": "Logical", "summary": "Check if a candidate has (Degree AND 5 YOE) OR (Certificate AND 10 YOE) accurately." },
    { "name": "Extract Numbers from Text", "category": "Text", "summary": "Classic formula to rip out 456 from 'Invoice-456-ABC'." },
    { "name": "Compare Two Lists for Missing Items", "category": "Lookup & Reference", "summary": "Use COUNTIF or MATCH to instantly flag which employees did not submit timesheets from the master list." },
    { "name": "VLOOKUP Partial Match Asterisk", "category": "Lookup & Reference", "summary": "Safely match 'John Smith' if the database only has 'John'." },
    { "name": "Calculate Quarter from Date", "category": "Date & Time", "summary": "Roundup the month to determine Q1, Q2, Q3, or Q4." },
    { "name": "Convert Month Name to Number", "category": "Date & Time", "summary": "Turn the string 'February' into the strict integer '2'." },
    { "name": "Convert Number to Month Name", "category": "Date & Time", "summary": "Format integer 5 to output as 'May'." },
    { "name": "Last Day of Previous Month", "category": "Date & Time", "summary": "Use EOMONTH(date, -1) to anchor financial calculations to the exact monthly close." },
    { "name": "Count Cells Not Equal To", "category": "Statistical", "summary": "Countifs with `<>Apple` criteria to count everything else." },
    { "name": "Sum Top N Values", "category": "Math & Trig", "summary": "SUM(LARGE(array, {1,2,3})) for quick podium scoring." },
    { "name": "SUMPRODUCT with AND Criteria", "category": "Math & Trig", "summary": "Deep logic multiplication for heavy data-warehousing in Excel." },
    { "name": "VLOOKUP Return Blank Not NA", "category": "Lookup & Reference", "summary": "Hide #N/A cleanly with IFNA or IFERROR." },
    { "name": "Count Visible Rows Only", "category": "Statistical", "summary": "Use SUBTOTAL(103, range) to only count rows currently shown passing through AutoFilter." },
    { "name": "VLOOKUP Case Sensitive", "category": "Lookup & Reference", "summary": "Force Excel to treat 'Apple' and 'apple' as two distinct lookups using EXACT and INDEX." },
    { "name": "Find Min Absolute Value", "category": "Statistical", "summary": "Find the number closest to zero regardless of positive/negative signs." },
    { "name": "Convert Decimal Hours to Time", "category": "Date & Time", "summary": "Turn 7.5 hours back into 07:30:00 for strict payroll tracking." },
    { "name": "Find Position of Nth Capital Letter", "category": "Text", "summary": "Identify where CamelCase words break to insert spaces." },
    { "name": "Count Specific Characters in Range", "category": "Text", "summary": "Count exactly how many commas exist in an entire sheet." },
    { "name": "VLOOKUP First Non-Blank Value", "category": "Lookup & Reference", "summary": "Bypass empty cells when searching down a column until a real value is found." },
    { "name": "Extract Email Address from Text", "category": "Text", "summary": "Pull out an @-containing string from messy paragraph dumps." },
    { "name": "Count Cells with Specific Text (Partial)", "category": "Statistical", "summary": "Count all cells containing the substring 'Urgent' anywhere in their body." },
    { "name": "Sum Values Based on Font Color", "category": "Math & Trig", "summary": "Explain how this requires old Excel 4.0 Macros or VBA but offering the modern conditional sum workaround." },
    { "name": "Sort Dropdown List Alphabetically", "category": "Dynamic Array", "summary": "Feed a SORT(UNIQUE(array)) output into Data Validation." },
    { "name": "Find Max Value and Return Name", "category": "Lookup & Reference", "summary": "INDEX MATCH MAX combo to print the name of the top performing salesperson." },
    { "name": "Separate Names into First and Last", "category": "Text", "summary": "Split 'John Q. Public' perfectly into two columns." },
    { "name": "Count Holidays Between Dates", "category": "Date & Time", "summary": "Networkdays minus simple subtraction to isolate exact holiday counts." },
    { "name": "Calculate Overtime Hours", "category": "Date & Time", "summary": "MAX(0, Hours - 8) logic for daily payroll boundaries." },
    { "name": "VLOOKUP Return Left Column", "category": "Lookup & Reference", "summary": "Why VLOOKUP fails this and how INDEX/MATCH fixes it." },
    { "name": "Calculate CAGR", "category": "Financial", "summary": "Compound Annual Growth Rate formula from scratch using exponents." },
    { "name": "Find Row Number of Value", "category": "Lookup & Reference", "summary": "Using MATCH to extract relative row index." },
    { "name": "Calculate Percentage Change", "category": "Math & Trig", "summary": "(New - Old) / Old handled safely with IFERROR for zero divisors." },
    { "name": "VLOOKUP with Helper Column", "category": "Lookup & Reference", "summary": "Concatenate variables in Column A to simulate multiple criteria lookups." },
    { "name": "Sum Data Between Two Blank Rows", "category": "Math & Trig", "summary": "Complex dynamic range arrays tracking blank boundaries." },
    { "name": "Remove First Character", "category": "Text", "summary": "RIGHT and LEN combo to strip leading bullet points from data." },
    { "name": "Remove Last Character", "category": "Text", "summary": "LEFT and LEN to drop trailing punctuation marks." },
    { "name": "Count Checked Checkboxes", "category": "Statistical", "summary": "Count TRUE outputs linked to developer checkboxes." },
    { "name": "Calculate Weighted Score", "category": "Math & Trig", "summary": "Combine multiple grading weights against actual scores." },
    { "name": "Find Most Frequent Text", "category": "Statistical", "summary": "INDEX MATCH MODE MATCH trick for text strings." },
    { "name": "Extract Domain from Email", "category": "Text", "summary": "Pull everything right of the @ symbol." },
    { "name": "Extract Year from Financial Year", "category": "Date & Time", "summary": "Determine calendar year based on corporate July-June fiscal cycles." },
    { "name": "Find Max Decrease", "category": "Statistical", "summary": "Find the largest negative delta between two sets of numbers." },
    { "name": "Count Uniques with Multiple Criteria", "category": "Statistical", "summary": "Deep array filtering combined with COUNTa UNIQUE." },
    { "name": "VLOOKUP vs XLOOKUP Performance", "category": "Advanced", "summary": "When to use traditional VLOOKUP in massive datasets versus XLOOKUP's overhead." },
    { "name": "Calculate Moving Average", "category": "Math & Trig", "summary": "Dynamic OFFSET configurations for 3-month rolling averages." },
    { "name": "Randomly Select Cell from List", "category": "Lookup & Reference", "summary": "INDEX combined with RANDBETWEEN for lottery picks." },
    { "name": "Check if Date is Weekend", "category": "Logical", "summary": "WEEKDAY return type logic to flag Saturday/Sunday." },
    { "name": "Sum Diagonal Cells matrix", "category": "Math & Trig", "summary": "ROW() = COLUMN() array math for deep matrix algebra." },
    // A bunch of exact specific functions
    { "name": "IMREAL", "category": "Engineering", "summary": "Returns the real coefficient of a complex number." },
    { "name": "IMAGINARY", "category": "Engineering", "summary": "Returns the imaginary coefficient of a complex number." },
    { "name": "COMPLEX", "category": "Engineering", "summary": "Converts real and imaginary coefficients into a complex number." },
    { "name": "IMABS", "category": "Engineering", "summary": "Returns the absolute value (modulus) of a complex number." },
    { "name": "IMARGUMENT", "category": "Engineering", "summary": "Returns the argument theta, an angle expressed in radians." },
    { "name": "IMCONJUGATE", "category": "Engineering", "summary": "Returns the complex conjugate of a complex number." },
    { "name": "IMSIN", "category": "Engineering", "summary": "Returns the sine of a complex number." },
    { "name": "IMCOS", "category": "Engineering", "summary": "Returns the cosine of a complex number." },
    { "name": "IMDIV", "category": "Engineering", "summary": "Returns the quotient of two complex numbers." },
    { "name": "IMEXP", "category": "Engineering", "summary": "Returns the exponential of a complex number." },
    { "name": "IMLN", "category": "Engineering", "summary": "Returns the natural logarithm of a complex number." },
    { "name": "IMLOG10", "category": "Engineering", "summary": "Returns the base-10 logarithm of a complex number." },
    { "name": "IMLOG2", "category": "Engineering", "summary": "Returns the base-2 logarithm of a complex number." },
    { "name": "IMPOWER", "category": "Engineering", "summary": "Returns a complex number raised to an integer power." },
    { "name": "IMPRODUCT", "category": "Engineering", "summary": "Returns the product of complex numbers." },
    { "name": "IMSQRT", "category": "Engineering", "summary": "Returns the square root of a complex number." },
    { "name": "IMSUB", "category": "Engineering", "summary": "Returns the difference between two complex numbers." },
    { "name": "IMSUM", "category": "Engineering", "summary": "Returns the sum of complex numbers." }
];

let addedCount = 0;
newFunctions.forEach(fn => {
    if (!fn.syntax) fn.syntax = `=${fn.name.split(' ')[0].toUpperCase()}()`;
    if (!fn.parameters) fn.parameters = [{ "name": "Variables", "desc": "Context specific" }];
    if (!fn.common_errors) fn.common_errors = ["#VALUE!"];
    if (!fn.best_practice) fn.best_practice = "Use caution when scaling arrays over massive rows.";

    if (!existingNames.has(fn.name.toLowerCase())) {
        currentDb.push(fn);
        existingNames.add(fn.name.toLowerCase());
        addedCount++;
    }
});

fs.writeFileSync(dbPath, JSON.stringify(currentDb, null, 4));
console.log(`Successfully added ${addedCount} recipes for the automated bot backlog.`);
