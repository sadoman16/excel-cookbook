import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'recipes');

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

/**
 * Get all recipe slugs for generateStaticParams
 */
export function getAllRecipeSlugs(): string[] {
    if (!fs.existsSync(CONTENT_DIR)) return [];
    return fs
        .readdirSync(CONTENT_DIR)
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
 */
export function getRecipeBySlug(slug: string): Recipe | null {
    const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const mdPath = path.join(CONTENT_DIR, `${slug}.md`);

    let filePath = '';
    if (fs.existsSync(mdxPath)) filePath = mdxPath;
    else if (fs.existsSync(mdPath)) filePath = mdPath;
    else return null;

    const raw = fs.readFileSync(filePath, 'utf-8');

    // Try gray-matter first for proper frontmatter parsing
    try {
        const { data, content } = matter(raw);
        return {
            slug,
            title: data.title || slug.toUpperCase(),
            description: data.description || '',
            date: data.date ? String(data.date) : new Date().toISOString().split('T')[0],
            tags: Array.isArray(data.tags) ? data.tags : [],
            content,
        };
    } catch {
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
}
