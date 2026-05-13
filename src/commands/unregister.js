const { MessageFlags } = require("discord.js");
const { loadUsers, saveUsers } = require("../utils/users");

async function handleUnregister(interaction) {
  const users = loadUsers();
  const userId = interaction.user.id;
  const user = users[userId];

  if (!user?.registered) {
    await interaction.reply({
      content: "You are not registered for silly transformation games.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  users[userId] = {
    ...user,
    registered: false,
    currentForm: null,
    unregisteredAt: new Date().toISOString(),
  };

  saveUsers(users);

  await interaction.reply({
    content: "You have been unregistered. The magic nonsense will leave you alone now.",
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = {
  handleUnregister,
};