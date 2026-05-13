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

  return {
    embed,
    files,
  };
}

module.exports = {
  buildTransformationEmbed,
};