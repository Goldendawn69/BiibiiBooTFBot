function getHostedTransformationImageUrl(transformation) {
  if (!transformation?.id) return null;

  const useHostedImages = process.env.USE_HOSTED_IMAGES === 'true';
  const baseUrl = process.env.HOSTED_IMAGE_BASE_URL;
  const ext = process.env.HOSTED_IMAGE_EXT || 'webp';

  if (!useHostedImages || !baseUrl) return null;

  const cleanBaseUrl = baseUrl.replace(/\/$/, '');

  return `${cleanBaseUrl}/${transformation.id}.${ext}`;
}

module.exports = {
  getHostedTransformationImageUrl,
};