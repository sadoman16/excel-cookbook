const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'recipes');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

const koreanRegex = /[\u3131-\uD79D]/;

files.forEach(file => {
    const filePath = path.join(contentDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    let content = original;

    if (koreanRegex.test(content)) {
        console.log(`Cleaning Korean in: ${file}`);

        // Clean headers: "## 같이 보면 좋은 레시피 (Related Functions)" -> "## Related Functions"
        content = content.replace(/#+\s*같이\s*보면\s*좋은\s*레시피(?:.*?Related Functions\))?/g, '## Related Functions');
        content = content.replace(/#+\s*Related\s*Recipes.*$/gm, '## Related Functions');

        // Clean any other variants of "같이 보면 좋은 레시피" or "관련 함수"
        content = content.replace(/같이\s*보면\s*좋은\s*레시피/g, 'Related Functions');
        content = content.replace(/관련\s*레시피/g, 'Related Functions');

        // Clean markdown links: [PRICE 함수로 어쩌고](/recipes/price) -> [PRICE](/recipes/price)
        content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
            if (koreanRegex.test(text)) {
                // Try to extract just English letters/numbers from the link text to form a clean title
                let englishOnly = text.replace(/[\u3131-\uD79D]/g, '').trim();

                // Remove leftover punctuation like commas, colons, or isolated hyphens if it is messy
                englishOnly = englishOnly.replace(/^[^\w]+|[^\w]+$/g, '').trim();

                // If englishOnly is empty (e.g., the text was ONLY Korean), we can fallback to capitalizing the slug.
                if (!englishOnly) {
                    const slugParts = url.split('/').pop().split(/[#?]/)[0];
                    englishOnly = slugParts.split('-').map(w => w.toUpperCase()).join(' ');
                } else if (englishOnly.length < 3) {
                    // Sometimes just "A" or "1" is left. Better to use slug.
                    const slugParts = url.split('/').pop().split(/[#?]/)[0];
                    englishOnly = slugParts.split('-').map(w => w.toUpperCase()).join(' ');
                }

                // Append 'Guide' or something nice
                if (!englishOnly.toLowerCase().includes('guide')) {
                    englishOnly = `${englishOnly} Guide`;
                }

                return `[${englishOnly}](${url})`;
            }
            return match;
        });

        // Fallback for ANY remaining Korean characters in the entire file
        // We will just strip them out to guarantee 0 Korean characters.
        if (/[\u3131-\uD79D]/.test(content)) {
            console.log(`  Aggressive strip applied for ${file}`);
            content = content.replace(/[\u3131-\uD79D]+/g, '');
        }

        if (content !== original) {
            fs.writeFileSync(filePath, content);
            console.log(`  Saved ${file}`);
        }
    }
});

console.log('Korean cleanup complete.');
