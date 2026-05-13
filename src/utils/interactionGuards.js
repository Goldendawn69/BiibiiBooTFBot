const { MessageFlags } = require("discord.js");

const {
  COMMAND_COOLDOWNS,
  COOLDOWN_WARNING_MS,
} = require("../config/cooldowns");

const { CHANNEL_CONFIG } = require("../config/channels");
const { getCooldownStatus, setCooldown } = require("./cooldowns");

function isRestrictedGameCommand(commandName) {
  return CHANNEL_CONFIG.restrictedGameCommands.includes(commandName);
}

async function enforceGameChannel(interaction) {
  if (CHANNEL_CONFIG.gameChannelIds.length === 0) {
    return false;
  }

  if (!isRestrictedGameCommand(interaction.commandName)) {
    return false;
  }

  if (CHANNEL_CONFIG.gameChannelIds.includes(interaction.channelId)) {
    return false;
  }

  const allowedChannels = CHANNEL_CONFIG.gameChannelIds
    .map((channelId) => `<#${channelId}>`)
    .join(", ");

  await interaction.reply({
    content: `Please use this command in one of these channels: ${allowedChannels}`,
    flags: MessageFlags.Ephemeral,
  });

  return true;
}

async function enforceCooldown(interaction) {
  const cooldownMs = COMMAND_COOLDOWNS[interaction.commandName];

  if (!cooldownMs) {
    return false;
  }

  const cooldownKey = `command:${interaction.commandName}:${interaction.user.id}`;
  const warningKey = `warning:${interaction.commandName}:${interaction.user.id}`;

  const cooldown = getCooldownStatus(cooldownKey, cooldownMs);

  if (!cooldown.onCooldown) {
    setCooldown(cooldownKey);
    return false;
  }

  const warningCooldown = getCooldownStatus(warningKey, COOLDOWN_WARNING_MS);

  if (!warningCooldown.onCooldown) {
    setCooldown(warningKey);

    await interaction.reply({
      content: `Please slow down a little. You can use \`/${interaction.commandName}\` again in ${cooldown.remainingSeconds} seconds.`,
      flags: MessageFlags.Ephemeral,
    });
  }

  return true;
}

async function shouldBlockInteraction(interaction) {
  if (await enforceGameChannel(interaction)) {
    return true;
  }

  if (await enforceCooldown(interaction)) {
    return true;
  }

  return false;
}

module.exports = {
  shouldBlockInteraction,
};