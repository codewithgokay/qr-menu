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

  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (crop) transformations.push(`c_${crop}`);
  if (gravity) transformations.push(`g_${gravity}`);

  const transformationString = transformations.join(',');
  
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformationString}/${publicId}`;
}
