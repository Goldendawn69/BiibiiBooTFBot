const TRANSFORMATION_CATEGORIES = [
  { name: "Animal", value: "animal" },
  { name: "Creature", value: "creature" },
  { name: "Tiny", value: "tiny" },
  { name: "Doll", value: "doll" },
  { name: "Mannequin", value: "mannequin" },
  { name: "Object", value: "object" },
  { name: "Toy", value: "toy" },
  { name: "Plushie", value: "plushie" },
  { name: "Robot", value: "robot" },
  { name: "Magic", value: "magic" },
  { name: "Fantasy", value: "fantasy" },
  { name: "Spooky", value: "spooky" },
  { name: "Glamour", value: "glamour" },
  { name: "Food", value: "food" },
  { name: "Plant", value: "plant" },
  { name: "Job Role", value: "job_role" },
];

const VALID_TRANSFORMATION_CATEGORY_VALUES = TRANSFORMATION_CATEGORIES.map(
  (category) => category.value
);

module.exports = {
  TRANSFORMATION_CATEGORIES,
  VALID_TRANSFORMATION_CATEGORY_VALUES,
};