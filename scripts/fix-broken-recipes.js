const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'recipes');
const files = ['day.mdx', 'proper.mdx', 'sortby.mdx', 'yearfrac.mdx'];

files.forEach(file => {
    const filePath = path.join(contentDir, file);
    if (!fs.existsSync(filePath)) return;
    let raw = fs.readFileSync(filePath, 'utf8');

    // Clean wrappers
    raw = raw.replace(/^```(?:markdown|mdx)?\s*\n/i, '');
    raw = raw.replace(/\n```\s*$/, '');

    // TRIM whitespace from the VERY BEGINNING
    raw = raw.trim();

    // Also fix the insane line in proper.mdx if we detect it
    if (file === 'proper.mdx' && raw.length > 500000) {
        const lines = raw.split('\n');
        const cleanedLines = lines.map(line => line.length > 5000 ? line.substring(0, 5000) + '... [Content truncated due to length]' : line);
        raw = cleanedLines.join('\n');
    }

    fs.writeFileSync(filePath, raw);
    console.log(`Cleaned and Trimmed: ${file}`);
});
