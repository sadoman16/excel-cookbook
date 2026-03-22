const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingNames = new Set(db.map(f => f.name.toUpperCase()));

const moreScenarios = [
    {
        "name": "CONCAT",
        "category": "Text",
        "syntax": "=CONCAT(text1, [text2], ...)",
        "summary": "Combines the text from multiple ranges and/or strings, replacing CONCATENATE while supporting entire ranges.",
        "common_errors": ["Doesn't automatically insert spaces or delimiters (use TEXTJOIN for that)."],
        "best_practice": "Use as a direct, cleaner upgrade to the legacy CONCATENATE function when chaining cell values without delimiters.",
        "parameters": [
            { "name": "text1", "desc": "The first text item to be joined." },
            { "name": "text2", "desc": "[Optional] The second text item to join." }
        ]
    },
    {
        "name": "MAXIFS",
        "category": "Statistical",
        "syntax": "=MAXIFS(max_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
        "summary": "Returns the maximum value among cells specified by a given set of conditions or criteria.",
        "common_errors": ["#VALUE! (If the size and shape of the max_range and criteria_range1 aren't exactly the same)"],
        "best_practice": "Great for finding the highest achieving student in a specific class, or the largest sale made by a specific salesperson in Q3.",
        "parameters": [
            { "name": "max_range", "desc": "The actual range of cells in which the maximum is to be determined." },
            { "name": "criteria_range1", "desc": "The set of cells to evaluate with the criteria." },
            { "name": "criteria1", "desc": "The condition that defines which cells will be evaluated." }
        ]
    },
    {
        "name": "MINIFS",
        "category": "Statistical",
        "syntax": "=MINIFS(min_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
        "summary": "Returns the minimum value among cells specified by a given set of conditions or criteria.",
        "common_errors": ["Returns 0 if no cells meet the criteria, which might be misleading in a dataset that genuinely contains zeros."],
        "best_practice": "Use to find the lowest remaining inventory level specifically for a certain warehouse or product category.",
        "parameters": [
            { "name": "min_range", "desc": "The actual range of cells in which the minimum is to be determined." },
            { "name": "criteria_range1", "desc": "The set of cells to evaluate with the criteria." },
            { "name": "criteria1", "desc": "The condition defining the evaluation." }
        ]
    },
    {
        "name": "AVERAGEIF",
        "category": "Statistical",
        "syntax": "=AVERAGEIF(range, criteria, [average_range])",
        "summary": "Returns the average (arithmetic mean) of all the cells in a range that meet a given criteria.",
        "common_errors": ["#DIV/0! (If no cells meet the criteria)"],
        "best_practice": "Quickly identify the average closing price of homes sold over $500,000 to determine higher-end market trends.",
        "parameters": [
            { "name": "range", "desc": "One or more cells to average." },
            { "name": "criteria", "desc": "The criteria in the form of a number, expression, or text." },
            { "name": "average_range", "desc": "[Optional] The actual set of cells to average." }
        ]
    },
    {
        "name": "AVERAGEIFS",
        "category": "Statistical",
        "syntax": "=AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
        "summary": "Returns the average of all cells that meet multiple criteria.",
        "common_errors": ["Order of arguments is completely different than AVERAGEIF (average_range comes FIRST here)."],
        "best_practice": "Essential for calculating metrics like 'Average support ticket resolution time' isolated to a specific agent and a specific priority level.",
        "parameters": [
            { "name": "average_range", "desc": "One or more cells to average." },
            { "name": "criteria_range1", "desc": "The first range evaluated." },
            { "name": "criteria1", "desc": "The first condition." }
        ]
    },
    {
        "name": "AVERAGEA",
        "category": "Statistical",
        "syntax": "=AVERAGEA(value1, [value2], ...)",
        "summary": "Calculates the average (arithmetic mean) of the values in the list of arguments. Evaluates text and FALSE as 0; TRUE as 1.",
        "common_errors": ["Unintentionally lowering the true mathematical average by including cells that contain descriptive text."],
        "best_practice": "Useful when calculating exam pass rates where a blank/absent (text label) should heavily punish the overall average as a 0.",
        "parameters": [
            { "name": "value1", "desc": "The first value or range." },
            { "name": "value2", "desc": "[Optional] Additional values or ranges." }
        ]
    },
    {
        "name": "MAXA",
        "category": "Statistical",
        "syntax": "=MAXA(value1, [value2], ...)",
        "summary": "Returns the largest value in a list of arguments, parsing text and FALSE as 0, and TRUE as 1.",
        "common_errors": ["Assuming it will ignore text cells entirely like MAX does."],
        "best_practice": "Best used in simple Logical arrays where you need to check if ANY test passed (since TRUE evaluates as the maximum value 1).",
        "parameters": [
            { "name": "value1", "desc": "The first value." }
        ]
    },
    {
        "name": "MINA",
        "category": "Statistical",
        "syntax": "=MINA(value1, [value2], ...)",
        "summary": "Returns the smallest value in a list of arguments, including numbers, text, and logical values.",
        "common_errors": ["Getting an unexpected 0 because the range included a header row or a cell containing text."],
        "best_practice": "Use caution. Prefer MIN unless you are intentionally utilizing boolean logic arrays or text zeroes.",
        "parameters": [
            { "name": "value1", "desc": "The first value." }
        ]
    },
    {
        "name": "STDEV.S",
        "category": "Statistical",
        "syntax": "=STDEV.S(number1, [number2], ...)",
        "summary": "Estimates standard deviation based on a sample (ignores logical values and text in the sample).",
        "common_errors": ["#DIV/0! (If the array has only 1 data point)"],
        "best_practice": "The default go-to standard deviation metric when you only have a sub-selection of data (e.g., surveying 100 customers out of a 10,000 customer base).",
        "parameters": [
            { "name": "number1", "desc": "The first number argument corresponding to a sample of a population." }
        ]
    },
    {
        "name": "VAR.S",
        "category": "Statistical",
        "syntax": "=VAR.S(number1, [number2], ...)",
        "summary": "Estimates variance based on a sample (ignores logical values and text in the sample).",
        "common_errors": ["#DIV/0! (If only 1 data point is provided)"],
        "best_practice": "Use alongside STDEV.S to understand how widely your data points for a sample are spread out from the mean.",
        "parameters": [
            { "name": "number1", "desc": "The first numeric argument." }
        ]
    },
    {
        "name": "ISNA",
        "category": "Information",
        "syntax": "=ISNA(value)",
        "summary": "Returns TRUE if the value refers to the #N/A (value not available) error value.",
        "common_errors": ["Often rendered obsolete by newer functions like IFERROR or XLOOKUP's built-in error handling."],
        "best_practice": "Use when you ONLY want to trap a \"not found\" #N/A error (e.g., a VLOOKUP failure) but want genuine math errors like #DIV/0! to bubble up and break the model.",
        "parameters": [
            { "name": "value", "desc": "The value you want tested." }
        ]
    },
    {
        "name": "ISERR",
        "category": "Information",
        "syntax": "=ISERR(value)",
        "summary": "Returns TRUE if the value refers to any error value EXCEPT #N/A.",
        "common_errors": ["People often confuse this with ISERROR, which traps EVERYTHING including #N/A."],
        "best_practice": "Use when checking data integrity for calculation errors (#REF!, #DIV/0!) while intentionally ignoring missing lookup values.",
        "parameters": [
            { "name": "value", "desc": "The value you want tested." }
        ]
    },
    {
        "name": "ISTEXT",
        "category": "Information",
        "syntax": "=ISTEXT(value)",
        "summary": "Returns TRUE if the value is text.",
        "common_errors": ["Returns FALSE if the cell visually contains text but Excel evaluates it as a formatting mask over a number."],
        "best_practice": "Combine with Conditional Formatting to highlight cells where a user accidentally typed letters into a required numeric field.",
        "parameters": [
            { "name": "value", "desc": "The value you want tested." }
        ]
    },
    {
        "name": "ISNONTEXT",
        "category": "Information",
        "syntax": "=ISNONTEXT(value)",
        "summary": "Returns TRUE if the value is not text. (Warning: Blank cells return TRUE).",
        "common_errors": ["Forgetting that an entirely empty cell technically evaluates as \"Not Text\"."],
        "best_practice": "Helpful when doing strict data validations during migrations to ensure a column is purely numbers, dates, or blanks.",
        "parameters": [
            { "name": "value", "desc": "The value you want tested." }
        ]
    },
    {
        "name": "ISLOGICAL",
        "category": "Information",
        "syntax": "=ISLOGICAL(value)",
        "summary": "Returns TRUE if the value is a logical value (TRUE or FALSE).",
        "common_errors": ["Returns FALSE if the cell simply says \"Yes\" or \"No\"."],
        "best_practice": "Use when parsing complex data structures imported from SQL databases where boolean flags must be strictly mapped.",
        "parameters": [
            { "name": "value", "desc": "The value you want tested." }
        ]
    },
    {
        "name": "ISREF",
        "category": "Information",
        "syntax": "=ISREF(value)",
        "summary": "Returns TRUE if the value is a valid cell reference.",
        "common_errors": ["Seldom used outside of highly complex macro-replacements or INDIRECT testing."],
        "best_practice": "Use dynamically paired with INDIRECT to verify if a user-typed string actually points to a real cell or sheet before trying to calculate it.",
        "parameters": [
            { "name": "value", "desc": "The value you want tested." }
        ]
    },
    {
        "name": "SHEET",
        "category": "Information",
        "syntax": "=SHEET([value])",
        "summary": "Returns the sheet number of the reference sheet.",
        "common_errors": ["#N/A (If the sheet name isn't valid)"],
        "best_practice": "Use to dynamically construct a Table of Contents that tracks which position a sheet is currently located in across the workbook.",
        "parameters": [
            { "name": "value", "desc": "[Optional] The name of a sheet or a reference for which you want the sheet number." }
        ]
    },
    {
        "name": "SHEETS",
        "category": "Information",
        "syntax": "=SHEETS([reference])",
        "summary": "Returns the number of sheets in a reference.",
        "common_errors": ["#REF! (If the referenced 3D range is invalid)"],
        "best_practice": "Leave the argument entirely blank: =SHEETS() to instantly count how many total tabs exist in the entire workbook.",
        "parameters": [
            { "name": "reference", "desc": "[Optional] A reference for which you want to know the number of sheets." }
        ]
    },
    {
        "name": "VDB",
        "category": "Financial",
        "syntax": "=VDB(cost, salvage, life, start_period, end_period, [factor], [no_switch])",
        "summary": "Returns the depreciation of an asset for any period you specify, including partial periods, using the double-declining balance method.",
        "common_errors": ["#NUM! (If cost < 0 or salvage < 0)"],
        "best_practice": "The most flexible depreciation function; strictly requested in accounting workflows to calculate write-offs across non-standard fiscal years.",
        "parameters": [
            { "name": "cost", "desc": "The initial cost of the asset." },
            { "name": "salvage", "desc": "The value at the end of the depreciation." },
            { "name": "life", "desc": "The number of periods over which the asset is depreciated." },
            { "name": "start_period", "desc": "The starting period for which you want to calculate the depreciation." },
            { "name": "end_period", "desc": "The ending period." }
        ]
    },
    {
        "name": "RECEIVED",
        "category": "Financial",
        "syntax": "=RECEIVED(settlement, maturity, investment, discount, [basis])",
        "summary": "Returns the amount received at maturity for a fully invested security.",
        "common_errors": ["#NUM! (If investment <= 0 or discount <= 0)"],
        "best_practice": "Use when assessing the sheer final cash payout of zero-coupon municipal bonds at the end of their lifecycle.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." },
            { "name": "investment", "desc": "The amount invested in the security." },
            { "name": "discount", "desc": "The security's discount rate." }
        ]
    },
    {
        "name": "DISCOUNT",
        "category": "Financial",
        "syntax": "=DISCOUNT(settlement, maturity, pr, redemption, [basis])",
        "summary": "Returns the discount rate for a security.",
        "common_errors": ["#NUM! (If settlement >= maturity)"],
        "best_practice": "Standard tool for deriving the implied discount rate of commercial paper traded on the secondary market.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." },
            { "name": "pr", "desc": "The security's price per $100 face value." },
            { "name": "redemption", "desc": "The security's redemption value per $100 face value." }
        ]
    },
    {
        "name": "COUPDAYBS",
        "category": "Financial",
        "syntax": "=COUPDAYBS(settlement, maturity, frequency, [basis])",
        "summary": "Returns the number of days from the beginning of the coupon period to the settlement date.",
        "common_errors": ["#NUM! (If frequency is any number other than 1, 2, or 4)"],
        "best_practice": "Used by bond traders to calculate accrued interest exactly when a fixed-income instrument is bought mid-cycle.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." },
            { "name": "frequency", "desc": "The number of coupon payments per year." }
        ]
    },
    {
        "name": "COUPDAYS",
        "category": "Financial",
        "syntax": "=COUPDAYS(settlement, maturity, frequency, [basis])",
        "summary": "Returns the number of days in the coupon period that contains the settlement date.",
        "common_errors": ["#VALUE! (Dates are not valid integers)"],
        "best_practice": "Provides the exact denominator needed when manually calculating fractional interest payouts on a bond.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." },
            { "name": "frequency", "desc": "The number of coupon payments per year." }
        ]
    },
    {
        "name": "COUPDAYSNC",
        "category": "Financial",
        "syntax": "=COUPDAYSNC(settlement, maturity, frequency, [basis])",
        "summary": "Returns the number of days from the settlement date to the next coupon date.",
        "common_errors": ["#NUM! (Settlement >= Maturity)"],
        "best_practice": "Calculate exactly how many days of interest you will inherently 'miss out' on when purchasing an instrument off-cycle.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." },
            { "name": "frequency", "desc": "The number of coupon payments per year." }
        ]
    },
    {
        "name": "COUPNCD",
        "category": "Financial",
        "syntax": "=COUPNCD(settlement, maturity, frequency, [basis])",
        "summary": "Returns the next coupon date after the settlement date.",
        "common_errors": ["Returns a raw serial number if the receiving cell isn't formatted as a Date."],
        "best_practice": "Build an automated calendar schedule that instantly flags when your next cash dividend will arrive.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." },
            { "name": "frequency", "desc": "The number of coupon payments per year." }
        ]
    },
    {
        "name": "COUPNUM",
        "category": "Financial",
        "syntax": "=COUPNUM(settlement, maturity, frequency, [basis])",
        "summary": "Returns the number of coupons payable between the settlement date and maturity date, rounded up to the nearest whole coupon.",
        "common_errors": ["#NUM! (Invalid frequency or dates)"],
        "best_practice": "Determines exactly how many total payments a buyer will receive if they hold a bond until it matures.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." },
            { "name": "frequency", "desc": "The number of coupon payments per year." }
        ]
    },
    {
        "name": "COUPPCD",
        "category": "Financial",
        "syntax": "=COUPPCD(settlement, maturity, frequency, [basis])",
        "summary": "Returns the previous coupon date before the settlement date.",
        "common_errors": ["Output is a raw number requiring date formatting."],
        "best_practice": "Identify when the last interest payment was distributed to the previous owner to verify accurate transaction pricing.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." },
            { "name": "frequency", "desc": "The number of coupon payments per year." }
        ]
    },
    {
        "name": "ODDFPRICE",
        "category": "Financial",
        "syntax": "=ODDFPRICE(issue, first_coupon, settlement, ...)",
        "summary": "Returns the price per $100 face value of a security with an odd (short or long) first period.",
        "common_errors": ["Extremely complex date restrictions; any date out of chronological order causes a #NUM! error."],
        "best_practice": "The absolute 'holy grail' function for financial analysts dealing with bonds that are issued at uncharacteristically odd times of the year.",
        "parameters": [
            { "name": "issue", "desc": "The security's issue date." },
            { "name": "first_coupon", "desc": "The security's first coupon date." },
            { "name": "settlement", "desc": "The security's settlement date." }
        ]
    },
    {
        "name": "ODDFYIELD",
        "category": "Financial",
        "syntax": "=ODDFYIELD(issue, first_coupon, settlement, rate, pr, redemption, frequency, [basis])",
        "summary": "Returns the yield of a security with an odd (short or long) first period.",
        "common_errors": ["#NUM! (Invalid parameters)"],
        "best_practice": "Use to ensure high precision when analyzing returns on irregularly timed municipal bonds.",
        "parameters": [
            { "name": "issue", "desc": "The issue date." },
            { "name": "first_coupon", "desc": "The first coupon date." },
            { "name": "rate", "desc": "The interest rate." },
            { "name": "pr", "desc": "The price." }
        ]
    },
    {
        "name": "OFFSET + SUM + COUNT",
        "category": "Lookup",
        "syntax": "=SUM(OFFSET(A1, COUNT(A:A)-10, 0, 10))",
        "summary": "A dynamic combination that always sums the 'last 10 values' in a continuously growing column.",
        "common_errors": ["#REF! (If there are fewer than 10 rows of data available when the formula is parsed)"],
        "best_practice": "Ideal for 'Rolling 10-Day Sales' or 'Last 12 Months' dashboards that update themselves the moment a user pastes a new row of data at the bottom.",
        "parameters": [
            { "name": "OFFSET", "desc": "Defines the moving window of data." },
            { "name": "COUNT", "desc": "Finds the absolute bottom of the data set." },
            { "name": "SUM", "desc": "Adds the values inside the targeted box." }
        ]
    }
];

let addedCount = 0;
moreScenarios.forEach(fn => {
    if (!existingNames.has(fn.name.toUpperCase())) {
        db.push(fn);
        addedCount++;
    }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));

const existingFiles = fs.readdirSync(path.join(__dirname, '../content/recipes')).filter(f => f.endsWith('.mdx'));
console.log(`Successfully added ${addedCount} new functions. Total is now ${db.length}.`);
console.log(`Generated recipes: ${existingFiles.length}`);
console.log(`New Remaining queue: ${db.length - existingFiles.length}`);
