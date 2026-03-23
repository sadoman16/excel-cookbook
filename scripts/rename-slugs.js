const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'recipes');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

files.forEach(file => {
    let oldSlug = file.replace('.mdx', '');
    
    // Sluggify safely
    let newSlug = oldSlug
        .replace(/&/g, 'and')
        .replace(/ \+ /g, '-')
        .replace(/ /g, '-')
        .replace(/\//g, '-')
        .replace(/\+/g, '')
        .replace(/[^a-z0-9.-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

    const newFile = `${newSlug}.mdx`;
    if (file !== newFile) {
        fs.renameSync(path.join(contentDir, file), path.join(contentDir, newFile));
        console.log(`✅ Renamed: ${file} -> ${newFile}`);
    }
});
