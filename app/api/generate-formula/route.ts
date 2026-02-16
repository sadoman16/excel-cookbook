
import { NextResponse } from 'next/server';
import { generateWithFallback } from '@/lib/gemini';
import { getAllRecipes } from '@/lib/recipe-parser';

// GitHub Actions 빌드 시 'output: export'와 충돌하는 것을 방지하기 위해 조건부 설정을 사용하려 했으나, 
// POST 핸들러는 기본적으로 동적(dynamic)으로 작동하므로 에러 방지를 위해 해당 줄을 제거하거나 아래와 같이 변경합니다.
export const dynamic = process.env.GITHUB_ACTIONS === 'true' ? 'auto' : 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            return NextResponse.json({ error: 'Please describe your Excel problem.' }, { status: 400 });
        }

        const prompt = `
            You are an expert Excel consultant.
            A user asked: "${query}"
            Provide the best Excel formula to solve this problem in JSON format.
        `;

        // Use the fallback logic to handle Quota (429) errors
        const jsonText = await generateWithFallback(prompt);

        let data;
        try {
            data = JSON.parse(jsonText);
        } catch (e) {
            return NextResponse.json({ error: "AI response parsing error" }, { status: 500 });
        }

        // Related Links logic
        const allRecipes = getAllRecipes();
        const relatedLinks = [];

        if (data.relatedFunctions && Array.isArray(data.relatedFunctions)) {
            for (const funcName of data.relatedFunctions) {
                const normalizedFunc = funcName.toLowerCase().trim();
                const matchingRecipe = allRecipes.find(r =>
                    r.slug === normalizedFunc ||
                    r.title.toLowerCase().includes(normalizedFunc)
                );
                if (matchingRecipe) {
                    relatedLinks.push({
                        name: funcName,
                        slug: matchingRecipe.slug,
                        title: matchingRecipe.title
                    });
                }
            }
        }

        return NextResponse.json({
            formula: data.formula,
            explanation: data.explanation,
            relatedLinks: relatedLinks
        });

    } catch (error: any) {
        console.error('Final Error:', error);
        return NextResponse.json(
            { error: `Sorry, we are busy. Please try again in a moment. (${error.message})` },
            { status: 500 }
        );
    }
}
