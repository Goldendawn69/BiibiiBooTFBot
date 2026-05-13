const cooldowns = new Map();

function getCooldownStatus(key, cooldownMs) {
  const now = Date.now();
  const lastUsedAt = cooldowns.get(key);

  if (!lastUsedAt) {
    return {
      onCooldown: false,
      remainingSeconds: 0,
    };
  }

  const elapsedMs = now - lastUsedAt;
  const remainingMs = cooldownMs - elapsedMs;

  if (remainingMs <= 0) {
    return {
      onCooldown: false,
      remainingSeconds: 0,
    };
  }

  return {
    onCooldown: true,
    remainingSeconds: Math.ceil(remainingMs / 1000),
  };
}

function setCooldown(key) {
  cooldowns.set(key, Date.now());
}

module.exports = {
  getCooldownStatus,
  setCooldown,
};