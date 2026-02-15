import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About — Excel Cookbook',
    description: 'Learn about Excel Cookbook — your go-to resource for step-by-step Excel formula guides and error fixes.',
};

export default function AboutPage() {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-3xl mx-auto px-4 py-12">
            <h1>About Excel Cookbook</h1>

            <p className="lead text-lg text-slate-600 dark:text-slate-300">
                Stop Googling &quot;how to VLOOKUP.&quot; We built a better way.
            </p>

            <h2>Our Mission</h2>
            <p>
                Excel Cookbook is a free, open-source resource that turns confusing Excel formulas
                into easy-to-follow &quot;recipes.&quot; Every guide is structured like a cookbook:
                clear ingredients (function syntax), step-by-step instructions, and pro tips
                to avoid common mistakes.
            </p>

            <h2>Why We Built This</h2>
            <p>
                We&apos;ve spent years watching professionals struggle with the same Excel errors —
                #N/A from VLOOKUP, nested IFs that nobody can read, SUMIFS with mismatched ranges.
                Traditional documentation is dry and hard to follow. We believe learning formulas
                should feel like cooking: practical, hands-on, and maybe even fun.
            </p>

            <h2>How It Works</h2>
            <ul>
                <li>
                    <strong>Search by problem</strong> — Find the recipe that solves your specific issue
                </li>
                <li>
                    <strong>Follow the steps</strong> — Each recipe walks you through a real-world scenario
                </li>
                <li>
                    <strong>Copy the solution</strong> — Grab the formula and adapt it to your spreadsheet
                </li>
            </ul>

            <h2>What Makes Us Different</h2>
            <ul>
                <li>📖 <strong>Recipe-style format</strong> — Not just syntax docs, but real solutions</li>
                <li>⚠️ <strong>Error-first approach</strong> — We cover what goes wrong and how to fix it</li>
                <li>💡 <strong>Pro tips</strong> — Best practices from experienced Excel users</li>
                <li>🆓 <strong>100% free</strong> — No paywall, no signup required</li>
            </ul>

            <h2>Our Content</h2>
            <p>
                Every recipe on Excel Cookbook is carefully crafted to provide accurate, up-to-date
                information about Excel functions and formulas. We cover functions across all major
                categories including Lookup &amp; Reference, Logical, Math &amp; Trig, Statistical,
                Text, Dynamic Array, and Advanced functions.
            </p>

            <h2>Contact</h2>
            <p>
                Have a question, suggestion, or found an error? We&apos;d love to hear from you.
                Visit our <a href="/excel-cookbook/contact">Contact page</a> to get in touch.
            </p>
        </article>
    );
}
