import Link from 'next/link';

export const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-excel-dark dark:bg-slate-950/95">
            <div className="container mx-auto flex h-14 items-center px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-xl font-bold text-excel-green">Excel Cookbook</span>
                </Link>
                <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-excel-green">Recipes</Link>
                    <Link href="/about" className="transition-colors hover:text-excel-green">About</Link>
                    <Link href="/contact" className="transition-colors hover:text-excel-green">Contact</Link>
                </nav>
            </div>
        </header>
    );
};
