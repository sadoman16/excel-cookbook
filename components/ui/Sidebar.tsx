import React from 'react';
import Link from 'next/link';

export const Sidebar = () => {
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
                    <li>
                        <div className="px-3 py-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                            Popular Recipes
                        </div>
                        <ul className="mt-1 space-y-1 pl-2">
                            <li>
                                <Link href="#" className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                                    VLOOKUP Fixes
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                                    IF Formula Logic
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
