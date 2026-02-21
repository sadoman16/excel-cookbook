import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getInsightBySlug, getAllInsightSlugs } from '@/lib/insight-parser';
import CopyHelper from '@/components/CopyHelper';
import { AuthorBio } from '@/components/ui/AuthorBio';

export const dynamicParams = true;

export function generateStaticParams() {
    return getAllInsightSlugs().map((slug) => ({
        slug,
    }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const insight = getInsightBySlug(params.slug);
    if (!insight) return {};

    return {
        title: `${insight.title} — Excel Cookbook Insights`,
        description: insight.description,
    };
}

// Convert markdown to super simple HTML for display (in real app we use mdx-remote, but keeping it simple for now)
function simpleMarkdownToHtml(markdown: string) {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/<\/li>\n<li>/gim, '</li><li>');
    html = html.replace(/<li>(.*?)<\/li>/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\n<ul>/gim, '');

    // Line breaks for paragraphs
    html = html.replace(/\n\n/g, '<br/><br/>');

    return html;
}

export default function InsightPage({ params }: { params: { slug: string } }) {
    const insight = getInsightBySlug(params.slug);
    if (!insight) return notFound();

    const htmlContent = simpleMarkdownToHtml(insight.content);

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
            <CopyHelper slug={insight.slug} />
            <article
                className="prose prose-slate max-w-none dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-a:text-excel-green"
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
