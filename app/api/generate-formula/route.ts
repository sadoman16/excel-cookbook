
import { NextResponse } from 'next/server';
import { generateFormulaWithFallback } from '@/lib/gemini';
import { getAllRecipes } from '@/lib/recipe-parser';

export async function POST(req: Request) {
    // Accessing headers forces Next.js to treat this route as dynamic
    // This fixes 405 Method Not Allowed (Static) without causing build-time errors
    const _forceDynamic = req.headers;

    try {
        const { query } = await req.json();

        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            return NextResponse.json(
                { error: 'Please describe your Excel problem.' },
                { status: 400 }
            );
        }

        if (query.length > 500) {
            return NextResponse.json(
                { error: 'Query is too long. Please summarize your problem.' },
                { status: 400 }
            );
        }


        // Generate formula using Gemini with Fallback Strategy
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

        // Use the fallback function
        const jsonText = await generateFormulaWithFallback(prompt);

        let data;
        try {
            data = JSON.parse(jsonText);
        } catch (e) {
            console.error("Failed to parse Gemini response:", jsonText);
            return NextResponse.json({ error: "AI response error" }, { status: 500 });
        }

        // Match related functions with existing recipes
        // Note: getAllRecipes() might cause build issues on Vercel if not handled carefully,
        // but we are restoring to "yesterday's state".
        const allRecipes = getAllRecipes();
        const relatedLinks = [];

        if (data.relatedFunctions && Array.isArray(data.relatedFunctions)) {
            for (const funcName of data.relatedFunctions) {
                const normalizedFunc = funcName.toLowerCase().trim();
                // Check if we have a recipe for this function
                // Our slugs are typically the function name (vlookup, xlookup, etc.)
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

    } catch (error) {
        console.error('Error generating formula:', error);
        return NextResponse.json(
            { error: 'Failed to generate formula. Please try again later.' },
            { status: 500 }
        );
    }
}
