const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(process.cwd(), 'content', 'recipes');
const files = fs.readdirSync(contentDir);

files.forEach(file => {
    const filePath = path.join(contentDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    try {
        const { data } = matter(raw);
        if (!data.title) console.log(`Missing title: ${file}`);
        if (!data.description) console.log(`Missing description: ${file}`);
        if (!data.date) console.log(`Missing date: ${file}`);
        if (data.description && data.description.length < 50) console.log(`Thin description: ${file} (${data.description.length})`);
    } catch (e) {
        console.log(`Failed to parse: ${file}`);
    }
});
