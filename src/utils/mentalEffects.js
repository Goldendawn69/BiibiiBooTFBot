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

function getMentalEffectLevelIndex(level) {
  return MENTAL_EFFECT_LEVELS.indexOf(normalizeMentalEffectLevel(level));
}

function getMentalEffectLevelLabel(level) {
  const normalizedLevel = normalizeMentalEffectLevel(level);
  const option = MENTAL_EFFECT_OPTIONS.find(
    (mentalEffectOption) => mentalEffectOption.value === normalizedLevel
  );

  return option ? option.label : normalizedLevel;
}

function normalizeMentalEffectRange(minLevel, maxLevel) {
  const normalizedMinLevel = normalizeMentalEffectLevel(minLevel);
  const normalizedMaxLevel = normalizeMentalEffectLevel(maxLevel);
  const minIndex = getMentalEffectLevelIndex(normalizedMinLevel);
  const maxIndex = getMentalEffectLevelIndex(normalizedMaxLevel);

  if (minIndex <= maxIndex) {
    return {
      minLevel: normalizedMinLevel,
      maxLevel: normalizedMaxLevel,
    };
  }

  return {
    minLevel: normalizedMaxLevel,
    maxLevel: normalizedMinLevel,
  };
}

function getMentalEffectLevelsInRange(minLevel, maxLevel) {
  const normalizedRange = normalizeMentalEffectRange(minLevel, maxLevel);
  const minIndex = getMentalEffectLevelIndex(normalizedRange.minLevel);
  const maxIndex = getMentalEffectLevelIndex(normalizedRange.maxLevel);

  return MENTAL_EFFECT_LEVELS.slice(minIndex, maxIndex + 1);
}

function pickRandomMentalEffectLevel(minLevel, maxLevel) {
  const levels = getMentalEffectLevelsInRange(minLevel, maxLevel);
  return levels[Math.floor(Math.random() * levels.length)];
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
  getMentalEffectLevelIndex,
  getMentalEffectLevelLabel,
  getMentalEffectLevelsInRange,
  normalizeMentalEffectRange,
  normalizeMentalEffectLevel,
  pickRandomMentalEffectLevel,
  resolveMentalEffectText,
};
