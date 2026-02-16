
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ GEMINI_API_KEY is missing in .env file");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const MODEL_NAMES = [
    "gemini-2.0-flash",
    "gemini-1.5-pro"
];

async function testModel(modelName: string) {
    console.log(`\n🤖 Testing Model: ${modelName}...`);
    const start = Date.now();
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, are you working? Reply with 'Yes'.");
        const response = await result.response;
        const text = response.text();
        const duration = Date.now() - start;
        console.log(`✅ Success (${duration}ms): ${text}`);
    } catch (error: any) {
        const duration = Date.now() - start;
        console.error(`❌ Failed (${duration}ms): ${error.message}`);
    }
}

async function runDiagnostics() {
    console.log("🔍 Starting Gemini API Diagnostics...");

    for (const name of MODEL_NAMES) {
        await testModel(name);
    }

    console.log("\n🏁 Diagnostics Completed.");
}

runDiagnostics();
