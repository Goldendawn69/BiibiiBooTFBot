const { MessageFlags } = require("discord.js");
const { loadUsers } = require("../utils/users");

async function handleForm(interaction) {
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

  await interaction.reply({
    content: `Your current form is: **${user.currentForm}**`,
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = {
  handleForm,
};