const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'recipes');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

let toFix = [];

files.forEach(file => {
    let lines = fs.readFileSync(path.join(contentDir, file), 'utf8').split('\n');
    let indices = lines.map((l, i) => l.trim().startsWith('```') ? i : -1).filter(i => i !== -1);
    
    // Check for giant code block swallowing the file
    let hasGiantBlock = false;
    for (let i = 0; i < indices.length - 1; i += 2) {
        if (indices[i+1] - indices[i] > 30) {
            hasGiantBlock = true;
        }
    }

    if (hasGiantBlock || indices.length % 2 !== 0) {
        toFix.push({file, indices});
    }
});

console.log(JSON.stringify(toFix, null, 2));
