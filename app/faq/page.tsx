import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ — Excel Cookbook | Frequently Asked Questions',
    description: 'Find answers to common questions about Excel formulas, functions, errors, and how to use Excel Cookbook effectively.',
};

const faqs = [
    {
        q: 'What is Excel Cookbook?',
        a: 'Excel Cookbook is a free online resource that transforms confusing Excel formulas into easy-to-follow "recipes." Each guide includes clear syntax, step-by-step instructions, real-world examples, and pro tips to avoid common mistakes.',
    },
    {
        q: 'Who is Excel Cookbook for?',
        a: 'Anyone who uses Microsoft Excel — from beginners learning their first VLOOKUP to seasoned analysts optimizing complex array formulas. Our guides cover Beginner, Intermediate, Advanced, and Expert levels.',
    },
    {
        q: 'Is Excel Cookbook really free?',
        a: 'Yes, 100%. All recipes, guides, and tools on Excel Cookbook are completely free with no signup or paywall required. We believe everyone deserves access to clear, practical Excel education.',
    },
    {
        q: 'How is Excel Cookbook different from Microsoft documentation?',
        a: 'Microsoft docs focus on syntax definitions. We focus on solving real problems. Every recipe includes a real-world scenario ("When would I actually use this?"), common mistakes to avoid, and copy-paste formulas you can adapt immediately.',
    },
    {
        q: 'How do I fix #N/A errors in VLOOKUP?',
        a: 'The most common cause is a mismatched lookup value. Wrap your VLOOKUP in IFERROR to handle missing matches gracefully: =IFERROR(VLOOKUP(A2, data, 2, FALSE), "Not Found"). Check our dedicated recipe on VLOOKUP with IFERROR for a complete walkthrough.',
    },
    {
        q: 'What is the difference between VLOOKUP and INDEX MATCH?',
        a: 'VLOOKUP can only search left-to-right and breaks when columns are inserted. INDEX MATCH is more flexible — it works in any direction, handles column insertions gracefully, and is generally faster on large datasets. We recommend learning INDEX MATCH as your primary lookup method.',
    },
    {
        q: 'Should I use XLOOKUP instead of VLOOKUP?',
        a: 'If you have Microsoft 365 or Excel 2021+, yes. XLOOKUP replaces VLOOKUP, HLOOKUP, and most INDEX MATCH use cases with cleaner syntax. It supports exact/approximate matches, reverse search, and wildcards natively. Check our XLOOKUP recipe for details.',
    },
    {
        q: 'What are Dynamic Array formulas?',
        a: 'Dynamic Arrays (FILTER, SORT, UNIQUE, SORTBY, SEQUENCE, etc.) are modern Excel functions available in Microsoft 365. They "spill" results into multiple cells automatically, eliminating the need for Ctrl+Shift+Enter. They are a game-changer for data analysis.',
    },
    {
        q: 'How do I combine multiple IF statements without going crazy?',
        a: 'Use IFS() (available in Excel 2019+/365) or SWITCH() for cleaner multi-condition logic. For older versions, nest your IFs carefully with proper indentation. Our Nested IF and IFS recipes walk you through both approaches with real examples.',
    },
    {
        q: 'What is the best way to count cells with multiple conditions?',
        a: 'Use COUNTIFS for straightforward multi-criteria counting. For more complex conditions (OR logic, partial matches), use SUMPRODUCT. Example: =COUNTIFS(A:A, "Sales", B:B, ">1000") counts rows where column A is "Sales" AND column B exceeds 1000.',
    },
    {
        q: 'How do I extract text from a cell in Excel?',
        a: 'Use LEFT(), RIGHT(), and MID() for position-based extraction. For smarter extraction, use TEXTBEFORE() and TEXTAFTER() (Microsoft 365). For patterns, combine FIND/SEARCH with MID. Our Text Functions category has dedicated recipes for each method.',
    },
    {
        q: 'Why does my SUMIFS return 0 when data exists?',
        a: 'Common causes: (1) Numbers stored as text — select the column and use "Convert to Number". (2) Extra spaces — wrap criteria in TRIM(). (3) Mismatched range sizes — all SUMIFS ranges must be the same size. (4) Date formatting issues — use DATE() function instead of text dates.',
    },
    {
        q: 'How often is new content added?',
        a: 'We publish new recipes regularly. Follow our site to stay updated with the latest Excel tips, function guides, and workflow tutorials. We currently have over 500 recipes covering all major Excel function categories.',
    },
    {
        q: 'Can I use these formulas in Google Sheets?',
        a: 'Most basic formulas (VLOOKUP, IF, SUMIFS, etc.) work identically in Google Sheets. However, some advanced functions like XLOOKUP, LET, and LAMBDA may have different syntax or availability. We note compatibility differences where relevant.',
    },
    {
        q: 'How do I suggest a new recipe or report an error?',
        a: 'Visit our Contact page and email us at barakiki02@gmail.com. We take accuracy seriously and typically respond within 1-2 business days. We love hearing about real-world Excel challenges our readers face!',
    },
    {
        q: 'What Excel version do I need for these recipes?',
        a: 'Each recipe notes compatible versions. Most work with Excel 2016 and later. Recipes using XLOOKUP, FILTER, UNIQUE, LET, or LAMBDA require Microsoft 365 or Excel 2021. We always provide alternative solutions for older versions when possible.',
    },
    {
        q: 'How do I make my formulas run faster?',
        a: 'Key tips: (1) Use IFERROR sparingly — it evaluates formulas twice. (2) Replace volatile functions (INDIRECT, OFFSET) with static alternatives. (3) Use Tables (Ctrl+T) for structured references. (4) Limit VLOOKUP ranges to specific columns, not entire columns (A:A).',
    },
    {
        q: 'What does the #SPILL! error mean?',
        a: '#SPILL! means a Dynamic Array formula cannot expand because cells in the spill range are not empty. Solution: Clear the blocking cells or move your formula. This error only appears in Microsoft 365 / Excel 2021 with dynamic array formulas.',
    },
    {
        q: 'How do I protect formulas from being edited?',
        a: 'Lock formula cells: (1) Select all cells → Format Cells → Protection → uncheck "Locked". (2) Select only formula cells (Ctrl+G → Special → Formulas) → check "Locked". (3) Protect the sheet (Review → Protect Sheet). Now only non-formula cells are editable.',
    },
    {
        q: 'Is there an Excel Cookbook mobile app?',
        a: 'Not yet, but our website is fully responsive and works great on mobile devices. You can save it to your home screen for app-like access. We are exploring a dedicated app for the future.',
    },
];

// JSON-LD FAQ Schema for Google Rich Results
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
            <article className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                    Frequently Asked Questions
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">
                    Everything you need to know about Excel Cookbook and common Excel questions.
                </p>

                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <details
                            key={i}
                            className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 shadow-sm transition-all hover:shadow-md"
                        >
                            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-left font-semibold text-slate-900 dark:text-slate-50 select-none">
                                <span>{faq.q}</span>
                                <span className="text-slate-400 transition-transform group-open:rotate-45 text-xl flex-shrink-0">
                                    +
                                </span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>

                <div className="mt-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-6 text-center">
                    <h2 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                        Still have questions?
                    </h2>
                    <p className="text-emerald-700 dark:text-emerald-400 text-sm mb-4">
                        We&apos;d love to help. Drop us a line and we&apos;ll get back to you within 1-2 business days.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </article>
        </>
    );
}
