const fs = require("fs");
const path = require("path");

const filesToValidate = [
  path.join(__dirname, "..", "data", "transformations.json"),
];

let hasError = false;

for (const filePath of filesToValidate) {
  try {
    const rawData = fs.readFileSync(filePath, "utf8");
    JSON.parse(rawData);
    console.log(`OK: ${filePath}`);
  } catch (error) {
    hasError = true;
    console.error(`ERROR: ${filePath}`);
    console.error(error.message);
  }
}

if (hasError) {
  process.exit(1);
}