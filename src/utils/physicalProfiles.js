const PHYSICAL_BODY_SHAPES = {
  MASCULINE_HUMANOID: "masculine_humanoid",
  FEMININE_HUMANOID: "feminine_humanoid",
  SMALL_FEMININE_HUMANOID: "small_feminine_humanoid",
  FEMININE_CREATURE: "feminine_creature",
  NON_HUMANOID_OBJECT: "non_humanoid_object",
  ANIMAL_OBJECT: "animal_object",
};

const PHYSICAL_SEX_FORMS = {
  MASCULINE: "masculine",
  FEMININE: "feminine",
  SMOOTH_NEUTRAL: "smooth_neutral",
  NONE: "none",
};

const PHYSICAL_BODY_MATERIALS = {
  LIVING_FLESH: "living_flesh",
  SYNTHETIC_SKIN: "synthetic_skin",
  METAL: "metal",
  PORCELAIN: "porcelain",
  PLASTIC: "plastic",
  PLUSH_FABRIC: "plush_fabric",
  RUBBER: "rubber",
  SLIME: "slime",
  WATER: "water",
  GHOSTLY_MIST: "ghostly_mist",
  PLANT_MATTER: "plant_matter",
  STONE: "stone",
  HONEY: "honey",
  CANDY_FLOSS: "candy_floss",
};

const VALID_PHYSICAL_BODY_SHAPES = Object.values(PHYSICAL_BODY_SHAPES);
const VALID_PHYSICAL_BODY_MATERIALS = Object.values(PHYSICAL_BODY_MATERIALS);
const VALID_PHYSICAL_SEX_FORMS = Object.values(PHYSICAL_SEX_FORMS);

function getPhysicalBodyShape(transformation) {
  return transformation?.physicalProfile?.bodyShape || null;
}

function getPhysicalBodyMaterial(transformation) {
  return transformation?.physicalProfile?.bodyMaterial || null;
}

function getPhysicalSexForm(transformation) {
  return transformation?.physicalProfile?.sexForm || null;
}

function hasValidPhysicalSexForm(transformation) {
  return VALID_PHYSICAL_SEX_FORMS.includes(getPhysicalSexForm(transformation));
}

function hasValidPhysicalBodyShape(transformation) {
  return VALID_PHYSICAL_BODY_SHAPES.includes(
    getPhysicalBodyShape(transformation)
  );
}

function hasValidPhysicalBodyMaterial(transformation) {
  return VALID_PHYSICAL_BODY_MATERIALS.includes(
    getPhysicalBodyMaterial(transformation)
  );
}

function hasFeminineBodyShape(transformation) {
  return [
    PHYSICAL_BODY_SHAPES.FEMININE_HUMANOID,
    PHYSICAL_BODY_SHAPES.SMALL_FEMININE_HUMANOID,
    PHYSICAL_BODY_SHAPES.FEMININE_CREATURE,
  ].includes(getPhysicalBodyShape(transformation));
}

function hasMasculineBodyShape(transformation) {
  return (
    getPhysicalBodyShape(transformation) ===
    PHYSICAL_BODY_SHAPES.MASCULINE_HUMANOID
  );
}

function hasHumanoidBodyShape(transformation) {
  return [
    PHYSICAL_BODY_SHAPES.MASCULINE_HUMANOID,
    PHYSICAL_BODY_SHAPES.FEMININE_HUMANOID,
    PHYSICAL_BODY_SHAPES.SMALL_FEMININE_HUMANOID,
  ].includes(getPhysicalBodyShape(transformation));
}

module.exports = {
  PHYSICAL_BODY_SHAPES,
  PHYSICAL_BODY_MATERIALS,
  VALID_PHYSICAL_BODY_SHAPES,
  VALID_PHYSICAL_BODY_MATERIALS,
  getPhysicalBodyShape,
  getPhysicalBodyMaterial,
  hasValidPhysicalBodyShape,
  hasValidPhysicalBodyMaterial,
  hasFeminineBodyShape,
  hasMasculineBodyShape,
  hasHumanoidBodyShape,
  PHYSICAL_SEX_FORMS,
  VALID_PHYSICAL_SEX_FORMS,
  getPhysicalSexForm,
  hasValidPhysicalSexForm,
};