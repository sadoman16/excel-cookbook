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
        ? "hover:border-amber-500 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] dark:hover:border-amber-400"
        : "hover:border-excel-green hover:shadow-md dark:hover:border-excel-green";

    return (
        <Link
            href={`/recipes/${slug}`}
            className={`group block rounded-lg border bg-white p-6 transition-all dark:bg-slate-900 ${borderStyle} ${hoverStyle}`}
        >
            <div className="mb-2 text-2xl">{getEmoji(tags)}</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-excel-green dark:text-slate-50">
                {title}
            </h3>
            <p className="line-clamp-3 text-sm text-slate-500 dark:text-slate-400">
                {description}
            </p>
            {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
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
