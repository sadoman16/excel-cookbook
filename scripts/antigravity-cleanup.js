const fs = require('fs');
const path = require('path');

/**
 * 인코딩 문제로 깨진 문자열을 정상적인 텍스트로 치환하는 스크립트
 * (Antigravity's Special Cleanup Script - High Precision)
 */

const targetDirs = [
    path.join(process.cwd(), 'content', 'recipes'),
    path.join(process.cwd(), 'app'),
    path.join(process.cwd(), 'components'),
];

const patterns = [
    { regex: /\?\?(\w)/g, replace: ' $1' },         // ??remember -> remember
    { regex: /\?\?\s/g, replace: ' ' },             // ?? for -> for
    { regex: /\s\?\?/g, replace: ' ' },             //  ?? ->
    { regex: /ï¿½/g, replace: "'" },                // Common encoding artifacts
    { regex: /â€“/g, replace: "-" },                 // En-dash artifacts
];

function cleanupFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    patterns.forEach(p => {
        content = content.replace(p.regex, p.replace);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.mdx') || file.endsWith('.tsx') || file.endsWith('.ts')) {
            if (cleanupFile(fullPath)) {
                console.log(`✅ Cleaned: ${path.relative(process.cwd(), fullPath)}`);
            }
        }
    });
}

console.log('🚀 Antigravity Cleanup Operation Started...');
targetDirs.forEach(dir => walkDir(dir));
console.log('✨ All files cleaned successfully!');
