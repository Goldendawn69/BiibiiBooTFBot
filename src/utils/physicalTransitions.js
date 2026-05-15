const fs = require("fs");
const path = require("path");

const {
  PHYSICAL_BODY_SHAPES,
  PHYSICAL_BODY_MATERIALS,
  PHYSICAL_SEX_FORMS,
  getPhysicalBodyMaterial,
  getPhysicalBodyShape,
  getPhysicalSexForm,
  hasFeminineBodyShape,
  hasHumanoidBodyShape,
  hasMasculineBodyShape,
} = require("./physicalProfiles");

const physicalMaterialTransformationTextPath = path.join(
  __dirname,
  "..",
  "..",
  "data",
  "transformations",
  "physical-material-transformation-text.json"
);

const physicalAnatomyTransitionTextPath = path.join(
  __dirname,
  "..",
  "..",
  "data",
  "transformations",
  "physical-anatomy-transition-text.json"
);

const DEFAULT_STARTING_TRANSFORMATION = {
  id: "default_starting_body",
  name: "original body",
  physicalProfile: {
    bodyShape: PHYSICAL_BODY_SHAPES.MASCULINE_HUMANOID,
    bodyMaterial: PHYSICAL_BODY_MATERIALS.LIVING_FLESH,
    sexForm: PHYSICAL_SEX_FORMS.MASCULINE,
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

function loadPhysicalMaterialTransformationText() {
  return readJsonFile(physicalMaterialTransformationTextPath, {
    departure: {},
    arrival: {},
  });
}

function loadPhysicalAnatomyTransitionText() {
  return readJsonFile(physicalAnatomyTransitionTextPath, {});
}

function getPreviousOrDefaultTransformation(previousTransformation) {
  return previousTransformation || DEFAULT_STARTING_TRANSFORMATION;
}

function getFormReference(transformation) {
  if (transformation.id === DEFAULT_STARTING_TRANSFORMATION.id) {
    return "original body";
  }

  return `${transformation.name} form`;
}

function isNonHumanoidObject(transformation) {
  return (
    getPhysicalBodyShape(transformation) ===
    PHYSICAL_BODY_SHAPES.NON_HUMANOID_OBJECT
  );
}

function isAnimalObject(transformation) {
  return (
    getPhysicalBodyShape(transformation) ===
    PHYSICAL_BODY_SHAPES.ANIMAL_OBJECT
  );
}

function isObjectLike(transformation) {
  return isNonHumanoidObject(transformation) || isAnimalObject(transformation);
}

function getAnatomyTransitionKey(fromTransformation, transformation) {
  const fromSexForm = getPhysicalSexForm(fromTransformation);
  const toSexForm = getPhysicalSexForm(transformation);

  if (!fromSexForm || !toSexForm || fromSexForm === toSexForm) {
    return null;
  }

  return `${fromSexForm}_to_${toSexForm}`;
}

function getAnatomyTransitionText(
  fromTransformation,
  transformation,
  detailLevel = "pg"
) {
  const transitionKey = getAnatomyTransitionKey(
    fromTransformation,
    transformation
  );

  if (!transitionKey) {
    return null;
  }

  const anatomyText = loadPhysicalAnatomyTransitionText();
  const transitionText = pickText(anatomyText[detailLevel]?.[transitionKey]);

  return transitionText || null;
}

function getMaterialTransitionText(fromTransformation, transformation) {
  const fromMaterial = getPhysicalBodyMaterial(fromTransformation);
  const toMaterial = getPhysicalBodyMaterial(transformation);

  if (!fromMaterial || !toMaterial || fromMaterial === toMaterial) {
    return null;
  }

  const materialText = loadPhysicalMaterialTransformationText();
  const departureText = pickText(materialText.departure?.[fromMaterial]);
  const arrivalText = pickText(materialText.arrival?.[toMaterial]);

  if (!departureText || !arrivalText) {
    return null;
  }

  return `${departureText}, ${arrivalText}`;
}

function buildInitialMasculineToFeminineText(transformation) {
  return `Your original body begins reshaping into a feminine version of the ${transformation.name} form. Your chest fills out, your waist draws in, your hips round, and your face softens. Your hair, posture, clothing, surface details, and movement all shift to suit the transformation.`;
}

function buildInitialMasculineToObjectText(transformation) {
  return `Your original body begins losing its human shape as the ${transformation.name} transformation takes over. Your proportions compress and simplify, skin and muscle giving way to the new surface texture, structure, and movement of the final form.`;
}

function buildShapeTransitionText(fromTransformation, transformation) {
  if (
    hasMasculineBodyShape(fromTransformation) &&
    hasFeminineBodyShape(transformation)
  ) {
    return buildInitialMasculineToFeminineText(transformation);
  }

  if (
    hasMasculineBodyShape(fromTransformation) &&
    isObjectLike(transformation)
  ) {
    return buildInitialMasculineToObjectText(transformation);
  }

  if (
    isObjectLike(fromTransformation) &&
    hasFeminineBodyShape(transformation)
  ) {
    return `Your ${fromTransformation.name} form loosens and reorganises, rigid or simplified details giving way to a softer, more flexible feminine body as the ${transformation.name} shape takes over.`;
  }

  if (
    hasFeminineBodyShape(fromTransformation) &&
    hasFeminineBodyShape(transformation)
  ) {
    return `Your ${fromTransformation.name} form reshapes into the ${transformation.name} form, keeping a feminine silhouette while its features, outfit, posture, and movement change to match the new form.`;
  }

  if (
    hasHumanoidBodyShape(fromTransformation) &&
    isObjectLike(transformation)
  ) {
    return `Your ${fromTransformation.name} form compresses and simplifies, living curves and flexible movement giving way to the object-like shape of a ${transformation.name}.`;
  }

  if (
    hasHumanoidBodyShape(fromTransformation) &&
    hasHumanoidBodyShape(transformation)
  ) {
    return `Your ${fromTransformation.name} form shifts into a new silhouette, with features, proportions, clothing, and movement changing until the ${transformation.name} form settles into place.`;
  }

  return null;
}

function buildPhysicalTransitionText(
  previousTransformation,
  transformation,
  physicalDetailLevel = "pg"
) {
  const fromTransformation = getPreviousOrDefaultTransformation(
    previousTransformation
  );

  if (fromTransformation.id === transformation.id) {
    return "The transformation reinforces your current form, sharpening its existing details rather than replacing it with something entirely new.";
  }

  const shapeTransitionText = buildShapeTransitionText(
    fromTransformation,
    transformation
  );

  const anatomyTransitionText = getAnatomyTransitionText(
    fromTransformation,
    transformation,
    physicalDetailLevel
  );

  const materialTransitionText = getMaterialTransitionText(
    fromTransformation,
    transformation
  );

  const transitionParts = [];

  if (shapeTransitionText) {
    transitionParts.push(shapeTransitionText);
  }

  if (anatomyTransitionText) {
    transitionParts.push(anatomyTransitionText);
  }

  if (materialTransitionText) {
    if (transitionParts.length > 0) {
      transitionParts.push(`At the same time, ${materialTransitionText}.`);
    } else {
      transitionParts.push(
        `Your ${getFormReference(
          fromTransformation
        )} changes as ${materialTransitionText} as the ${
          transformation.name
        } form takes over.`
      );
    }
  }

  if (transitionParts.length > 0) {
    return transitionParts.join(" ");
  }

  return `Your ${getFormReference(
    fromTransformation
  )} twists and reshapes, its old details fading as the ${
    transformation.name
  } transformation takes over.`;
}

module.exports = {
  buildPhysicalTransitionText,
};