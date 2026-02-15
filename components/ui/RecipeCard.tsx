import Link from "next/link";

interface RecipeCardProps {
    slug: string;
    title: string;
    description: string;
    tags: string[];
}

const tagEmojis: Record<string, string> = {
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
    return (
        <Link
            href={`/recipes/${slug}`}
            className="group block rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-excel-green hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-excel-green"
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
                            className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </Link>
    );
}
