const fs = require("fs");
const path = require("path");
const { AttachmentBuilder, MessageFlags } = require("discord.js");
const { loadTransformations } = require("../utils/transformations");
const {
  MENTAL_EFFECT_CONTENT_LEVELS,
  getMentalEffectLevelLabel,
} = require("../utils/mentalEffects");

const MAX_MESSAGE_LENGTH = 1800;

const transformationAssetsPath = path.join(
  __dirname,
  "..",
  "..",
  "assets",
  "transformations"
);

function formatCategories(categories) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return "uncategorised";
  }

  return categories.join(", ");
}

function findTransformationById(transformations, id) {
  const normalisedId = id.trim().toLowerCase();

  return transformations.find(
    (transformation) => transformation.id.toLowerCase() === normalisedId
  );
}

function getLocalTransformationImagePath(transformation) {
  if (!transformation?.id) {
    return null;
  }

  const imagePath = path.join(
    transformationAssetsPath,
    `${transformation.id}.png`
  );

  return fs.existsSync(imagePath) ? imagePath : null;
}

function formatEffectLevel(label, value) {
  if (!value) {
    return null;
  }

  return `**${label}:** ${value}`;
}

function formatPhysicalEffectsBlock(physicalEffects) {
  if (!physicalEffects) {
    return "**Physical Effects:**\nNo physical effects are available for this transformation.";
  }

  if (typeof physicalEffects === "string") {
    return ["**Physical Effects:**", physicalEffects].join("\n");
  }

  return "**Physical Effects:**\nPhysical effects are in an unsupported format.";
}

function formatMentalEffectsBlock(mentalEffects) {
  if (!mentalEffects) {
    return "**Mental Effects:**\nNo mental effects are available for this transformation.";
  }

  const lines = [
    "**Mental Effects:**",
    ...MENTAL_EFFECT_CONTENT_LEVELS.map((level) =>
      formatEffectLevel(getMentalEffectLevelLabel(level), mentalEffects[level])
    ),
  ].filter(Boolean);

  if (lines.length === 1) {
    lines.push("No mental effects are available for this transformation.");
  }

  return lines.join("\n");
}

function buildTransformationListLine(transformation) {
  return `• ${transformation.name} | ID: \`${transformation.id}\` | Categories: ${formatCategories(
    transformation.categories
  )}`;
}

function buildBasicDetailsMessage(transformation) {
  return [
    `**${transformation.name}**`,
    "",
    `**ID:** \`${transformation.id}\``,
    `**Categories:** ${formatCategories(transformation.categories)}`,
    "",
    "**Description:**",
    transformation.text || "No description is available for this transformation.",
  ].join("\n");
}

function buildFullDetailsMessage(transformation) {
  const physicalEffects =
    transformation.transformationNotes?.physicalEffects;

  const mentalEffects =
    transformation.transformationNotes?.mentalEffects;

  return [
    `**${transformation.name}**`,
    "",
    `**ID:** \`${transformation.id}\``,
    `**Categories:** ${formatCategories(transformation.categories)}`,
    "",
    "**Description:**",
    transformation.text || "No description is available for this transformation.",
    "",
    formatPhysicalEffectsBlock(physicalEffects),
    "",
    formatMentalEffectsBlock(mentalEffects),
  ].join("\n");
}

function splitMessages(lines) {
  const messages = [];
  let currentMessage = "";

  for (const line of lines) {
    const nextMessage = currentMessage
      ? `${currentMessage}\n${line}`
      : line;

    if (nextMessage.length > MAX_MESSAGE_LENGTH && currentMessage) {
      messages.push(currentMessage);
      currentMessage = line;
    } else {
      currentMessage = nextMessage;
    }
  }

  if (currentMessage) {
    messages.push(currentMessage);
  }

  return messages;
}

function splitTextIntoMessages(text) {
  return splitMessages(text.split("\n"));
}

function buildTransformationListMessages(transformations) {
  const sortedTransformations = [...transformations].sort((left, right) =>
    left.name.localeCompare(right.name)
  );

  const lines = [
    `Transformations loaded: ${sortedTransformations.length}`,
    "",
    ...sortedTransformations.map(buildTransformationListLine),
  ];

  return splitMessages(lines);
}

async function sendMessagesByDm(user, messages, extraOptions = {}) {
  const [firstMessage, ...remainingMessages] = messages;

  await user.send({
    content: firstMessage,
    ...extraOptions,
  });

  for (const message of remainingMessages) {
    await user.send({
      content: message,
    });
  }
}

async function handleListTransformations(interaction) {
  const transformations = loadTransformations();
  const requestedId = interaction.options.getString("id");
  const mode = interaction.options.getString("mode") || "basic";

  await interaction.deferReply({
    flags: MessageFlags.Ephemeral,
  });

  if (transformations.length === 0) {
    await interaction.editReply({
      content: "There are no transformations loaded yet.",
    });
    return;
  }

  if (mode === "full" && !requestedId) {
    await interaction.editReply({
      content:
        "Please provide a transformation ID when using full mode. Example: `/listtransformations id:living_plush_bunny mode:full`",
    });
    return;
  }

  if (requestedId) {
    const transformation = findTransformationById(transformations, requestedId);

    if (!transformation) {
      await interaction.editReply({
        content: `I could not find a transformation with the ID \`${requestedId}\`. Use \`/listtransformations\` to get the current list.`,
      });
      return;
    }

    if (mode === "full") {
      const imagePath = getLocalTransformationImagePath(transformation);
      const messages = splitTextIntoMessages(
        buildFullDetailsMessage(transformation)
      );

      const files = imagePath
        ? [
            new AttachmentBuilder(imagePath, {
              name: `${transformation.id}.png`,
            }),
          ]
        : [];

        try {
          await sendMessagesByDm(interaction.user, messages);

          if (files.length > 0) {
            await interaction.user.send({
              files,
            });
          }

          await interaction.editReply({
            content: `I have sent you the full details for \`${transformation.id}\` by DM.`,
          });
        } catch (error) {
        console.error("Could not send full transformation details DM:", error);

        await interaction.editReply({
          content:
            "I could not send you a DM. Please check your Discord privacy settings and try again.",
        });
      }

      return;
    }

    await interaction.editReply({
      content: buildBasicDetailsMessage(transformation),
    });
    return;
  }

  const messages = buildTransformationListMessages(transformations);

  try {
    await sendMessagesByDm(interaction.user, messages);

    await interaction.editReply({
      content: "I have sent you the transformation list by DM.",
    });
  } catch (error) {
    console.error("Could not send transformation list DM:", error);

    await interaction.editReply({
      content:
        "I could not send you a DM. Please check your Discord privacy settings and try again.",
    });
  }
}

module.exports = {
  buildTransformationListMessages,
  buildBasicDetailsMessage,
  buildFullDetailsMessage,
  handleListTransformations,
};