
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
 * 긴급 수정: 존재하지 않는 모델명(gemini-1.5-pro)을 실제 API 명칭(gemini-1.5-pro-latest)으로 수정합니다.
 * Quota 부족 시(429) 다음 모델로 넘어가는 안정적인 로테이션 방식입니다.
 */
const MODELS = [
    "gemini-2.0-flash",           // 1순위 (빠르고 최신)
    "gemini-1.5-flash",           // 2순위 (무난함)
    "gemini-1.5-pro-latest",      // 3순위 (강력함, 404 방지를 위해 최신 식별자 사용)
    "gemini-1.5-flash-8b",        // 4순위 (가벼움)
];

export async function generateWithFallback(prompt: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError = null;

    for (const modelName of MODELS) {
        try {
            console.log(`🤖 어제처럼 안정적으로 시도 중: ${modelName}`);
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: formulaSchema,
                },
            });

            // Vercel 타임아웃(10초) 이내에 응답받도록 설정
            const result: any = await Promise.race([
                model.generateContent(prompt),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 9000))
            ]);

            const response = await result.response;
            return response.text();
        } catch (error: any) {
            console.warn(`⚠️ ${modelName} 모델 실패:`, error.message);
            lastError = error;
            // 429(할당량 초과) 또는 404(모델 없음) 시 다음 모델로 자동 이동
            continue;
        }
    }
    throw lastError || new Error("모든 AI 모델이 현재 응답할 수 없습니다.");
}
