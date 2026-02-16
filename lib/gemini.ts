
import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";

// Ensure API key is available
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// Schema for structured JSON output
const formulaSchema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
        formula: {
            type: SchemaType.STRING,
            description: "The complete, ready-to-use Excel formula solving the user's problem.",
        },
        explanation: {
            type: SchemaType.STRING,
            description: "A clear, step-by-step explanation of how the formula works, written for a beginner.",
        },
        relatedFunctions: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "A list of 1-3 Excel function names (uppercase) that are used in the formula or are highly relevant (e.g., 'VLOOKUP', 'IF').",
        },
    },
    required: ["formula", "explanation", "relatedFunctions"],
};

// Yesterday's single model export
export const formulaModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: formulaSchema,
    },
});
