import { getAllRecipes } from '@/lib/recipe-parser';
import { RecipeBrowser } from '@/components/RecipeBrowser';
import { EditorPicks } from '@/components/EditorPicks';

export default function Home() {
    const recipes = getAllRecipes();

    return (
        <div className="space-y-12">
            <section className="hero-grid relative w-full overflow-hidden py-12 md:py-24 lg:py-32">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-background/90 dark:to-background" />
                <div className="container relative mx-auto px-4 md:px-6">
                    <div className="animate-slideUp flex flex-col items-center gap-6 text-center">
                        <div className="inline-flex items-center rounded-full border border-brand-accent/30 bg-brand-primary/10 px-4 py-1.5 text-sm font-medium text-brand-secondary shadow-sm backdrop-blur-md dark:text-brand-accent">
                            <span className="relative mr-2 flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary"></span>
                            </span>
                            Practical Excel help for real worksheet problems
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm dark:text-white sm:text-5xl md:text-7xl">
                            Stop searching aimlessly.
                            <br className="hidden sm:block" />
                            Find the <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">working formula</span>.
                        </h1>
                        <p className="max-w-[760px] text-slate-600 dark:text-slate-300 md:text-xl lg:text-2xl">
                            Browse practical Excel guides, formula walkthroughs, and troubleshooting help written for
                            reporting, cleanup, lookup, and day-to-day spreadsheet work.
                        </p>
                        <div className="mt-4 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                            <a
                                href="#recipe-browser"
                                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-primary/20 transition-all hover:scale-105 hover:bg-brand-secondary active:scale-95"
                            >
                                Browse Guides
                                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <EditorPicks />
            <RecipeBrowser initialRecipes={recipes} />
        </div>
    );
}
