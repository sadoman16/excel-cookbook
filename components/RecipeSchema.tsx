/**
 * RecipeSchema — Renders JSON-LD structured data for recipe pages.
 * Generates HowTo + FAQPage schemas for Google Rich Results.
 *
 * Skills used: schema-markup (JSON-LD design), seo-structure-architect (BreadcrumbList)
 *
 * @see https://schema.org/HowTo
 * @see https://schema.org/FAQPage
 */

import type { HowToStep, FAQItem } from '@/lib/schema-extractor';

interface RecipeSchemaProps {
    title: string;
    description: string;
    slug: string;
    date: string;
    howToSteps: HowToStep[];
    faqItems: FAQItem[];
}

export function RecipeSchema({
    title,
    description,
    slug,
    date,
    howToSteps,
    faqItems,
}: RecipeSchemaProps) {
    // --- HowTo Schema (schema-markup skill: HowTo is high-impact for step-by-step content) ---
    const howToSchema = howToSteps.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: title,
            description: description,
            datePublished: date,
            image: `https://excel-cookbook.com/og/${slug}.png`,
            totalTime: 'PT5M',
            tool: [
                {
                    '@type': 'HowToTool',
                    name: 'Microsoft Excel',
                },
            ],
            step: howToSteps.map((step, index) => ({
                '@type': 'HowToStep',
                position: index + 1,
                name: step.name,
                text: step.text,
                url: `https://excel-cookbook.com/recipes/${slug}#step-${index + 1}`,
            })),
        }
        : null;

    // --- FAQPage Schema (schema-markup skill: FAQPage for troubleshooting sections) ---
    const faqSchema = faqItems.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        }
        : null;

    return (
        <>
            {howToSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
                />
            )}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
        </>
    );
}
