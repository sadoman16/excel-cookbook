import Link from 'next/link';

export function AuthorBio() {
    return (
        <div className="mt-12 rounded-xl bg-slate-50 p-6 border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
                <div className="w-16 h-16 rounded-full bg-excel-green flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                    👨‍💻
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        Written by The Head Chef
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        Former 10-year Financial Analyst who survived countless month-end closes.
                        I build these recipes to save you from weekend-ruining spreadsheet errors.
                    </p>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-excel-green hover:underline"
                    >
                        Read the full story &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
