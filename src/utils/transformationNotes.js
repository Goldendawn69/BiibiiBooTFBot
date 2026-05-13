async function sendTransformationNote(discordUser, transformation) {
  if (!transformation.transformationNote) {
    return {
      attempted: false,
      sent: false,
    };
  }

  try {
    await discordUser.send({
      content: transformation.transformationNote,
    });

    return {
      attempted: true,
      sent: true,
    };
  } catch (error) {
    console.warn("Could not send transformation note DM:", error);

    return {
      attempted: true,
      sent: false,
    };
  }
}

module.exports = {
  sendTransformationNote,
};