const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'recipes');
const files = fs.readdirSync(contentDir);

// Detect Korean characters
const koreanRegex = /[\u3131-\uD79D]/;

const translations = {
    "같이 보면 좋은 레시피": "Related Recipes",
    "함수 마스터하기": "Function Masterclass",
    "함수 활용법": "Function Guide",
    "완벽 가이드": "Full Guide",
    "관련 레시피": "Related Recipes",
    "함수 활용": "Function Guide",
    "조건부 서식으로 데이터 시각화": "Data Visualization with Conditional Formatting",
    "조금 더 알아보기": "Learn More",
    "자주 묻는 질문": "FAQ",
    "해결 방법": "How to Fix",
    "참고": "Note"
};

files.forEach(file => {
    const filePath = path.join(contentDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (koreanRegex.test(content)) {
        console.log(`Deep cleaning Korean in: ${file}`);

        // Replace known patterns
        Object.keys(translations).forEach(kr => {
            const en = translations[kr];
            const regex = new RegExp(kr, 'g');
            content = content.replace(regex, en);
        });

        // Specific cleanup for common footer patterns
        content = content.replace(/##\s+Related\s+Recipes\s+\(Related\s+Functions\)/g, '## Related Recipes');
        content = content.replace(/###\s+Related\s+Recipes\s+\(Related\s+Functions\)/g, '### Related Recipes');
        content = content.replace(/\[([^\]]+)\]\(\/recipes\/([^\)]+)\)/g, (match, text, slug) => {
            // If the link text still has Korean, try to clean it
            if (koreanRegex.test(text)) {
                let cleanText = text.replace(/함수/g, 'Function').replace(/마스터하기/g, 'Masterclass').replace(/활용법/g, 'Guide').replace(/완벽 가이드/g, 'Full Guide');
                return `[${cleanText}](/recipes/${slug})`;
            }
            return match;
        });

        // If still has Korean, let's do one last aggressive regex for anything in the footer
        content = content.replace(/##\s+Related\s+Recipes[\s\S]*$/g, (match) => {
            return match.replace(/[\u3131-\uD79D]/g, ''); // Remove any remaining KR chars in the footer section
        });

        fs.writeFileSync(filePath, content);
    }
});
