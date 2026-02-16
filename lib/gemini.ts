
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
 * [2026 ground truth] 사용자의 대시보드 스크린샷에 표시된 실시간 모델 명칭으로 업데이트합니다.
 * 429(할당량 초과) 발생 시 다음 모델로 즉시 전환합니다.
 */
const MODELS = [
    "gemini-3-flash",        // 1순위: 최신 모델, 속도 최우선 (스크린샷 확인됨)
    "gemini-3-pro",          // 2순위: 최신 고성능 모델 (스크린샷 확인됨)
    "gemini-2.5-pro",        // 3순위: 안정적인 고성능 (스크린샷 확인됨)
    "gemini-2-flash",        // 4순위: 이전 무료 할당량 넉넉한 모델 (스크린샷 확인됨)
    "gemini-2.5-flash",      // 5순위: 할당량 소진 가능성 높음 (스크린샷 확인됨)
];

export async function generateWithFallback(prompt: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const genAI = new GoogleGenerativeAI(apiKey);
    let lastError = null;

    for (const modelName of MODELS) {
        try {
            console.log(`🤖 [최종 배포] 모델 시도 중: ${modelName}`);
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: formulaSchema,
                },
            });

            // Vercel 환경에 최적화된 타임아웃
            const result: any = await Promise.race([
                model.generateContent(prompt),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 9500))
            ]);

            const response = await result.response;
            return response.text();
        } catch (error: any) {
            console.warn(`⚠️ ${modelName} 실패 (사유: ${error.message}) -> 다음 모델로 전환합니다.`);
            lastError = error;
            // 429(Quota), 404(Model Name), 500 등 모든 에러 발생 시 다음 모델로 폴백
            continue;
        }
    }
    throw lastError || new Error("모든 AI 모델이 할당량 초과 또는 점검 중입니다. 잠시 후 다시 시도해주세요.");
}
