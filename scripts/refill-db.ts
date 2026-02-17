
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const MODEL_NAME = "gemini-2.5-flash";
const DB_PATH = path.join(process.cwd(), 'data', 'functions.json');

// Interface matching the existing schema
interface ExcelFunction {
    name: string;
    category: string;
    syntax: string;
    summary: string;
    common_errors: string[];
    best_practice: string;
    parameters: { name: string; desc: string }[];
}

async function main() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ GEMINI_API_KEY is missing.");
        process.exit(1);
    }

    // 1. Load existing functions
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const existing: ExcelFunction[] = JSON.parse(raw);
    const existingNames = existing.map(f => f.name);

    console.log(`📦 Current database size: ${existing.length} recipes.`);
    console.log(`🔍 Seeking 50 NEW popular Excel functions...`);

    // 2. Ask Gemini for new functions
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
        You are an Excel Database Administrator.
        
        The current database already contains these functions:
        ${JSON.stringify(existingNames)}

        TASK:
        Generate a JSON array of 50 NEW, POPULAR, and USEFUL Excel functions that are NOT in the list above.
        Focus on: Statistical, Logical, Text, Date & Time, and Dynamic Array functions.
        (e.g., XLOOKUP, INDEX, MATCH, SUMIFS, COUNTIFS, IF, IFERROR, LEFT, MID, TEXT, NETWORKDAYS, SEQUENCE, FILTER, SORT, UNIQUE...)

        OUTPUT SCHEMA (Strict JSON Array):
        [
            {
                "name": "FUNCTION_NAME",
                "category": "Category Name",
                "syntax": "Exact Syntax",
                "summary": "One sentence summary.",
                "common_errors": ["Error 1", "Error 2"],
                "best_practice": "One robust best practice tip.",
                "parameters": [
                    { "name": "param1", "desc": "Description" }
                ]
            }
        ]
    `;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const newFunctions: ExcelFunction[] = JSON.parse(responseText);

        // 3. Merge and Save
        const finalDB = [...existing, ...newFunctions];

        // Remove potential duplicates just in case
        const uniqueDB = finalDB.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

        fs.writeFileSync(DB_PATH, JSON.stringify(uniqueDB, null, 4));

        console.log(`✅ Successfully added ${newFunctions.length} new functions!`);
        console.log(`📦 New database size: ${uniqueDB.length} recipes.`);

    } catch (error) {
        console.error("❌ Failed to refill database:", error);
    }
}

main();
