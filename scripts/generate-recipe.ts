
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const MODEL_NAME = "gemini-2.5-flash-001"; // Strict enforcement
const TRUTH_DB_PATH = path.join(process.cwd(), 'data', 'functions.json');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'recipes');

// Ensure content dir exists
if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

interface ExcelFunction {
    name: string;
    category: string;
    syntax: string;
    summary: string;
    common_errors: string[];
    best_practice: string;
    parameters: { name: string; desc: string }[];
}

async function loadTruthDB(): Promise<ExcelFunction[]> {
    const raw = fs.readFileSync(TRUTH_DB_PATH, 'utf-8');
    return JSON.parse(raw);
}

async function generateRecipe(targetFunction: ExcelFunction) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `
  You are an expert Excel Consultant writing a "Cookbook Recipe" for a user who is stuck.
  
  Target Function: ${targetFunction.name}
  Category: ${targetFunction.category}
  
  [STRICT GROUNDING RULES]
  1. You MUST use the syntax: \`${targetFunction.syntax}\`
  2. You MUST mention these common errors: ${targetFunction.common_errors.join(', ')}
  3. You MUST recommend this best practice: "${targetFunction.best_practice}"
  4. Do NOT invent new parameters. Use only: ${targetFunction.parameters.map(p => p.name).join(', ')}
  
  [Tone & Style]
  - Tone: Professional, Solution-Oriented, Slightly Witty (like a helpful chef).
  - Format: MDX (Markdown).
  - Structure:
    1. **The Problem**: A relatable scenario (e.g., "You have two lists and need to find matches...").
    2. **The Ingredients**: The function syntax and setup.
    3. **The Recipe (Step-by-Step)**: Clear instructions with a concrete example.
    4. **Pro Tips**: The "Best Practice" mentioned above.
    5. **Troubleshooting**: The "Common Errors" mentioned above.
  
  Generate the common frontmatter (title, description, date, tags).
  `;

    console.log(`Generating recipe for ${targetFunction.name} using ${MODEL_NAME}...`);

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Save file
        const slug = targetFunction.name.toLowerCase().replace(/ /g, '-');
        const filename = `${slug}.mdx`;
        fs.writeFileSync(path.join(CONTENT_DIR, filename), text);
        console.log(`✅ Saved: ${filename}`);
    } catch (error) {
        console.error(`❌ Failed to generate for ${targetFunction.name}:`, error);
    }
}

async function main() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ Error: GEMINI_API_KEY is not set.");
        console.error("   Please check .env file (local) or GitHub Repository Secrets (remote).");
        process.exit(1);
    }

    const db = await loadTruthDB();

    // For demo: Generate for 'VLOOKUP' specifically, or pick random
    const target = db.find(f => f.name === 'VLOOKUP');
    if (target) {
        await generateRecipe(target);
    } else {
        console.error("Target function not found in DB.");
    }
}

main();
