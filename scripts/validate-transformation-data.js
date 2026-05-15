const fs = require("fs");
const path = require("path");

const {
  PHYSICAL_BODY_SHAPES,
  PHYSICAL_BODY_MATERIALS,
  PHYSICAL_SEX_FORMS,
  VALID_PHYSICAL_BODY_SHAPES,
  VALID_PHYSICAL_BODY_MATERIALS,
  VALID_PHYSICAL_SEX_FORMS,
} = require("../src/utils/physicalProfiles");

const VALID_PHYSICAL_CHEST_VALUES = [
  "flat",
  "small_breasts",
  "medium_breasts",
  "large_breasts",
  "object_none",
];

const transformationDetailsPath = path.join(
  __dirname,
  "..",
  "data",
  "transformations",
  "transformation-details.json"
);

const physicalEffectsPath = path.join(
  __dirname,
  "..",
  "data",
  "transformations",
  "physical-effects.json"
);

const mentalEffectsPath = path.join(
  __dirname,
  "..",
  "data",
  "transformations",
  "mental-effects.json"
);

const physicalMaterialTextPath = path.join(
  __dirname,
  "..",
  "data",
  "transformations",
  "physical-material-transformation-text.json"
);

const physicalAnatomyTextPath = path.join(
  __dirname,
  "..",
  "data",
  "transformations",
  "physical-anatomy-transition-text.json"
);

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }

  const rawData = fs.readFileSync(filePath, "utf8");

  if (!rawData.trim()) {
    throw new Error(`Empty JSON file: ${filePath}`);
  }

  try {
    return JSON.parse(rawData);
  } catch (error) {
    throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
  }
}

function assertArrayOfStrings(value, label, errors) {
  if (!Array.isArray(value)) {
    errors.push(`${label} must be an array.`);
    return;
  }

  if (value.length === 0) {
    errors.push(`${label} must not be empty.`);
    return;
  }

  value.forEach((item, index) => {
    if (typeof item !== "string" || !item.trim()) {
      errors.push(`${label}[${index}] must be a non-empty string.`);
    }
  });
}

function validateTransformationDetails(transformations, errors, warnings) {
  if (!Array.isArray(transformations)) {
    errors.push("transformation-details.json must contain an array.");
    return;
  }

  const seenIds = new Set();

  transformations.forEach((transformation, index) => {
    const label = transformation.id || `entry at index ${index}`;

    if (!transformation.id) {
      errors.push(`Transformation at index ${index} is missing id.`);
      return;
    }

    if (seenIds.has(transformation.id)) {
      errors.push(`Duplicate transformation id: ${transformation.id}`);
    }

    seenIds.add(transformation.id);

    if (!transformation.name) {
      errors.push(`${label} is missing name.`);
    }

    if (!Array.isArray(transformation.categories)) {
      errors.push(`${label} categories must be an array.`);
    }

    if (!transformation.text) {
      errors.push(`${label} is missing text.`);
    }

    const profile = transformation.physicalProfile;

    if (!profile) {
      errors.push(`${label} is missing physicalProfile.`);
      return;
    }

    if (!VALID_PHYSICAL_BODY_SHAPES.includes(profile.bodyShape)) {
      errors.push(
        `${label} has invalid bodyShape: ${profile.bodyShape || "missing"}`
      );
    }

    if (!VALID_PHYSICAL_BODY_MATERIALS.includes(profile.bodyMaterial)) {
      errors.push(
        `${label} has invalid bodyMaterial: ${
          profile.bodyMaterial || "missing"
        }`
      );
    }

    if (!profile.sexForm) {
      warnings.push(`${label} is missing sexForm.`);
    } else if (!VALID_PHYSICAL_SEX_FORMS.includes(profile.sexForm)) {
      errors.push(`${label} has invalid sexForm: ${profile.sexForm}`);
    }

    if (!profile.chest) {
      warnings.push(`${label} is missing chest.`);
    } else if (!VALID_PHYSICAL_CHEST_VALUES.includes(profile.chest)) {
      errors.push(`${label} has invalid chest: ${profile.chest}`);
    }
  });
}

function validateEffectsCoverage(transformations, physicalEffects, mentalEffects, errors, warnings) {
  const transformationIds = transformations.map((item) => item.id);

  for (const id of transformationIds) {
    if (!physicalEffects[id]) {
      warnings.push(`${id} is missing physical-effects.json entry.`);
    }

    if (!mentalEffects[id]) {
      warnings.push(`${id} is missing mental-effects.json entry.`);
    }
  }
}

function validateMaterialText(materialText, errors) {
  if (!materialText.departure || !materialText.arrival) {
    errors.push(
      "physical-material-transformation-text.json must contain departure and arrival objects."
    );
    return;
  }

  for (const material of VALID_PHYSICAL_BODY_MATERIALS) {
    assertArrayOfStrings(
      materialText.departure[material],
      `material departure ${material}`,
      errors
    );

    assertArrayOfStrings(
      materialText.arrival[material],
      `material arrival ${material}`,
      errors
    );
  }
}

function validateAnatomyText(anatomyText, errors) {
  const requiredDetailLevels = ["pg", "adult"];

  const requiredTransitions = [
    "masculine_to_feminine",
    "feminine_to_masculine",
    "masculine_to_smooth_neutral",
    "feminine_to_smooth_neutral",
    "smooth_neutral_to_feminine",
    "smooth_neutral_to_masculine",
    "masculine_to_none",
    "feminine_to_none",
    "smooth_neutral_to_none",
    "none_to_feminine",
    "none_to_masculine",
    "none_to_smooth_neutral",
  ];

  for (const detailLevel of requiredDetailLevels) {
    if (!anatomyText[detailLevel]) {
      errors.push(`anatomy text is missing detail level: ${detailLevel}`);
      continue;
    }

    for (const transitionKey of requiredTransitions) {
      assertArrayOfStrings(
        anatomyText[detailLevel][transitionKey],
        `anatomy transition ${detailLevel}.${transitionKey}`,
        errors
      );
    }
  }
} 

function main() {
  const errors = [];
  const warnings = [];

  let transformations;
  let physicalEffects;
  let mentalEffects;
  let materialText;
  let anatomyText;

  try {
    transformations = readJsonFile(transformationDetailsPath);
    physicalEffects = readJsonFile(physicalEffectsPath);
    mentalEffects = readJsonFile(mentalEffectsPath);
    materialText = readJsonFile(physicalMaterialTextPath);
    anatomyText = readJsonFile(physicalAnatomyTextPath);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  validateTransformationDetails(transformations, errors, warnings);
  validateEffectsCoverage(
    transformations,
    physicalEffects,
    mentalEffects,
    errors,
    warnings
  );
  validateMaterialText(materialText, errors);
  validateAnatomyText(anatomyText, errors);

  console.log("Transformation data validation");
  console.log("==============================");
  console.log("");

  if (warnings.length > 0) {
    console.log("Warnings:");
    warnings.forEach((warning) => console.log(`- ${warning}`));
    console.log("");
  }

  if (errors.length > 0) {
    console.log("Errors:");
    errors.forEach((error) => console.log(`- ${error}`));
    console.log("");
    console.log(`Validation failed with ${errors.length} error(s).`);
    process.exit(1);
  }

  console.log("Validation passed.");
  console.log(`Warnings: ${warnings.length}`);
}

main();