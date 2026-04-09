const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/functions.json');
const currentDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const existingNames = new Set(currentDb.map(f => f.name.toLowerCase()));

const newRecipes = [
    // Accounting & Finance
    "Automate Invoice Numbering (SEQUENCE)",
    "Calculate Depreciation using SYD vs DB",
    "Find Overdue Invoices (IF & TODAY)",
    "Compound Monthly Growth Rate (CMGR)",
    "Loan Amortization Schedule (PMT & IPMT)",
    "Currency Conversion with Real-Time Data",
    "Identify Duplicate Expense Claims",
    // HR & Payroll
    "Calculate Years of Service (DATEDIF)",
    "Tiered Sales Commission Formula (VLOOKUP TRUE)",
    "Prorate Employee Salary by Start Date",
    "Count Sick Days Taken (COUNTIFS)",
    "Highlight Contract Renewals (Conditional Formatting)",
    "Create a Dynamic Shift Schedule Matrix",
    "Extract First and Last Name from Email",
    // Sales & Marketing
    "Calculate Customer Acquisition Cost (CAC)",
    "Calculate Churn Rate",
    "Find Top Salesperson of the Month",
    "Track Lead Conversion Percentages",
    "Determine Product Seasonality (AVERAGEIFS)",
    "Clean CRM Data (TRIM & PROPER)",
    "Compare Campaign Costs vs Revenue",
    // Logistics & Operations
    "Calculate Reorder Point for Inventory",
    "Find Closest Warehouse using INDEX MATCH",
    "Track Delivery Lead Times (NETWORKDAYS)",
    "Flag Expired Inventory Lots",
    "Calculate Storage Cost par Pallet",
    "Identify Bottlenecks with Time Deltas",
    // Education & Grading
    "Determine Letter Grade from Number",
    "Calculate GPA Weighting",
    "Find the Highest Score in Class",
    "Identify Students Below Passing Grade",
    "Randomly Assign Students to Groups",
    // Advanced & Power User
    "Build a Dynamic Search Box",
    "Extract the Last Word of a Text String",
    "Parse JSON-like Data in Excel",
    "Create a Two-Way Matrix Lookup",
    "Perform a 3D SUM across Worksheets",
    "VLOOKUP with an Asterisk for Partial Matches",
    "Calculate Weighted Average (SUMPRODUCT)",
    "Create a Scrolling Data Table with OFFSET",
    // Math & Stats expansions
    "Calculate Standard Deviation for a Sample",
    "Find the Median of a Filtered List",
    "Identify Outliers using Quartiles",
    "Calculate Variance of a Dataset",
    "Normal Distribution Probabilities",
    "Z-Score Calculation",
    "Moving Average for Sales Trends",
    // Data Cleanup
    "Remove Non-Printable Characters (CLEAN)",
    "Fix Dates Stored as Text",
    "Pad Numbers with Leading Zeros (TEXT)",
    "Standardize Phone Number Formatting",
    "Extract Domain Name from URL"
].map(name => ({
    name: name,
    category: "Real-World Business Scenario",
    summary: `Practical business guide: ${name}`,
    syntax: `='${name.replace(/ /g, '_')}'()`,
    parameters: [{ name: "Data", desc: "Your business dataset" }],
    best_practice: "Always use structured table references (e.g. Table1[Column]) for dynamic growth.",
    common_errors: ["#REF!", "#VALUE!"]
}));

let added = 0;
newRecipes.forEach(fn => {
    if (!existingNames.has(fn.name.toLowerCase())) {
        currentDb.push(fn);
        added++;
    }
});

fs.writeFileSync(dbPath, JSON.stringify(currentDb, null, 4));
console.log(`Added ${added} new real-world business scenarios to the database.`);
