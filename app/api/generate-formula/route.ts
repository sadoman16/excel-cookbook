
import { NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';
import { getAllRecipes } from '@/lib/recipe-parser';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            return NextResponse.json(
                { error: 'Please describe your Excel problem.' },
                { status: 400 }
            );
        }

        // 1. Get the model instance (Lazy)
        const model = await getGeminiModel();

        const prompt = `
            You are an expert Excel consultant.
            A user asked: "${query}"

            Provide the best Excel formula to solve this problem.
            Follow these rules:
            1. Use modern Excel functions (XLOOKUP, FILTER, LET) if appropriate, but provide standard alternatives if complex.
            2. Assume typical data ranges (e.g., A1:A10) if not specified.
            3. Explanation should be beginner-friendly.
            4. Suggest 1-3 related Excel functions that are relevant.
        `;

        // 2. Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonText = response.text();

        let data;
        try {
            data = JSON.parse(jsonText);
        } catch (e) {
            console.error("Failed to parse Gemini response:", jsonText);
            return NextResponse.json({ error: "AI response parsing error" }, { status: 500 });
        }

        // 3. Related Links logic (remains as yesterday)
        const allRecipes = getAllRecipes();
        const relatedLinks = [];

        if (data.relatedFunctions && Array.isArray(data.relatedFunctions)) {
            for (const funcName of data.relatedFunctions) {
                const normalizedFunc = funcName.toLowerCase().trim();
                const matchingRecipe = allRecipes.find(r =>
                    r.slug === normalizedFunc ||
                    r.title.toLowerCase().includes(normalizedFunc) ||
                    r.tags.some(t => t.toLowerCase() === normalizedFunc)
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
        console.error('Error generating formula:', error);
        // Return a bit more detail to help debug on Vercel
        return NextResponse.json(
            { error: `Generation failed: ${error.message || 'Unknown error'}` },
            { status: 500 }
        );
    }
}
