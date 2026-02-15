'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface RecipeMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags?: string[];
}

// Chevron icon component
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

// Category display names & order
const CATEGORY_ORDER = [
    'Lookup & Reference',
    'Logical',
    'Math & Trig',
    'Statistical',
    'Text',
    'Dynamic Array',
    'Advanced',
    'Other',
];

const CATEGORY_ICONS: Record<string, string> = {
    'Lookup & Reference': '🔍',
    'Logical': '🧠',
    'Math & Trig': '🔢',
    'Statistical': '📊',
    'Text': '📝',
    'Dynamic Array': '⚡',
    'Advanced': '🚀',
    'Other': '📋',
};

function shortenTitle(title: string): string {
    return title
        ?.replace(/^The\s+/i, '')
        .replace(/\s+Recipe.*$/i, '')
        .replace(/\s+Function.*$/i, '')
        .replace(/\s*[-–—:].*/i, '')
        .trim() || '';
}

export const Sidebar = ({ recipes }: { recipes: RecipeMeta[] }) => {
    const pathname = usePathname();

    // Group recipes by category
    const grouped: Record<string, RecipeMeta[]> = {};
    for (const recipe of recipes) {
        const category = recipe.tags?.find(t =>
            ['Lookup & Reference', 'Logical', 'Math & Trig', 'Statistical', 'Text', 'Dynamic Array', 'Advanced'].includes(t)
        ) || 'Other';
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(recipe);
    }

    // Sort each category alphabetically
    for (const cat of Object.keys(grouped)) {
        grouped[cat].sort((a, b) => shortenTitle(a.title).localeCompare(shortenTitle(b.title)));
    }

    // Find which category contains the current page
    const currentSlug = pathname?.replace('/recipes/', '') || '';
    const activeCategory = Object.entries(grouped).find(([, recs]) =>
        recs.some(r => r.slug === currentSlug)
    )?.[0];

    // Initially open only the active category
    const [openCategories, setOpenCategories] = useState<Set<string>>(
        new Set(activeCategory ? [activeCategory] : [])
    );

    const toggleCategory = (cat: string) => {
        setOpenCategories(prev => {
            const next = new Set(prev);
            if (next.has(cat)) {
                next.delete(cat);
            } else {
                next.add(cat);
            }
            return next;
        });
    };

    // Ordered categories (only those that have recipes)
    const orderedCategories = CATEGORY_ORDER.filter(c => grouped[c]);

    return (
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white dark:border-excel-dark dark:bg-slate-900 md:flex">
            <div className="p-6 pb-3">
                <h2 className="text-lg font-bold text-excel-green">📗 Cookbook Menu</h2>
                <p className="mt-1 text-xs text-slate-400">{recipes.length} recipes</p>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 pb-4">
                <ul className="space-y-1">
                    {/* Home link */}
                    <li>
                        <Link
                            href="/"
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${pathname === '/'
                                    ? 'bg-emerald-50 text-excel-green dark:bg-emerald-900/30'
                                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                }`}
                        >
                            🏠 Home
                        </Link>
                    </li>

                    {/* Collapsible categories */}
                    {orderedCategories.map(category => {
                        const categoryRecipes = grouped[category];
                        const isOpen = openCategories.has(category);
                        const hasActive = categoryRecipes.some(r => r.slug === currentSlug);
                        const icon = CATEGORY_ICONS[category] || '📋';

                        return (
                            <li key={category}>
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide transition-colors ${hasActive
                                            ? 'bg-emerald-50 text-excel-green dark:bg-emerald-900/20 dark:text-emerald-400'
                                            : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                                        }`}
                                >
                                    <span className="flex items-center gap-1.5">
                                        <span>{icon}</span>
                                        <span>{category}</span>
                                        <span className="ml-1 rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                                            {categoryRecipes.length}
                                        </span>
                                    </span>
                                    <ChevronIcon isOpen={isOpen} />
                                </button>

                                {/* Collapsible recipe list */}
                                <div
                                    className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <ul className="mt-1 space-y-0.5 border-l-2 border-slate-200 pl-3 dark:border-slate-700">
                                        {categoryRecipes.map(recipe => {
                                            const isActive = recipe.slug === currentSlug;
                                            return (
                                                <li key={recipe.slug}>
                                                    <Link
                                                        href={`/recipes/${recipe.slug}`}
                                                        className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${isActive
                                                                ? 'bg-emerald-50 font-medium text-excel-green dark:bg-emerald-900/30 dark:text-emerald-400'
                                                                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                                            }`}
                                                        title={recipe.title}
                                                    >
                                                        {shortenTitle(recipe.title) || recipe.slug.toUpperCase()}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </li>
                        );
                    })}

                    {recipes.length === 0 && (
                        <li className="px-3 py-2 text-sm italic text-slate-400 dark:text-slate-500">
                            Recipes coming soon...
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
};
