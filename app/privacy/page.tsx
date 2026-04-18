import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Excel Cookbook',
    description:
        'Learn how Excel Cookbook handles analytics, cookies, advertising, and contact information.',
};

export default function PrivacyPage() {
    return (
        <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p className="text-sm text-slate-500">Last updated: April 18, 2026</p>

            <h2>Who We Are</h2>
            <p>
                Excel Cookbook operates the website <strong>https://excel-cookbook.com</strong>. This page explains
                what information may be collected when you visit the site and how that information may be used.
            </p>

            <h2>Information We Collect</h2>
            <p>When you browse the site, we may receive standard usage information such as:</p>
            <ul>
                <li>Browser type and device information</li>
                <li>Pages visited and approximate time spent on the site</li>
                <li>Referring page or source</li>
                <li>General location or anonymized IP-based analytics data</li>
            </ul>

            <h2>Cookies And Similar Technologies</h2>
            <p>
                We may use cookies or similar technologies to understand traffic, improve site performance, remember
                preferences, and support advertising and analytics tools.
            </p>

            <h2>Advertising</h2>
            <p>
                Excel Cookbook may display advertising through Google AdSense or similar advertising partners. These
                services may use cookies to serve ads based on your visits to this and other websites.
            </p>
            <p>
                You can learn more about how Google uses data in advertising by visiting{' '}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                    Google&apos;s advertising policies
                </a>
                . You can manage personalized ad settings through{' '}
                <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
                    Google Ad Settings
                </a>
                .
            </p>

            <h2>How We Use Information</h2>
            <ul>
                <li>To operate and maintain the website</li>
                <li>To understand which guides are useful and which need improvement</li>
                <li>To respond to reader questions or correction requests</li>
                <li>To support advertising and basic site analytics</li>
            </ul>

            <h2>Data Retention</h2>
            <p>
                We retain limited analytics and contact information only as long as reasonably necessary for site
                operations, reader support, and legal or administrative requirements.
            </p>

            <h2>Your Choices</h2>
            <p>Depending on your location, you may have the right to request access, correction, or deletion of data.</p>
            <p>
                You may also disable cookies in your browser settings or use available advertising opt-out tools
                offered by Google and other providers.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
                This website is not intended for children under 13, and we do not knowingly collect personal
                information from children.
            </p>

            <h2>Changes To This Policy</h2>
            <p>
                We may update this policy from time to time. Any updates will be posted on this page with a revised
                effective date.
            </p>

            <h2>Contact</h2>
            <p>
                If you have privacy-related questions, contact us at{' '}
                <a href="mailto:barakiki02@gmail.com">barakiki02@gmail.com</a>.
            </p>
        </article>
    );
}
