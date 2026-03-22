const fs = require('fs');
const path = require('path');

const functions = require('./data/functions.json');
const recipesDir = path.join(__dirname, 'content/recipes');

function getSlug(name) {
    return name.toLowerCase().replace(/ /g, '-').replace(/\//g, '-').replace(/\+/g, '-');
}

const existingSlugs = new Set(
    fs.readdirSync(recipesDir)
        .filter(f => f.endsWith('.mdx'))
        .map(f => f.replace('.mdx', ''))
);

const missing = functions.filter(f => !existingSlugs.has(getSlug(f.name)));

console.log('Total Functions in JSON:', functions.length);
console.log('Total MDX files:', existingSlugs.size);
console.log('Missing Recipes:', JSON.stringify(missing.map(m => m.name), null, 2));
