import Link from 'next/link';

export function EditorPicks() {
    const picks = [
        {
            slug: 'vlookup-with-iferror',
            emoji: '🛟',
            title: 'Fix #N/A Errors Cleanly',
            desc: 'Wrap lookups safely so reports stay readable even when data is missing.',
        },
        {
            slug: 'index-match',
            emoji: '🧭',
            title: 'Learn INDEX MATCH',
            desc: 'A more flexible lookup pattern that keeps working when tables change.',
        },
        {
            slug: 'filter-with-multiple-and-or-conditions',
            emoji: '🔎',
            title: 'Master FILTER Logic',
            desc: 'Combine AND and OR conditions to build dynamic search-style worksheet views.',
        },
        {
            slug: 'sumproduct-weighted-average',
            emoji: '⚖️',
            title: 'Weighted Average Formulas',
            desc: 'Calculate grades, scores, or portfolio returns with the right weighting logic.',
        },
    ];

    return (
        <section className="mx-auto mb-4 max-w-5xl px-4 py-8">
            <div className="mb-6 flex flex-col items-center">
                <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                    Editor&apos;s Picks
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                    Start with the most useful guides
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    These are strong starting points for common Excel lookup, filtering, and reporting tasks.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {picks.map((pick) => (
                    <Link
                        key={pick.slug}
                        href={`/recipes/${pick.slug}`}
                        prefetch={false}
                        className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-excel-green hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-excel-green"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-2xl dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30">
                            {pick.emoji}
                        </div>
                        <h3 className="mb-2 font-semibold text-slate-900 group-hover:text-excel-green dark:text-slate-50">
                            {pick.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            {pick.desc}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
