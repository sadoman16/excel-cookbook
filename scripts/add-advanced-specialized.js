const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingNames = new Set(db.map(f => f.name.toUpperCase()));

const moreScenarios = [
    {
        "name": "CORREL",
        "category": "Statistical",
        "syntax": "=CORREL(array1, array2)",
        "summary": "Returns the correlation coefficient of the array1 and array2 cell ranges. Used to determine the relationship between two properties.",
        "common_errors": ["#DIV/0! (Arrays have zero variance or are empty)", "#N/A (Arrays have different number of data points)"],
        "best_practice": "Essential for A/B testing or finding out if an increase in marketing spend truly drives an increase in sales.",
        "parameters": [
            { "name": "array1", "desc": "A cell range of values." },
            { "name": "array2", "desc": "A second cell range of values." }
        ]
    },
    {
        "name": "PEARSON",
        "category": "Statistical",
        "syntax": "=PEARSON(array1, array2)",
        "summary": "Returns the Pearson product moment correlation coefficient, which is basically the same as CORREL under the hood.",
        "common_errors": ["#DIV/0! (Standard deviation is zero)"],
        "best_practice": "Use interchangeably with CORREL to measure the linear relationship between two variables.",
        "parameters": [
            { "name": "array1", "desc": "A set of independent values." },
            { "name": "array2", "desc": "A set of dependent values." }
        ]
    },
    {
        "name": "RSQ",
        "category": "Statistical",
        "syntax": "=RSQ(known_y's, known_x's)",
        "summary": "Returns the square of the Pearson product moment correlation coefficient through data points.",
        "common_errors": ["#N/A (Array lengths are different)"],
        "best_practice": "Excellent for determining the 'goodness of fit' of your trendline; tells you what percentage of variance in Y is explained by X.",
        "parameters": [
            { "name": "known_y's", "desc": "An array or range of dependent data points." },
            { "name": "known_x's", "desc": "An array or range of independent data points." }
        ]
    },
    {
        "name": "SLOPE",
        "category": "Statistical",
        "syntax": "=SLOPE(known_y's, known_x's)",
        "summary": "Returns the slope of the linear regression line through data points.",
        "common_errors": ["#DIV/0! (Only one data point or variance of x is zero)"],
        "best_practice": "Combine with INTERCEPT to manually forecast future values without using the built-in FORECAST functions.",
        "parameters": [
            { "name": "known_y's", "desc": "An array or numeric range of dependent data points." },
            { "name": "known_x's", "desc": "The set of independent data points." }
        ]
    },
    {
        "name": "INTERCEPT",
        "category": "Statistical",
        "syntax": "=INTERCEPT(known_y's, known_x's)",
        "summary": "Calculates the point at which a line will intersect the y-axis by using existing x-values and y-values.",
        "common_errors": ["#DIV/0! (Variance of x is zero)"],
        "best_practice": "Provides the baseline (fixed cost) metric when analyzing mixed costs in managerial accounting.",
        "parameters": [
            { "name": "known_y's", "desc": "The dependent set of observations." },
            { "name": "known_x's", "desc": "The independent set of observations." }
        ]
    },
    {
        "name": "TREND",
        "category": "Statistical",
        "syntax": "=TREND(known_y's, [known_x's], [new_x's], [const])",
        "summary": "Returns values along a linear trend. Fits a straight line (using the method of least squares) to the arrays.",
        "common_errors": ["#VALUE! (Arrays have non-numeric data)"],
        "best_practice": "Instead of predicting just one point, highlight a range and press Ctrl+Shift+Enter to predict an entire array of future data points.",
        "parameters": [
            { "name": "known_y's", "desc": "The set of y-values you already know in the equation y = mx + b." },
            { "name": "new_x's", "desc": "[Optional] New x-values for which you want TREND to return corresponding y-values." }
        ]
    },
    {
        "name": "Z.TEST",
        "category": "Statistical",
        "syntax": "=Z.TEST(array, x, [sigma])",
        "summary": "Returns the one-tailed probability-value of a z-test. Helps determine if a data sample differs significantly from the population.",
        "common_errors": ["#NUM! (Array is empty)"],
        "best_practice": "Great for analyzing survey results, like whether a new website design truly improved conversion rates over the baseline.",
        "parameters": [
            { "name": "array", "desc": "The array or range of data against which to test x." },
            { "name": "x", "desc": "The value to test." }
        ]
    },
    {
        "name": "T.TEST",
        "category": "Statistical",
        "syntax": "=T.TEST(array1, array2, tails, type)",
        "summary": "Returns the probability associated with a Student's t-Test. Determines whether two samples are likely to have come from the same two underlying populations.",
        "common_errors": ["#NUM! (Tails is not 1 or 2, or type is not 1, 2, or 3)"],
        "best_practice": "Crucial in manufacturing or medical testing to compare control groups versus experimental groups under limited sample sizes.",
        "parameters": [
            { "name": "array1", "desc": "The first data set." },
            { "name": "array2", "desc": "The second data set." },
            { "name": "tails", "desc": "Specifies the number of distribution tails (1 or 2)." },
            { "name": "type", "desc": "The kind of t-Test to perform (1=Paired, 2=Two-sample equal variance...)." }
        ]
    },
    {
        "name": "DAYS360",
        "category": "Date & Time",
        "syntax": "=DAYS360(start_date, end_date, [method])",
        "summary": "Returns the number of days between two dates based on a 360-day year (twelve 30-day months).",
        "common_errors": ["#VALUE! (Arguments are not valid dates)"],
        "best_practice": "Still heavily mandated in some legacy accounting, bond trading, and payroll systems instead of exact actual days.",
        "parameters": [
            { "name": "start_date", "desc": "A date that represents the start." },
            { "name": "end_date", "desc": "A date that represents the end." }
        ]
    },
    {
        "name": "DEC2BIN",
        "category": "Engineering",
        "syntax": "=DEC2BIN(number, [places])",
        "summary": "Converts a decimal number to binary.",
        "common_errors": ["#NUM! (Number is less than -512 or > 511)"],
        "best_practice": "Use when programming subnet masks or working with legacy microcontroller bitwise operations.",
        "parameters": [
            { "name": "number", "desc": "The decimal integer you want to convert." },
            { "name": "places", "desc": "[Optional] The number of characters to use." }
        ]
    },
    {
        "name": "BIN2DEC",
        "category": "Engineering",
        "syntax": "=BIN2DEC(number)",
        "summary": "Converts a binary number to decimal.",
        "common_errors": ["#NUM! (Number is not a valid binary or contains more than 10 characters)"],
        "best_practice": "Translating hardware outputs or machine logs back into readable numeric IDs.",
        "parameters": [
            { "name": "number", "desc": "The binary number you want to convert (max 10 chars)." }
        ]
    },
    {
        "name": "DEC2HEX",
        "category": "Engineering",
        "syntax": "=DEC2HEX(number, [places])",
        "summary": "Converts a decimal number to hexadecimal.",
        "common_errors": ["#NUM! (Number is out of valid range)"],
        "best_practice": "Translating RGB color codes from their decimal 0-255 format into 6-digit HTML hex codes (#RRGGBB).",
        "parameters": [
            { "name": "number", "desc": "The decimal integer you want to convert." }
        ]
    },
    {
        "name": "HEX2DEC",
        "category": "Engineering",
        "syntax": "=HEX2DEC(number)",
        "summary": "Converts a hexadecimal number to decimal.",
        "common_errors": ["#NUM! (Invalid characters in the hex string)"],
        "best_practice": "Parsing network MAC addresses or IPv6 segments in an IT inventory spreadsheet.",
        "parameters": [
            { "name": "number", "desc": "The hexadecimal number you want to convert (max 10 chars)." }
        ]
    },
    {
        "name": "COMPLEX",
        "category": "Engineering",
        "syntax": "=COMPLEX(real_num, i_num, [suffix])",
        "summary": "Converts real and imaginary coefficients into a complex number of the form x + yi or x + yj.",
        "common_errors": ["#VALUE! (Real_num or I_num is nonnumeric)"],
        "best_practice": "Electrical engineers heavily use this when building electrical impedance or AC circuit simulations in Excel.",
        "parameters": [
            { "name": "real_num", "desc": "The real coefficient of the complex number." },
            { "name": "i_num", "desc": "The imaginary coefficient of the complex number." }
        ]
    },
    {
        "name": "IMREAL",
        "category": "Engineering",
        "syntax": "=IMREAL(inumber)",
        "summary": "Returns the real coefficient of a complex number.",
        "common_errors": ["#NUM! (Inumber is not recognized as a complex number)"],
        "best_practice": "Extracting the usable power (watts) vector from complex apparent power strings.",
        "parameters": [
            { "name": "inumber", "desc": "A complex number for which you want the real coefficient." }
        ]
    },
    {
        "name": "IMAGINARY",
        "category": "Engineering",
        "syntax": "=IMAGINARY(inumber)",
        "summary": "Returns the imaginary coefficient of a complex number.",
        "common_errors": ["#NUM! (Invalid complex format)"],
        "best_practice": "Paring reactive power (VAR) out of a complex power array in electrical engineering.",
        "parameters": [
            { "name": "inumber", "desc": "A complex number." }
        ]
    },
    {
        "name": "DISC",
        "category": "Financial",
        "syntax": "=DISC(settlement, maturity, pr, redemption, [basis])",
        "summary": "Returns the discount rate for a security.",
        "common_errors": ["#NUM! (Settlement >= Maturity)"],
        "best_practice": "Use when comparing zero-coupon bonds or Treasury bills purchased at a discount to their face value.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." },
            { "name": "pr", "desc": "The security's price per $100 face value." }
        ]
    },
    {
        "name": "INTRATE",
        "category": "Financial",
        "syntax": "=INTRATE(settlement, maturity, investment, redemption, [basis])",
        "summary": "Returns the interest rate for a fully invested security.",
        "common_errors": ["#VALUE! (Dates are not valid)"],
        "best_practice": "Often used to find the exact rate of return for short-term commercial paper.",
        "parameters": [
            { "name": "investment", "desc": "The amount invested in the security." },
            { "name": "redemption", "desc": "The amount to be received at maturity." }
        ]
    },
    {
        "name": "TBILLYIELD",
        "category": "Financial",
        "syntax": "=TBILLYIELD(settlement, maturity, pr)",
        "summary": "Returns the yield for a Treasury bill.",
        "common_errors": ["#NUM! (Maturity is more than one year after settlement)"],
        "best_practice": "Specialized strictly for US T-Bills, offering an exact standardized yield computation compared to generic YIELD.",
        "parameters": [
            { "name": "pr", "desc": "The Treasury bill's price per $100 face value." }
        ]
    },
    {
        "name": "PRICEDISC",
        "category": "Financial",
        "syntax": "=PRICEDISC(settlement, maturity, discount, redemption, [basis])",
        "summary": "Returns the price per $100 face value of a discounted security.",
        "common_errors": ["#NUM! (Discount is <= 0)"],
        "best_practice": "Calculate exactly how much cash to bring to purchase a discounted instrument on the secondary market.",
        "parameters": [
            { "name": "discount", "desc": "The security's discount rate." },
            { "name": "redemption", "desc": "The security's redemption value per $100 face value." }
        ]
    },
    {
        "name": "TYPE",
        "category": "Information",
        "syntax": "=TYPE(value)",
        "summary": "Returns a number indicating the data type of a value (e.g., 1=Number, 2=Text, 4=Logical, 16=Error).",
        "common_errors": ["Cannot determine format (it only determines the underlying data type, not how it's visually formatted)"],
        "best_practice": "Wrap inside an IF statement to scrub 'bad data' (like text in a number column) before running financial math on it.",
        "parameters": [
            { "name": "value", "desc": "The value whose type you want to find." }
        ]
    },
    {
        "name": "COUNT",
        "category": "Statistical",
        "syntax": "=COUNT(value1, [value2], ...)",
        "summary": "Counts how many cells contain pure numbers in a range.",
        "common_errors": ["Doesn't count text or boolean values, which confuses beginners (use COUNTA for that)"],
        "best_practice": "Great for quickly verifying if a dataset imported from CSV actually recognized the IDs or Phone Numbers as numerical.",
        "parameters": [
            { "name": "value1", "desc": "Up to 255 arguments that can contain or refer to a variety of different types of data, but only numbers are counted." }
        ]
    },
    {
        "name": "COUNTA",
        "category": "Statistical",
        "syntax": "=COUNTA(value1, [value2], ...)",
        "summary": "Counts the number of cells that are not empty in a range.",
        "common_errors": ["Sometimes counts cells that look empty but contain a space character or a formula returning an empty string (\'\')"],
        "best_practice": "Use to count 'how many people responded to the survey' by referencing a mandatory name or email column.",
        "parameters": [
            { "name": "value1", "desc": "The first item, cell reference, or range." }
        ]
    },
    {
        "name": "GETPIVOTDATA + IFERROR",
        "category": "Lookup",
        "syntax": "=IFERROR(GETPIVOTDATA(data_field, pivot_table), \"Not Found\")",
        "summary": "Extracts data from a PivotTable safely, returning a custom message if the specific grouping isn't currently present.",
        "common_errors": ["#REF! occurs constantly in raw GETPIVOTDATA when a category drops to zero and disappears from the pivot."],
        "best_practice": "Build bullet-proof dashboards that link to dynamic Pivot Tables without breaking when data sets shift or shrink month-to-month.",
        "parameters": [
            { "name": "GETPIVOTDATA", "desc": "Searches for the intersection of data in the pivot." },
            { "name": "IFERROR", "desc": "Catches the #REF! and turns it into a clean 0 or blank." }
        ]
    },
    {
        "name": "OFFSET + SUM",
        "category": "Math & Trig",
        "syntax": "=SUM(OFFSET(A1, 0, 0, 12, 1))",
        "summary": "Creates a dynamic sum range that can expand or contract based on input parameters.",
        "common_errors": ["#REF! (Dynamic range tries to size off the edge of the sheet)"],
        "best_practice": "Perfect for 'Trailing 12 Months (TTM)' charts where the starting point and height need to shift as new data arrives.",
        "parameters": [
            { "name": "OFFSET", "desc": "Defines the dynamic shape of the mathematical array." },
            { "name": "SUM", "desc": "Adds up the dynamically fetched range." }
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
console.log(`Successfully added ${addedCount} new specialized functions. Total is now ${db.length}.`);
