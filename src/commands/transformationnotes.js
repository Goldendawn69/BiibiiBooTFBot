const { MessageFlags } = require("discord.js");
const { loadUsers, saveUsers } = require("../utils/users");

function getStatusText(user) {
  return user.transformationNotesEnabled
    ? "Transformation Notes: Enabled"
    : "Transformation Notes: Disabled";
}

async function handleTransformationNotes(interaction) {
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

  const subcommand = interaction.options.getSubcommand();

  if (subcommand === "on") {
    user.transformationNotesEnabled = true;
    saveUsers(users);

    await interaction.reply({
      content:
        "Transformation Notes are now enabled.\n\nWhen you are transformed, the bot may DM you an optional private note about how the change feels. Notes can include physical or mental roleplay prompts. You decide whether your character follows, resists, ignores, or adapts them.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  if (subcommand === "off") {
    user.transformationNotesEnabled = false;
    saveUsers(users);

    await interaction.reply({
      content:
        "Transformation Notes are now disabled.\n\nYou will still receive public transformation results, but the bot will not send you private transformation notes.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  if (subcommand === "status") {
    await interaction.reply({
      content: getStatusText(user),
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  await interaction.reply({
    content: "That Transformation Notes command is not recognised.",
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = {
  handleTransformationNotes,
};