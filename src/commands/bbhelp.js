const { MessageFlags } = require("discord.js");
const { HELP_CONFIG } = require("../config/help");

function buildHelpMessage() {
  const lines = [];

  lines.push(`**${HELP_CONFIG.title}**`);
  lines.push("");
  lines.push(HELP_CONFIG.description);
  lines.push("");

  for (const section of HELP_CONFIG.sections) {
    lines.push(`**${section.name}**`);

    for (const command of section.commands) {
      lines.push(`\`${command.name}\` - ${command.description}`);
    }

    lines.push("");
  }

  lines.push(HELP_CONFIG.footer);

  return lines.join("\n");
}

async function handleBBHelp(interaction) {
  await interaction.reply({
    content: buildHelpMessage(),
    flags: MessageFlags.Ephemeral,
  });
}

module.exports = {
  handleBBHelp,
};