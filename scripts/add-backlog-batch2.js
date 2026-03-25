const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const currentDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingNames = new Set(currentDb.map(f => f.name.toLowerCase()));

// Let's really pump up the backlog with a lot of missing or advanced formulas
const newFunctions = [
    { "name": "LAMBDA", "category": "Dynamic Array", "syntax": "=LAMBDA([parameter1, parameter2, ...], calculation)", "summary": "Creates custom, reusable functions without using VBA.", "common_errors": ["#CALC! (Syntax error in the custom logic)"], "best_practice": "Use the Name Manager to define and name your LAMBDA so it can be called seamlessly anywhere in the workbook." },
    { "name": "MAP", "category": "Dynamic Array", "syntax": "=MAP(array1, [array2, ...], lambda)", "summary": "Applies a custom LAMBDA function to each value in the array(s) and returns an array of the results.", "common_errors": ["#VALUE! (Lambda parameters do not match supplied arrays)"], "best_practice": "Incredibly powerful for cleaning an entire column of text simultaneously without expanding formulas down." },
    { "name": "REDUCE", "category": "Dynamic Array", "syntax": "=REDUCE([initial_value], array, lambda)", "summary": "Reduces an array to an accumulated value by applying a LAMBDA function to each value.", "common_errors": ["#CALC!"], "best_practice": "Used by advanced modelers to process complex loops or simulate iterative calculations directly in the grid." },
    { "name": "SCAN", "category": "Dynamic Array", "syntax": "=SCAN([initial_value], array, lambda)", "summary": "Scans an array by applying a LAMBDA function to each value and returns an array of intermediate values.", "common_errors": ["#CALC!"], "best_practice": "Perfect for creating a running total (cumulative sum) dynamically down a variable-length column." },
    { "name": "BYROW", "category": "Dynamic Array", "syntax": "=BYROW(array, lambda)", "summary": "Applies a LAMBDA to each row in an array and returns an array of the results.", "common_errors": ["#CALC!"], "best_practice": "Use to quickly generate a column of Max/Min/Averages for every row in a massive dataset simultaneously." },
    { "name": "BYCOL", "category": "Dynamic Array", "syntax": "=BYCOL(array, lambda)", "summary": "Applies a LAMBDA to each column in an array and returns an array of the results.", "common_errors": ["#CALC!"], "best_practice": "Quickly generates summary row statistics beneath dynamic arrays." },
    { "name": "STOCKHISTORY", "category": "Financial", "syntax": "=STOCKHISTORY(stock, start_date, [end_date], [interval], [headers], [property0...])", "summary": "Retrieves historical data about a financial instrument.", "common_errors": ["#BUSY! (Waiting on external server)", "#VALUE! (Invalid ticker)"], "best_practice": "Excellent for building automated personal finance portfolio trackers that update historical prices instantly." },
    { "name": "VALUETOTEXT", "category": "Text", "syntax": "=VALUETOTEXT(value, [format])", "summary": "Returns text from any specified value, cleanly handling error values.", "common_errors": ["Formatting mismatch on dates"], "best_practice": "Useful when needing to strictly cast mixed numeric/error data into pure string data for CSV exports." },
    { "name": "ARRAYTOTEXT", "category": "Text", "syntax": "=ARRAYTOTEXT(array, [format])", "summary": "Returns an array of text values from any specified range.", "common_errors": ["#VALUE!"], "best_practice": "Instantly compiles an entire table of data into a comma-separated format for quick debugging." },
    { "name": "YIELDMAT", "category": "Financial", "syntax": "=YIELDMAT(settlement, maturity, issue, rate, pr, [basis])", "summary": "Returns the annual yield of a security that pays interest at maturity.", "common_errors": ["#NUM! (Invalid dates)"], "best_practice": "Used to price zero-coupon bonds or bonds where all interest is deferred to the end." },
    { "name": "DOLLARDE", "category": "Financial", "syntax": "=DOLLARDE(fractional_dollar, fraction)", "summary": "Converts a dollar price expressed as a fraction into a dollar price expressed as a decimal number.", "common_errors": ["#DIV/0! (Fraction is zero)"], "best_practice": "Legacy function used heavily by traders dealing with old-school Treasury bond fractional pricing (e.g., 1/32nds)." },
    { "name": "DOLLARFR", "category": "Financial", "syntax": "=DOLLARFR(decimal_dollar, fraction)", "summary": "Converts a decimal number to a fractional dollar price.", "common_errors": ["#DIV/0!"], "best_practice": "Converts modern decimal pricing back into fractional ticking formats for specialized reports." },
    { "name": "PDURATION", "category": "Financial", "syntax": "=PDURATION(rate, pv, fv)", "summary": "Returns the number of periods required by an investment to reach a specified value.", "common_errors": ["#NUM!"], "best_practice": "Calculates exactly how many months/years it will take for your savings to hit a target goal given a fixed interest rate." },
    { "name": "RRI", "category": "Financial", "syntax": "=RRI(nper, pv, fv)", "summary": "Returns an equivalent interest rate for the growth of an investment over a number of periods.", "common_errors": ["#NUM!"], "best_practice": "Calculates the Compound Annual Growth Rate (CAGR) natively without doing manual exponent math." },
    { "name": "ERF", "category": "Engineering", "syntax": "=ERF(lower_limit, [upper_limit])", "summary": "Returns the error function integrated between lower_limit and upper_limit.", "common_errors": ["#VALUE!"], "best_practice": "Highly technical function used in probability, statistics, and materials science modeling." },
    { "name": "ERFC", "category": "Engineering", "syntax": "=ERFC(x)", "summary": "Returns the complementary error function integrated between x and infinity.", "common_errors": ["#VALUE!"], "best_practice": "Used almost exclusively in statistical hypothesis testing and communications engineering." },
    { "name": "BESSELI", "category": "Engineering", "syntax": "=BESSELI(X, N)", "summary": "Returns the modified Bessel function In(x).", "common_errors": ["#NUM! (Invalid arguments)"], "best_practice": "Purely academic/engineering function for resolving differential equations concerning cylindrical symmetry." },
    { "name": "BESSELJ", "category": "Engineering", "syntax": "=BESSELJ(X, N)", "summary": "Returns the Bessel function Jn(x).", "common_errors": ["#NUM!"], "best_practice": "Academic/engineering use." },
    { "name": "BITAND", "category": "Engineering", "syntax": "=BITAND(number1, number2)", "summary": "Returns a 'Bitwise And' of two numbers.", "common_errors": ["#NUM! (Numbers outside of 48-bit range)"], "best_practice": "Used in computer science modeling to apply bitmasks to integer states directly in Excel." },
    { "name": "BITOR", "category": "Engineering", "syntax": "=BITOR(number1, number2)", "summary": "Returns a 'Bitwise Or' of two numbers.", "common_errors": ["#NUM!"], "best_practice": "Bitwise manipulation." },
    { "name": "BITXOR", "category": "Engineering", "syntax": "=BITXOR(number1, number2)", "summary": "Returns a 'Bitwise Exclusive Or' of two numbers.", "common_errors": ["#NUM!"], "best_practice": "Useful for specialized cryptographic simulations in spreadsheets." },
    { "name": "BITLSHIFT", "category": "Engineering", "syntax": "=BITLSHIFT(number, shift_amount)", "summary": "Returns a value shifted left by shift_amount bits.", "common_errors": ["#NUM!"], "best_practice": "Rapidly multiplies numbers by powers of 2 using low-level bit shifting." },
    { "name": "BITRSHIFT", "category": "Engineering", "syntax": "=BITRSHIFT(number, shift_amount)", "summary": "Returns a value shifted right by shift_amount bits.", "common_errors": ["#NUM!"], "best_practice": "Rapidly divides integers by powers of 2." },
    { "name": "GAMMA", "category": "Statistical", "syntax": "=GAMMA(number)", "summary": "Returns the Gamma function value.", "common_errors": ["#NUM!"], "best_practice": "Advanced mathematical modeling." },
    { "name": "GAMMALN", "category": "Statistical", "syntax": "=GAMMALN(x)", "summary": "Returns the natural logarithm of the gamma function, Γ(x).", "common_errors": ["#NUM!"], "best_practice": "Used in advanced statistics to prevent numerical overflow when calculating massive factorials." },
    { "name": "GAUSS", "category": "Statistical", "syntax": "=GAUSS(z)", "summary": "Returns 0.5 less than the standard normal cumulative distribution.", "common_errors": ["#NUM!"], "best_practice": "Determines the probability that a member of a standard normal population falls between the mean and z standard deviations from the mean." },
    { "name": "PHI", "category": "Statistical", "syntax": "=PHI(x)", "summary": "Returns the value of the density function for a standard normal distribution.", "common_errors": ["#NUM!"], "best_practice": "Easily map the classic 'Bell Curve' density profile for visualization." },
    { "name": "WEIBULL.DIST", "category": "Statistical", "syntax": "=WEIBULL.DIST(x, alpha, beta, cumulative)", "summary": "Returns the Weibull distribution.", "common_errors": ["#NUM! (Alpha or beta <= 0)"], "best_practice": "A staple in reliability engineering to calculate the mean time between failures for machinery." }
];

let addedCount = 0;
newFunctions.forEach(fn => {
    // Fill out missing required fields for the schema
    if (!fn.parameters) fn.parameters = [{ "name": "Main Parameter", "desc": "Context specific" }];
    if (!existingNames.has(fn.name.toLowerCase())) {
        currentDb.push(fn);
        existingNames.add(fn.name.toLowerCase());
        addedCount++;
    }
});

fs.writeFileSync(dbPath, JSON.stringify(currentDb, null, 4));
console.log(`Successfully added ${addedCount} brand new advanced Excel functions. Total is now ${currentDb.length}.`);
