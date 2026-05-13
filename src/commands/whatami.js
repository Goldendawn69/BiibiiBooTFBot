const { MessageFlags } = require("discord.js");
const { loadUsers } = require("../utils/users");
const {
  loadTransformations,
  findTransformationForUser,
} = require("../utils/transformations");
const { buildCurrentFormEmbed } = require("../utils/embeds");

async function handleWhatAmI(interaction) {
  const users = loadUsers();
  const userId = interaction.user.id;
  const user = users[userId];

  if (!user?.registered) {
    await interaction.reply({
      content:
        "You are not registered yet. Use `/register` first if you want to join the silly transformation games.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  if (!user.currentForm) {
    await interaction.reply({
      content: "You are registered, but you have not been transformed yet.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const transformations = loadTransformations();
  const transformation = findTransformationForUser(transformations, user);

  if (!transformation) {
    await interaction.reply({
      content: `I can see your current form, but I could not find the matching transformation data.\nYour saved form is: **${user.currentForm}**`,
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

const { embed, files } = buildCurrentFormEmbed(user, transformation);

try {
  await interaction.user.send({
    embeds: [embed],
    files,
  });

  await interaction.reply({
    content: "I have sent your current transformation details to your DMs.",
    flags: MessageFlags.Ephemeral,
  });
} catch (error) {
  console.warn("Could not send /whatami DM:", error);

  await interaction.reply({
    content:
      "I tried to send your current transformation details by DM, but your DMs appear to be closed.",
    flags: MessageFlags.Ephemeral,
  });
}
}

module.exports = {
  handleWhatAmI,
};