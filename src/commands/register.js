const { MessageFlags } = require("discord.js");
const {
  getUserMentalEffectsRange,
  loadUsers,
  saveUsers,
} = require("../utils/users");

async function handleRegister(interaction) {
  const users = loadUsers();
  const userId = interaction.user.id;

  if (users[userId]?.registered) {
    await interaction.reply({
      content: "You are already registered for silly transformation games.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const defaultMentalEffectsRange = getUserMentalEffectsRange(null);

  users[userId] = {
    registered: true,

    discordUser: {
      id: interaction.user.id,
      username: interaction.user.username,
      globalName: interaction.user.globalName || null,
      displayName: interaction.member?.displayName || null,
    },

    currentForm: null,
    currentTransformationId: null,
    transformationNotesEnabled: false,
    blockedTransformationCategories: [],
    mentalEffectsMinLevel: defaultMentalEffectsRange.minLevel,
    mentalEffectsMaxLevel: defaultMentalEffectsRange.maxLevel,
    registeredAt: new Date().toISOString(),
    physicalDetailLevel: "pg",
  };

  saveUsers(users);

  await interaction.reply({
    content: "You are now registered for silly transformation games. The magic nonsense may now legally begin.",
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = {
  handleRegister,
};
