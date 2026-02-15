import React from 'react';
import Link from 'next/link';
import { getAllRecipes } from '@/lib/recipe-parser';

export const Sidebar = () => {
    const recipes = getAllRecipes();

    // Group recipes by category
    const grouped: Record<string, typeof recipes> = {};
    for (const recipe of recipes) {
        const category = recipe.tags?.find(t =>
            ['Lookup & Reference', 'Logical', 'Math & Trig', 'Statistical', 'Text', 'Dynamic Array', 'Advanced'].includes(t)
        ) || 'Other';
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(recipe);
    }

    return (
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white dark:border-excel-dark dark:bg-slate-900 md:flex">
            <div className="p-6">
                <h2 className="text-lg font-bold text-excel-green">Cookbook Menu</h2>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 pb-4">
                <ul className="space-y-2">
                    <li>
                        <Link href="/" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:text-slate-50 dark:hover:bg-slate-800">
                            Home
                        </Link>
                    </li>

                    {/* Dynamic recipe categories */}
                    {Object.entries(grouped).map(([category, categoryRecipes]) => (
                        <li key={category}>
                            <div className="px-3 py-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                                {category}
                            </div>
                            <ul className="mt-1 space-y-1 pl-2">
                                {categoryRecipes.map((recipe) => (
                                    <li key={recipe.slug}>
                                        <Link
                                            href={`/recipes/${recipe.slug}`}
                                            className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                        >
                                            {recipe.title?.replace(/^The\s+/i, '').replace(/\s+Recipe.*$/i, '') || recipe.slug.toUpperCase()}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}

                    {/* Show message if no recipes yet */}
                    {recipes.length === 0 && (
                        <li className="px-3 py-2 text-sm text-slate-400 italic dark:text-slate-500">
                            Recipes coming soon...
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
};
