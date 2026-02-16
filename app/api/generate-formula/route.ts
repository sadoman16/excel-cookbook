
import { NextResponse } from 'next/server';
import { generateWithFallback } from '@/lib/gemini';
import { getAllRecipes } from '@/lib/recipe-parser';

export const dynamic = 'force-dynamic';


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
