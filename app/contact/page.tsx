import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us — Excel Cookbook',
    description: 'Get in touch with the Excel Cookbook team. Report errors, suggest new recipes, or ask questions.',
};

export default function ContactPage() {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-3xl mx-auto px-4 py-12">
            <h1>Contact Us</h1>

            <p>
                We&apos;d love to hear from you! Whether you have a question about a recipe,
                found an error, or want to suggest a new Excel function to cover — reach out anytime.
            </p>

            <h2>📧 Email</h2>
            <p>
                The best way to reach us is via email:
            </p>
            <p>
                <a
                    href="mailto:excelcookbook.help@gmail.com"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-emerald-700 font-medium no-underline hover:bg-emerald-100 transition-colors dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
                >
                    excelcookbook.help@gmail.com
                </a>
            </p>

            <h2>💡 Suggest a Recipe</h2>
            <p>
                Is there an Excel function or formula you&apos;re struggling with?
                Let us know and we&apos;ll add it to our recipe queue! Just email us with:
            </p>
            <ul>
                <li>The Excel function or formula you need help with</li>
                <li>The specific problem you&apos;re trying to solve</li>
                <li>Any error messages you&apos;re seeing</li>
            </ul>

            <h2>🐛 Report an Error</h2>
            <p>
                Found a mistake in one of our recipes? We take accuracy seriously.
                Please email us the recipe URL and a description of the error, and we&apos;ll
                fix it as soon as possible.
            </p>

            <h2>Response Time</h2>
            <p>
                We typically respond within 1–2 business days. Thank you for your patience!
            </p>
        </article>
    );
}
