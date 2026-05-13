const { EmbedBuilder } = require("discord.js");

function buildTransformationNoteEmbed(transformation) {
  return new EmbedBuilder()
    .setTitle("✨ Private Transformation Note")
    .addFields(
      {
        name: "Form",
        value: transformation.name,
        inline: true,
      },
      {
        name: "Note",
        value: "Form Effects",
        inline: true,
      },
      {
        name: "Details",
        value: transformation.transformationNote,
        inline: false,
      }
    )
    .setFooter({
      text: "BiiBiiBoo TF Bot",
    })
    .setTimestamp();
}

async function sendTransformationNote(discordUser, transformation) {
  if (!transformation.transformationNote) {
    return {
      attempted: false,
      sent: false,
    };
  }

  try {
    const embed = buildTransformationNoteEmbed(transformation);

    await discordUser.send({
      embeds: [embed],
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