const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'recipes');
const files = fs.readdirSync(contentDir);

// Simple regex to detect Korean characters
const koreanRegex = /[\u3131-\uD79D]/;

files.forEach(file => {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    if (koreanRegex.test(content)) {
        console.log(`KR_DETECTED: ${file}`);
    }
});
