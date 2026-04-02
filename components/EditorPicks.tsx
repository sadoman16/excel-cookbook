import Link from 'next/link';

export function EditorPicks() {
    const picks = [
        {
            slug: 'vlookup-with-iferror',
            emoji: '🚑',
            title: 'Fix #N/A Errors Forever',
            desc: 'Wrap your VLOOKUPs safely so your dashboard never looks broken again.',
        },
        {
            slug: 'index-match',
            emoji: '👑',
            title: 'The INDEX MATCH Combo',
            desc: 'Stop breaking lookups when you insert a new column. The ultimate left-lookup.',
        },
        {
            slug: 'filter-with-multiple-and-or-conditions',
            emoji: '⚡',
            title: 'Master the FILTER array',
            desc: 'Use asterisk (*) and plus (+) logic to build powerful dynamic search bars.',
        },
        {
            slug: 'sumproduct-weighted-average',
            emoji: '⚖️',
            title: 'Weighted Averages',
            desc: 'The only mathematically correct way to calculate graded scores or portfolio yields.',
        }
    ];

    return (
        <section className="mx-auto max-w-5xl px-4 py-8 mb-4">
            <div className="flex flex-col items-center mb-6">
                <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 mb-3">
                    Editor&apos;s Picks
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                    🔥 Stop Searching. Start Here.
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    The 4 most critical recipes every professional uses daily. Plucked straight from the chef&apos;s personal notebook.
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
                        <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-50 group-hover:text-excel-green">
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
