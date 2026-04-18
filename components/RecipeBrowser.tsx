'use client';

import { useState } from 'react';
import { RecipeMeta } from '@/lib/recipe-parser';
import { RecipeCard } from '@/components/ui/RecipeCard';

interface RecipeBrowserProps {
    initialRecipes: RecipeMeta[];
}

export function RecipeBrowser({ initialRecipes }: RecipeBrowserProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        'All',
        'Combo Recipe',
        'Math & Trig',
        'Logical',
        'Text',
        'Lookup & Reference',
        'Date & Time',
        'Financial',
        'Statistical',
        'Information',
    ];

    const filteredRecipes = initialRecipes.filter((recipe) => {
        const query = searchTerm.toLowerCase();
        const matchesSearch =
            recipe.title.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesCategory = selectedCategory === 'All' || recipe.tags.includes(selectedCategory);

        return matchesSearch && matchesCategory;
    });

    return (
        <div id="recipe-browser" className="space-y-8">
            <div className="relative z-10 mx-auto max-w-2xl transform transition-all duration-300 hover:scale-[1.02]">
                <label htmlFor="search" className="sr-only">
                    Search recipes
                </label>
                <div className="group relative">
                    <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-brand-accent to-brand-primary blur opacity-25 transition duration-500 group-hover:opacity-50"></div>
                    <div className="glass-panel relative flex items-center rounded-[2rem]">
                        <div className="pointer-events-none flex items-center pl-6">
                            <svg
                                className="h-6 w-6 text-brand-primary"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            id="search"
                            name="search"
                            type="text"
                            className="block w-full bg-transparent py-5 pl-4 pr-6 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-50 dark:placeholder:text-slate-500"
                            placeholder="Search by function, error, or task"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 cursor-pointer p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                            selectedCategory === category
                                ? 'bg-excel-green text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <section>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                        {searchTerm ? `Results for "${searchTerm}"` : 'Latest Guides'}
                    </h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                        {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
                    </span>
                </div>

                {filteredRecipes.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.slug}
                                slug={recipe.slug}
                                title={recipe.title}
                                description={recipe.description}
                                tags={recipe.tags}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 dark:border-slate-700 dark:bg-slate-900/50">
                        <div className="mb-4 rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <p className="text-lg font-medium text-slate-900 dark:text-slate-50">No recipes found</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Try searching for a different keyword or function name.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All');
                            }}
                            className="mt-4 cursor-pointer text-sm font-medium text-excel-green hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
