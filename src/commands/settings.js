const {
  ActionRowBuilder,
  MessageFlags,
  StringSelectMenuBuilder,
} = require("discord.js");
const {
  MENTAL_EFFECT_OPTIONS,
} = require("../config/settings");
const {
  getMentalEffectLevelLabel,
  normalizeMentalEffectLevel,
} = require("../utils/mentalEffects");
const {
  getUserMentalEffectsRange,
  loadUsers,
  saveUsers,
  setUserMentalEffectsMaxLevel,
  setUserMentalEffectsMinLevel,
} = require("../utils/users");

const SETTINGS_MENTAL_EFFECTS_MIN_CUSTOM_ID = "settings:mental-effects-min";
const SETTINGS_MENTAL_EFFECTS_MAX_CUSTOM_ID = "settings:mental-effects-max";

function buildSettingsContent(user) {
  const notesStatus = user.transformationNotesEnabled ? "Enabled" : "Disabled";
  const mentalEffectsRange = getUserMentalEffectsRange(user);
  const minLabel = getMentalEffectLevelLabel(mentalEffectsRange.minLevel);
  const maxLabel = getMentalEffectLevelLabel(mentalEffectsRange.maxLevel);

  return [
    "**BiiBiiBoo Settings**",
    "",
    `Transformation Notes: **${notesStatus}**`,
    `Mental Effects Range: **${minLabel}** to **${maxLabel}**`,
  ].join("\n");
}

function buildMentalEffectsSelect(customId, placeholder, selectedLevel) {
  const normalizedSelectedLevel = normalizeMentalEffectLevel(selectedLevel);

  return new StringSelectMenuBuilder()
    .setCustomId(customId)
    .setPlaceholder(placeholder)
    .addOptions(
      MENTAL_EFFECT_OPTIONS.map((option) => ({
        label: option.label,
        value: option.value,
        description: option.description,
        default: option.value === normalizedSelectedLevel,
      }))
    );
}

function buildSettingsPanel(user, { ephemeral = true } = {}) {
  const mentalEffectsRange = getUserMentalEffectsRange(user);
  const panel = {
    content: buildSettingsContent(user),
    components: [
      new ActionRowBuilder().addComponents(
        buildMentalEffectsSelect(
          SETTINGS_MENTAL_EFFECTS_MIN_CUSTOM_ID,
          "Choose your minimum Mental Effects level",
          mentalEffectsRange.minLevel
        )
      ),
      new ActionRowBuilder().addComponents(
        buildMentalEffectsSelect(
          SETTINGS_MENTAL_EFFECTS_MAX_CUSTOM_ID,
          "Choose your maximum Mental Effects level",
          mentalEffectsRange.maxLevel
        )
      ),
    ],
  };

  if (ephemeral) {
    panel.flags = MessageFlags.Ephemeral;
  }

  return panel;
}

function buildSettingsUpdatePanel(user, savedMessage) {
  return {
    ...buildSettingsPanel(user, { ephemeral: false }),
    content: `${buildSettingsContent(user)}\n\n${savedMessage}`,
  };
}

async function handleSettings(interaction) {
  const users = loadUsers();
  const user = users[interaction.user.id];

  if (!user?.registered) {
    await interaction.reply({
      content:
        "You are not registered yet. Use `/register` first if you want to join the silly transformation games.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  await interaction.reply(buildSettingsPanel(user));
}

async function handleSettingsSelectMenu(interaction) {
  if (
    interaction.customId !== SETTINGS_MENTAL_EFFECTS_MIN_CUSTOM_ID &&
    interaction.customId !== SETTINGS_MENTAL_EFFECTS_MAX_CUSTOM_ID
  ) {
    return false;
  }

  const users = loadUsers();
  const user = users[interaction.user.id];

  if (!user?.registered) {
    await interaction.reply({
      content:
        "You are not registered yet. Use `/register` first if you want to change settings.",
      flags: MessageFlags.Ephemeral,
    });
    return true;
  }

  const selectedLevel = normalizeMentalEffectLevel(interaction.values[0]);

  if (interaction.customId === SETTINGS_MENTAL_EFFECTS_MIN_CUSTOM_ID) {
    setUserMentalEffectsMinLevel(user, selectedLevel);
  } else {
    setUserMentalEffectsMaxLevel(user, selectedLevel);
  }

  saveUsers(users);

  const range = getUserMentalEffectsRange(user);
  const minLabel = getMentalEffectLevelLabel(range.minLevel);
  const maxLabel = getMentalEffectLevelLabel(range.maxLevel);

  await interaction.update(
    buildSettingsUpdatePanel(
      user,
      `Saved Mental Effects range: **${minLabel}** to **${maxLabel}**`
    )
  );

  return true;
}

module.exports = {
  SETTINGS_MENTAL_EFFECTS_MAX_CUSTOM_ID,
  SETTINGS_MENTAL_EFFECTS_MIN_CUSTOM_ID,
  buildSettingsPanel,
  handleSettings,
  handleSettingsSelectMenu,
};
