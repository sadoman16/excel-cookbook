import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service — Excel Cookbook',
    description: 'Terms and conditions for using Excel Cookbook. Read our disclaimer and usage guidelines.',
};

export default function TermsPage() {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-3xl mx-auto px-4 py-12">
            <h1>Terms of Service</h1>
            <p className="text-sm text-slate-500">Last updated: February 15, 2025</p>

            <h2>Acceptance of Terms</h2>
            <p>
                By accessing and using Excel Cookbook (&quot;the Site&quot;), you agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do not use the Site.
            </p>

            <h2>Use of Content</h2>
            <p>
                All content on Excel Cookbook, including but not limited to text, formulas, code
                snippets, and guides, is provided for <strong>informational and educational purposes only</strong>.
            </p>
            <ul>
                <li>You may use our recipes and formulas in your own spreadsheets freely</li>
                <li>You may share links to our content</li>
                <li>You may not republish, reproduce, or redistribute our content in bulk without permission</li>
            </ul>

            <h2>Disclaimer</h2>
            <p>
                The information on this Site is provided &quot;as is&quot; without warranty of any kind.
                We make every effort to ensure accuracy, but we do not guarantee that formulas
                or solutions will work in every version of Excel or for every specific use case.
            </p>
            <p>
                <strong>Excel Cookbook is not affiliated with or endorsed by Microsoft Corporation.</strong>{' '}
                Excel is a registered trademark of Microsoft Corporation.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
                In no event shall Excel Cookbook be liable for any direct, indirect, incidental,
                special, or consequential damages arising from the use of our content, including
                but not limited to data loss, business interruption, or financial loss.
            </p>

            <h2>Third-Party Links</h2>
            <p>
                The Site may contain links to third-party websites. We are not responsible for
                the content, privacy policies, or practices of any third-party sites.
            </p>

            <h2>Advertising</h2>
            <p>
                Excel Cookbook may display advertisements provided by third-party ad networks,
                including Google AdSense. These ads may use cookies to serve relevant content.
                For more information, please see our{' '}
                <a href="/excel-cookbook/privacy">Privacy Policy</a>.
            </p>

            <h2>Changes to These Terms</h2>
            <p>
                We reserve the right to modify these Terms of Service at any time. Changes
                will be effective immediately upon posting to the Site. Your continued use of
                the Site after changes indicates your acceptance of the updated terms.
            </p>

            <h2>Contact</h2>
            <p>
                If you have any questions about these Terms, please contact us at:{' '}
                <a href="mailto:barakiki02@gmail.com">barakiki02@gmail.com</a>
            </p>
        </article>
    );
}
