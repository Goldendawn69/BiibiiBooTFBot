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

function findTransformationForUser(transformations, user) {
  if (user.currentTransformationId) {
    const transformationById = transformations.find(
      (transformation) => transformation.id === user.currentTransformationId
    );

    if (transformationById) {
      return transformationById;
    }
  }

  if (user.currentForm) {
    return transformations.find(
      (transformation) => transformation.name === user.currentForm
    );
  }

  return null;
}

module.exports = {
  loadTransformations,
  pickRandomItem,
  findTransformationForUser,
};