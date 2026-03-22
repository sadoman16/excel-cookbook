const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const currentDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingNames = new Set(currentDb.map(f => f.name.toLowerCase()));

const newFunctions = [
    {
        "name": "XIRR",
        "category": "Financial",
        "syntax": "=XIRR(values, dates, [guess])",
        "summary": "Returns the internal rate of return for a schedule of cash flows that is not necessarily periodic.",
        "common_errors": ["#NUM! (Algorithm fails to converge)", "#VALUE! (Dates are invalid)"],
        "best_practice": "Use XIRR instead of IRR for real-world investments where cash flows happen on specific, irregular dates.",
        "parameters": [
            { "name": "values", "desc": "A series of cash flows that corresponds to a schedule of payments in dates." },
            { "name": "dates", "desc": "A schedule of payment dates that corresponds to the cash flow payments." }
        ]
    },
    {
        "name": "XNPV",
        "category": "Financial",
        "syntax": "=XNPV(rate, values, dates)",
        "summary": "Returns the net present value for a schedule of cash flows that is not necessarily periodic.",
        "common_errors": ["#VALUE! (Dates are not valid date integers)"],
        "best_practice": "Pairs with XIRR for accurate project valuation based on actual calendar days rather than assuming 30-day months.",
        "parameters": [
            { "name": "rate", "desc": "The discount rate to apply to the cash flows." },
            { "name": "values", "desc": "A series of cash flows that corresponds to a schedule of payments in dates." },
            { "name": "dates", "desc": "A schedule of payment dates." }
        ]
    },
    {
        "name": "CUMIPMT",
        "category": "Financial",
        "syntax": "=CUMIPMT(rate, nper, pv, start_period, end_period, type)",
        "summary": "Returns the cumulative interest paid on a loan between start_period and end_period.",
        "common_errors": ["#NUM! (Incorrect period numbers)"],
        "best_practice": "Vital for tax reporting to determine exactly how much interest was paid during a specific fiscal year of a mortgage.",
        "parameters": [
            { "name": "rate", "desc": "The interest rate." },
            { "name": "nper", "desc": "The total number of payment periods." },
            { "name": "pv", "desc": "The present value." },
            { "name": "start_period", "desc": "The first period in the calculation." }
        ]
    },
    {
        "name": "CUMPRINC",
        "category": "Financial",
        "syntax": "=CUMPRINC(rate, nper, pv, start_period, end_period, type)",
        "summary": "Returns the cumulative principal paid on a loan between start_period and end_period.",
        "common_errors": ["#VALUE! (Rate or Nper is not a number)"],
        "best_practice": "Helps track equity buildup over the life of a commercial loan or mortgage.",
        "parameters": [
            { "name": "rate", "desc": "The interest rate per period." },
            { "name": "nper", "desc": "Total number of payment periods." },
            { "name": "pv", "desc": "The present value." }
        ]
    },
    {
        "name": "YIELD",
        "category": "Financial",
        "syntax": "=YIELD(settlement, maturity, rate, pr, redemption, frequency, [basis])",
        "summary": "Returns the yield on a security that pays periodic interest.",
        "common_errors": ["#NUM! (Settlement date >= Maturity date)"],
        "best_practice": "Standard tool for bond analysts to calculate the actual return on investment based on purchase price.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." },
            { "name": "rate", "desc": "The security's annual coupon rate." }
        ]
    },
    {
        "name": "PRICE",
        "category": "Financial",
        "syntax": "=PRICE(settlement, maturity, rate, yld, redemption, frequency, [basis])",
        "summary": "Returns the price per $100 face value of a security that pays periodic interest.",
        "common_errors": ["#VALUE! (Settlement or Maturity is not a valid date)"],
        "best_practice": "Used to determine market value of fixed-income instruments given a target yield.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "maturity", "desc": "The security's maturity date." }
        ]
    },
    {
        "name": "DURATION",
        "category": "Financial",
        "syntax": "=DURATION(settlement, maturity, coupon, yld, frequency, [basis])",
        "summary": "Returns the Macauley duration for an assumed par value of $100.",
        "common_errors": ["#NUM! (Frequency is not 1, 2, or 4)"],
        "best_practice": "Crucial for assessing bond price sensitivity to interest rate changes.",
        "parameters": [
            { "name": "settlement", "desc": "The security's settlement date." },
            { "name": "coupon", "desc": "The security's annual coupon rate." }
        ]
    },
    {
        "name": "MIRR",
        "category": "Financial",
        "syntax": "=MIRR(values, finance_rate, reinvest_rate)",
        "summary": "Returns the modified internal rate of return for a series of periodic cash flows.",
        "common_errors": ["#DIV/0! (Values do not contain at least one negative and one positive value)"],
        "best_practice": "More realistic than IRR because it allows different rates for the cost of borrowing vs. reinvestment of earnings.",
        "parameters": [
            { "name": "values", "desc": "An array or reference to cells that contain numbers." },
            { "name": "finance_rate", "desc": "The interest rate you pay on the money used in the cash flows." }
        ]
    },
    {
        "name": "SYD",
        "category": "Financial",
        "syntax": "=SYD(cost, salvage, life, per)",
        "summary": "Returns the sum-of-years' digits depreciation of an asset for a specified period.",
        "common_errors": ["#NUM! (Life or Per <= 0)"],
        "best_practice": "An accelerated depreciation method used to write off asset value faster in early years.",
        "parameters": [
            { "name": "cost", "desc": "The initial cost of the asset." },
            { "name": "salvage", "desc": "The value at the end of the depreciation." },
            { "name": "life", "desc": "The number of periods over which the asset is depreciated." }
        ]
    },
    {
        "name": "DB",
        "category": "Financial",
        "syntax": "=DB(cost, salvage, life, period, [month])",
        "summary": "Returns the depreciation of an asset for a specified period using the fixed-declining balance method.",
        "common_errors": ["#VALUE! (Cost, salvage, or life is not a number)"],
        "best_practice": "Often used for financial accounting to allocate asset costs dynamically over their useful life.",
        "parameters": [
            { "name": "cost", "desc": "The initial cost of the asset." },
            { "name": "period", "desc": "The period for which you want to calculate the depreciation." }
        ]
    },
    {
        "name": "DDB",
        "category": "Financial",
        "syntax": "=DDB(cost, salvage, life, period, [factor])",
        "summary": "Returns the depreciation of an asset for a specified period using the double-declining balance method.",
        "common_errors": ["#NUM! (Factor <= 0)"],
        "best_practice": "The most aggressive common depreciation method permitted under many tax jurisdictions.",
        "parameters": [
            { "name": "cost", "desc": "The initial cost of the asset." },
            { "name": "life", "desc": "The number of periods over which the asset is being depreciated." }
        ]
    },
    {
        "name": "SLN",
        "category": "Financial",
        "syntax": "=SLN(cost, salvage, life)",
        "summary": "Returns the straight-line depreciation of an asset for one period.",
        "common_errors": ["#DIV/0! (Life is 0)"],
        "best_practice": "The simplest and most commonly used depreciation method for basic financial reporting.",
        "parameters": [
            { "name": "cost", "desc": "The initial cost of the asset." },
            { "name": "salvage", "desc": "The value at the end of the depreciation." }
        ]
    },
    {
        "name": "ISPMT",
        "category": "Financial",
        "syntax": "=ISPMT(rate, per, nper, pv)",
        "summary": "Calculates the interest paid during a specific period of an investment.",
        "common_errors": ["#NUM! (Nper is 0)"],
        "best_practice": "Useful for loans with fixed principal payments where the interest payment changes over time.",
        "parameters": [
            { "name": "rate", "desc": "The interest rate for the investment." },
            { "name": "per", "desc": "The period for which you want to find the interest." }
        ]
    },
    {
        "name": "FV",
        "category": "Financial",
        "syntax": "=FV(rate, nper, pmt, [pv], [type])",
        "summary": "Returns the future value of an investment based on periodic, constant payments and a constant interest rate.",
        "common_errors": ["#VALUE! (Any argument is non-numeric)"],
        "best_practice": "Perfect for calculating how much a monthly savings plan (like a 401k) will be worth in 20 years.",
        "parameters": [
            { "name": "rate", "desc": "The interest rate per period." },
            { "name": "nper", "desc": "The total number of payment periods in an annuity." }
        ]
    },
    {
        "name": "PV",
        "category": "Financial",
        "syntax": "=PV(rate, nper, pmt, [fv], [type])",
        "summary": "Returns the present value of an investment.",
        "common_errors": ["#NUM! (Invalid rate or nper)"],
        "best_practice": "Essential for determining if a future cash stream is worth a specific upfront purchase price today.",
        "parameters": [
            { "name": "rate", "desc": "The interest rate per period." },
            { "name": "nper", "desc": "The total number of payment periods." }
        ]
    },
    {
        "name": "NPV",
        "category": "Financial",
        "syntax": "=NPV(rate, value1, [value2], ...)",
        "summary": "Returns the net present value of an investment based on a discount rate and a series of future payments (negative values) and income (positive values).",
        "common_errors": ["Does not include the initial 'Time 0' investment automatically in the formula"],
        "best_practice": "Always add the initial investment (cell reference) outside the NPV bracket: =InitialInv + NPV(...).",
        "parameters": [
            { "name": "rate", "desc": "The rate of discount over the length of one period." },
            { "name": "value1", "desc": "Representing payments and income." }
        ]
    },
    {
        "name": "IRR",
        "category": "Financial",
        "syntax": "=IRR(values, [guess])",
        "summary": "Returns the internal rate of return for a series of periodic cash flows.",
        "common_errors": ["#NUM! (No result found after 20 iterations)"],
        "best_practice": "Standard metric for private equity and project finance to compare relative profitability of different ventures.",
        "parameters": [
            { "name": "values", "desc": "An array or a reference to cells that contain numbers for which you want to calculate the internal rate of return." }
        ]
    },
    {
        "name": "PMT",
        "category": "Financial",
        "syntax": "=PMT(rate, nper, pv, [fv], [type])",
        "summary": "Calculates the payment for a loan based on constant payments and a constant interest rate.",
        "common_errors": ["Forgetting to divide annual rate by 12 for monthly payments"],
        "best_practice": "Ensure rate/12 and nper*12 are used for monthly mortgage calculations to keep time units consistent.",
        "parameters": [
            { "name": "rate", "desc": "The interest rate for the loan." },
            { "name": "nper", "desc": "The total number of payments for the loan." }
        ]
    },
    {
        "name": "PPMT",
        "category": "Financial",
        "syntax": "=PPMT(rate, per, nper, pv, [fv], [type])",
        "summary": "Returns the payment on the principal for a given period for an investment based on periodic, constant payments and a constant interest rate.",
        "common_errors": ["#NUM! (Per is outside the valid range)"],
        "best_practice": "Use to build a detailed loan amortization schedule, showing exactly how principal payments increase over time.",
        "parameters": [
            { "name": "rate", "desc": "The interest rate per period." },
            { "name": "per", "desc": "Specifies the period and must be in the range 1 to nper." }
        ]
    },
    {
        "name": "IPMT",
        "category": "Financial",
        "syntax": "=IPMT(rate, per, nper, pv, [fv], [type])",
        "summary": "Returns the interest payment for a given period for an investment based on periodic, constant payments and a constant interest rate.",
        "common_errors": ["#VALUE! (Arguments are non-numeric)"],
        "best_practice": "Identify when a loan shift from being mostly interest-heavy to principal-heavy.",
        "parameters": [
            { "name": "rate", "desc": "The interest rate per period." },
            { "name": "per", "desc": "The period for which you want to find the interest." }
        ]
    },
    {
        "name": "NPER",
        "category": "Financial",
        "syntax": "=NPER(rate, pmt, pv, [fv], [type])",
        "summary": "Returns the number of periods for an investment based on periodic, constant payments and a constant interest rate.",
        "common_errors": ["#NUM! (Target future value is unreachable with given interest/payment)"],
        "best_practice": "Use to calculate how many months it will take to pay off a credit card balance given a fixed monthly payment.",
        "parameters": [
            { "name": "rate", "desc": "The interest rate per period." },
            { "name": "pmt", "desc": "The payment made each period." }
        ]
    },
    {
        "name": "RATE",
        "category": "Financial",
        "syntax": "=RATE(nper, pmt, pv, [fv], [type], [guess])",
        "summary": "Returns the interest rate per period of an annuity.",
        "common_errors": ["#NUM! (Formula does not converge to a solution)"],
        "best_practice": "Helps determine the effective interest rate of a loan when only the payment amount and terms are known.",
        "parameters": [
            { "name": "nper", "desc": "The total number of payment periods in an annuity." },
            { "name": "pmt", "desc": "The payment made each period." }
        ]
    },
    {
        "name": "EFFECT",
        "category": "Financial",
        "syntax": "=EFFECT(nominal_rate, npery)",
        "summary": "Returns the effective annual interest rate, given the nominal annual interest rate and the number of compounding periods per year.",
        "common_errors": ["#NUM! (Nominal rate <= 0 or Npery < 1)"],
        "best_practice": "Essential for comparing bank accounts with different compounding frequencies (e.g., monthly vs. quarterly compounding).",
        "parameters": [
            { "name": "nominal_rate", "desc": "The nominal interest rate." },
            { "name": "npery", "desc": "The number of compounding periods per year." }
        ]
    },
    {
        "name": "NOMINAL",
        "category": "Financial",
        "syntax": "=NOMINAL(effect_rate, npery)",
        "summary": "Returns the nominal annual interest rate, given the effective rate and the number of compounding periods per year.",
        "common_errors": ["#VALUE! (Arguments are non-numeric)"],
        "best_practice": "Reverse engineer APR (Annual Percentage Rate) when given an APY (Annual Percentage Yield).",
        "parameters": [
            { "name": "effect_rate", "desc": "The effective interest rate." },
            { "name": "npery", "desc": "The number of compounding periods per year." }
        ]
    },
    {
        "name": "FVSCHEDULE",
        "category": "Financial",
        "syntax": "=FVSCHEDULE(principal, schedule)",
        "summary": "Returns the future value of an initial principal after applying a series of compound interest rates.",
        "common_errors": ["#VALUE! (Schedule contains non-numeric values)"],
        "best_practice": "Great for calculating investment growth when interest rates are variable and projected to change each year.",
        "parameters": [
            { "name": "principal", "desc": "The present value." },
            { "name": "schedule", "desc": "An array of interest rates to apply." }
        ]
    }
];

let addedCount = 0;
newFunctions.forEach(fn => {
    if (!existingNames.has(fn.name.toLowerCase())) {
        currentDb.push(fn);
        existingNames.add(fn.name.toLowerCase());
        addedCount++;
    }
});

fs.writeFileSync(dbPath, JSON.stringify(currentDb, null, 4));
console.log(`Successfully added ${addedCount} new functions. Total is now ${currentDb.length}.`);
