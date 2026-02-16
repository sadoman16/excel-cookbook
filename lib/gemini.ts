
import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";

const formulaSchema: Schema = {
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

// Available models to rotate if quota is exceeded
const MODELS = [
    "gemini-2.0-flash",           // Primary
    "gemini-1.5-flash",           // Fallback 1
    "gemini-1.5-flash-8b",        // Fallback 2
    "gemini-1.5-pro",             // Fallback 3
];

export async function generateWithFallback(prompt: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError = null;

    for (const modelName of MODELS) {
        try {
            console.log(`Trying model: ${modelName}`);
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: formulaSchema,
                },
            });

            // Add a safety timeout (10s)
            const result = await Promise.race([
                model.generateContent(prompt),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 10000))
            ]) as any;

            const response = await result.response;
            return response.text();
        } catch (error: any) {
            console.warn(`Model ${modelName} failed:`, error.message);
            lastError = error;
            // If it's a quota error (429), the loop continues to the next model automatically
            if (error.message.includes("429") || error.message.includes("quota")) {
                continue;
            }
            // For other critical errors, we might still want to try the next one
        }
    }
    throw lastError || new Error("All models failed");
}
