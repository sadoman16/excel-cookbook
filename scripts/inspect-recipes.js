const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const recipesDir = path.join(__dirname, '..', 'content', 'recipes');

console.log('🔍 [Full Inspector] Starting recipe audit...');

const files = fs.readdirSync(recipesDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
let errorCount = 0;

files.forEach(file => {
    const fullPath = path.join(recipesDir, file);
    try {
        const rawContent = fs.readFileSync(fullPath, 'utf8');
        
        // 1. Check for empty file
        if (!rawContent.trim()) {
            console.error(`❌ ERROR: Empty file found: ${file}`);
            errorCount++;
            return;
        }

        // 2. Check for missing frontmatter
        if (!rawContent.startsWith('---')) {
            console.warn(`⚠️ WARNING: Missing frontmatter start (---) in ${file}`);
        }

        // 3. Try parsing with gray-matter
        const { data, content } = matter(rawContent);

        if (!data.title) {
            console.error(`❌ ERROR: Missing title in ${file}`);
            errorCount++;
        }
        
        if (data.tags && !Array.isArray(data.tags)) {
            console.warn(`⚠️ WARNING: Tags should be an array in ${file}`);
        }

    } catch (err) {
        console.error(`🚨 CRITICAL: Failed to read/parse ${file}:`, err.message);
        errorCount++;
    }
});

console.log(`\n✅ Audit Complete. Files scanned: ${files.length}, Errors found: ${errorCount}`);

if (errorCount > 0) {
    console.log('\n💡 Tip: Please check the errors above. These might be crashing the Vercel build!');
}
