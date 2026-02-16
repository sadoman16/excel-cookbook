import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";

// Cache for the AI instance
let genAI: any = null;

function getGenAI() {
    if (!genAI) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn("⚠️ Warning: GEMINI_API_KEY is not set.");
        }
        genAI = new GoogleGenerativeAI(apiKey || "");
    }
    return genAI;
}

// Define available models (Fallback Strategy)
const MODEL_NAMES = [
    "gemini-2.0-flash-lite-preview-02-05",
    "gemini-2.0-flash",
    "gemini-1.5-pro",
    "gemma-2-27b-it",
];

export const formulaSchema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
        formula: { type: SchemaType.STRING },
        explanation: { type: SchemaType.STRING },
        relatedFunctions: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
        },
    },
    required: ["formula", "explanation", "relatedFunctions"],
};

function withTimeout<T>(promise: Promise<T>, ms: number, modelName: string): Promise<T> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timeout after ${ms}ms for model ${modelName}`));
        }, ms);
        promise.then((v) => { clearTimeout(timer); resolve(v); })
            .catch((e) => { clearTimeout(timer); reject(e); });
    });
}

export async function generateFormulaWithFallback(prompt: string) {
    let lastError = null;
    const TIMEOUT_MS = 3500; // Original 3.5s per model

    for (const modelName of MODEL_NAMES) {
        try {
            console.log(`🤖 Trying model: ${modelName}...`);
            const model = getGenAI().getGenerativeModel({
                model: modelName,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: formulaSchema,
                },
            });

            const result: any = await withTimeout(
                model.generateContent(prompt),
                TIMEOUT_MS,
                modelName
            );

            const response = await result.response;
            return response.text();
        } catch (error: any) {
            console.warn(`⚠️ ${modelName} failed:`, error.message);
            lastError = error;
        }
    }
    throw new Error(`All models failed: ${lastError?.message}`);
}
