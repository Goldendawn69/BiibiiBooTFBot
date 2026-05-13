const { EmbedBuilder } = require("discord.js");

function hasTransformationNotes(transformation) {
  return (
    transformation.transformationNotes &&
    (
      transformation.transformationNotes.formEffects ||
      transformation.transformationNotes.innerEffects
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

  if (transformation.transformationNotes.formEffects) {
    embed.addFields({
      name: "Form Effects",
      value: transformation.transformationNotes.formEffects,
      inline: false,
    });
  }

  if (transformation.transformationNotes.innerEffects) {
    embed.addFields({
      name: "Inner Effects",
      value: transformation.transformationNotes.innerEffects,
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