const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const projectRoot = path.join(__dirname, "..");

const ignoredDirectories = new Set([
  "node_modules",
  ".git",
]);

function findJsFiles(directoryPath) {
  const results = [];

  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) {
      continue;
    }

    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      results.push(...findJsFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".js")) {
      results.push(entryPath);
    }
  }

  return results;
}

function main() {
  const jsFiles = findJsFiles(projectRoot);
  let hasError = false;

  for (const filePath of jsFiles) {
    const result = spawnSync("node", ["--check", filePath], {
      encoding: "utf8",
    });

    if (result.status !== 0) {
      hasError = true;
      console.error(`Syntax error in ${filePath}`);
      console.error(result.stderr || result.stdout);
    }
  }

  if (hasError) {
    process.exit(1);
  }

  console.log(`OK: checked ${jsFiles.length} JavaScript files`);
}

main();