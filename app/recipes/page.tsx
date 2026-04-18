import { getAllRecipes } from '@/lib/recipe-parser';
import { RecipeBrowser } from '@/components/RecipeBrowser';

export default function RecipesIndexPage() {
    const recipes = getAllRecipes();

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                    Recipe Library
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl">
                    Browse all Excel recipes
                </h1>
                <p className="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                    Explore practical Excel formulas, troubleshooting walkthroughs, and worksheet fixes by topic. This
                    page gives Google and visitors a clean hub for the full recipe archive.
                </p>
            </section>

            <RecipeBrowser initialRecipes={recipes} />
        </div>
    );
}
