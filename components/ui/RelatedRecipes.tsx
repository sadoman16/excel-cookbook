import { getAllRecipes } from '@/lib/recipe-parser';
import { RecipeCard } from '@/components/ui/RecipeCard';

interface RelatedRecipesProps {
    currentSlug: string;
    tags: string[];
}

export function RelatedRecipes({ currentSlug, tags }: RelatedRecipesProps) {
    const allRecipes = getAllRecipes();

    // Sort all other recipes by how many tags they share with the current recipe
    const scoredRecipes = allRecipes
        .filter((recipe) => recipe.slug !== currentSlug)
        .map((recipe) => {
            const matchCount = recipe.tags.filter((t) => tags.includes(t)).length;
            return { recipe, score: matchCount };
        })
        // Sort primarily by tag matches, secondarily by date for novelty
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return new Date(b.recipe.date).getTime() - new Date(a.recipe.date).getTime();
        });

    const topRelated = scoredRecipes.slice(0, 3).map((s) => s.recipe);

    if (topRelated.length === 0) return null;

    return (
        <section className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10">
            <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-50">
                You might also find these useful 💡
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topRelated.map((recipe) => (
                    <RecipeCard
                        key={recipe.slug}
                        slug={recipe.slug}
                        title={recipe.title}
                        description={recipe.description}
                        tags={recipe.tags}
                    />
                ))}
            </div>
        </section>
    );
}
