const MENTAL_EFFECT_OPTIONS = [
  {
    label: "None",
    value: "none",
    description: "No mental transformation effects.",
  },
  {
    label: "Mild",
    value: "mild",
    description: "Small mood or confidence nudges.",
  },
  {
    label: "Normal",
    value: "normal",
    description: "The standard mental transformation level.",
  },
  {
    label: "Strong",
    value: "strong",
    description: "Hard-to-ignore urges or personality pulls.",
  },
  {
    label: "Full",
    value: "full",
    description: "Major personality and behaviour shift.",
  },
  {
    label: "Overwritten",
    value: "overwritten",
    description: "Maximum opt-in identity/self-concept rewrite tier.",
  },
];

const SETTINGS_COPY = {
  mentalEffects: {
    noMentalEffectsText:
      "There were no mental changes with this transformation.",
  },
};

module.exports = {
  MENTAL_EFFECT_OPTIONS,
  SETTINGS_COPY,
};
