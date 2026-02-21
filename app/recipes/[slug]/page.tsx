import { getAllRecipeSlugs, getRecipeBySlug } from "@/lib/recipe-parser";
import { marked } from "marked";
import Link from "next/link";
import type { Metadata } from "next";
import { RecipeSchema } from "@/components/RecipeSchema";
import { extractHowToSteps, extractFAQItems } from "@/lib/schema-extractor";
import CopyHelper from "@/components/CopyHelper";
import { RelatedRecipes } from "@/components/ui/RelatedRecipes";
// Required for static export mode
export const dynamicParams = false;

// SSG: Generate all recipe pages at build time
export function generateStaticParams() {
    return getAllRecipeSlugs().map((slug) => ({ slug }));
}

// Dynamic metadata for each recipe page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const recipe = getRecipeBySlug(slug);
    if (!recipe) return { title: "Recipe Not Found" };

    return {
        title: `${recipe.title} - Excel Cookbook`,
        description: recipe.description,
    };
}

export default async function RecipePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const recipe = getRecipeBySlug(slug);

    if (!recipe) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    Recipe not found 😢
                </h1>
                <Link
                    href="/"
                    className="mt-4 text-excel-green underline hover:opacity-80"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    // Clean the content: remove markdown code fences that wrap the entire MDX
    let cleanContent = recipe.content;
    // Remove wrapping ```mdx or ```markdown fences from AI-generated content
    cleanContent = cleanContent.replace(/^```(?:mdx|markdown)?\s*\n/i, '');
    cleanContent = cleanContent.replace(/\n```\s*$/, '');

    // Convert markdown to HTML
    const htmlContent = await marked(cleanContent, {
        gfm: true,
        breaks: true,
    });

    // JSON-LD Schema: Article (existing)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: recipe.title,
        description: recipe.description,
        datePublished: recipe.date,
        author: {
            "@type": "Organization",
            name: "Excel Cookbook",
        },
        publisher: {
            "@type": "Organization",
            name: "Excel Cookbook",
        },
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://excel-cookbook.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Recipes",
                item: "https://excel-cookbook.com/recipes",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: recipe.title,
            },
        ],
    };

    // Extract structured data for HowTo + FAQ schemas (schema-markup + seo-snippet-hunter skills)
    const howToSteps = extractHowToSteps(recipe.content);
    const faqItems = extractFAQItems(recipe.content);

    return (
        <>
            {/* JSON-LD Schema: Article + Breadcrumb */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            {/* JSON-LD Schema: HowTo + FAQPage (for Google Rich Results) */}
            <RecipeSchema
                title={recipe.title}
                description={recipe.description}
                slug={slug}
                date={recipe.date}
                howToSteps={howToSteps}
                faqItems={faqItems}
            />

            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-slate-500 dark:text-slate-400">
                <Link href="/" className="hover:text-excel-green">
                    Home
                </Link>
                <span className="mx-2">›</span>
                <span className="text-slate-900 dark:text-slate-50">
                    {recipe.title}
                </span>
            </nav>

            {/* Tags */}
            {recipe.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {recipe.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-excel-green/10 px-3 py-1 text-xs font-medium text-excel-green"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Date */}
            <time className="mb-6 block text-sm text-slate-400">
                📅 {recipe.date}
            </time>

            {/* Recipe Content */}
            <CopyHelper slug={slug} />
            <article
                className="prose prose-slate max-w-none dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-a:text-excel-green prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono dark:prose-code:bg-slate-800 prose-pre:bg-slate-900 prose-pre:text-slate-50 dark:prose-pre:bg-slate-800"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Related Recipes feature to decrease bounce rate */}
            <RelatedRecipes currentSlug={slug} tags={recipe.tags} />
        </>
    );
}
