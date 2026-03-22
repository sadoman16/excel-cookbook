const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingNames = new Set(db.map(f => f.name.toUpperCase()));

const moreScenarios = [
    {
        "name": "DOLLAR",
        "category": "Text",
        "syntax": "=DOLLAR(number, [decimals])",
        "summary": "Converts a number to text using currency format, with the decimals rounded to the specified place.",
        "common_errors": ["The result is text, so it cannot be used in further mathematical operations directly without converting back."],
        "best_practice": "Use when you need to embed a nicely formatted currency value directly into a text string, e.g., =\"The total cost is \" & DOLLAR(A1).",
        "parameters": [
            { "name": "number", "desc": "A number, a reference to a cell containing a number, or a formula that evaluates to a number." },
            { "name": "decimals", "desc": "[Optional] The number of digits to the right of the decimal point." }
        ]
    },
    {
        "name": "FIXED",
        "category": "Text",
        "syntax": "=FIXED(number, [decimals], [no_commas])",
        "summary": "Rounds a number to the specified number of decimals, formats the number in decimal format using a period and commas, and returns the result as text.",
        "common_errors": ["Like DOLLAR, returns a text string, which can cause #VALUE! errors if used in math later."],
        "best_practice": "Ideal for locking in a specific number format before exporting to a flat text file or CSV where visual formatting isn't preserved.",
        "parameters": [
            { "name": "number", "desc": "The number you want to round and convert to text." },
            { "name": "decimals", "desc": "[Optional] The number of digits to the right of the decimal point." },
            { "name": "no_commas", "desc": "[Optional] A logical value that, if TRUE, prevents FIXED from including commas in the returned text." }
        ]
    },
    {
        "name": "NUMBERVALUE",
        "category": "Text",
        "syntax": "=NUMBERVALUE(text, [decimal_separator], [group_separator])",
        "summary": "Converts text to numbers in a locale-independent manner.",
        "common_errors": ["#VALUE! (If the text cannot be converted into a valid number)"],
        "best_practice": "The absolute best way to clean up imported financial data from foreign countries that use commas as decimal points (e.g., converting '1.000,50' to 1000.5).",
        "parameters": [
            { "name": "text", "desc": "The text to convert to a number." },
            { "name": "decimal_separator", "desc": "[Optional] The character used to separate the integer and fractional part of the result." },
            { "name": "group_separator", "desc": "[Optional] The character used to separate groupings of numbers, such as thousands." }
        ]
    },
    {
        "name": "UNICHAR",
        "category": "Text",
        "syntax": "=UNICHAR(number)",
        "summary": "Returns the Unicode character that is referenced by the given numeric value.",
        "common_errors": ["#VALUE! (If the number is out of bounds or zero)"],
        "best_practice": "Use to embed specialized symbols or emojis into dynamic dashboards: =UNICHAR(11088) returns a ⭐.",
        "parameters": [
            { "name": "number", "desc": "The Unicode number that represents the character." }
        ]
    },
    {
        "name": "UNICODE",
        "category": "Text",
        "syntax": "=UNICODE(text)",
        "summary": "Returns the number (code point) corresponding to the first character of the text.",
        "common_errors": ["#VALUE! (If text is empty or contains partial surrogates)"],
        "best_practice": "Reverse engineer unknown symbols encountered in raw data dumps to find out exactly what Unicode character they are.",
        "parameters": [
            { "name": "text", "desc": "The character for which you want the Unicode value." }
        ]
    },
    {
        "name": "LINEST",
        "category": "Statistical",
        "syntax": "=LINEST(known_y's, [known_x's], [const], [stats])",
        "summary": "Calculates the statistics for a line by using the \"least squares\" method to calculate a straight line that best fits your data.",
        "common_errors": ["#VALUE! (Arrays must contain only numerical data)"],
        "best_practice": "Use as a master array formula to extract the slope, y-intercept, and r-squared values all at once without using separate functions.",
        "parameters": [
            { "name": "known_y's", "desc": "The set of y-values you already know." },
            { "name": "known_x's", "desc": "[Optional] The set of x-values." },
            { "name": "const", "desc": "[Optional] A logical value specifying whether to force the constant b to equal 0." },
            { "name": "stats", "desc": "[Optional] A logical value specifying whether to return additional regression statistics." }
        ]
    },
    {
        "name": "LOGEST",
        "category": "Statistical",
        "syntax": "=LOGEST(known_y's, [known_x's], [const], [stats])",
        "summary": "Calculates an exponential curve that fits your data and returns an array of values that describes the curve.",
        "common_errors": ["#NUM! (If any of the known_y's are less than or equal to 0)"],
        "best_practice": "Ideal for modeling rapidly growing metrics like compound interest growth, viral user adoption, or biological population growth.",
        "parameters": [
            { "name": "known_y's", "desc": "The set of y-values you already know in the relationship y = b*m^x." },
            { "name": "known_x's", "desc": "[Optional] The set of x-values you already know." }
        ]
    },
    {
        "name": "GROWTH",
        "category": "Statistical",
        "syntax": "=GROWTH(known_y's, [known_x's], [new_x's], [const])",
        "summary": "Calculates predicted exponential growth by using existing data.",
        "common_errors": ["#NUM! (If known_y's are 0 or negative)"],
        "best_practice": "A quicker, more direct alternative to LOGEST when you only need to predict the next few exponential growth values, rather than needing the underlying curve statistics.",
        "parameters": [
            { "name": "known_y's", "desc": "The set of y-values you already know in the relationship y = b*m^x." },
            { "name": "new_x's", "desc": "[Optional] New x-values for which you want GROWTH to return corresponding y-values." }
        ]
    },
    {
        "name": "STANDARDIZE",
        "category": "Statistical",
        "syntax": "=STANDARDIZE(x, mean, standard_dev)",
        "summary": "Returns a normalized value from a distribution characterized by mean and standard_dev (also known as a Z-score).",
        "common_errors": ["#NUM! (If standard_dev is <= 0)"],
        "best_practice": "Use to compare two completely different metrics on the same scale (e.g., comparing a student's SAT score vs. their GPA relative to their peers).",
        "parameters": [
            { "name": "x", "desc": "The value you want to normalize." },
            { "name": "mean", "desc": "The arithmetic mean of the distribution." },
            { "name": "standard_dev", "desc": "The standard deviation of the distribution." }
        ]
    },
    {
        "name": "PROB",
        "category": "Statistical",
        "syntax": "=PROB(x_range, prob_range, lower_limit, [upper_limit])",
        "summary": "Returns the probability that values in a range are between two limits.",
        "common_errors": ["#NUM! (If any value in prob_range is <= 0 or > 1, or if the sum of prob_range does not equal 1)"],
        "best_practice": "Use in risk management to calculate the probability of a financial loss falling between $10,000 and $50,000 based on historical probabilities.",
        "parameters": [
            { "name": "x_range", "desc": "The range of numeric values of x with which there are associated probabilities." },
            { "name": "prob_range", "desc": "A set of probabilities associated with values in x_range." },
            { "name": "lower_limit", "desc": "The lower bound of the value for which you want a probability." }
        ]
    },
    {
        "name": "COVARIANCE.P",
        "category": "Statistical",
        "syntax": "=COVARIANCE.P(array1, array2)",
        "summary": "Returns population covariance, the average of the products of deviations for each data point pair.",
        "common_errors": ["#N/A (If array1 and array2 have a different number of data points)"],
        "best_practice": "Use to determine whether two stocks move together (positive covariance) or oppositely (negative covariance) for portfolio diversification.",
        "parameters": [
            { "name": "array1", "desc": "The first cell range of integers." },
            { "name": "array2", "desc": "The second cell range of integers." }
        ]
    },
    {
        "name": "COVARIANCE.S",
        "category": "Statistical",
        "syntax": "=COVARIANCE.S(array1, array2)",
        "summary": "Returns the sample covariance, the average of the products of deviations for each data point pair in two data sets.",
        "common_errors": ["#DIV/0! (If either array is empty or contains only 1 data point)"],
        "best_practice": "Use instead of COVARIANCE.P when you only have a sampling of a larger population's data.",
        "parameters": [
            { "name": "array1", "desc": "The first sampling of data." },
            { "name": "array2", "desc": "The second sampling of data." }
        ]
    },
    {
        "name": "CONFIDENCE.NORM",
        "category": "Statistical",
        "syntax": "=CONFIDENCE.NORM(alpha, standard_dev, size)",
        "summary": "Returns the confidence interval for a population mean, using a normal distribution.",
        "common_errors": ["#NUM! (If alpha <= 0 or >= 1, standard_dev <= 0, or size < 1)"],
        "best_practice": "Vital for market research—e.g., \"We are 95% confident the average customer will spend $50, plus or minus $2.50.\"",
        "parameters": [
            { "name": "alpha", "desc": "The significance level used to compute the confidence level (e.g., 0.05 for 95% confidence)." },
            { "name": "standard_dev", "desc": "The population standard deviation for the data range." },
            { "name": "size", "desc": "The sample size." }
        ]
    },
    {
        "name": "CONFIDENCE.T",
        "category": "Statistical",
        "syntax": "=CONFIDENCE.T(alpha, standard_dev, size)",
        "summary": "Returns the confidence interval for a population mean, using a Student's t distribution.",
        "common_errors": ["#NUM! (If size is exactly 1)"],
        "best_practice": "Use when your sample size is small (typically less than 30) to provide a more accurate, wider confidence interval.",
        "parameters": [
            { "name": "alpha", "desc": "The significance level." },
            { "name": "standard_dev", "desc": "The sample standard deviation." },
            { "name": "size", "desc": "The sample size." }
        ]
    },
    {
        "name": "CHISQ.TEST",
        "category": "Statistical",
        "syntax": "=CHISQ.TEST(actual_range, expected_range)",
        "summary": "Returns the test for independence. Returns the value from the chi-squared distribution for the statistic and the appropriate degrees of freedom.",
        "common_errors": ["#N/A (If actual_range and expected_range have a different number of data points)"],
        "best_practice": "Determine if there is a statistically significant difference between expected frequencies and the observed frequencies in one or more categories.",
        "parameters": [
            { "name": "actual_range", "desc": "The range of data that contains observations to test against expected values." },
            { "name": "expected_range", "desc": "The range of data that contains the ratio of the product of row totals and column totals to the grand total." }
        ]
    },
    {
        "name": "PERCENTRANK.EXC",
        "category": "Statistical",
        "syntax": "=PERCENTRANK.EXC(array, x, [significance])",
        "summary": "Returns the rank of a value in a data set as a percentage (0..1, exclusive) of the data set.",
        "common_errors": ["#NUM! (If x does not match any value in the array and cannot be interpolated)"],
        "best_practice": "Calculate a student's standardized testing percentile relative to their peers, excluding the absolute top and bottom scores.",
        "parameters": [
            { "name": "array", "desc": "The array or range of data with numeric values that defines relative standing." },
            { "name": "x", "desc": "The value for which you want to know the rank." }
        ]
    },
    {
        "name": "PERCENTRANK.INC",
        "category": "Statistical",
        "syntax": "=PERCENTRANK.INC(array, x, [significance])",
        "summary": "Returns the rank of a value in a data set as a percentage (0..1, inclusive) of the data set.",
        "common_errors": ["#N/A (If array is empty)"],
        "best_practice": "The standard method for evaluating thresholds, like finding if a sales rep falls into the top 10% bracket for the quarter.",
        "parameters": [
            { "name": "array", "desc": "The array or range of data." },
            { "name": "x", "desc": "The value to rank." }
        ]
    },
    {
        "name": "RANK.AVG",
        "category": "Statistical",
        "syntax": "=RANK.AVG(number, ref, [order])",
        "summary": "Returns the rank of a number in a list of numbers. If more than one value has the same rank, the average rank is returned.",
        "common_errors": ["#N/A (If the number is not in the ref array)"],
        "best_practice": "More mathematically precise for leaderboards where ties exist (e.g., giving two tied 2nd place finishers a rank of 2.5).",
        "parameters": [
            { "name": "number", "desc": "The number whose rank you want to find." },
            { "name": "ref", "desc": "An array of, or a reference to, a list of numbers." }
        ]
    },
    {
        "name": "TRIMMEAN",
        "category": "Statistical",
        "syntax": "=TRIMMEAN(array, percent)",
        "summary": "Returns the mean of the interior of a data set. Calculates the mean taken by excluding a percentage of data points from the top and bottom tails of a data set.",
        "common_errors": ["#NUM! (If percent < 0 or > 1)"],
        "best_practice": "Incredibly useful for analyzing real estate housing prices or employee salaries by stripping out the extreme millionaire outliers to find a \"true\" realistic average.",
        "parameters": [
            { "name": "array", "desc": "The array or range of values to trim and average." },
            { "name": "percent", "desc": "The fractional number of data points to exclude from the calculation." }
        ]
    },
    {
        "name": "CUBEMEMBER",
        "category": "Cube",
        "syntax": "=CUBEMEMBER(connection, member_expression, [caption])",
        "summary": "Returns a member or tuple from the cube to validate that the member or tuple exists in the cube.",
        "common_errors": ["#NAME? (If connection string is inaccurate or data model is missing)"],
        "best_practice": "Essential for building out dynamic headers in custom Power Pivot dashboards converted to formulas.",
        "parameters": [
            { "name": "connection", "desc": "A text string of the name of the connection to the cube." },
            { "name": "member_expression", "desc": "A multidimensional expression (MDX) evaluating to a member." }
        ]
    },
    {
        "name": "CUBESET",
        "category": "Cube",
        "syntax": "=CUBESET(connection, set_expression, [caption], [sort_order], [sort_by])",
        "summary": "Defines a calculated set of members or tuples by sending a set expression to the cube on the server, which creates the set, and then returns that set to Excel.",
        "common_errors": ["#N/A (If set_expression generates an empty set)"],
        "best_practice": "Use to group items visually in a dashboard (e.g., 'Top 10 Selling Products') and sort them directly through the data model connection.",
        "parameters": [
            { "name": "connection", "desc": "The connection to the cube." },
            { "name": "set_expression", "desc": "A text string of a set expression that results in a set of members." }
        ]
    },
    {
        "name": "CUBERANKEDMEMBER",
        "category": "Cube",
        "syntax": "=CUBERANKEDMEMBER(connection, set_expression, rank, [caption])",
        "summary": "Returns the nth, or ranked, member in a set. Use to return one or more elements in a set, such as the top salesman or top 10 students.",
        "common_errors": ["#VALUE! (If rank is less than 1 or greater than the number of members in the set)"],
        "best_practice": "Pair with CUBESET to create a dynamic 'Leaderboard' table that updates automatically upon refresh.",
        "parameters": [
            { "name": "connection", "desc": "The connection." },
            { "name": "set_expression", "desc": "A text string of a set expression." },
            { "name": "rank", "desc": "An integer value specifying the top value to return." }
        ]
    },
    {
        "name": "PDURATION",
        "category": "Financial",
        "syntax": "=PDURATION(rate, pv, fv)",
        "summary": "Returns the number of periods required by an investment to reach a specified value.",
        "common_errors": ["#NUM! (If any parameter is <= 0)"],
        "best_practice": "Instantly answer the question: 'If I have $10k now and earn 5% a year, how many years until I have $20k?'",
        "parameters": [
            { "name": "rate", "desc": "The interest rate per period." },
            { "name": "pv", "desc": "The present value of the investment." },
            { "name": "fv", "desc": "The desired future value of the investment." }
        ]
    },
    {
        "name": "RRI",
        "category": "Financial",
        "syntax": "=RRI(nper, pv, fv)",
        "summary": "Returns an equivalent interest rate for the growth of an investment.",
        "common_errors": ["#NUM! (If nper or pv is <= 0)"],
        "best_practice": "Determine the true annualized rate of return if you bought a house for $200k 5 years ago and sold it for $300k today.",
        "parameters": [
            { "name": "nper", "desc": "The number of periods for the investment." },
            { "name": "pv", "desc": "The present value of the investment." },
            { "name": "fv", "desc": "The future value of the investment." }
        ]
    },
    {
        "name": "DOLLARDE",
        "category": "Financial",
        "syntax": "=DOLLARDE(fractional_dollar, fraction)",
        "summary": "Converts a dollar price expressed as a fraction into a dollar price expressed as a decimal number.",
        "common_errors": ["#DIV/0! (If fraction is 0)"],
        "best_practice": "Critical for reading historical US Treasury bond quotes, which are traditionally quoted in fractions of 32.",
        "parameters": [
            { "name": "fractional_dollar", "desc": "A number expressed as an integer part and a fraction part, separated by a decimal symbol." },
            { "name": "fraction", "desc": "The integer to use in the denominator of the fraction." }
        ]
    },
    {
        "name": "DOLLARFR",
        "category": "Financial",
        "syntax": "=DOLLARFR(decimal_dollar, fraction)",
        "summary": "Converts a dollar price expressed as a decimal number into a dollar price expressed as a fraction.",
        "common_errors": ["#NUM! (If fraction is < 0)"],
        "best_practice": "Used to format decimal pricing back into standard tick-based increments (like 1/32 or 1/8) for fixed-income traders.",
        "parameters": [
            { "name": "decimal_dollar", "desc": "A decimal number." },
            { "name": "fraction", "desc": "The integer to use in the denominator of the fraction." }
        ]
    },
    {
        "name": "FIND vs SEARCH",
        "category": "Text",
        "syntax": "=FIND(find_text, within_text) vs =SEARCH(find_text, within_text)",
        "summary": "A recipe explaining the critical differences between the two text location functions: Case-sensitivity and wildcard usage.",
        "common_errors": ["Getting #VALUE! with FIND because of case-sensitivity when users meant to use SEARCH.", "Using wildcards in FIND implicitly expecting them to work."],
        "best_practice": "Default to SEARCH for 90% of business text cleaning since it ignores case and supports wildcards (* and ?). Reserve FIND strictly for case-sensitive password/ID code validations.",
        "parameters": [
            { "name": "FIND", "desc": "Case-sensitive, no wildcards." },
            { "name": "SEARCH", "desc": "Case-insensitive, allows wildcards." }
        ]
    },
    {
        "name": "EXACT vs EQUALS",
        "category": "Logical",
        "syntax": "=EXACT(text1, text2) vs =(text1=text2)",
        "summary": "Explains when to use the EXACT function versus the standard equals sign for text comparison.",
        "common_errors": ["Using =A1=B1 to verify passwords and accidentally accepting a match with lowercase letters."],
        "best_practice": "Always use EXACT when auditing SKUs, license keys, or passwords where 'Excel123' must not be considered a match for 'excel123'.",
        "parameters": [
            { "name": "EXACT", "desc": "Compares two text strings, factoring in exact uppercase/lowercase matching." },
            { "name": "EQUALS (=)", "desc": "A standard logical test that completely ignores casing." }
        ]
    },
    {
        "name": "XLOOKUP with Multiple Criteria",
        "category": "Lookup",
        "syntax": "=XLOOKUP(1, (criteria1_range=criteria1) * (criteria2_range=criteria2), return_range)",
        "summary": "The modern method to simulate an 'XLOOKUPIFS' by using Boolean logic arrays to match multiple conditions at once.",
        "common_errors": ["#VALUE! (If the criteria ranges are not exactly the same size as the return range)"],
        "best_practice": "Replaces the clunky INDEX/MATCH array formulas of the past. It's incredibly fast and readable once you understand the boolean logic (TRUE=1, FALSE=0).",
        "parameters": [
            { "name": "Boolean Math", "desc": "Creates a virtual array of 1s and 0s where conditions are met." },
            { "name": "XLOOKUP", "desc": "Searches for the first '1' in that virtual array." }
        ]
    },
    {
        "name": "FILTER with OR Logic",
        "category": "Lookup",
        "syntax": "=FILTER(array, (criteria1) + (criteria2))",
        "summary": "Using the plus sign (+) inside the FILTER function to achieve an 'OR' condition, returning rows that meet ANY of the listed criteria.",
        "common_errors": ["Using the standard OR() function inside FILTER, which causes it to evaluate the whole array as a single TRUE/FALSE rather than row-by-row."],
        "best_practice": "Use the plus (+) operator for OR conditions and the asterisk (*) operator for AND conditions to master dynamic array filtering.",
        "parameters": [
            { "name": "array", "desc": "The original dataset to filter." },
            { "name": "+ (Plus Sign)", "desc": "In boolean math, the + acts as an OR operator." }
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
console.log(`Successfully added ${addedCount} new batch of 30 functions. Total is now ${db.length}.`);
