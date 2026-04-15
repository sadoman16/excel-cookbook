import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '7 Costly Excel Mistakes to Avoid — Business Best Practices',
    description: 'Learn the most common Excel errors that cause financial loss and how to fix them. A guide to building robust, error-free spreadsheets.',
};

export default function MistakesGuide() {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-3xl mx-auto px-4 py-12 prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-a:text-excel-green">
            <nav className="not-prose mb-6 text-sm text-slate-500 dark:text-slate-400">
                <Link href="/" className="hover:text-excel-green">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/guides" className="hover:text-excel-green">Guides</Link>
                <span className="mx-2">›</span>
                <span className="text-slate-900 dark:text-slate-50">7 Common Mistakes</span>
            </nav>

            <h1>7 Common Excel Mistakes That Cost Companies Thousands</h1>
            <p className="lead text-lg text-slate-600 dark:text-slate-300">Spreadsheets run the world, but they also run on human error. Here is how to prevent disaster.</p>
            
            <p>Full guide coming soon! In the meantime, browsing our <Link href="/">Recipes</Link> will help you avoid many of these common pitfalls by using battle-tested formula patterns.</p>
        </article>
    );
}
