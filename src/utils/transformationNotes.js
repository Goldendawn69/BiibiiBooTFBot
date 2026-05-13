const { EmbedBuilder } = require("discord.js");

function hasTransformationNotes(transformation) {
  return (
    transformation.transformationNotes &&
    (
      transformation.transformationNotes.physicalEffects ||
      transformation.transformationNotes.mentalEffects
    )
  );
}

function buildTransformationNoteEmbed(transformation) {
  const embed = new EmbedBuilder()
    .setTitle("✨ Private Transformation Note")
    .addFields({
      name: "Form",
      value: transformation.name,
      inline: false,
    })
    .setFooter({
      text: "BiiBiiBoo TF Bot",
    })
    .setTimestamp();

  if (transformation.transformationNotes.physicalEffects) {
    embed.addFields({
      name: "Physical Effects",
      value: transformation.transformationNotes.physicalEffects,
      inline: false,
    });
  }

  if (transformation.transformationNotes.mentalEffects) {
    embed.addFields({
      name: "Mental Effects",
      value: transformation.transformationNotes.mentalEffects,
      inline: false,
    });
  }

  return embed;
}

async function sendTransformationNote(discordUser, transformation) {
  if (!hasTransformationNotes(transformation)) {
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