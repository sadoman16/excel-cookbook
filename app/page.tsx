import { getAllRecipes } from "@/lib/recipe-parser";
import { RecipeBrowser } from "@/components/RecipeBrowser";

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
            Excel errors? Find the <span className="text-excel-green">recipe</span>.
          </h1>
          <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
            Stop Googling &quot;how to VLOOKUP.&quot;<br />
            Search by <strong>problem</strong>, copy the <strong>solution</strong>. Like a cookbook for spreadsheets.
          </p>
        </div>
      </section>

      {/* Dynamic Recipe List with Search */}
      <RecipeBrowser initialRecipes={recipes} />
    </div>
  );
}

