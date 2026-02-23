const { execSync } = require('child_process');

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
    const targets = ['PMT', 'MIN', 'RANDARRAY', 'ROUNDUP'];

    console.log("Waiting 60 seconds before starting to clear rate limits...");
    await delay(60000);

    for (const target of targets) {
        console.log(`\n⏳ Generating ${target}...`);
        try {
            execSync(`npx.cmd tsx scripts/generate-recipe.ts "${target}"`, { stdio: 'inherit' });
            console.log(`✅ Finished generating ${target}. Waiting 30 seconds...`);
            await delay(30000);
        } catch (e) {
            console.error(`❌ Failed to generate ${target}. Error:`, e.message);
            console.log("Waiting 60 seconds before next try...");
            await delay(60000);
        }
    }
    console.log("\n🎉 Finished generating all missing files.");
}

run();
