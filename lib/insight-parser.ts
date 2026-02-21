import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

export interface InsightMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
}

export interface Insight extends InsightMeta {
    content: string; // Raw markdown content (without frontmatter)
}

function getContentDir() {
    return path.join(process.cwd(), 'content', 'insights');
}

/**
 * Get all insight slugs for generateStaticParams
 */
export function getAllInsightSlugs(): string[] {
    const contentDir = getContentDir();
    if (!fs.existsSync(contentDir)) return [];
    return fs
        .readdirSync(contentDir)
        .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
        .map((file) => file.replace(/\.(mdx|md)$/, ''));
}

/**
 * Get metadata for all insights (for listing pages)
 */
export function getAllInsights(): InsightMeta[] {
    const slugs = getAllInsightSlugs();
    return slugs
        .map((slug) => {
            const insight = getInsightBySlug(slug);
            if (!insight) return null;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { content, ...meta } = insight;
            return meta;
        })
        .filter((r): r is InsightMeta => r !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single insight by slug (includes full content)
 * Wrapped in React cache() to deduplicate requests during build
 */
export const getInsightBySlug = cache((slug: string): Insight | null => {
    const contentDir = getContentDir();
    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    const mdPath = path.join(contentDir, `${slug}.md`);

    let filePath = '';
    if (fs.existsSync(mdxPath)) filePath = mdxPath;
    else if (fs.existsSync(mdPath)) filePath = mdPath;
    else return null;

    let raw = fs.readFileSync(filePath, 'utf-8');

    // ── Defensive cleaning ──
    raw = raw.replace(/^\uFEFF/, '');
    raw = raw.replace(/^```(?:markdown|mdx)?\s*\n/, '').replace(/\n```\s*$/, '');
    raw = raw.replace(/^\s*(?=---)/, '');

    try {
        const { data, content } = matter(raw);

        if (!data.title) {
            console.warn(`⚠️ [insight-parser] No title found for "${slug}".`);
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
        console.error(`❌ [insight-parser] gray-matter failed for "${slug}":`, err);
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
