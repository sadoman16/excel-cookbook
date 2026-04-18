import Link from 'next/link';

export function AuthorBio() {
    return (
        <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-excel-green text-2xl font-bold text-white shadow-sm">
                    EC
                </div>
                <div>
                    <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                        Reviewed by Daniel Park
                    </h3>
                    <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                        Spreadsheet analyst and documentation editor focused on practical Excel workflows,
                        reporting logic, and error-proof formula guides for real business use.
                    </p>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-excel-green hover:underline"
                    >
                        Read more about our editorial approach &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
