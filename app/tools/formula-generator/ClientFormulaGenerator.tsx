
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, ArrowRight, Loader2, Info } from 'lucide-react';
import Link from 'next/link';

interface FormulaResult {
    formula: string;
    explanation: string;
    relatedLinks: {
        name: string;
        slug: string;
        title: string;
    }[];
}

export function ClientFormulaGenerator() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<FormulaResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);
        setCopied(false);

        try {
            const response = await fetch('/api/generate-formula', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate formula');
            }

            const data = await response.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (result?.formula) {
            navigator.clipboard.writeText(result.formula);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Input Section */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-8">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Describe your problem or data structure
                </label>
                <div className="relative mb-4">
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., Sum column A if column B starts with &quot;Sales&quot; and column C is greater than 100."
                        className="w-full h-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-excel-green focus:border-transparent transition-all resize-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleGenerate();
                            }
                        }}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                        {query.length}/500
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !query.trim()}
                        className="flex items-center space-x-2 bg-excel-green hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-excel-green/20"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                <span>Generate Formula</span>
                            </>
                        )}
                    </button>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 flex items-center"
                    >
                        <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                        {error}
                    </motion.div>
                )}
            </div>

            {/* Result Section */}
            <AnimatePresence mode="wait">
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, type: 'spring' }}
                        className="space-y-6"
                    >
                        {/* Formula Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-excel-green mr-2 animate-pulse" />
                                    Your Excel Formula
                                </h3>
                                <button
                                    onClick={copyToClipboard}
                                    className={`flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${copied
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                                </button>
                            </div>
                            <div className="p-6 bg-slate-900 font-mono text-sm md:text-base text-green-400 overflow-x-auto selection:bg-green-900 selection:text-white">
                                {result.formula}
                            </div>
                        </div>

                        {/* Explanation Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 md:p-8">
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                                <Info className="w-5 h-5 text-slate-400 mr-2" />
                                How it works
                            </h3>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-sm md:text-base leading-relaxed">
                                {result.explanation}
                            </div>
                        </div>

                        {/* Related Recipes */}
                        {result.relatedLinks.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {result.relatedLinks.map((link) => (
                                    <Link
                                        key={link.slug}
                                        href={`/recipes/${link.slug}`}
                                        className="group block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-excel-green dark:hover:border-excel-green transition-all hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-xs font-semibold text-excel-green uppercase tracking-wide mb-1">
                                                    Related Guide
                                                </div>
                                                <div className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-excel-green transition-colors">
                                                    Master the {link.name} Function
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-excel-green group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
