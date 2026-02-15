const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'content', 'recipes');

fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .forEach(f => {
        const fp = path.join(dir, f);
        let content = fs.readFileSync(fp, 'utf-8');
        let changed = false;

        // Fix title lines that contain colons or apostrophes but are NOT quoted
        content = content.replace(/^(title:\s+)(?!")(.*[:'].*)$/gm, (match, prefix, val) => {
            changed = true;
            // Escape any existing double quotes inside the value
            val = val.replace(/"/g, '\\"');
            return prefix + '"' + val + '"';
        });

        // Fix description lines that contain colons or apostrophes but are NOT quoted
        content = content.replace(/^(description:\s+)(?!")(.*[:'].*)$/gm, (match, prefix, val) => {
            changed = true;
            val = val.replace(/"/g, '\\"');
            return prefix + '"' + val + '"';
        });

        if (changed) {
            fs.writeFileSync(fp, content, 'utf-8');
            console.log('Fixed: ' + f);
        } else {
            console.log('OK:    ' + f);
        }
    });

console.log('\nDone! Now verifying with gray-matter...\n');

// Verify all files parse correctly
const matter = require('gray-matter');
let errors = 0;

fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .forEach(f => {
        const fp = path.join(dir, f);
        let raw = fs.readFileSync(fp, 'utf-8');
        // Apply same cleaning as recipe-parser
        raw = raw.replace(/^\uFEFF/, '');
        raw = raw.replace(/^```(?:markdown|mdx)?\s*\n/, '').replace(/\n```\s*$/, '');
        raw = raw.replace(/^\s*(?=---)/, '');

        try {
            const { data } = matter(raw);
            if (data.title) {
                console.log('✅ ' + f + ' → ' + data.title);
            } else {
                console.log('⚠️  ' + f + ' → NO TITLE');
                errors++;
            }
        } catch (err) {
            console.log('❌ ' + f + ' → PARSE ERROR: ' + err.message);
            errors++;
        }
    });

console.log('\n' + (errors === 0 ? '🎉 All files parse correctly!' : `❌ ${errors} files have issues`));
