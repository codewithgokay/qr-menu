// Client-side helper function to get optimized image URL
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: string;
    gravity?: string;
  } = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options;

  // Check if Cloudinary cloud name is available
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set');
    return publicId; // Return the publicId as fallback
  }

  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (crop) transformations.push(`c_${crop}`);
  if (gravity) transformations.push(`g_${gravity}`);

  const transformationString = transformations.join(',');
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
}
