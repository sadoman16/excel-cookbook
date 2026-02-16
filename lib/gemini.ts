
import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";

// Ensure API key is available
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// Define available free models (Priority Order)
const MODEL_NAMES = [
    "gemini-2.0-flash-lite-preview-02-05", // 1st: Gemini 2 Flash Lite (Fastest) - Anti-timeout optimization
    "gemini-2.0-flash",                     // 2nd: Gemini 2 Flash (Smart & Fast)
    "gemini-1.5-pro",                       // 3rd: Gemini 1.5 Pro (Powerful)
    "gemma-2-27b-it",                       // 4th: Gemma 2 27B (Fallback)
];

export const formulaSchema: Schema = {
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


/**
 * Helper to add timeout to a promise.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, modelName: string): Promise<T> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timeout after ${ms}ms for model ${modelName}`));
        }, ms);

        promise
            .then((value) => {
                clearTimeout(timer);
                resolve(value);
            })
            .catch((reason) => {
                clearTimeout(timer);
                reject(reason);
            });
    });
}

/**
 * Generates content using a fallback strategy with strict timeouts.
 * Tries models in order until one succeeds within the time limit.
 */
export async function generateFormulaWithFallback(prompt: string) {
    let lastError = null;
    const TIMEOUT_MS = 3500; // 3.5 seconds per model to fit within Vercel's 10s limit

    for (const modelName of MODEL_NAMES) {
        try {
            console.log(`🤖 Trying model: ${modelName} (Timeout: ${TIMEOUT_MS}ms)...`);
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: formulaSchema,
                },
            });

            // Race against the timeout
            const result = await withTimeout(
                model.generateContent(prompt),
                TIMEOUT_MS,
                modelName
            );

            const response = await result.response;
            return response.text(); // Success! Return the JSON text
        } catch (error: any) {
            console.warn(`⚠️ Model ${modelName} failed or timed out:`, error.message);
            lastError = error;
            // Continue to next model immediately...
        }
    }

    // If all failed
    throw new Error(`All models failed. Last error: ${lastError?.message}`);
}
