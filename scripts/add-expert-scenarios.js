const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingNames = new Set(db.map(f => f.name.toUpperCase()));

const moreScenarios = [
    {
        "name": "DSUM",
        "category": "Database",
        "syntax": "=DSUM(database, field, criteria)",
        "summary": "Adds the numbers in a field (column) of records in a list or database that match conditions that you specify.",
        "common_errors": ["#VALUE! (Field name does not match exactly or criteria range is incorrectly mapped)"],
        "best_practice": "An incredibly fast alternative to SUMIFS when dealing with massive datasets where you have complex, multi-layered criteria criteria built into a visual dashboard table.",
        "parameters": [
            { "name": "database", "desc": "The range of cells that makes up the list or database." },
            { "name": "field", "desc": "Indicates which column is used in the function." },
            { "name": "criteria", "desc": "The range of cells that contains the conditions you specify." }
        ]
    },
    {
        "name": "DGET",
        "category": "Database",
        "syntax": "=DGET(database, field, criteria)",
        "summary": "Extracts a single record that matches the specified criteria from a database.",
        "common_errors": ["#NUM! (Multiple records match the criteria)", "#VALUE! (No records match the criteria)"],
        "best_practice": "The purest way to extract a unique identifier or single result. If it returns #NUM!, you instantly know your dataset has duplicate entry issues.",
        "parameters": [
            { "name": "database", "desc": "The range of cells." },
            { "name": "field", "desc": "The column to extract." },
            { "name": "criteria", "desc": "The conditions." }
        ]
    },
    {
        "name": "DCOUNT",
        "category": "Database",
        "syntax": "=DCOUNT(database, field, criteria)",
        "summary": "Counts the cells that contain numbers in a column of a list or database that match conditions that you specify.",
        "common_errors": ["Doesn't count empty cells or cells containing text (use DCOUNTA instead)"],
        "best_practice": "Use to quickly audit database exports to see how many valid numerical inputs were logged by a specific sales region.",
        "parameters": [
            { "name": "database", "desc": "The range of cells." },
            { "name": "field", "desc": "The column to count." },
            { "name": "criteria", "desc": "The conditions." }
        ]
    },
    {
        "name": "DCOUNTA",
        "category": "Database",
        "syntax": "=DCOUNTA(database, field, criteria)",
        "summary": "Counts nonblank cells in a field (column) of records in a database that match conditions that you specify.",
        "common_errors": ["Counts spaces or formulas returning empty strings as nonblank, leading to over-counting."],
        "best_practice": "Perfect for calculating attendance or participation metrics where any text input ('Present', 'Yes', 'Late') counts as a valid entry.",
        "parameters": [
            { "name": "database", "desc": "The range of cells." },
            { "name": "field", "desc": "The column to count non-blanks." },
            { "name": "criteria", "desc": "The conditions." }
        ]
    },
    {
        "name": "DMAX",
        "category": "Database",
        "syntax": "=DMAX(database, field, criteria)",
        "summary": "Returns the largest number in a field (column) of records in a database that match conditions you specify.",
        "common_errors": ["#VALUE! (Column name in criteria does not exactly match database header)"],
        "best_practice": "Quickly pinpoint peak performance metrics—like finding the highest single-day sales volume for a specific product category.",
        "parameters": [
            { "name": "database", "desc": "The range of cells." },
            { "name": "field", "desc": "The column to analyze." },
            { "name": "criteria", "desc": "The conditions." }
        ]
    },
    {
        "name": "DMIN",
        "category": "Database",
        "syntax": "=DMIN(database, field, criteria)",
        "summary": "Returns the smallest number in a field (column) of records in a database that match conditions you specify.",
        "common_errors": ["Returns 0 if empty cells are inadvertently included and parsed as zero."],
        "best_practice": "Identify low-water marks, such as the lowest recorded inventory level for a specific warehouse over the past year.",
        "parameters": [
            { "name": "database", "desc": "The range of cells." },
            { "name": "field", "desc": "The column to analyze." },
            { "name": "criteria", "desc": "The conditions." }
        ]
    },
    {
        "name": "DAVERAGE",
        "category": "Database",
        "syntax": "=DAVERAGE(database, field, criteria)",
        "summary": "Averages the values in a field (column) of records in a database that match conditions you specify.",
        "common_errors": ["#DIV/0! (No records match the criteria, leading to a division by zero)"],
        "best_practice": "An elegant way to build a 'What-If' dashboard where users can change criteria cells to instantly see average project costs by department.",
        "parameters": [
            { "name": "database", "desc": "The range of cells." },
            { "name": "field", "desc": "The column to analyze." },
            { "name": "criteria", "desc": "The conditions." }
        ]
    },
    {
        "name": "MULTINOMIAL",
        "category": "Math & Trig",
        "syntax": "=MULTINOMIAL(number1, [number2], ...)",
        "summary": "Returns the ratio of the factorial of a sum of values to the product of factorials.",
        "common_errors": ["#NUM! (Any number is less than zero or too large)"],
        "best_practice": "Highly technical function used in probability theory to calculate exact occurrences of mixed events.",
        "parameters": [
            { "name": "number1", "desc": "1 to 255 values for which you want the multinomial." }
        ]
    },
    {
        "name": "SERIESSUM",
        "category": "Math & Trig",
        "syntax": "=SERIESSUM(x, n, m, coefficients)",
        "summary": "Returns the sum of a power series based on the formula.",
        "common_errors": ["#VALUE! (Any argument is non-numeric)"],
        "best_practice": "A staple for engineers dealing with polynomial expansions like Taylor or Maclaurin series in Excel.",
        "parameters": [
            { "name": "x", "desc": "The input value to the power series." },
            { "name": "n", "desc": "The initial power to which you want to raise x." },
            { "name": "m", "desc": "The step by which to increase n for each term in the series." },
            { "name": "coefficients", "desc": "A set of coefficients by which each successive power of x is multiplied." }
        ]
    },
    {
        "name": "ARABIC",
        "category": "Math & Trig",
        "syntax": "=ARABIC(text)",
        "summary": "Converts a Roman numeral to an Arabic numeral.",
        "common_errors": ["#VALUE! (The string isn't a valid Roman numeral)"],
        "best_practice": "Useful when importing legacy book outlines, legal documents, or movie copyrights that use Roman numerals.",
        "parameters": [
            { "name": "text", "desc": "A string enclosed in quotation marks, an empty string, or a reference to a cell containing text." }
        ]
    },
    {
        "name": "PHI",
        "category": "Statistical",
        "syntax": "=PHI(x)",
        "summary": "Returns the value of the density function for a standard normal distribution.",
        "common_errors": ["#VALUE! (x is non-numeric)"],
        "best_practice": "Used in advanced pure statistics to calculate the height of the bell curve at any given point.",
        "parameters": [
            { "name": "x", "desc": "The number for which you want the density of the standard normal distribution." }
        ]
    },
    {
        "name": "NORM.DIST",
        "category": "Statistical",
        "syntax": "=NORM.DIST(x, mean, standard_dev, cumulative)",
        "summary": "Returns the normal distribution for the specified mean and standard deviation.",
        "common_errors": ["#NUM! (Standard_dev is <= 0)"],
        "best_practice": "Calculate the probability that a randomly picked manufacturing part will fall within specific size tolerances.",
        "parameters": [
            { "name": "x", "desc": "The value for which you want the distribution." },
            { "name": "mean", "desc": "The arithmetic mean of the distribution." },
            { "name": "standard_dev", "desc": "The standard deviation of the distribution." },
            { "name": "cumulative", "desc": "A logical value that determines the form of the function (TRUE for cumulative, FALSE for mass)." }
        ]
    },
    {
        "name": "NORM.INV",
        "category": "Statistical",
        "syntax": "=NORM.INV(probability, mean, standard_dev)",
        "summary": "Returns the inverse of the normal cumulative distribution.",
        "common_errors": ["#NUM! (Probability <= 0 or >= 1)"],
        "best_practice": "Given that you know 90% of your sales fall below a certain threshold, NORM.INV exactly identifies what that revenue threshold is.",
        "parameters": [
            { "name": "probability", "desc": "A probability corresponding to the normal distribution." },
            { "name": "mean", "desc": "The arithmetic mean." },
            { "name": "standard_dev", "desc": "The standard deviation." }
        ]
    },
    {
        "name": "POISSON.DIST",
        "category": "Statistical",
        "syntax": "=POISSON.DIST(x, mean, cumulative)",
        "summary": "Returns the Poisson distribution, commonly used to predict the number of events occurring over a specific time.",
        "common_errors": ["#NUM! (x < 0 or mean <= 0)"],
        "best_practice": "Use to model call center traffic—e.g., predicting the probability of receiving exactly 5 customer support calls in the next hour.",
        "parameters": [
            { "name": "x", "desc": "The number of events." },
            { "name": "mean", "desc": "The expected numeric value." },
            { "name": "cumulative", "desc": "A logical value that determines the form of the probability distribution returned." }
        ]
    },
    {
        "name": "BINOM.DIST",
        "category": "Statistical",
        "syntax": "=BINOM.DIST(number_s, trials, probability_s, cumulative)",
        "summary": "Returns the individual term binomial distribution probability.",
        "common_errors": ["#NUM! (number_s < 0 or > trials, or probability_s < 0 or > 1)"],
        "best_practice": "Determine the likelihood of flipping precisely 3 Heads out of 10 coin tosses, or achieving a specific manufacturing defect rate.",
        "parameters": [
            { "name": "number_s", "desc": "The number of successes in trials." },
            { "name": "trials", "desc": "The number of independent trials." },
            { "name": "probability_s", "desc": "The probability of success on each trial." },
            { "name": "cumulative", "desc": "A logical value that determines the form of the function." }
        ]
    },
    {
        "name": "WEIBULL.DIST",
        "category": "Statistical",
        "syntax": "=WEIBULL.DIST(x, alpha, beta, cumulative)",
        "summary": "Returns the Weibull distribution. Used in reliability analysis to calculate hardware failing over time.",
        "common_errors": ["#NUM! (x < 0, alpha <= 0, or beta <= 0)"],
        "best_practice": "Essential for 'Mean Time Between Failures' (MTBF) tracking to calculate when a machine part will statistically wear out.",
        "parameters": [
            { "name": "x", "desc": "The value at which to evaluate the function." },
            { "name": "alpha", "desc": "A parameter to the distribution." },
            { "name": "beta", "desc": "A parameter to the distribution." },
            { "name": "cumulative", "desc": "Determines the form of the function." }
        ]
    },
    {
        "name": "ERF",
        "category": "Engineering",
        "syntax": "=ERF(lower_limit, [upper_limit])",
        "summary": "Returns the error function integrated between lower_limit and upper_limit.",
        "common_errors": ["#VALUE! (Arguments are non-numeric)"],
        "best_practice": "Deeply embedded in materials science and physics to calculate heat dissipation and diffusion in solids.",
        "parameters": [
            { "name": "lower_limit", "desc": "The lower bound for integrating ERF." },
            { "name": "upper_limit", "desc": "[Optional] The upper bound for integrating ERF. If omitted, integrates between zero and lower_limit." }
        ]
    },
    {
        "name": "ERFC",
        "category": "Engineering",
        "syntax": "=ERFC(x)",
        "summary": "Returns the complementary error function integrated between x and infinity.",
        "common_errors": ["#VALUE! (x is non-numeric)"],
        "best_practice": "Used in digital communication systems to map the Bit Error Rate (BER) of signal transmissions.",
        "parameters": [
            { "name": "x", "desc": "The lower bound for integrating ERFC." }
        ]
    },
    {
        "name": "BESSELI",
        "category": "Engineering",
        "syntax": "=BESSELI(x, n)",
        "summary": "Returns the modified Bessel function In(x), which is equivalent to the Bessel function evaluated for purely imaginary arguments.",
        "common_errors": ["#NUM! (n is < 0)"],
        "best_practice": "Used by acoustic engineers to model the vibrational modes of a circular drumhead.",
        "parameters": [
            { "name": "x", "desc": "The value at which to evaluate the function." },
            { "name": "n", "desc": "The order of the Bessel function. If n is not an integer, it is truncated." }
        ]
    },
    {
        "name": "BESSELJ",
        "category": "Engineering",
        "syntax": "=BESSELJ(x, n)",
        "summary": "Returns the Bessel function Jn(x).",
        "common_errors": ["#NUM! (n is < 0)"],
        "best_practice": "A staple for calculating electromagnetic wave propagation in cylindrical waveguides.",
        "parameters": [
            { "name": "x", "desc": "The value at which to evaluate the function." },
            { "name": "n", "desc": "The order of the Bessel function." }
        ]
    },
    {
        "name": "ACCRINT",
        "category": "Financial",
        "syntax": "=ACCRINT(issue, first_interest, settlement, rate, par, frequency, [basis], [calc_method])",
        "summary": "Returns the accrued interest for a security that pays periodic interest.",
        "common_errors": ["#NUM! (Issue >= Settlement)"],
        "best_practice": "Calculate the exact amount a buyer of a bond must pay the seller to compensate for interest generated between coupon dates.",
        "parameters": [
            { "name": "issue", "desc": "The security's issue date." },
            { "name": "first_interest", "desc": "The security's first interest date." },
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "rate", "desc": "The security's annual coupon rate." },
            { "name": "par", "desc": "The security's par value." },
            { "name": "frequency", "desc": "The number of coupon payments per year." }
        ]
    },
    {
        "name": "ACCRINTM",
        "category": "Financial",
        "syntax": "=ACCRINTM(issue, settlement, rate, par, [basis])",
        "summary": "Returns the accrued interest for a security that pays interest at maturity.",
        "common_errors": ["#VALUE! (Dates are not valid integers)"],
        "best_practice": "Use for short-term discount notes where interest isn't paid out over time, but delivered in a lump sum at the very end.",
        "parameters": [
            { "name": "issue", "desc": "The security's issue date." },
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "rate", "desc": "The security's annual coupon rate." },
            { "name": "par", "desc": "The security's par value." }
        ]
    },
    {
        "name": "AMORDEGRC",
        "category": "Financial",
        "syntax": "=AMORDEGRC(cost, date_purchased, first_period, salvage, period, rate, [basis])",
        "summary": "Returns the depreciation for each accounting period. Used to calculate depreciations in French accounting systems using a depreciation coefficient.",
        "common_errors": ["#NUM! (Cost or salvage < 0)"],
        "best_practice": "Exclusively utilized for strict adherence to localized European accounting and tax law protocols.",
        "parameters": [
            { "name": "cost", "desc": "The cost of the asset." },
            { "name": "date_purchased", "desc": "The date of the purchase of the asset." },
            { "name": "first_period", "desc": "The date of the end of the first period." },
            { "name": "salvage", "desc": "The salvage value at the end of the life of the asset." },
            { "name": "period", "desc": "The period." },
            { "name": "rate", "desc": "The rate of depreciation." }
        ]
    },
    {
        "name": "AMORLINC",
        "category": "Financial",
        "syntax": "=AMORLINC(cost, date_purchased, first_period, salvage, period, rate, [basis])",
        "summary": "Returns the depreciation for each accounting period using linear depreciation. Primarily for French accounting systems.",
        "common_errors": ["#VALUE! (Any date arguments are invalid)"],
        "best_practice": "Prorates the exact depreciation amount during the first partial accounting period of an asset's life.",
        "parameters": [
            { "name": "cost", "desc": "The cost of the asset." },
            { "name": "date_purchased", "desc": "The date of the purchase of the asset." },
            { "name": "first_period", "desc": "The date of the end of the first period." },
            { "name": "salvage", "desc": "The salvage value at the end of the life of the asset." },
            { "name": "period", "desc": "The period." },
            { "name": "rate", "desc": "The rate of depreciation." }
        ]
    },
    {
        "name": "INDEX + MATCH + MAX",
        "category": "Lookup",
        "syntax": "=INDEX(return_range, MATCH(MAX(lookup_range), lookup_range, 0))",
        "summary": "Finds the maximum value in a column, and then returns a corresponding value from the same row (e.g., finding the 'Top Salesperson').",
        "common_errors": ["#N/A (If MAX returns a number formatted differently than the source range)"],
        "best_practice": "The ultimate combination formula for automatically pulling out the \"Winner\" or \"Most Recent Date\" from a dynamic dataset without manually sorting it first.",
        "parameters": [
            { "name": "MAX", "desc": "Identifies the highest mathematical value in the target array." },
            { "name": "MATCH", "desc": "Finds what row that maximum value lives in." },
            { "name": "INDEX", "desc": "Draws the name/title from that specific row." }
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
console.log(`Successfully added ${addedCount} new data manipulation functions. Total is now ${db.length}.`);
