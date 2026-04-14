import { getAllRecipes } from "@/lib/recipe-parser";
import { RecipeBrowser } from "@/components/RecipeBrowser";
import { EditorPicks } from "@/components/EditorPicks";

export default function Home() {
  const recipes = getAllRecipes();

  return (
    <div className="space-y-12">
      {/* Hero Section with Grid & Glass */}
      <section className="relative w-full overflow-hidden hero-grid py-12 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 dark:to-background pointer-events-none" />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center gap-6 text-center animate-slideUp">
            <div className="inline-flex items-center rounded-full border border-brand-accent/30 bg-brand-primary/10 px-4 py-1.5 text-sm font-medium text-brand-secondary dark:text-brand-accent shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              Excel Cookbook 2.0 (Premium)
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl text-slate-900 dark:text-white drop-shadow-sm">
              Stop Googling. <br className="hidden sm:block" />
              Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">recipe</span>.
            </h1>
            <p className="max-w-[700px] text-slate-600 md:text-xl lg:text-2xl dark:text-slate-300">
              Your ultimate spreadsheet problem solver. <br className="hidden sm:block" />
              Search by <strong>problem</strong>, copy the <strong>solution</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <button onClick={() => document.getElementById('search')?.focus()} className="inline-flex items-center justify-center rounded-full bg-brand-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-secondary hover:scale-105 active:scale-95 cursor-pointer cursor-pointer">
                  Start Cooking
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hand-picked Curation to drastically reduce bounce rate */}
      <EditorPicks />

      {/* Dynamic Recipe List with Search */}
      <RecipeBrowser initialRecipes={recipes} />
    </div>
  );
}

