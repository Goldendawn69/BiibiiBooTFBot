const fs = require("fs");
const path = require("path");

const transformationsFilePath = path.join(
  __dirname,
  "..",
  "..",
  "data",
  "transformations.json"
);

function loadTransformations() {
  if (!fs.existsSync(transformationsFilePath)) {
    return [];
  }

  const rawData = fs.readFileSync(transformationsFilePath, "utf8");

  if (!rawData.trim()) {
    return [];
  }

  return JSON.parse(rawData);
}

function pickRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

module.exports = {
  loadTransformations,
  pickRandomItem,
};