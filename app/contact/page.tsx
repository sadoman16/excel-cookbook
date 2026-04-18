import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Excel Cookbook',
    description:
        'Contact Excel Cookbook to report errors, suggest new topics, or ask questions about a guide.',
};

export default function ContactPage() {
    return (
        <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
            <h1>Contact</h1>

            <p>
                If you found an error, want to suggest a tutorial, or need clarification on a formula guide, feel
                free to get in touch.
            </p>

            <h2>Email</h2>
            <p>The fastest way to reach us is by email.</p>
            <p>
                <a
                    href="mailto:barakiki02@gmail.com"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-emerald-700 font-medium no-underline transition-colors hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
                >
                    barakiki02@gmail.com
                </a>
            </p>

            <h2>What To Include</h2>
            <ul>
                <li>The page URL if you are reporting an issue.</li>
                <li>The formula, function, or workflow you are trying to solve.</li>
                <li>The error message or unexpected result you are seeing.</li>
                <li>A short example of the data structure if context matters.</li>
            </ul>

            <h2>Recipe Suggestions</h2>
            <p>
                Reader suggestions are one of the main ways we improve coverage. If there is an Excel topic you want
                explained more clearly, send it over and we will review it for a future update or guide.
            </p>

            <h2>Corrections</h2>
            <p>
                Accuracy matters here. If you notice a formula issue, outdated behavior, or a weak example, email us
                with the page link and a short description so we can review it quickly.
            </p>

            <h2>Response Time</h2>
            <p>We usually reply within 1-2 business days.</p>
        </article>
    );
}
