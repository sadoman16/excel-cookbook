import { MetadataRoute } from 'next'
import { getAllRecipes } from '@/lib/recipe-parser'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const baseUrl = 'https://excel-cookbook.com'
        const recipes = getAllRecipes()

        console.log(`[Sitemap] Found ${recipes.length} recipes for sitemap generation`);

        const recipeUrls = recipes.map((recipe) => ({
            url: `${baseUrl}/recipes/${recipe.slug}`,
            lastModified: new Date(recipe.date),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }))

        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1,
            },
            {
                url: `${baseUrl}/about`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.5,
            },
            {
                url: `${baseUrl}/contact`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.5,
            },
            {
                url: `${baseUrl}/tools/formula-generator`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            },
            {
                url: `${baseUrl}/privacy`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.3,
            },
            {
                url: `${baseUrl}/terms`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.3,
            },
            ...recipeUrls,
        ]
    } catch (error) {
        console.error('[Sitemap Error] Failed to generate sitemap:', error);
        // Return a minimal sitemap to prevent build failure
        return [
            {
                url: 'https://excel-cookbook.com',
                lastModified: new Date(),
                priority: 1,
            }
        ];
    }
}
