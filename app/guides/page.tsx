import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Excel Guides & Tutorials — Excel Cookbook',
    description: 'In-depth Excel guides, comparisons, and tutorials written by experienced analysts. Go beyond formulas — master real-world Excel workflows.',
};

const guides = [
    {
        slug: 'vlookup-vs-index-match-vs-xlookup',
        emoji: '⚔️',
        title: 'VLOOKUP vs INDEX MATCH vs XLOOKUP — The Definitive Comparison',
        excerpt: 'Which lookup function should you use in 2026? We break down speed, flexibility, readability, and compatibility so you can choose the right tool for every situation.',
        readTime: '12 min read',
        category: 'Comparison',
    },
    {
        slug: 'top-10-excel-functions-2026',
        emoji: '🏆',
        title: '10 Excel Functions Every Professional Must Know in 2026',
        excerpt: 'From XLOOKUP to LAMBDA — the essential functions that separate Excel beginners from power users. With real-world examples from finance, HR, and operations.',
        readTime: '15 min read',
        category: 'Essential',
    },
    {
        slug: 'excel-beginners-mistakes',
        emoji: '🚫',
        title: '7 Common Excel Mistakes That Cost Companies Thousands',
        excerpt: 'Volatile functions draining performance. VLOOKUP breaking after column inserts. Hardcoded values hiding in formulas. Learn how to avoid these costly traps.',
        readTime: '10 min read',
        category: 'Best Practices',
    },
    {
        slug: 'dynamic-arrays-complete-guide',
        emoji: '✨',
        title: 'The Complete Guide to Dynamic Arrays in Excel',
        excerpt: 'FILTER, SORT, UNIQUE, SEQUENCE, and more — dynamic arrays changed Excel forever. This guide covers everything from basics to advanced spill-range patterns.',
        readTime: '18 min read',
        category: 'Deep Dive',
    },
    {
        slug: 'excel-data-cleaning-workflow',
        emoji: '🧹',
        title: 'The Ultimate Excel Data Cleaning Workflow',
        excerpt: 'Messy data? Follow this battle-tested 8-step workflow to clean, standardize, and validate any dataset. Includes formulas for removing duplicates, fixing dates, and trimming whitespace.',
        readTime: '14 min read',
        category: 'Workflow',
    },
];

export default function GuidesPage() {
    return (
        <article className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    Expert Guides
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                    📚 In-Depth Excel Guides
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                    Go beyond quick recipes. These long-form tutorials and comparisons are
                    written by experienced analysts to help you truly master Excel.
                </p>
            </div>

            <div className="space-y-6">
                {guides.map((guide) => (
                    <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className="group block rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-excel-green"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-3xl group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
                                {guide.emoji}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                                        {guide.category}
                                    </span>
                                    <span className="text-xs text-slate-400">{guide.readTime}</span>
                                </div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 group-hover:text-excel-green transition-colors mb-1.5">
                                    {guide.title}
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {guide.excerpt}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-sm text-slate-400">
                    More guides coming soon. Have a topic you&apos;d like covered?{' '}
                    <Link href="/contact" className="text-excel-green hover:underline">Let us know</Link>.
                </p>
            </div>
        </article>
    );
}
