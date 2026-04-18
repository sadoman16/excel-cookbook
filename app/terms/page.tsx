import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Excel Cookbook',
    description:
        'Terms and conditions for using Excel Cookbook, including content usage, disclaimers, and contact information.',
};

export default function TermsPage() {
    return (
        <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
            <h1>Terms of Service</h1>
            <p className="text-sm text-slate-500">Last updated: April 18, 2026</p>

            <h2>Acceptance of Terms</h2>
            <p>
                By using Excel Cookbook, you agree to these terms. If you do not agree with them, please do not use
                the site.
            </p>

            <h2>Use of Content</h2>
            <p>
                Content on Excel Cookbook is provided for informational and educational purposes. You may use ideas,
                formulas, and workflows from the site in your own spreadsheets.
            </p>
            <ul>
                <li>You may use the formulas and examples in your own workbooks.</li>
                <li>You may share links to individual pages.</li>
                <li>You may not republish site content in bulk without permission.</li>
            </ul>

            <h2>Disclaimer</h2>
            <p>
                We make a good-faith effort to keep examples accurate and clear, but we do not guarantee that every
                formula will fit every workbook, Excel version, or business scenario.
            </p>
            <p>
                <strong>Excel Cookbook is not affiliated with or endorsed by Microsoft Corporation.</strong> Excel is
                a registered trademark of Microsoft Corporation.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
                Excel Cookbook is not liable for losses, errors, or damages resulting from the use of content on the
                site, including spreadsheet errors, reporting mistakes, or workflow interruptions.
            </p>

            <h2>Third-Party Links And Advertising</h2>
            <p>
                The site may link to third-party resources and may display advertisements, including advertising
                provided by Google AdSense or similar networks. We are not responsible for third-party site content
                or policies.
            </p>

            <h2>Changes To These Terms</h2>
            <p>
                We may update these terms from time to time. Continued use of the site after changes are posted means
                you accept the updated terms.
            </p>

            <h2>Contact</h2>
            <p>
                Questions about these terms can be sent to{' '}
                <a href="mailto:barakiki02@gmail.com">barakiki02@gmail.com</a>.
            </p>
        </article>
    );
}
