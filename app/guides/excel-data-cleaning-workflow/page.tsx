import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'The Ultimate Excel Data Cleaning Workflow — 8 Steps to Perfect Data',
    description: 'Stop struggling with messy data. Follow our proven 8-step workflow to clean, validate, and standardize any Excel dataset.',
};

export default function CleaningWorkflowGuide() {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-3xl mx-auto px-4 py-12 prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-a:text-excel-green">
            <nav className="not-prose mb-6 text-sm text-slate-500 dark:text-slate-400">
                <Link href="/" className="hover:text-excel-green">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/guides" className="hover:text-excel-green">Guides</Link>
                <span className="mx-2">›</span>
                <span className="text-slate-900 dark:text-slate-50">Data Cleaning Workflow</span>
            </nav>

            <h1>The Ultimate Excel Data Cleaning Workflow</h1>
            <p className="lead text-lg text-slate-600 dark:text-slate-300">Clean data is the foundation of accurate analysis. Don&apos;t let hidden spaces and mismatched formats ruin your reports.</p>
            
            <p>Full guide coming soon! Learn how to use <Link href="/recipes/trim">TRIM</Link> and <Link href="/recipes/clean">CLEAN</Link> in our recipe library.</p>
        </article>
    );
}
