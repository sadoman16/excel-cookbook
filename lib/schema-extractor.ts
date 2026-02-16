/**
 * Schema Extractor — Parses recipe markdown content to extract
 * structured data for HowTo and FAQPage JSON-LD schemas.
 *
 * Skills used: schema-markup, seo-snippet-hunter, seo-structure-architect
 */

export interface HowToStep {
    name: string;
    text: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

/**
 * Extract numbered steps from "The Recipe" / "Step-by-Step" section.
 * Supports patterns like:
 *   1.  **Step Name:** Description text
 *   1.  **Step Name** Description text
 *   ### Step 1: Find the Product Name (sub-heading style)
 */
export function extractHowToSteps(markdownContent: string): HowToStep[] {
    const steps: HowToStep[] = [];

    // Find the "Recipe" / "Step-by-Step" section
    // Matches: ## The Recipe..., ## Recipe..., ## ...Step-by-Step...
    // Updated to handle various header formats robustly
    const recipeSectionMatch = markdownContent.match(
        /##\s*.*?(?:Recipe|Step-by-Step).*?(?:\r?\n|\r)([\s\S]*?)(?=(?:\r?\n|\r)##\s|(?:\r?\n|\r)---\s*$|$)/i
    );

    if (!recipeSectionMatch) return steps;

    const recipeSection = recipeSectionMatch[1];

    // Pattern 1: Numbered list items (1. **Bold text**: description  OR  1. **Bold text** description)
    // Uses (?:^|\s) to match start of line robustly across platforms
    const numberedStepRegex = /(?:^|\s)(\d+)\.\s+\*\*([^*]+)\*\*[:\s]*([\s\S]*?)(?=(?:\r?\n|\r)\d+\.\s+\*\*|(?:\r?\n|\r)##|(?:\r?\n|\r)---|(?:\r?\n|\r){3}|$)/g;
    let match;

    while ((match = numberedStepRegex.exec(recipeSection)) !== null) {
        // match[2] is the step name inside **...**
        // Remove trailing colons, backticks, and any markdown code fences from the name
        const name = match[2].trim().replace(/[:`]+$/, '').replace(/`/g, '').trim();
        // Get the text, cleaning up markdown formatting
        let text = match[3].trim(); // match[3] is the description body
        // Remove markdown formatting for clean schema text
        text = text
            .replace(/\*\*([^*]+)\*\*/g, '$1')   // Bold
            .replace(/\*([^*]+)\*/g, '$1')         // Italic
            .replace(/`([^`]+)`/g, '$1')           // Code
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
            .replace(/\n\s*\*/g, ' •')             // Sub-bullets
            .replace(/\n+/g, ' ')                  // Newlines
            .replace(/\s+/g, ' ')                  // Multiple spaces
            .trim();

        if (name && text) {
            steps.push({ name, text });
        }
    }

    // Pattern 2: Sub-heading steps (### Step 1: Name)
    if (steps.length === 0) {
        const headingStepRegex = /###\s*(?:Step\s*\d+[:\s]*)?(.+?)\n([\s\S]*?)(?=\n###|\n##|\n---|\n\n\n|$)/gi;
        while ((match = headingStepRegex.exec(recipeSection)) !== null) {
            const name = match[1].trim();
            let text = match[2].trim()
                .replace(/\*\*([^*]+)\*\*/g, '$1')
                .replace(/`([^`]+)`/g, '$1')
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/^\d+\.\s+/gm, '')
                .replace(/\n+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

            if (name && text) {
                steps.push({ name, text });
            }
        }
    }

    return steps;
}

/**
 * Extract FAQ items from "Troubleshooting" / "Common Errors" section.
 * Supports patterns like:
 *   ### 1. #N/A Error
 *   *   **`#N/A` (Not Found!):** Description...
 *   - **What it looks like:** ...
 *   - **Why it happens:** ...
 *   - **How to fix it:** ...
 */
export function extractFAQItems(markdownContent: string): FAQItem[] {
    const faqs: FAQItem[] = [];

    // Find Troubleshooting section
    const troubleshootMatch = markdownContent.match(
        /##\s*\**(?:Troubleshooting|Common\s+Errors)[^*\n]*\**\s*\n([\s\S]*?)(?=\n##\s[^#]|\n---\s*$|$)/i
    );

    if (!troubleshootMatch) return faqs;

    const troubleSection = troubleshootMatch[1];

    // Pattern 1: Sub-heading errors (### 1. #N/A Error OR ### #N/A Error)
    const headingErrorRegex = /###\s*(?:\d+\.\s*)?(.+?)\n([\s\S]*?)(?=\n###|\n##|\n---\s*$|$)/gi;
    let match;

    while ((match = headingErrorRegex.exec(troubleSection)) !== null) {
        const errorTitle = match[1].trim().replace(/\*\*/g, '');
        const errorBody = match[2].trim();

        // Create question from the error title
        const question = `What does the ${errorTitle} mean in Excel and how do I fix it?`;

        // Extract the fix/solution text
        let answer = '';

        // Try to find "How to fix it" section
        const fixMatch = errorBody.match(/\*\*How to fix it[:\s]*\*\*[:\s]*([\s\S]*?)(?=\n\*\*|\n###|\n##|$)/i);
        const whyMatch = errorBody.match(/\*\*Why it happens[:\s]*\*\*[:\s]*([\s\S]*?)(?=\n\*\*|\n###|\n##|$)/i);

        if (whyMatch && fixMatch) {
            answer = `This happens because ${cleanText(whyMatch[1])}. To fix it: ${cleanText(fixMatch[1])}`;
        } else if (fixMatch) {
            answer = cleanText(fixMatch[1]);
        } else {
            // Fallback: use the full body, cleaned up
            answer = cleanText(errorBody);
        }

        if (question && answer && answer.length > 20) {
            faqs.push({ question, answer });
        }
    }

    // Pattern 2: Bold error entries (*   **`#N/A`...**: description)
    if (faqs.length === 0) {
        const boldErrorRegex = /\*\s+\*\*`?([^`*]+)`?\s*(?:\([^)]+\))?\s*[:\s]*\*\*[:\s]*([\s\S]*?)(?=\n\*\s+\*\*`?[A-Z#]|\n##|\n---\s*$|$)/gi;

        while ((match = boldErrorRegex.exec(troubleSection)) !== null) {
            const errorName = match[1].trim();
            const errorBody = match[2].trim();

            const question = `What causes the ${errorName} error in Excel and how do I fix it?`;

            // Extract solution
            const solutionMatch = errorBody.match(/\*\*Solution[:\s]*\*\*[:\s]*([\s\S]*?)(?=\n\*\s+\*\*|\n##|$)/i);
            const answer = solutionMatch
                ? cleanText(solutionMatch[1])
                : cleanText(errorBody);

            if (question && answer && answer.length > 20) {
                faqs.push({ question, answer });
            }
        }
    }

    // Pattern 3: Numbered error entries (1. **Error description** ...)
    if (faqs.length === 0) {
        const numberedErrorRegex = /\d+\.\s+\*\*([^*]+)\*\*\s*\n([\s\S]*?)(?=\n\d+\.\s+\*\*|\n##|\n---\s*$|$)/gi;

        while ((match = numberedErrorRegex.exec(troubleSection)) !== null) {
            const errorTitle = match[1].trim();
            const errorBody = match[2].trim();

            const question = `How do I fix "${errorTitle}" in Excel?`;

            const fixMatch = errorBody.match(/\*\*How to fix it[:\s]*\*\*[:\s]*([\s\S]*?)(?=\n\*\*|\n\d+\.|\n##|$)/i);
            const answer = fixMatch
                ? cleanText(fixMatch[1])
                : cleanText(errorBody);

            if (question && answer && answer.length > 20) {
                faqs.push({ question, answer });
            }
        }
    }

    return faqs;
}

/** Clean markdown text for use in schema values */
function cleanText(text: string): string {
    return text
        .replace(/\*\*([^*]+)\*\*/g, '$1')       // Bold
        .replace(/\*([^*]+)\*/g, '$1')             // Italic
        .replace(/`([^`]+)`/g, '$1')               // Code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')   // Links
        .replace(/^\s*[-*]\s+/gm, '')              // Bullet points
        .replace(/\n+/g, ' ')                      // Newlines
        .replace(/\s+/g, ' ')                      // Multiple spaces
        .trim();
}
