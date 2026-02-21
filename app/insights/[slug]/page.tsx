import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getInsightBySlug, getAllInsightSlugs } from '@/lib/insight-parser';
import { marked } from 'marked';
import { AuthorBio } from '@/components/ui/AuthorBio';

// Required for static export mode
export const dynamicParams = false;

export function generateStaticParams() {
    return getAllInsightSlugs().map((slug) => ({
        slug,
    }));
}

// Next.js 15+ requires params to be a Promise
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const insight = getInsightBySlug(slug);
    if (!insight) return {};

    return {
        title: `${insight.title} — Excel Cookbook Insights`,
        description: insight.description,
    };
}

export default async function InsightPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const insight = getInsightBySlug(slug);
    if (!insight) return notFound();

    const htmlContent = await marked(insight.content);

    return (
        <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
            {/* Header */}
            <header className="mb-10 text-center">
                <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {insight.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-excel-green/10 px-3 py-1 text-xs font-medium text-excel-green"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
                    {insight.title}
                </h1>
                <time className="block text-sm font-medium text-slate-500 dark:text-slate-400">
                    📅 {insight.date}
                </time>
                <div className="mx-auto mt-6 h-1 w-12 rounded bg-excel-green" />
            </header>

            {/* Content */}
            <article
                className="prose prose-slate max-w-none dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-a:text-excel-green prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono dark:prose-code:bg-slate-800 prose-pre:bg-slate-900 prose-pre:text-slate-50 dark:prose-pre:bg-slate-800"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* E-E-A-T Author Bio */}
            <div className="mt-16 mb-8">
                <AuthorBio />
            </div>

            <div className="text-center mt-8">
                <a href="/insights" className="text-excel-green font-semibold hover:underline">
                    &larr; Back to Insights
                </a>
            </div>
        </div>
    );
}
