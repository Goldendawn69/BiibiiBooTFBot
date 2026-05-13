const {
  MENTAL_EFFECT_OPTIONS,
  SETTINGS_COPY,
} = require("../config/settings");

const MENTAL_EFFECT_LEVELS = MENTAL_EFFECT_OPTIONS.map(
  (option) => option.value
);

const MENTAL_EFFECT_CONTENT_LEVELS = MENTAL_EFFECT_LEVELS.filter(
  (level) => level !== "none"
);

const DEFAULT_MENTAL_EFFECT_LEVEL = "normal";

function normalizeMentalEffectLevel(level) {
  return MENTAL_EFFECT_LEVELS.includes(level)
    ? level
    : DEFAULT_MENTAL_EFFECT_LEVEL;
}

function getMentalEffectLevelLabel(level) {
  const normalizedLevel = normalizeMentalEffectLevel(level);
  const option = MENTAL_EFFECT_OPTIONS.find(
    (mentalEffectOption) => mentalEffectOption.value === normalizedLevel
  );

  return option ? option.label : normalizedLevel;
}

function resolveMentalEffectText(
  transformation,
  requestedLevel = DEFAULT_MENTAL_EFFECT_LEVEL
) {
  const level = normalizeMentalEffectLevel(requestedLevel);

  if (level === "none") {
    return SETTINGS_COPY.mentalEffects.noMentalEffectsText;
  }

  const mentalEffects = transformation.transformationNotes?.mentalEffects;
  const selectedEffect = mentalEffects?.[level];

  if (typeof selectedEffect !== "string" || !selectedEffect.trim()) {
    return null;
  }

  return selectedEffect;
}

module.exports = {
  DEFAULT_MENTAL_EFFECT_LEVEL,
  MENTAL_EFFECT_CONTENT_LEVELS,
  MENTAL_EFFECT_LEVELS,
  getMentalEffectLevelLabel,
  normalizeMentalEffectLevel,
  resolveMentalEffectText,
};
