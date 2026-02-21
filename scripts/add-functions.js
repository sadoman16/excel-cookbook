const fs = require('fs');
const file = 'data/functions.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const existing = new Set(data.map(f => f.name.toUpperCase()));

const newFs = [
    {
        name: 'ROUND', category: 'Math & Trig',
        syntax: '=ROUND(number, num_digits)',
        summary: 'Rounds a number to a specified number of digits.',
        common_errors: ['Rounding issues in financial calculations', 'Confusing with formatting (which only changes display)'],
        best_practice: 'Use ROUND to prevent floating-point errors from compounding in large financial models.',
        parameters: [{ name: 'number', desc: 'The number you want to round.' }, { name: 'num_digits', desc: 'The number of digits to which you want to round the number.' }]
    },
    {
        name: 'ROUNDUP', category: 'Math & Trig',
        syntax: '=ROUNDUP(number, num_digits)',
        summary: 'Rounds a number up, away from zero.',
        common_errors: ['Treating negative numbers identically to positive numbers (rounds away from 0)'],
        best_practice: 'Useful for calculating required materials (e.g., you need to buy whole cans of paint).',
        parameters: [{ name: 'number', desc: 'The number to round up.' }, { name: 'num_digits', desc: 'Number of digits.' }]
    },
    {
        name: 'ROUNDDOWN', category: 'Math & Trig',
        syntax: '=ROUNDDOWN(number, num_digits)',
        summary: 'Rounds a number down, toward zero.',
        common_errors: ['Confusing with INT or TRUNC'],
        best_practice: 'Use when you want to disregard fractional parts below a certain significance reliably.',
        parameters: [{ name: 'number', desc: 'The number to round down.' }, { name: 'num_digits', desc: 'Number of digits.' }]
    },
    {
        name: 'AND', category: 'Logical',
        syntax: '=AND(logical1, [logical2], ...)',
        summary: 'Checks if ALL arguments are TRUE, and returns TRUE if all arguments are TRUE.',
        common_errors: ['Providing text instead of logical conditions without testing them'],
        best_practice: 'Wrap inside an IF statement to return specific values instead of just TRUE/FALSE.',
        parameters: [{ name: 'logical1', desc: 'The first condition to test.' }, { name: '[logical2]', desc: 'Additional conditions.' }]
    },
    {
        name: 'OR', category: 'Logical',
        syntax: '=OR(logical1, [logical2], ...)',
        summary: 'Checks if ANY argument is TRUE, and returns TRUE or FALSE.',
        common_errors: ['Misusing OR in array formulas (OR aggregates everything, not row-by-row)'],
        best_practice: 'Like AND, mostly used inside IF to group multiple valid conditions into a single statement.',
        parameters: [{ name: 'logical1', desc: 'The first condition.' }, { name: '[logical2]', desc: 'Additional conditions.' }]
    },
    {
        name: 'OFFSET', category: 'Lookup & Reference',
        syntax: '=OFFSET(reference, rows, cols, [height], [width])',
        summary: 'Returns a reference to a range that is a specified number of rows and columns from a cell or range of cells.',
        common_errors: ['#REF! if the offset goes off the sheet edge', 'Volatile function causing slow recalculation'],
        best_practice: 'Use INDEX instead if possible, as OFFSET is volatile and can slow down large workbooks.',
        parameters: [{ name: 'reference', desc: 'Starting point.' }, { name: 'rows', desc: 'Rows to move down/up.' }, { name: 'cols', desc: 'Cols to move right/left.' }, { name: '[height]', desc: 'Height of the returned range.' }, { name: '[width]', desc: 'Width of returned range.' }]
    },
    {
        name: 'INDIRECT', category: 'Lookup & Reference',
        syntax: '=INDIRECT(ref_text, [a1])',
        summary: 'Returns the reference specified by a text string. Evaluates text as a cell reference.',
        common_errors: ['#REF! when referring to another workbook that is closed', 'Volatile function causing slow recalculations'],
        best_practice: 'Very useful for creating dynamic dropdown lists (dependent data validation), but use sparingly.',
        parameters: [{ name: 'ref_text', desc: 'A text string specifying a reference.' }, { name: '[a1]', desc: 'TRUE for A1 style, FALSE for R1C1 style.' }]
    },
    {
        name: 'FIND', category: 'Text',
        syntax: '=FIND(find_text, within_text, [start_num])',
        summary: 'Returns the starting position of one text string within another text string. FIND is case-sensitive.',
        common_errors: ['#VALUE! if find_text is not found', 'Confusing with SEARCH, which is not case-sensitive'],
        best_practice: 'Wrap in IFERROR or ISNUMBER to gracefully handle cases where the text is not found.',
        parameters: [{ name: 'find_text', desc: 'Text to find.' }, { name: 'within_text', desc: 'Text containing the text to find.' }, { name: '[start_num]', desc: 'Starting position.' }]
    },
    {
        name: 'REPLACE', category: 'Text',
        syntax: '=REPLACE(old_text, start_num, num_chars, new_text)',
        summary: 'Replaces part of a text string, based on the number of characters you specify, with a different text string.',
        common_errors: ['#VALUE! if start_num or num_chars is invalid or negative'],
        best_practice: 'Better than SUBSTITUTE when you know the exact position of the text you want to change, rather than the specific text itself.',
        parameters: [{ name: 'old_text', desc: 'Original text.' }, { name: 'start_num', desc: 'Starting position.' }, { name: 'num_chars', desc: 'Length to replace.' }, { name: 'new_text', desc: 'Replacement text.' }]
    },
    {
        name: 'VALUE', category: 'Text',
        syntax: '=VALUE(text)',
        summary: 'Converts a text string that represents a number to a number.',
        common_errors: ['#VALUE! if the text string cannot be interpreted as a number'],
        best_practice: 'Often used to fix data downloaded from systems that export numbers stored as text. Can also use --(text) as a shortcut.',
        parameters: [{ name: 'text', desc: 'Text enclosed in quotation marks or a reference to a cell.' }]
    },
    {
        name: 'ISBLANK', category: 'Information',
        syntax: '=ISBLANK(value)',
        summary: 'Checks whether a reference is to an empty cell, and returns TRUE or FALSE.',
        common_errors: ['Returns FALSE if a cell contains a formula that returns an empty string ("")'],
        best_practice: 'For cells with formulas returning "", test with LEN(A1)=0 instead of ISBLANK.',
        parameters: [{ name: 'value', desc: 'The value you want tested (usually a cell reference).' }]
    },
    {
        name: 'ISNUMBER', category: 'Information',
        syntax: '=ISNUMBER(value)',
        summary: 'Checks whether a value is a number, and returns TRUE or FALSE.',
        common_errors: ['Returns FALSE for numbers formatted/stored as text'],
        best_practice: 'Combine with SEARCH to check if a string contains another string (e.g., =ISNUMBER(SEARCH("apple", A1))).',
        parameters: [{ name: 'value', desc: 'The value you want tested.' }]
    },
    {
        name: 'ISERROR', category: 'Information',
        syntax: '=ISERROR(value)',
        summary: 'Checks whether a value is an error (#N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, or #NULL!), and returns TRUE or FALSE.',
        common_errors: ['Hiding legitimate errors that need to be addressed'],
        best_practice: 'For newer Excel versions, prefer IFERROR directly instead of IF(ISERROR(...)).',
        parameters: [{ name: 'value', desc: 'The value you want tested.' }]
    },
    {
        name: 'CEILING', category: 'Math & Trig',
        syntax: '=CEILING(number, significance)',
        summary: 'Rounds a number up to the nearest multiple of significance.',
        common_errors: ['#NUM! if number and significance have different signs'],
        best_practice: 'Great for pricing items (e.g., rounding up prices to the nearest $0.99) or calculating items bought in packs.',
        parameters: [{ name: 'number', desc: 'The value you want to round.' }, { name: 'significance', desc: 'The multiple to which you want to round.' }]
    },
    {
        name: 'FLOOR', category: 'Math & Trig',
        syntax: '=FLOOR(number, significance)',
        summary: 'Rounds a number down to the nearest multiple of significance.',
        common_errors: ['#NUM! if number and significance have different signs'],
        best_practice: 'Use FLOOR.MATH in newer Excel versions for better handling of negative numbers.',
        parameters: [{ name: 'number', desc: 'The numeric value you want to round.' }, { name: 'significance', desc: 'The multiple to which you want to round.' }]
    },
    {
        name: 'RANDBETWEEN', category: 'Math & Trig',
        syntax: '=RANDBETWEEN(bottom, top)',
        summary: 'Returns a random integer number between the numbers you specify.',
        common_errors: ['Volatile function that recalcs on every worksheet change, slowing down the sheet if used extensively'],
        best_practice: 'Copy and Paste Special > Values to lock in the random numbers after generating them.',
        parameters: [{ name: 'bottom', desc: 'The smallest integer RANDBETWEEN will return.' }, { name: 'top', desc: 'The largest integer RANDBETWEEN will return.' }]
    },
    {
        name: 'PMT', category: 'Financial',
        syntax: '=PMT(rate, nper, pv, [fv], [type])',
        summary: 'Calculates the payment for a loan based on constant payments and a constant interest rate.',
        common_errors: ['Using annual rate for monthly payments. Remember to divide rate by 12 and multiply terms by 12'],
        best_practice: 'Ensure the units for rate and nper are consistent. Present value (the loan amount) should typically be positive, making the result negative (cash outflow).',
        parameters: [{ name: 'rate', desc: 'The interest rate for the loan.' }, { name: 'nper', desc: 'The total number of payments.' }, { name: 'pv', desc: 'The present value (principal).' }, { name: '[fv]', desc: 'Future value (default 0).' }, { name: '[type]', desc: '0 (end of period) or 1 (beginning). ' }]
    },
    {
        name: 'FV', category: 'Financial',
        syntax: '=FV(rate, nper, pmt, [pv], [type])',
        summary: 'Returns the future value of an investment based on periodic, constant payments and a constant interest rate.',
        common_errors: ['Not using consistent time units for rate and nper'],
        best_practice: 'Cash outflows (like deposits to savings) must be represented as negative numbers, and cash inflows as positive numbers.',
        parameters: [{ name: 'rate', desc: 'Interest rate per period.' }, { name: 'nper', desc: 'Total number of payment periods.' }, { name: 'pmt', desc: 'Payment made each period.' }, { name: '[pv]', desc: 'Present value.' }, { name: '[type]', desc: '0 or 1.' }]
    },
    {
        name: 'TRANSPOSE', category: 'Lookup & Reference',
        syntax: '=TRANSPOSE(array)',
        summary: 'Returns a vertical range of cells as a horizontal range, or vice versa.',
        common_errors: ['Legacy Excel requires pressing Ctrl+Shift+Enter, otherwise you get a #VALUE! error'],
        best_practice: 'In modern Excel (365/2021), it spills automatically. Useful for flipping tables without manual copy/paste special.',
        parameters: [{ name: 'array', desc: 'An array or range of cells on a worksheet that you want to transpose.' }]
    },
    {
        name: 'CHOOSE', category: 'Lookup & Reference',
        syntax: '=CHOOSE(index_num, value1, [value2], ...)',
        summary: 'Chooses a value or action to perform from a list of values, based on an index number.',
        common_errors: ['#VALUE! if index_num is less than 1 or greater than the number of values in the list'],
        best_practice: 'Great for quickly assigning categories (e.g., =CHOOSE(A1, "Low", "Medium", "High")). Often paired with random number generation like RANDBETWEEN.',
        parameters: [{ name: 'index_num', desc: 'Specifies which value argument is selected (must be between 1 and 254).' }, { name: 'value1', desc: '1st value from which to choose.' }, { name: '[value2]', desc: '2nd value, up to 254.' }]
    },
    {
        name: 'REPT', category: 'Text',
        syntax: '=REPT(text, number_times)',
        summary: 'Repeats text a given number of times. Use REPT to fill a cell with a number of instances of a text string.',
        common_errors: ['#VALUE! if the result string is longer than the 32,767 character limit'],
        best_practice: 'Can be used to create simple in-cell sparklines or bar charts using block characters like "|" or "█" based on an adjacent number.',
        parameters: [{ name: 'text', desc: 'The text you want to repeat.' }, { name: 'number_times', desc: 'A positive number specifying the number of times to repeat text.' }]
    }
];

let added = 0;
for (const f of newFs) {
    if (!existing.has(f.name.toUpperCase())) {
        data.push(f);
        existing.add(f.name.toUpperCase());
        added++;
    }
}

fs.writeFileSync(file, JSON.stringify(data, null, 4));
console.log(`Added ${added} new functions. Total is now ${data.length}`);
