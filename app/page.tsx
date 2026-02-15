import { getAllRecipes } from "@/lib/recipe-parser";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const recipes = getAllRecipes();

  return (
    <div className="space-y-8">
      <section className="space-y-4 pt-6 md:pt-10 lg:pt-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm text-excel-green dark:bg-slate-800">
            Excel Cookbook (Beta)
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900 dark:text-slate-50">
            엑셀 오류, <span className="text-excel-green">요리책</span>처럼 찾으세요.
          </h1>
          <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
            &quot;VLOOKUP이 뭐지?&quot;라고 묻지 마세요.<br />
            &quot;두 시트 비교해서 없는 값 찾기&quot; 처럼 <strong>문제 해결 레시피</strong>를 복사해가세요.
          </p>
        </div>
      </section>

      {/* Dynamic Recipe List */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-50">
          🍳 최신 레시피
        </h2>
        {recipes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
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
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 py-12 dark:border-slate-700">
            <p className="text-lg text-slate-500 dark:text-slate-400">
              아직 레시피가 없어요 👨‍🍳
            </p>
            <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
              AI 셰프가 곧 맛있는 레시피를 만들어줄 거예요!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
