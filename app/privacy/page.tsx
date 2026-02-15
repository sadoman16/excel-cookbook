import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy — Excel Cookbook',
    description: 'How Excel Cookbook collects, uses, and protects your data. GDPR and CCPA compliant.',
};

export default function PrivacyPage() {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-3xl mx-auto px-4 py-12">
            <h1>Privacy Policy</h1>
            <p className="text-sm text-slate-500">Last updated: February 15, 2026</p>

            <h2>Who We Are</h2>
            <p>
                Excel Cookbook (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website{' '}
                <strong>https://excel-cookbook.com</strong>. This Privacy Policy explains how
                we collect, use, and protect information when you visit our site.
            </p>

            <h2>Information We Collect</h2>
            <h3>Automatically Collected Information</h3>
            <p>When you visit our site, we may automatically collect:</p>
            <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring URL</li>
                <li>Pages visited and time spent</li>
                <li>IP address (anonymized)</li>
            </ul>

            <h3>Cookies and Tracking Technologies</h3>
            <p>
                We and our third-party advertising partners use cookies, web beacons, and similar
                technologies to provide and improve our services. These technologies help us:
            </p>
            <ul>
                <li>Understand how visitors use our site</li>
                <li>Remember your preferences</li>
                <li>Deliver relevant advertisements</li>
            </ul>

            <h2>Third-Party Advertising</h2>
            <p>
                We use Google AdSense to display advertisements on our site. Google, as a third-party
                vendor, uses cookies to serve ads based on your prior visits to our website and other
                sites on the internet. Google&apos;s use of advertising cookies enables it and its partners
                to serve ads to you based on your visit to our site and/or other sites on the internet.
            </p>
            <p>
                You may opt out of personalized advertising by visiting{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                    Google Ads Settings
                </a>
                . Alternatively, you can opt out of third-party vendor cookies by visiting{' '}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
                    aboutads.info
                </a>
                .
            </p>

            <h2>How We Use Information</h2>
            <p>We use the collected information to:</p>
            <ul>
                <li>Provide and maintain our website</li>
                <li>Understand and analyze usage trends</li>
                <li>Improve user experience</li>
                <li>Display relevant advertisements</li>
            </ul>

            <h2>Data Retention</h2>
            <p>
                We retain automatically collected data for a reasonable period to fulfill the purposes
                outlined in this policy, unless a longer retention period is required by law.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Opt out of data collection and advertising cookies</li>
                <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h2>Children&apos;s Privacy</h2>
            <p>
                Our website is not directed to children under 13. We do not knowingly collect personal
                information from children under 13.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:barakiki02@gmail.com">barakiki02@gmail.com</a>
            </p>
        </article>
    );
}
