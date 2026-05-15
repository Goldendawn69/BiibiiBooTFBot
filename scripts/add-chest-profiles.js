const fs = require("fs");
const path = require("path");

const transformationDetailsPath = path.join(
  __dirname,
  "..",
  "data",
  "transformations",
  "transformation-details.json"
);

const chestById = {
  // Specific test choices
  cat_cafe_girl: "medium_breasts",
  boutique_mannequin: "smooth_bust",
  haunted_teapot: "object_none",
  bubble_mermaid: "large_breasts",
  living_plush_bunny: "round_plush_chest",

  // Obvious object / toy / artificial choices
  rubber_duck: "object_none",
  enchanted_doll: "smooth_bust",
  porcelain_princess: "sculpted_bust",
  ballerina_music_box: "sculpted_bust",
  tin_robot_assistant: "smooth_bust",
  latex_android: "medium_breasts",
  velvet_fetish_doll: "smooth_bust",

  // Small / cute forms
  pocket_fairy: "small_breasts",
  garden_gnome_lady: "small_breasts",
  lady_knight_mouse: "small_breasts",
  candyfloss_sprite: "small_breasts",

  // Creature / fantasy forms
  glitter_goblin: "small_breasts",
  clockwork_dragon: "small_breasts",
  mini_dragon_librarian: "small_breasts",
  rainbow_slime_girl: "medium_breasts",
  crystal_fairy_queen: "medium_breasts",
  pumpkin_girl: "medium_breasts",
  honey_nymph: "medium_breasts",
  forest_nymph: "medium_breasts",
  luminous_water_nymph: "medium_breasts",
  clocktower_ghost_girl: "medium_breasts",

  // More glamorous / adult-coded forms
  magical_maid: "medium_breasts",
  moonlit_witch: "medium_breasts",
  office_sorceress: "medium_breasts",
  starry_stage_magician: "medium_breasts",
  tea_party_hostess: "medium_breasts",
  velvet_lounge_siren: "large_breasts",
  moonlit_vampire_lady: "medium_breasts",
  cabaret_catwoman: "large_breasts",
  rose_court_enchantress: "large_breasts",
  neon_demon_hostess: "large_breasts",
  leather_biker_rogue: "medium_breasts",
  gilded_goddess: "large_breasts",
  satin_sleepwear_spirit: "medium_breasts"
};

function inferChest(transformation) {
  const profile = transformation.physicalProfile || {};

  if (chestById[transformation.id]) {
    return chestById[transformation.id];
  }

  if (profile.bodyShape === "non_humanoid_object" || profile.bodyShape === "animal_object") {
    return "object_none";
  }

  if (profile.sexForm === "smooth_neutral") {
    return "smooth_bust";
  }

  return "medium_breasts";
}

function main() {
  const rawData = fs.readFileSync(transformationDetailsPath, "utf8");
  const transformations = JSON.parse(rawData);

  const updatedTransformations = transformations.map((transformation) => ({
    ...transformation,
    physicalProfile: {
      ...(transformation.physicalProfile || {}),
      chest: transformation.physicalProfile?.chest || inferChest(transformation),
    },
  }));

  fs.writeFileSync(
    transformationDetailsPath,
    `${JSON.stringify(updatedTransformations, null, 2)}\n`,
    "utf8"
  );

  console.log("Chest profiles added to transformation-details.json");
}

main();