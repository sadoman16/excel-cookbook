
import { NextResponse } from 'next/server';

// Use Edge Runtime to completely bypass Node.js build-time "page data collection" issues
// and ensure this is always dynamic (No 405 errors).
export const runtime = 'edge';

export async function POST(req: Request) {
    // Ensure dynamic behavior
    const _forceDynamic = req.headers.get('x-invoke-path');

    try {
        // Dynamic import inside handler to be extra safe
        const { generateFormulaWithFallback } = await import('@/lib/gemini');

        const { query } = await req.json();

        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            return NextResponse.json(
                { error: 'Please describe your Excel problem.' },
                { status: 400 }
            );
        }

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

        const jsonText = await generateFormulaWithFallback(prompt);

        let data;
        try {
            data = JSON.parse(jsonText);
        } catch (e) {
            console.error("Failed to parse Gemini response:", jsonText);
            return NextResponse.json({ error: "AI response error" }, { status: 500 });
        }

        return NextResponse.json({
            formula: data.formula,
            explanation: data.explanation,
            relatedFunctions: data.relatedFunctions || []
        });

    } catch (error: any) {
        console.error('Error generating formula:', error);
        return NextResponse.json(
            { error: `Failed: ${error.message}` },
            { status: 500 }
        );
    }
}
