import Link from "next/link";

interface RecipeCardProps {
    slug: string;
    title: string;
    description: string;
    tags: string[];
}

const tagEmojis: Record<string, string> = {
    "Combo Recipe": "🔥",
    "Lookup & Reference": "🔍",
    "Logical": "🧠",
    "Math & Trig": "📐",
    "Text": "📝",
    "Date & Time": "📅",
    "default": "🍳",
};

function getEmoji(tags: string[]): string {
    for (const tag of tags) {
        if (tagEmojis[tag]) return tagEmojis[tag];
    }
    return tagEmojis["default"];
}

export function RecipeCard({ slug, title, description, tags }: RecipeCardProps) {
    const isCombo = tags.includes("Combo Recipe");

    // Distinct styling for combo recipes to stand out
    const borderStyle = isCombo
        ? "border-amber-400 dark:border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/50"
        : "border-slate-200 shadow-sm dark:border-slate-700";

    const hoverStyle = isCombo
    return (
        <Link
            href={`/recipes/${slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/60 bg-white/50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-primary/10 hover:border-brand-primary/20 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/80 backdrop-blur-sm relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
                <div className="mb-4 text-2xl">{getEmoji(tags)}</div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-brand-secondary transition-colors dark:text-slate-50 dark:group-hover:text-brand-accent">
                    {title}
                </h3>
                <p className="mb-6 line-clamp-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {description}
                </p>
            </div>
            
            <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                {tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${tag === "Combo Recipe"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </Link>
    );
}
