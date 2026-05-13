const { MessageFlags } = require("discord.js");
const { loadUsers, saveUsers } = require("../utils/users");
const {
  loadTransformations,
  pickRandomItem,
} = require("../utils/transformations");
const { buildTransformationEmbed } = require("../utils/embeds");

async function handleRandomTransform(interaction) {
  const users = loadUsers();

  const registeredUserIds = Object.entries(users)
    .filter(([, user]) => user.registered)
    .map(([userId]) => userId);

  if (registeredUserIds.length === 0) {
    await interaction.reply({
      content: "Nobody is registered for silly transformation games yet.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const transformations = loadTransformations();

  if (transformations.length === 0) {
    await interaction.reply({
      content: "There are no transformations loaded yet. The magic cupboard is sadly empty.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const targetUserId = pickRandomItem(registeredUserIds);
  const transformation = pickRandomItem(transformations);

  users[targetUserId].currentForm = transformation.name;
  users[targetUserId].lastTransformedAt = new Date().toISOString();

  saveUsers(users);

  const { embed, files } = buildTransformationEmbed(
    transformation,
    `<@${targetUserId}>`
  );

  await interaction.reply({
    embeds: [embed],
    files,
  });
}

module.exports = {
  handleRandomTransform,
};