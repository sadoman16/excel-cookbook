import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white dark:border-excel-dark dark:bg-slate-950">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* About */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Excel Cookbook
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Step-by-step recipes for Excel formulas. Fix errors fast, like a cookbook for spreadsheets.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Quick Links
                        </h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-slate-500 hover:text-excel-green dark:text-slate-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm text-slate-500 hover:text-excel-green dark:text-slate-400">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-slate-500 hover:text-excel-green dark:text-slate-400">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                            Legal
                        </h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link href="/privacy" className="text-sm text-slate-500 hover:text-excel-green dark:text-slate-400">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-slate-500 hover:text-excel-green dark:text-slate-400">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
                    <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                        © {new Date().getFullYear()} Excel Cookbook. All rights reserved.
                        Excel is a registered trademark of Microsoft Corporation.
                    </p>
                </div>
            </div>
        </footer>
    );
};
