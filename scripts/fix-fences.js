const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'recipes');
const filesToFix = [
  "calculate-quarter-from-date.mdx", "chooserows.mdx", "cuberankedmember.mdx",
  "cubeset.mdx", "dsum.mdx", "find.mdx", "hour.mdx", "ifs.mdx", "index.mdx",
  "let.mdx", "makearray.mdx", "now.mdx", "percentile.inc.mdx", "pv.mdx",
  "right-len-find.mdx", "sheets.mdx", "sort.mdx", "sortby.mdx", "textafter.mdx",
  "vlookup-exact.mdx", "vlookup-with-wildcards.mdx"
];

filesToFix.forEach(file => {
    let filePath = path.join(contentDir, file);
    if (!fs.existsSync(filePath)) return;
    
    let original = fs.readFileSync(filePath, 'utf8');
    let lines = original.split('\n');

    // Remove all isolated backticks
    lines = lines.filter(l => l.trim().replace(/\r/g, '') !== '```');

    let newLines = [];
    let insideBlock = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].replace(/\r/g, '');
        
        if (line.trim().startsWith('```') && line.trim().length > 3) {
            newLines.push(line);
            insideBlock = true;
        } else if (insideBlock && line.trim() === '') {
            newLines.push('```');
            newLines.push(''); 
            insideBlock = false;
        } else {
            newLines.push(line);
        }
    }

    if (insideBlock) {
        newLines.push('```');
    }

    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`✅ Fixed formatting for ${file}`);
});
