const { MessageFlags } = require("discord.js");
const { loadUsers, saveUsers } = require("../utils/users");

async function handleResetForm(interaction) {
  const users = loadUsers();
  const userId = interaction.user.id;
  const user = users[userId];

  if (!user?.registered) {
    await interaction.reply({
      content: "You are not registered yet. Use `/register` first if you want to join the silly transformation games.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  if (!user.currentForm) {
    await interaction.reply({
      content: "You do not currently have a form to reset.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  users[userId] = {
    ...user,
    currentForm: null,
    formResetAt: new Date().toISOString(),
  };

  saveUsers(users);

  await interaction.reply({
    content: "Your current form has been reset. You are back to your usual suspiciously normal self.",
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = {
  handleResetForm,
};