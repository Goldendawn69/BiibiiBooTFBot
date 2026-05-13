const fs = require("fs");
const path = require("path");
const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

const transformationAssetsPath = path.join(
  __dirname,
  "..",
  "..",
  "assets",
  "transformations"
);

function getTransformationImageAttachment(transformation, embed) {
  const files = [];

  const imageFileName = `${transformation.id}.png`;
  const imagePath = path.join(transformationAssetsPath, imageFileName);

  console.log("Transformation ID:", transformation.id);
  console.log("Looking for image:", imagePath);
  console.log("Image exists:", fs.existsSync(imagePath));

  if (fs.existsSync(imagePath)) {
    const attachment = new AttachmentBuilder(imagePath, {
      name: imageFileName,
    });

    embed.setImage(`attachment://${imageFileName}`);
    files.push(attachment);
  }

  return files;
}

function buildTransformationEmbed(transformation, userMention) {
  const description = transformation.text.replace("{user}", userMention);

  const embed = new EmbedBuilder()
    .setTitle("✨ Transformation Complete!")
    .setDescription(description)
    .addFields({
      name: "New Form",
      value: transformation.name,
      inline: true,
    })
    .setFooter({
      text: "BiiBiiBoo TF Bot",
    })
    .setTimestamp();

  const files = getTransformationImageAttachment(transformation, embed);

  return {
    embed,
    files,
  };
}

function formatCategoryName(category) {
  return category
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatTransformedAt(lastTransformedAt) {
  if (!lastTransformedAt) {
    return "Unknown";
  }

  const date = new Date(lastTransformedAt);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleString("en-NZ", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function buildCurrentFormEmbed(user, transformation) {
  const categories = Array.isArray(transformation.categories)
    ? transformation.categories.map(formatCategoryName).join(", ")
    : "None listed";

  const embed = new EmbedBuilder()
    .setTitle("🪞 What Am I?")
    .setDescription(transformation.text.replace("{user}", "You"))
    .addFields(
      {
        name: "Current Form",
        value: transformation.name,
        inline: true,
      },
      {
        name: "Categories",
        value: categories,
        inline: true,
      },
      {
        name: "Transformed",
        value: formatTransformedAt(user.lastTransformedAt),
        inline: false,
      }
    )
    .setFooter({
      text: "BiiBiiBoo TF Bot",
    })
    .setTimestamp();

  const files = getTransformationImageAttachment(transformation, embed);

  return {
    embed,
    files,
  };
}

module.exports = {
  buildTransformationEmbed,
  buildCurrentFormEmbed,
};