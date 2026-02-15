
import { MetadataRoute } from 'next'
import { getAllRecipes } from '@/lib/recipe-parser'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://excel-cookbook.com'
    const recipes = getAllRecipes()

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
}
