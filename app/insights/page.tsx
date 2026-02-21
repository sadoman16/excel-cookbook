import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllInsights } from '@/lib/insight-parser';

export const metadata: Metadata = {
    title: 'Excel Tips & Insights — Excel Cookbook',
    description: 'Expert advice, real-world spreadsheet survival stories, and advanced tactics from a 10-year Financial Analyst.',
};

export default function InsightsPage() {
    const insights = getAllInsights();

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 md:p-12">
            <header className="mb-12">
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
                    <span className="text-excel-green">Insights &</span> Tips
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                    Real-world war stories and advanced tactics from a 10-year Financial Analyst.
                    No fluff, just what actually works when the month-end close is due in 3 hours.
                </p>
            </header>

            <div className="grid gap-6">
                {insights.length === 0 ? (
                    <p className="text-slate-500">Coming soon! Preparing our first data deep-dive...</p>
                ) : (
                    insights.map((insight) => (
                        <Link
                            key={insight.slug}
                            href={`/insights/${insight.slug}`}
                            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-excel-green hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-excel-green"
                        >
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {insight.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <time className="text-xs font-medium text-slate-400">
                                        📅 {insight.date}
                                    </time>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-excel-green dark:text-slate-50">
                                    {insight.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                    {insight.description}
                                </p>
                            </div>
                            <div className="mt-4 flex items-center text-sm font-semibold text-excel-green">
                                Read article <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
