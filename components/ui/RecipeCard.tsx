import Link from 'next/link';

interface RecipeCardProps {
    slug: string;
    title: string;
    description: string;
    tags: string[];
}

const tagIcons: Record<string, string> = {
    'Combo Recipe': '🧩',
    'Lookup & Reference': '🔍',
    Logical: '✅',
    'Math & Trig': '📐',
    Text: '🔤',
    'Date & Time': '📅',
    default: '📘',
};

function getIcon(tags: string[]): string {
    for (const tag of tags) {
        if (tagIcons[tag]) return tagIcons[tag];
    }
    return tagIcons.default;
}

export function RecipeCard({ slug, title, description, tags }: RecipeCardProps) {
    return (
        <Link
            href={`/recipes/${slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/60 bg-white/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/10 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/80"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
                <div className="mb-4 text-2xl">{getIcon(tags)}</div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-secondary dark:text-slate-50 dark:group-hover:text-brand-accent">
                    {title}
                </h3>
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            </div>

            <div className="relative z-10 mt-auto flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                {tags.slice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            tag === 'Combo Recipe'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </Link>
    );
}
