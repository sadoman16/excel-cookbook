import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Excel Cookbook',
    description:
        'Meet the editor behind Excel Cookbook and learn how each guide is reviewed for clarity, accuracy, and real-world usefulness.',
};

export default function AboutPage() {
    return (
        <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
            <h1>About Excel Cookbook</h1>

            <p className="lead text-lg text-slate-600 dark:text-slate-300">
                Excel Cookbook exists to make spreadsheet work less frustrating and more dependable.
            </p>

            <h2>Who Runs This Site</h2>
            <div className="not-prose my-8 flex flex-col items-center gap-6 rounded-xl border border-slate-200 bg-slate-50 p-6 md:flex-row md:items-start dark:border-slate-700 dark:bg-slate-800/50">
                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-excel-green text-3xl font-bold text-white shadow-md sm:h-32 sm:w-32 sm:text-4xl">
                    EC
                </div>
                <div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                        Daniel Park, Editor and Lead Analyst
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        Excel Cookbook is edited by Daniel Park, a spreadsheet-focused analyst and documentation
                        writer with more than a decade of experience working around month-end reporting, budget
                        models, operations dashboards, and cleanup-heavy exports from business systems.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        The site started from a simple observation: most Excel help pages explain syntax, but they
                        do not explain the messy real-world situation that causes someone to search for help in the
                        first place. This project is built to close that gap with practical examples, plain-English
                        guidance, and repeatable fixes.
                    </p>
                </div>
            </div>

            <h2>What We Publish</h2>
            <p>
                We publish Excel tutorials, formula walkthroughs, troubleshooting guides, and quick-reference
                articles for people who need to solve a concrete spreadsheet problem. The focus is on practical
                business use cases such as lookups, cleanup workflows, reporting formulas, date logic, and dynamic
                arrays.
            </p>

            <h2>How Articles Are Reviewed</h2>
            <ul>
                <li>Each article is checked against Excel syntax and expected behavior before publishing.</li>
                <li>Examples are written to reflect realistic worksheet scenarios, not abstract textbook samples.</li>
                <li>Pages are updated when wording is unclear, examples are weak, or readers report issues.</li>
                <li>We prioritize clarity, accuracy, and usefulness over publishing volume.</li>
            </ul>

            <h2>Editorial Approach</h2>
            <p>
                Excel Cookbook is designed to be approachable for beginners without becoming shallow for experienced
                users. That means articles aim to explain not just the final formula, but also when to use it, what
                can go wrong, and what a safer or cleaner alternative looks like.
            </p>

            <h2>Why The Site Uses A Cookbook Format</h2>
            <p>
                A good Excel formula often feels like a recipe: you need the right ingredients, the right sequence,
                and a few caution notes to avoid common mistakes. That format helps readers move from confusion to a
                working answer quickly, especially when they are under pressure to finish a task.
            </p>

            <h2>Contact</h2>
            <p>
                If you spot an error, want to suggest a topic, or need clarification on a guide, visit our{' '}
                <a href="/contact">Contact page</a>. Reader feedback is one of the main ways we improve the site.
            </p>
        </article>
    );
}
