import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ | Excel Cookbook',
    description:
        'Answers to common questions about Excel Cookbook, Excel formulas, troubleshooting, and guide coverage.',
};

const faqs = [
    {
        q: 'What is Excel Cookbook?',
        a: 'Excel Cookbook is a free website that publishes practical Excel guides, formula walkthroughs, and troubleshooting articles built around real spreadsheet tasks.',
    },
    {
        q: 'Who is Excel Cookbook for?',
        a: 'It is for anyone who uses Excel for work, study, or reporting. Some guides are beginner-friendly, while others focus on more advanced lookup, array, and reporting workflows.',
    },
    {
        q: 'Is everything on the site free?',
        a: 'Yes. The guides, examples, and browsing tools on Excel Cookbook are free to access.',
    },
    {
        q: 'How is this different from Microsoft documentation?',
        a: 'Microsoft documentation explains product behavior. Excel Cookbook focuses more on practical use cases, common mistakes, and examples that are easier to adapt to real spreadsheets.',
    },
    {
        q: 'Why is VLOOKUP returning #N/A?',
        a: 'Common causes include extra spaces, text-number mismatches, missing values, or using approximate match when you need exact match. Checking data type consistency and match mode usually solves it.',
    },
    {
        q: 'Should I use XLOOKUP instead of VLOOKUP?',
        a: 'If your Excel version supports XLOOKUP, usually yes. It is more flexible, handles exact matches more cleanly, and can return values from either direction.',
    },
    {
        q: 'What if my SUMIFS formula returns 0 even though data exists?',
        a: 'That often happens because numbers are stored as text, criteria ranges are mismatched, dates are not real Excel dates, or spaces are hiding in the source data.',
    },
    {
        q: 'Do these guides work in Google Sheets too?',
        a: 'Many core formulas work similarly, but compatibility varies. Functions such as XLOOKUP, LET, LAMBDA, and some newer dynamic array features may behave differently or be unavailable.',
    },
    {
        q: 'How often is the site updated?',
        a: 'Guides are reviewed and updated when examples need clarification, errors are reported, or stronger coverage is needed for an important Excel topic.',
    },
    {
        q: 'Can I request a topic?',
        a: 'Yes. Use the contact page to suggest a guide, report a mistake, or ask for a clearer explanation of a specific formula problem.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
};

export default function FAQPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <article className="mx-auto max-w-3xl px-4 py-12">
                <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-50 sm:text-4xl">
                    Frequently Asked Questions
                </h1>
                <p className="mb-10 text-lg text-slate-500 dark:text-slate-400">
                    Common questions about the site and common Excel troubleshooting topics.
                </p>

                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <details
                            key={i}
                            className="group rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-900/50"
                        >
                            <summary className="flex cursor-pointer select-none items-center justify-between gap-4 p-5 text-left font-semibold text-slate-900 dark:text-slate-50">
                                <span>{faq.q}</span>
                                <span className="flex-shrink-0 text-xl text-slate-400 transition-transform group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <div className="border-t border-slate-100 px-5 pb-5 pt-4 leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>

                <div className="mt-12 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-800 dark:bg-emerald-900/20">
                    <h2 className="mb-2 text-lg font-bold text-emerald-800 dark:text-emerald-300">
                        Still need help?
                    </h2>
                    <p className="mb-4 text-sm text-emerald-700 dark:text-emerald-400">
                        Send a question or correction request and we will review it as quickly as we can.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                    >
                        Contact
                    </a>
                </div>
            </article>
        </>
    );
}
