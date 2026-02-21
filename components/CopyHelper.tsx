'use client';

import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { createRoot } from 'react-dom/client';

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-2 right-2 rounded-md bg-slate-800/80 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 cursor-pointer shadow-sm backdrop-blur-sm z-10"
            aria-label="Copy code"
            title="Copy to clipboard"
        >
            {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
            ) : (
                <Copy className="h-4 w-4" />
            )}
        </button>
    );
};

export default function CopyHelper({ slug }: { slug: string }) {
    useEffect(() => {
        // Find all <pre> blocks on the page
        // Use timeout to ensure dynamically inserted HTML is present
        const timer = setTimeout(() => {
            const preElements = document.querySelectorAll('pre');

            preElements.forEach((pre) => {
                // Avoid duplicate button injections
                if (pre.querySelector('.copy-button-container')) return;

                // Set relative positioning to anchor the absolute button
                pre.style.position = 'relative';
                // Important for clean layout: ensure there's enough padding so text doesn't hide under the button
                pre.style.paddingRight = '3rem';

                const container = document.createElement('div');
                container.className = 'copy-button-container';
                pre.appendChild(container);

                const root = createRoot(container);
                // Get raw text to copy (ignoring possible nested elements)
                let textToCopy = pre.textContent || '';
                root.render(<CopyButton text={textToCopy} />);
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [slug]);

    return null;
}
