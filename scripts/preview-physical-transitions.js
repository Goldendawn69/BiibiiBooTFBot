const fs = require("fs");
const path = require("path");

const { loadTransformations } = require("../src/utils/transformations");
const {
  buildPhysicalTransitionText,
} = require("../src/utils/physicalTransitions");
const {
  PHYSICAL_DETAIL_LEVELS,
  VALID_PHYSICAL_DETAIL_LEVELS,
} = require("../src/utils/users");

const requestedDetailLevel = process.argv[2] || PHYSICAL_DETAIL_LEVELS.PG;

const physicalDetailLevel = VALID_PHYSICAL_DETAIL_LEVELS.includes(
  requestedDetailLevel
)
  ? requestedDetailLevel
  : PHYSICAL_DETAIL_LEVELS.PG;

const outputPath = path.join(
  __dirname,
  "..",
  `transition-preview-${physicalDetailLevel}.txt`
);

if (requestedDetailLevel !== physicalDetailLevel) {
  console.warn(
    `Unknown physical detail level "${requestedDetailLevel}". Falling back to "${PHYSICAL_DETAIL_LEVELS.PG}".`
  );
}

const PREVIEW_GROUPS = [
  {
    title: "Initial / Original Body Transitions",
    description:
      "Checks how transformations read when the user has no previous form.",
    cases: [
      [null, "cat_cafe_girl"],
      [null, "boutique_mannequin"],
      [null, "haunted_teapot"],
      [null, "bubble_mermaid"],
      [null, "living_plush_bunny"],
      [null, "clocktower_ghost_girl"],
      [null, "tin_robot_assistant"],
      [null, "latex_android"],
      [null, "pumpkin_girl"],
      [null, "luminous_water_nymph"],
    ],
  },
  {
    title: "Humanoid To Object / Toy Transitions",
    description:
      "Checks shrinking, simplifying, smoothing, and object-like body changes.",
    cases: [
      ["cat_cafe_girl", "haunted_teapot"],
      ["magical_maid", "rubber_duck"],
      ["moonlit_witch", "boutique_mannequin"],
      ["leather_biker_rogue", "enchanted_doll"],
      ["velvet_lounge_siren", "ballerina_music_box"],
    ],
  },
  {
    title: "Object / Toy To Humanoid Transitions",
    description:
      "Checks object forms becoming flexible humanoid or creature bodies again.",
    cases: [
      ["haunted_teapot", "cat_cafe_girl"],
      ["rubber_duck", "magical_maid"],
      ["boutique_mannequin", "moonlit_witch"],
      ["enchanted_doll", "leather_biker_rogue"],
      ["ballerina_music_box", "velvet_lounge_siren"],
    ],
  },
  {
    title: "Major Material Transitions",
    description:
      "Checks whether material wording feels natural across important changes.",
    cases: [
      ["clocktower_ghost_girl", "latex_android"],
      ["tin_robot_assistant", "ballerina_music_box"],
      ["living_plush_bunny", "moonlit_vampire_lady"],
      ["forest_nymph", "honey_nymph"],
      ["honey_nymph", "tin_robot_assistant"],
      ["boutique_mannequin", "luminous_water_nymph"],
      ["rainbow_slime_girl", "crystal_fairy_queen"],
      ["porcelain_princess", "living_plush_bunny"],
    ],
  },
  {
    title: "Same Material / Shape-Only Transitions",
    description:
      "Checks cases where material does not change, so shape wording has to carry the scene.",
    cases: [
      ["cat_cafe_girl", "moonlit_witch"],
      ["moonlit_witch", "moonlit_vampire_lady"],
      ["magical_maid", "tea_party_hostess"],
      ["pocket_fairy", "garden_gnome_lady"],
      ["bubble_mermaid", "neon_demon_hostess"],
    ],
  },
  {
    title: "Creature / Non-Standard Body Transitions",
    description:
      "Checks tails, wings, small bodies, supernatural bodies, and less ordinary silhouettes.",
    cases: [
      ["cat_cafe_girl", "bubble_mermaid"],
      ["bubble_mermaid", "cat_cafe_girl"],
      ["pocket_fairy", "clockwork_dragon"],
      ["clockwork_dragon", "living_plush_bunny"],
      ["clocktower_ghost_girl", "forest_nymph"],
      ["forest_nymph", "clocktower_ghost_girl"],
    ],
  },
];

function formatProfile(transformation) {
  if (!transformation) {
    return [
      "bodyShape: masculine_humanoid",
      "bodyMaterial: living_flesh",
      "sexForm: masculine",
    ].join(", ");
  }

  const profile = transformation.physicalProfile || {};

  return [
    `bodyShape: ${profile.bodyShape || "missing"}`,
    `bodyMaterial: ${profile.bodyMaterial || "missing"}`,
    `sexForm: ${profile.sexForm || "missing"}`,
  ].join(", ");
}

function findTransformationById(transformations, id) {
  return transformations.find((transformation) => transformation.id === id);
}

function getTransformationLabel(transformation) {
  return transformation ? transformation.name : "Original Body";
}

function buildCaseText(transformations, fromId, toId) {
  const fromTransformation = fromId
    ? findTransformationById(transformations, fromId)
    : null;

  const toTransformation = findTransformationById(transformations, toId);

  const lines = [];

  if (fromId && !fromTransformation) {
    lines.push(`Missing source transformation: ${fromId}`);
    lines.push("");
    return lines;
  }

  if (!toTransformation) {
    lines.push(`Missing target transformation: ${toId}`);
    lines.push("");
    return lines;
  }

  lines.push(
    `${getTransformationLabel(fromTransformation)} → ${getTransformationLabel(
      toTransformation
    )}`
  );
  lines.push(`From profile: ${formatProfile(fromTransformation)}`);
  lines.push(`To profile: ${formatProfile(toTransformation)}`);
  lines.push("");
  lines.push(
    buildPhysicalTransitionText(
      fromTransformation,
      toTransformation,
      physicalDetailLevel
    )
  );
  lines.push("");

  return lines;
}

function buildPreviewText(transformations) {
  const lines = [];

  lines.push("Physical Transition Preview");
  lines.push("===========================");
  lines.push("");
  lines.push(`Transformations loaded: ${transformations.length}`);
  lines.push(`Physical detail level: ${physicalDetailLevel}`);
  lines.push("");

  for (const group of PREVIEW_GROUPS) {
    lines.push(group.title);
    lines.push("-".repeat(group.title.length));

    if (group.description) {
      lines.push(group.description);
    }

    lines.push("");

    for (const [fromId, toId] of group.cases) {
      lines.push(...buildCaseText(transformations, fromId, toId));
    }

    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const transformations = loadTransformations();

  if (transformations.length === 0) {
    console.error("No transformations loaded.");
    process.exit(1);
  }

  const previewText = buildPreviewText(transformations);

  fs.writeFileSync(outputPath, previewText, "utf8");

  console.log(
    `Transition preview written to: ${outputPath} (${physicalDetailLevel})`
  );
}

main();