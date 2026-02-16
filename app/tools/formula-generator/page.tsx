
import type { Metadata } from 'next';
import { ClientFormulaGenerator } from './ClientFormulaGenerator';

export const metadata: Metadata = {
    title: 'Free Excel Formula Generator - AI Powered | Excel Cookbook',
    description: 'Describe your Excel problem in plain English and get the perfect formula instantly. Free AI tool powered by Gemini.',
    openGraph: {
        title: 'Free Excel Formula Generator - AI Powered',
        description: 'Stop struggling with Excel formulas. Describe your problem, get the solution instantly.',
        type: 'website',
    },
};

export default function FormulaGeneratorPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Excel Formula Generator",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "description": "AI-powered tool to generate Excel formulas from natural language descriptions."
                    })
                }}
            />

            <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-excel-green/10 text-excel-green text-sm font-medium border border-excel-green/20">
                        <span className="mr-2">✨</span> AI-Powered Excel Assistant
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6 tracking-tight">
                        Turn Your Problems into <span className="text-excel-green">Formulas</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Describe what you want to calculate in plain English, and our AI will write the perfect Excel formula for you. No more memorizing syntax.
                    </p>
                </div>

                <ClientFormulaGenerator />

            </main>
        </div>
    );
}
