const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const currentDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingNames = new Set(currentDb.map(f => f.name.toLowerCase()));

// Generating 1-week+ backlog of amazing recipes
const newFunctions = [
    { "name": "VLOOKUP with Wildcards Asterisk", "category": "Lookup & Reference", "summary": "Use asterisks to perform partial matches in a VLOOKUP." },
    { "name": "INDEX MATCH with Wildcards", "category": "Lookup & Reference", "summary": "Perform extremely robust partial text lookups with the classic INDEX MATCH." },
    { "name": "XLOOKUP with Multiple Criteria", "category": "Lookup & Reference", "summary": "Perform a two-way or multi-conditional lookup easily using XLOOKUP." },
    { "name": "XLOOKUP Wildcard Match", "category": "Lookup & Reference", "summary": "Harness the built-in wildcard match mode parameter of XLOOKUP." },
    { "name": "FILTER with Multiple AND/OR Conditions", "category": "Dynamic Array", "summary": "Master the syntax of multiplying (*) for AND logic and adding (+) for OR logic in arrays." },
    { "name": "UNIQUE & SORT Combo", "category": "Dynamic Array", "summary": "Extract a spotless, alphabetically ordered distinct list from a messy dataset in one formula." },
    { "name": "DATEDIF", "category": "Date & Time", "summary": "The hidden legacy function calculating exact years, months, or days between dates (perfect for age tracking)." },
    { "name": "YEARFRAC", "category": "Date & Time", "summary": "Calculates the exact fractional years between two dates (essential for financial proration)." },
    { "name": "EOMONTH + EDATE Combo", "category": "Date & Time", "summary": "Dynamically calculate precise contract termination or renewal dates." },
    { "name": "WORKDAY vs WORKDAY.INTL", "category": "Date & Time", "summary": "Avoid weekend-counting errors by adjusting holidays and non-standard work weeks." },
    { "name": "TEXTJOIN with FILTER", "category": "Text", "summary": "Creating dynamic comma-separated summaries of filtered data rows." },
    { "name": "LEFT & FIND Combine", "category": "Text", "summary": "The ultimate recipe for cleanly extracting First Names from a full name." },
    { "name": "MID & FIND Combine", "category": "Text", "summary": "Extract dynamic text buried between two other static characters." },
    { "name": "RIGHT & LEN & FIND Combine", "category": "Text", "summary": "Pull out Last Names or trailing data regardless of the text length." },
    { "name": "REPLACE vs SUBSTITUTE", "category": "Text", "summary": "Understand exactly when to swap text by position (REPLACE) versus searching for a string (SUBSTITUTE)." },
    { "name": "LEN & SUBSTITUTE Combo", "category": "Text", "summary": "Count exactly how many times a specific letter or word appears inside a single cell." },
    { "name": "SUMPRODUCT Weighted Average", "category": "Math & Trig", "summary": "The mathematician's trick to accurately calculating portfolio yields or graded score averages." },
    { "name": "QUOTIENT & MOD Packing", "category": "Math & Trig", "summary": "How to calculate full boxes versus leftover items in inventory management." },
    { "name": "RANDARRAY & SEQUENCE", "category": "Dynamic Array", "summary": "Generate massive grids of synthetic testing data or randomized assignments instantly." },
    { "name": "INDIRECT Dynamic Sheet Reference", "category": "Lookup & Reference", "summary": "Pull data across multiple identical summary sheets dynamically using a drop-down menu." },
    { "name": "CELL Filename Trick", "category": "Information", "summary": "Extract the current worksheet's tab name dynamically for automated headers." },
    { "name": "GETPIVOTDATA", "category": "Lookup & Reference", "summary": "Stop hard-coding #REF errors! How to safely extract data from changing Pivot Tables." },
    { "name": "HYPERLINK Dynamic Formula", "category": "Lookup & Reference", "summary": "Generate clickable links based on cell values to jump across massive dashboards." },
    { "name": "REPT Sparklines", "category": "Text", "summary": "Create inline visual bar charts using only a standard text formula." },
    { "name": "ISBLANK vs ISERROR", "category": "Information", "summary": "How to trap missing data vs broken logic in your massive condition chains." },
    { "name": "COUNTIFS with OR Logic (Array Constant)", "category": "Statistical", "summary": "Use {} array brackets to count multiple OR conditions in a single column." },
    { "name": "SUMIFS with Multi-Column Logic", "category": "Math & Trig", "summary": "A deep dive into advanced conditional summing across fragmented databases." },
    { "name": "AVERAGEIFS Handling Zeroes", "category": "Statistical", "summary": "How to prevent zeroes and blanks from corrupting your departmental average calculations." },
    { "name": "MINIFS & MAXIFS", "category": "Statistical", "summary": "Quickly identify the oldest overdue invoice or latest payment date per client." },
    { "name": "TRANSPOSE Dynamic Array", "category": "Dynamic Array", "summary": "Flip rows to columns and columns to rows forever synchronized to the source data." },
    { "name": "LET Function Advanced", "category": "Logical", "summary": "Assign names to calculation results inside a formula to massively boost calculation speed and readability." },
    { "name": "SORTBY Multiple Criteria", "category": "Dynamic Array", "summary": "Sort a leaderboard by score descending, then alphabetically descending by name in one step." },
    { "name": "LARGE & SMALL with Arrays", "category": "Statistical", "summary": "How to extract the Top 3 or Bottom 3 performers from a dataset." },
    { "name": "IF nested with AND/OR", "category": "Logical", "summary": "The classic robust way to handle multi-tiered condition trees without confusing modern ifs." },
    { "name": "VLOOKUP Exact vs Approximate", "category": "Lookup & Reference", "summary": "The terrifying difference between TRUE and FALSE as the 4th argument. When to map tax brackets." },
    { "name": "INDEX MATCH MATCH Two-Way", "category": "Lookup & Reference", "summary": "A 2D matrix intersection lookup for finding pricing based on size and weight variables." },
    { "name": "EXACT Case-Sensitive Search", "category": "Text", "summary": "Bypass Excel's case-blindness to accurately compare passwords or unique GUIDs." },
    { "name": "EDATE vs WORKDAY", "category": "Date & Time", "summary": "Understanding the precise difference between rolling by calendar months vs business days." },
    { "name": "ISNUMBER & SEARCH Combo", "category": "Logical", "summary": "The absolute safest way to test if a sub-string exists anywhere inside a block of text." },
    { "name": "CONCATENATE vs CONCAT vs TEXTJOIN", "category": "Text", "summary": "The evolution of string combinations and why TEXTJOIN renders the others obsolete." },
    { "name": "OFFSET Dynamic Range", "category": "Lookup & Reference", "summary": "Create a rolling 12-month average chart that updates automatically when new data is added." },
    { "name": "SUMPRODUCT for Two-Way condition counting", "category": "Math & Trig", "summary": "Using SUMPRODUCT logic maps to count how many 'Apples' were sold by 'John' without Pivot Tables." },
    { "name": "NETWORKDAYS.INTL Custom Weekends", "category": "Date & Time", "summary": "Calculate SLA delivery times for global teams where Friday/Saturday is the weekend." },
    { "name": "CLEAN & TRIM", "category": "Text", "summary": "Scrub hidden non-printable web artifacts and double spaces from copy-pasted data." },
    { "name": "VALUE / NUMBERVALUE String Coercion", "category": "Text", "summary": "Force Excel to recognize foreign currency strings imported as text back into calculable numbers." },
    { "name": "CHOOSECOLS vs INDEX", "category": "Lookup & Reference", "summary": "Extract specific non-adjacent columns from a master array easily using modern 365 indexing." },
    { "name": "CHOOSEROWS", "category": "Dynamic Array", "summary": "Pluck out specific rows from a massive array for a custom mini-dashboard." },
    { "name": "DATEVALUE", "category": "Date & Time", "summary": "Convert uncooperative date text strings imported from SAP or legacy software into real Excel dates." },
    { "name": "TIMEVALUE", "category": "Date & Time", "summary": "Convert time represented as text strings into a usable Excel serial decimal fraction." },
    { "name": "WEEKNUM vs ISOWEEKNUM", "category": "Date & Time", "summary": "Crucial differences for multi-national supply chain reporting regarding week numbering." },
    { "name": "MROUND", "category": "Math & Trig", "summary": "Round material quantities precisely to the nearest multiple of packaging size." },
    { "name": "CEILING vs FLOOR", "category": "Math & Trig", "summary": "Strict directional rounding to always purchase enough materials, or strict safety rounding for engineering loads." },
    { "name": "ABS Absolute Value Tracking", "category": "Math & Trig", "summary": "Calculate aggregate variance (margin of error) without letting positive and negative fluctuations cancel out." },
    { "name": "RANK.EQ vs RANK.AVG", "category": "Statistical", "summary": "How to properly resolve tie-breaker scores when grading students or sales members." },
    { "name": "PERCENTRANK.INC", "category": "Statistical", "summary": "Calculate an employee's exact percentile ranking compared to their peers' performance." },
    { "name": "CORREL Correlation Context", "category": "Statistical", "summary": "Calculate the correlation coefficient between marketing spend and sales revenue." },
    { "name": "SLOPE & INTERCEPT", "category": "Statistical", "summary": "Run rapid linear regressions to trend-forecast future sales directly within a cell." },
    { "name": "TREND & FORECAST.LINEAR", "category": "Statistical", "summary": "Predict next month's numbers based on historical linear models." },
    { "name": "PMT Financial Payment", "category": "Financial", "summary": "Accurately calculate your monthly mortgage or car loan payment." },
    { "name": "IPMT vs PPMT", "category": "Financial", "summary": "Split a loan payment into its distinct Interest and Principal components for tax accounting schedules." },
    { "name": "CUMIPMT & CUMPRINC", "category": "Financial", "summary": "Calculate the total cumulative interest paid across a specific date range of a loan." },
    { "name": "FV Future Value Tracking", "category": "Financial", "summary": "Model how much a retirement portfolio will be worth considering regular investments and estimated growth." },
    { "name": "PV Present Value Deals", "category": "Financial", "summary": "Assess whether a complex annuity or multi-year payout is actually a fair deal in today's dollars." },
    { "name": "NPV Net Present Value", "category": "Financial", "summary": "The ultimate corporate finance tool for deciding whether to undertake new project expenditures." },
    { "name": "IRR Internal Rate of Return", "category": "Financial", "summary": "Standardized way of calculating the annualized percentage return of equal periodic cash flow investments." },
    { "name": "MIRR Modified Internal Rate", "category": "Financial", "summary": "A more conservative, realistic financial return reflecting safe reinvestment rates for interim cash flows." },
    { "name": "VDB Declining Balance", "category": "Financial", "summary": "Calculate rapid front-loaded asset depreciation across fractional time periods." },
    { "name": "DB vs DDB Depreciation", "category": "Financial", "summary": "Fixed versus Double-Declining balance write-offs for tax and equipment lifecycle planning." },
    { "name": "SYD Sum of Years Digits", "category": "Financial", "summary": "An alternative accelerated depreciation formula often used in specific corporate assets." },
    { "name": "SUBTOTAL Function Magic", "category": "Math & Trig", "summary": "Calculate sums, counts, or averages that uniquely ignore rows hidden by AutoFilter." },
    { "name": "AGGREGATE Ignoring Errors", "category": "Math & Trig", "summary": "The modern upgrade to SUBTOTAL that mathematically bypasses #DIV/0! or #N/A errors in messy datasets." },
    { "name": "ROMAN / ARABIC Serialization", "category": "Math & Trig", "summary": "Switch formats easily for stylish chapter generation or formal index tracing." },
    { "name": "BASE & DECIMAL Data Engineering", "category": "Math & Trig", "summary": "Convert decimal numbers into raw structural Base-2 (Binary) or Base-16 (Hexadecimal) for software engineering." },
    { "name": "PROPER Capitalization", "category": "Text", "summary": "Instantly format thousands of sloppy name entries into neat 'Title Case' formats." },
    { "name": "T Function Text Only", "category": "Text", "summary": "Returns true text while blanking out numerical elements to sanitize mixed CSV inputs." },
    { "name": "N Function Numeric Strict", "category": "Information", "summary": "Forces dates, True/False, and text into pure mathematical integers." },
    { "name": "FORMULATEXT Auditing", "category": "Lookup & Reference", "summary": "Print another cell's background formula dynamically onto the sheet for creating training manuals." },
    { "name": "ISFORMULA Conditional Formats", "category": "Information", "summary": "Audit complex financial models by color-coding hard-coded inputs versus calculated formulas." },
    { "name": "ERROR.TYPE Deep Diagnostics", "category": "Information", "summary": "Determine the exact numerical code of an error to trigger extremely specific backup routines." },
    { "name": "ISTEXT / ISNONTEXT Validation", "category": "Information", "summary": "Create bulletproof data entry safeguards combining IS logic with Data Validation forms." },
    { "name": "ISLOGICAL Flags", "category": "Information", "summary": "Confirm configuration flags check accurately for pure Boolean outputs." },
    { "name": "ISREF Pointer Checking", "category": "Information", "summary": "Verify if complex INDIRECT string concatenations resulted in a valid sheet address." },
    { "name": "CEILING.MATH vs FLOOR.MATH", "category": "Math & Trig", "summary": "Advanced directional rounding resolving the complex handling of negative values and zero-offsets." },
    { "name": "ISO.CEILING Statistics", "category": "Math & Trig", "summary": "Globally standardized rounding methods specifically catering to international number processing." },
    { "name": "MODE.MULT Array Stats", "category": "Statistical", "summary": "Capture all statistically equal bimodal or multimodal repeating numbers in a population spread." }
];

let addedCount = 0;
newFunctions.forEach(fn => {
    // Fill required Schema
    if (!fn.syntax) fn.syntax = `=${fn.name.split(' ')[0]}(...)`;
    if (!fn.parameters) fn.parameters = [{ "name": "Requirements", "desc": "Context specific logic." }];
    if (!fn.common_errors) fn.common_errors = ["Formula syntax typos"];
    if (!fn.best_practice) fn.best_practice = "Evaluate data thoroughly before deployment.";

    // Remove duplicates
    if (!existingNames.has(fn.name.toLowerCase())) {
        currentDb.push(fn);
        existingNames.add(fn.name.toLowerCase());
        addedCount++;
    }
});

fs.writeFileSync(dbPath, JSON.stringify(currentDb, null, 4));
console.log(`Successfully queued ${addedCount} recipes for the automated bot backlog.`);
