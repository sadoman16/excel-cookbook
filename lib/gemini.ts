
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

/**
 * [2026 ground truth] Update to the real-time model names shown in the user's dashboard screenshot.
 * In case of 429 (Quota Exceeded), immediately fallback to the next model.
 */
const MODELS = [
    "gemini-3-flash",        // Priority 1: Latest model, speed first (confirmed in screenshot)
    "gemini-3-pro",          // Priority 2: Latest high-performance model (confirmed in screenshot)
    "gemini-2.5-pro",        // Priority 3: Stable high-performance (confirmed in screenshot)
    "gemini-2-flash",        // Priority 4: Previous generous free quota model (confirmed in screenshot)
    "gemini-2.5-flash",      // Priority 5: High chance of quota exhaustion (confirmed in screenshot)
];

export async function generateWithFallback(prompt: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError = null;

    for (const modelName of MODELS) {
        try {
            console.log(`🤖 [Final Deploy] Trying model: ${modelName}`);
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: formulaSchema,
                },
            });

            // Timeout optimized for Vercel environment
            const result: any = await Promise.race([
                model.generateContent(prompt),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 9500))
            ]);

            const response = await result.response;
            return response.text();
        } catch (error: any) {
            console.warn(`⚠️ ${modelName} failed (Reason: ${error.message}) -> Switching to the next model.`);
            lastError = error;
            // Fallback to next model for any error like 429(Quota), 404(Model Name), 500, etc.
            continue;
        }
    }
    throw lastError || new Error("All AI models are out of quota or under maintenance. Please try again later.");
}
