import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

export interface RecipeMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
}

export interface Recipe extends RecipeMeta {
    content: string; // Raw markdown content (without frontmatter)
}

function getContentDir() {
    return path.join(process.cwd(), 'content', 'recipes');
}

/**
 * Get all recipe slugs for generateStaticParams
 */
export function getAllRecipeSlugs(): string[] {
    const contentDir = getContentDir();
    if (!fs.existsSync(contentDir)) return [];
    return fs
        .readdirSync(contentDir)
        .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
        .map((file) => file.replace(/\.(mdx|md)$/, ''));
}

/**
 * Get metadata for all recipes (for listing pages)
 */
export function getAllRecipes(): RecipeMeta[] {
    const slugs = getAllRecipeSlugs();
    return slugs
        .map((slug) => {
            const recipe = getRecipeBySlug(slug);
            if (!recipe) return null;
            const { content, ...meta } = recipe;
            return meta;
        })
        .filter((r): r is RecipeMeta => r !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single recipe by slug (includes full content)
 * Wrapped in React cache() to deduplicate requests during build (Metadata + Page)
 */
export const getRecipeBySlug = cache((slug: string): Recipe | null => {
    const contentDir = getContentDir();
    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    const mdPath = path.join(contentDir, `${slug}.md`);

    let filePath = '';
    if (fs.existsSync(mdxPath)) filePath = mdxPath;
    else if (fs.existsSync(mdPath)) filePath = mdPath;
    else return null;

    let raw = fs.readFileSync(filePath, 'utf-8');

    // ── Defensive cleaning ──
    // 1. Strip UTF-8 BOM if present
    raw = raw.replace(/^\uFEFF/, '');
    // 2. Remove markdown code fence wrappers (```markdown ... ```)
    raw = raw.replace(/^```(?:markdown|mdx)?\s*\n/, '').replace(/\n```\s*$/, '');
    // 3. Trim any leading whitespace/newlines before frontmatter
    raw = raw.replace(/^\s*(?=---)/, '');

    // Try gray-matter for frontmatter parsing
    try {
        const { data, content } = matter(raw);

        // Debug: log parsing result for troubleshooting
        if (!data.title) {
            console.warn(`⚠️ [recipe-parser] No title found for "${slug}". First 80 chars: ${JSON.stringify(raw.substring(0, 80))}`);
        }

        return {
            slug,
            title: data.title || slug.toUpperCase(),
            description: data.description || '',
            date: data.date ? String(data.date) : new Date().toISOString().split('T')[0],
            tags: Array.isArray(data.tags) ? data.tags : [],
            content,
        };
    } catch (err) {
        console.error(`❌ [recipe-parser] gray-matter failed for "${slug}":`, err);
        // Fallback: treat entire file as content
        return {
            slug,
            title: slug.toUpperCase(),
            description: '',
            date: new Date().toISOString().split('T')[0],
            tags: [],
            content: raw,
        };
    }
});
