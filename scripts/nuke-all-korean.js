const fs = require('fs');
const path = require('path');

const dirsToScan = ['app', 'components', 'content', 'data', 'public'];
const globalKoreanRegex = /[\uAC00-\uD7A3\u3131-\u318E\u1100-\u11FF]+/g;
const koreanRegex = /[\uAC00-\uD7A3\u3131-\u318E\u1100-\u11FF]/;

function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else {
            // Process text files
            if (/\.(mdx?|js|jsx|ts|tsx|json|html|txt)$/.test(file)) {
                let content = fs.readFileSync(fullPath, 'utf8');
                if (koreanRegex.test(content)) {
                    console.log(`🧹 Nuking Korean in: ${fullPath}`);
                    content = content.replace(globalKoreanRegex, '');
                    fs.writeFileSync(fullPath, content, 'utf8');
                }
            }
        }
    }
}

dirsToScan.forEach(dir => scanDir(path.join(process.cwd(), dir)));
console.log('✅ Total Korean Nuke Complete.');
