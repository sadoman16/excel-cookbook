import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Complete Guide to Dynamic Arrays in Excel — Modern Formulas',
    description: 'Master FILTER, SORT, UNIQUE, and other spill-range functions. The future of Excel data analysis is here.',
};

export default function DynamicArraysGuide() {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-3xl mx-auto px-4 py-12 prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-a:text-excel-green">
            <nav className="not-prose mb-6 text-sm text-slate-500 dark:text-slate-400">
                <Link href="/" className="hover:text-excel-green">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/guides" className="hover:text-excel-green">Guides</Link>
                <span className="mx-2">›</span>
                <span className="text-slate-900 dark:text-slate-50">Dynamic Arrays Guide</span>
            </nav>

            <h1>The Complete Guide to Dynamic Arrays in Excel</h1>
            <p className="lead text-lg text-slate-600 dark:text-slate-300">Spill ranges are changing the way we think about rows and columns. Master them today.</p>
            
            <p>Full guide coming soon! In the meantime, check out our <Link href="/recipes/filter-basics">FILTER</Link> and <Link href="/recipes/unique-basics">UNIQUE</Link> recipes.</p>
        </article>
    );
}
