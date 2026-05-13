const gameChannelIds = (process.env.GAME_CHANNEL_IDS || process.env.GAME_CHANNEL_ID || "")
  .split(",")
  .map((channelId) => channelId.trim())
  .filter(Boolean);

const CHANNEL_CONFIG = {
  gameChannelIds,
  restrictedGameCommands: [
    "transform",
    "randomtransform",
  ],
};

module.exports = {
  CHANNEL_CONFIG,
};