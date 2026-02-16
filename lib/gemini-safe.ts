
import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";

/**
 * Generates content using Google Gemini API.
 * This file is designed to be imported dynamically to avoid build-time issues.
 * NO TOP-LEVEL VARIABLES OR EXECUTION outside of types/constants.
 */
export async function generateSafely(prompt: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing (runtime check)");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Schema definition inside function or as a pure constant is fine
    // But let's define schema dynamically to be 100% safe
    const formulaSchema: Schema = {
        type: SchemaType.OBJECT,
        properties: {
            formula: { type: SchemaType.STRING },
            explanation: { type: SchemaType.STRING },
            relatedFunctions: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING }
            },
        },
        required: ["formula", "explanation", "relatedFunctions"],
    };

    const modelName = "gemini-2.0-flash";
    const TIMEOUT_MS = 10000; // 10 seconds

    console.log(`🤖 [Safe Mode] Trying model: ${modelName}...`);

    try {
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: formulaSchema,
            },
        });

        // Simple timeout wrapper
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), TIMEOUT_MS)
        );

        const result: any = await Promise.race([
            model.generateContent(prompt),
            timeoutPromise
        ]);

        const response = await result.response;
        return response.text();

    } catch (error: any) {
        console.error("Gemini Error:", error);
        throw new Error(`Gemini failed: ${error.message}`);
    }
}
