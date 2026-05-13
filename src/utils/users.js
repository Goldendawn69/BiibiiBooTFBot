const fs = require("fs");
const path = require("path");
const {
  DEFAULT_MENTAL_EFFECT_LEVEL,
  normalizeMentalEffectRange,
  normalizeMentalEffectLevel,
  pickRandomMentalEffectLevel,
} = require("./mentalEffects");

const usersFilePath = path.join(__dirname, "..", "..", "data", "users.json");
const usersDirectoryPath = path.dirname(usersFilePath);

function ensureUsersFileExists() {
  if (!fs.existsSync(usersDirectoryPath)) {
    fs.mkdirSync(usersDirectoryPath, { recursive: true });
  }

  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, "{}", "utf8");
  }
}

function loadUsers() {
  ensureUsersFileExists();

  const rawData = fs.readFileSync(usersFilePath, "utf8");

  if (!rawData.trim()) {
    return {};
  }

  return JSON.parse(rawData);
}

function saveUsers(users) {
  ensureUsersFileExists();
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
}

function getUserMentalEffectsLevel(user) {
  return normalizeMentalEffectLevel(
    user?.mentalEffectsLevel || DEFAULT_MENTAL_EFFECT_LEVEL
  );
}

function setUserMentalEffectsLevel(user, mentalEffectsLevel) {
  user.mentalEffectsLevel = normalizeMentalEffectLevel(mentalEffectsLevel);
}

function getUserMentalEffectsRange(user) {
  if (user?.mentalEffectsMinLevel || user?.mentalEffectsMaxLevel) {
    return normalizeMentalEffectRange(
      user.mentalEffectsMinLevel || DEFAULT_MENTAL_EFFECT_LEVEL,
      user.mentalEffectsMaxLevel || DEFAULT_MENTAL_EFFECT_LEVEL
    );
  }

  const legacyLevel = getUserMentalEffectsLevel(user);

  return {
    minLevel: legacyLevel,
    maxLevel: legacyLevel,
  };
}

function setUserMentalEffectsRange(user, minLevel, maxLevel) {
  const range = normalizeMentalEffectRange(minLevel, maxLevel);

  user.mentalEffectsMinLevel = range.minLevel;
  user.mentalEffectsMaxLevel = range.maxLevel;
  delete user.mentalEffectsLevel;

  return range;
}

function setUserMentalEffectsMinLevel(user, minLevel) {
  const currentRange = getUserMentalEffectsRange(user);
  const selectedRange = normalizeMentalEffectRange(
    minLevel,
    currentRange.maxLevel
  );

  if (selectedRange.minLevel !== normalizeMentalEffectLevel(minLevel)) {
    return setUserMentalEffectsRange(user, minLevel, minLevel);
  }

  return setUserMentalEffectsRange(
    user,
    selectedRange.minLevel,
    selectedRange.maxLevel
  );
}

function setUserMentalEffectsMaxLevel(user, maxLevel) {
  const currentRange = getUserMentalEffectsRange(user);
  const selectedRange = normalizeMentalEffectRange(
    currentRange.minLevel,
    maxLevel
  );

  if (selectedRange.maxLevel !== normalizeMentalEffectLevel(maxLevel)) {
    return setUserMentalEffectsRange(user, maxLevel, maxLevel);
  }

  return setUserMentalEffectsRange(
    user,
    selectedRange.minLevel,
    selectedRange.maxLevel
  );
}

function pickUserMentalEffectsLevel(user) {
  const range = getUserMentalEffectsRange(user);
  return pickRandomMentalEffectLevel(range.minLevel, range.maxLevel);
}

module.exports = {
  getUserMentalEffectsLevel,
  getUserMentalEffectsRange,
  loadUsers,
  pickUserMentalEffectsLevel,
  saveUsers,
  setUserMentalEffectsLevel,
  setUserMentalEffectsMaxLevel,
  setUserMentalEffectsMinLevel,
  setUserMentalEffectsRange,
};
