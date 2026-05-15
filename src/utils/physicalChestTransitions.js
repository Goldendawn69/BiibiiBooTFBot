const fs = require("fs");
const path = require("path");

const physicalChestTransitionTextPath = path.join(
  __dirname,
  "..",
  "..",
  "data",
  "transformations",
  "physical-chest-transition-text.json"
);

const DEFAULT_CHEST = "flat";

const CHEST_LABELS = {
  flat: {
    chest: "flat chest",
    breastSize: "flat",
  },
  small_breasts: {
    chest: "small breasts",
    breastSize: "small",
  },
  medium_breasts: {
    chest: "medium breasts",
    breastSize: "medium",
  },
  large_breasts: {
    chest: "large breasts",
    breastSize: "large",
  },
  object_none: {
    chest: "object-like body",
    breastSize: "no",
  },
};

function readJsonFile(filePath, fallbackValue) {
  if (!fs.existsSync(filePath)) {
    return fallbackValue;
  }

  const rawData = fs.readFileSync(filePath, "utf8");

  if (!rawData.trim()) {
    return fallbackValue;
  }

  return JSON.parse(rawData);
}

function pickText(value) {
  if (Array.isArray(value)) {
    return value[Math.floor(Math.random() * value.length)];
  }

  return value;
}

function getChestValue(transformation) {
  return transformation?.physicalProfile?.chest || DEFAULT_CHEST;
}

function isBreastChest(chestValue) {
  return [
    "small_breasts",
    "medium_breasts",
    "large_breasts",
  ].includes(chestValue);
}

function getChestTransitionKey(fromChest, toChest) {
  if (!fromChest || !toChest || fromChest === toChest) {
    return null;
  }

  if (fromChest === "flat" && isBreastChest(toChest)) {
    return "growth_from_flat";
  }

  if (isBreastChest(fromChest) && isBreastChest(toChest)) {
    return "resize";
  }

  if (isBreastChest(fromChest) && toChest === "flat") {
    return "to_flat";
  }

  if (toChest === "object_none") {
    return "to_object_none";
  }

  if (fromChest === "object_none" && isBreastChest(toChest)) {
    return "from_object_none";
  }

  return null;
}

function fillTemplate(template, fromChest, toChest) {
  const fromLabels = CHEST_LABELS[fromChest] || CHEST_LABELS[DEFAULT_CHEST];
  const toLabels = CHEST_LABELS[toChest] || CHEST_LABELS[DEFAULT_CHEST];

  return template
    .replaceAll("{fromChest}", fromLabels.chest)
    .replaceAll("{toChest}", toLabels.chest)
    .replaceAll("{fromBreastSize}", fromLabels.breastSize)
    .replaceAll("{toBreastSize}", toLabels.breastSize);
}

function buildChestTransitionText(fromTransformation, transformation) {
  const fromChest = getChestValue(fromTransformation);
  const toChest = getChestValue(transformation);

  const transitionKey = getChestTransitionKey(fromChest, toChest);

  if (!transitionKey) {
    return null;
  }

  const chestText = readJsonFile(physicalChestTransitionTextPath, {});
  const template = pickText(chestText[transitionKey]);

  if (!template) {
    return null;
  }

  return fillTemplate(template, fromChest, toChest);
}

module.exports = {
  buildChestTransitionText,
};