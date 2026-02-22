
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const MODEL_NAME = "gemini-2.5-flash"; // Reverting to flash
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

    // ──────────────────────────────────────────────────────────
    //  SEO-Optimized Prompt (based on seo-content-writer skill)
    // ──────────────────────────────────────────────────────────
    const prompt = `
You are an expert Excel Consultant and SEO Content Writer creating a "Cookbook Recipe" for the Excel Cookbook website (https://excel-cookbook.com).

Target Function: ${targetFunction.name}
Category: ${targetFunction.category}

═══════════════════════════════════════
[STRICT GROUNDING RULES - NEVER BREAK]
═══════════════════════════════════════
1. You MUST use the syntax: \`${targetFunction.syntax}\`
2. You MUST mention these common errors: ${targetFunction.common_errors.join(', ')}
3. You MUST recommend this best practice: "${targetFunction.best_practice}"
4. Do NOT invent new parameters. Use only: ${targetFunction.parameters.map(p => p.name).join(', ')}
5. ALL information must be factually accurate for Microsoft Excel.

═══════════════════════════════════════
[SEO CONTENT QUALITY REQUIREMENTS]
═══════════════════════════════════════
- Article MUST be a MINIMUM of 1200 words of dense, actionable text (CRITICAL for Google AdSense approval - avoid "Thin Content" penalties).
- Include the function name naturally 10-15 times throughout the article (0.5-1.5% keyword density).
- Write at a Grade 9-11 reading level — professional, informative, but accessible.
- Use short paragraphs (2-3 sentences max per paragraph)
- Include bullet points and tables for scannability
- Every section must provide genuine VALUE — no filler content

═══════════════════════════════════════
[E-E-A-T SIGNALS - VERY IMPORTANT]
═══════════════════════════════════════
Include these trust-building elements throughout the content:
- First-hand experience mentions (e.g., "In our experience..." or "A common mistake we've seen...")
- Specific, realistic examples with actual data (not abstract)
- Practical, actionable advice the reader can use immediately
- Expert perspective (e.g., "Experienced Excel users prefer..." or "According to Microsoft documentation...")
- At least one "real-world scenario" that a working professional would actually face

═══════════════════════════════════════
[TONE & STYLE]
═══════════════════════════════════════
- Tone: Professional, Solution-Oriented, Slightly Witty (like a helpful chef guiding someone)
- Format: MDX (Markdown)
- Write for someone who is STUCK and searching Google for help
- Avoid generic or vague sentences — every line should teach something

═══════════════════════════════════════
[REQUIRED STRUCTURE - FOLLOW EXACTLY]
═══════════════════════════════════════

## MDX Frontmatter (REQUIRED - CRITICAL YAML RULES)
Generate frontmatter with ALL string values wrapped in DOUBLE QUOTES to prevent YAML parsing errors:
- title: "Creative recipe-style title (50-60 chars). Include the function name."
- description: "Compelling meta description (150-160 chars). Include the function name + a benefit."
- date: "${new Date().toISOString().split('T')[0]}"
- tags: [Excel, ${targetFunction.name}, ${targetFunction.category}, plus 2-3 relevant tags]

⚠️ CRITICAL: title and description MUST be wrapped in double quotes because they often contain colons (:) and apostrophes (') which break YAML parsing.
Example:
---
title: "Master the VLOOKUP Function: Your Essential Lookup Recipe"
description: "Learn Excel's VLOOKUP function to search data tables efficiently."
date: "${new Date().toISOString().split('T')[0]}"
tags: [Excel, VLOOKUP, Lookup]
---


## Article Structure (IN THIS ORDER):

### 1. The Problem (150-200 words)
- Hook the reader IMMEDIATELY with a relatable, frustrating spreadsheet scenario.
- Make the reader think "That's EXACTLY my problem!"
- Include the function name naturally.

### 2. Business Context & Real-World Use Case (200-250 words) [NEW - CRITICAL FOR E-E-A-T]
- Describe a specific industry context (e.g., HR running payroll, Finance calculating quarterly revenue, Logistics tracking inventory).
- Why is doing this manually a bad idea? What business value does automating this provide?
- Share a brief "war story" or practical insight (e.g., "In my years as a data analyst, I've seen teams waste hours on...").

### 3. The Ingredients: Understanding ${targetFunction.name}'s Setup (150-200 words)
- Show the exact syntax: \`${targetFunction.syntax}\`
- Explain EACH parameter with a clear, table format:
${targetFunction.parameters.map(p => `  - **${p.name}**: ${p.desc}`).join('\n')}
- Use a markdown table for parameter reference.

### 3. The Recipe: Step-by-Step Instructions (250-350 words)
- Create a SPECIFIC, realistic example with actual sample data
- Use markdown tables to show the example spreadsheet data
- Number each step clearly (1, 2, 3...)
- Show the formula building process step by step
- Include the final working formula
- Explain what result appears and why

### 4. Pro Tips: Level Up Your Skills (100-150 words)
- Include the best practice: "${targetFunction.best_practice}"
- Add 2-3 additional expert tips that professionals would appreciate
- Each tip should be genuinely useful, not obvious

### 5. Troubleshooting: Common Errors & Fixes (250-300 words) [CRITICAL FOR DEPTH]
- Cover at least 3 distinct error scenarios, heavily featuring these: ${targetFunction.common_errors.join(', ')}
- For EACH error, you MUST provide three elements:
  - **Symptom:** What the user sees (e.g., "#N/A error appears").
  - **Cause:** Why Excel is throwing a tantrum (e.g., "Trailing spaces in the lookup value").
  - **Step-by-Step Fix:** Exactly how to resolve it gracefully.

### 6. Quick Reference (Bonus — for scannability)
- A compact summary table or bullet list of:
  - Syntax
  - Most common use case

### 7. Internal Links (CRITICAL FOR SEO)
- At the very bottom, add a section called "같이 보면 좋은 레시피 (Related Functions)"
- Provide 2 to 3 internal links to related Excel functions using Markdown format. 
- Example: \`[VLOOKUP 완벽 가이드](/recipes/vlookup)\`
- Use your knowledge of Excel to guess the slugs of related functions (slug is usually the function name in lowercase, e.g. \`index\`, \`match\`, \`sumifs\`, \`xlookup\`).
  - Key gotcha to avoid
  - Related functions to explore

═══════════════════════════════════════
[FEATURED SNIPPET OPTIMIZATION — seo-snippet-hunter skill]
═══════════════════════════════════════

These rules help our content appear as Google Featured Snippets (Position 0):

1. **Definition Snippet**: In "The Problem" section, include a clear 40-60 word definition:
   "What is [FUNCTION]? [FUNCTION] is an Excel function that [does X]. It is commonly used to [use case]."

2. **Step List Snippet**: In "The Recipe" section, use NUMBERED steps (1., 2., 3...) with BOLD step names:
   1. **Select Your Cell:** Click on cell C2...
   2. **Enter the Formula:** Type =VLOOKUP(...

3. **Table Snippet**: Include at least one parameter table with columns: Parameter | Description

4. **Troubleshooting as FAQ**: In "Troubleshooting", use ### sub-headings for each error:
   ### 1. #N/A Error
   - **What it looks like:** #N/A
   - **Why it happens:** ...
   - **How to fix it:** ...

This structure enables automatic HowTo + FAQPage Schema extraction.

═══════════════════════════════════════
[FINAL CHECKLIST - VERIFY BEFORE OUTPUT]
═══════════════════════════════════════
□ Article is 800+ words
□ Frontmatter has title (50-60 chars) and description (150-160 chars)
□ At least 2 markdown tables used
□ Real-world example with believable data
□ All common errors covered with solutions
□ Best practice included naturally
□ E-E-A-T signals present (experience, expertise references)
□ No filler sentences — every line teaches something
□ Function name appears naturally 8-12 times
□ Featured Snippet structure followed (definition, numbered steps, FAQ sub-headings)
`;

    console.log(`🍳 Generating SEO-optimized recipe for ${targetFunction.name} using ${MODEL_NAME}...`);

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up: remove markdown code fences if Gemini wraps output
        text = text.replace(/^```(?:\w+)?\n?/m, '').replace(/\n?```$/m, '');

        // Safety: ensure frontmatter title/description are quoted (prevent YAML colon issues)
        text = text.replace(/^(title:\s+)(?!")(.*[:'].*)$/gm, (_, prefix, val) => {
            return prefix + '"' + val.replace(/"/g, '\\"') + '"';
        });
        text = text.replace(/^(description:\s+)(?!")(.*[:'].*)$/gm, (_, prefix, val) => {
            return prefix + '"' + val.replace(/"/g, '\\"') + '"';
        });

        // Save file
        const slug = targetFunction.name.toLowerCase().replace(/ /g, '-').replace(/\//g, '-');
        const filename = `${slug}.mdx`;
        fs.writeFileSync(path.join(CONTENT_DIR, filename), text);

        // Quality check: word count
        const wordCount = text.split(/\s+/).length;
        console.log(`✅ Saved: ${filename} (${wordCount} words, ${text.length} bytes)`);

        if (wordCount < 600) {
            console.warn(`⚠️ Warning: Article is only ${wordCount} words. Target is 800+.`);
        }
    } catch (error) {
        console.error(`❌ Failed to generate for ${targetFunction.name}:`, error);
        process.exit(1);
    }
}

async function main() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ Error: GEMINI_API_KEY is not set.");
        console.error("   Please check .env file (local) or GitHub Repository Secrets (remote).");
        process.exit(1);
    }

    const db = await loadTruthDB();

    // Check for command line argument
    const targetName = process.argv[2];

    if (targetName) {
        const target = db.find(f => f.name.toLowerCase() === targetName.toLowerCase());
        if (!target) {
            console.error(`❌ Error: Function "${targetName}" not found in database.`);
            process.exit(1);
        }

        const slug = target.name.toLowerCase().replace(/ \+ /g, '-').replace(/ /g, '-').replace(/\//g, '-').replace(/\+/g, '');
        const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
        if (fs.existsSync(mdxPath)) {
            console.log(`⚠️  Skipping: Recipe for ${target.name} already exists at ${mdxPath}`);
            return;
        }

        console.log(`🎯 Targeted generation for: ${target.name}`);
        await generateRecipe(target);
        return;
    }

    // Find functions that don't have a recipe yet
    const ungenerated = db.filter(f => {
        const slug = f.name.toLowerCase().replace(/ /g, '-').replace(/\//g, '-');
        const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
        const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
        return !fs.existsSync(mdxPath) && !fs.existsSync(mdPath);
    });

    if (ungenerated.length === 0) {
        console.log("🎉 All recipes have been generated! Nothing to do.");
        return;
    }

    // Pick one random ungenerated function
    const target = ungenerated[Math.floor(Math.random() * ungenerated.length)];
    console.log(`📋 ${ungenerated.length} recipes remaining. Picking: ${target.name}`);
    await generateRecipe(target);
}

main();
