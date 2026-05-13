const { EmbedBuilder } = require("discord.js");
const {
  DEFAULT_MENTAL_EFFECT_LEVEL,
  getMentalEffectLevelLabel,
  resolveMentalEffectText,
} = require("./mentalEffects");

function hasTransformationNotes(
  transformation,
  mentalEffectLevel = DEFAULT_MENTAL_EFFECT_LEVEL
) {
  const notes = transformation.transformationNotes;
  const mentalEffectText = resolveMentalEffectText(
    transformation,
    mentalEffectLevel
  );

  return Boolean(
    notes &&
      (
        notes.physicalEffects ||
        mentalEffectText
      )
  );
}

function buildTransformationNoteEmbed(
  transformation,
  mentalEffectLevel = DEFAULT_MENTAL_EFFECT_LEVEL
) {
  const notes = transformation.transformationNotes;
  const mentalEffectText = resolveMentalEffectText(
    transformation,
    mentalEffectLevel
  );
  const mentalEffectLevelLabel = getMentalEffectLevelLabel(mentalEffectLevel);

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

  if (notes?.physicalEffects) {
    embed.addFields({
      name: "Physical Effects",
      value: notes.physicalEffects,
      inline: false,
    });
  }

  if (mentalEffectText) {
    embed.addFields({
      name: `Mental Effects (${mentalEffectLevelLabel})`,
      value: mentalEffectText,
      inline: false,
    });
  }

  return embed;
}

async function sendTransformationNote(
  discordUser,
  transformation,
  mentalEffectLevel = DEFAULT_MENTAL_EFFECT_LEVEL
) {
  if (!hasTransformationNotes(transformation, mentalEffectLevel)) {
    return {
      attempted: false,
      sent: false,
    };
  }

  try {
    const embed = buildTransformationNoteEmbed(
      transformation,
      mentalEffectLevel
    );

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
  buildTransformationNoteEmbed,
  sendTransformationNote,
};
