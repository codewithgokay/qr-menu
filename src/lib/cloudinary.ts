// Advanced Cloudinary URL generation with performance optimizations
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: string;
    gravity?: string;
    effect?: string;
    fetchFormat?: string;
    flags?: string[];
    dpr?: number | string;
    responsive?: boolean;
  } = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    effect,
    fetchFormat = 'auto',
    flags = [],
    dpr = 'auto',
    responsive = false,
  } = options;

  const transformations = [];
  
  // Basic transformations
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (crop) transformations.push(`c_${crop}`);
  if (gravity) transformations.push(`g_${gravity}`);
  
  // Performance optimizations
  if (dpr) transformations.push(`dpr_${dpr}`);
  if (fetchFormat) transformations.push(`f_${fetchFormat}`);
  
  // Advanced effects for better compression
  if (effect) transformations.push(`e_${effect}`);
  
  // Flags for optimization
  if (flags.length > 0) {
    transformations.push(`fl_${flags.join('.')}`);
  }
  
  // Responsive images
  if (responsive) {
    transformations.push('fl_responsive');
  }
  
  // Auto-optimization flags
  const autoFlags = ['progressive', 'strip_profile'];
  if (autoFlags.length > 0) {
    transformations.push(`fl_${autoFlags.join('.')}`);
  }

  const transformationString = transformations.join(',');
  
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformationString}/${publicId}`;
}

// Predefined optimized configurations for different use cases
export const cloudinaryPresets = {
  // Thumbnail for menu items
  thumbnail: (publicId: string, width = 96, height = 96) => 
    getCloudinaryUrl(publicId, {
      width,
      height,
      quality: 'auto:low',
      format: 'auto',
      crop: 'fill',
      gravity: 'auto',
      flags: ['progressive', 'strip_profile'],
      dpr: 'auto',
    }),
  
  // Hero images for modals
  hero: (publicId: string, width = 600, height = 400) =>
    getCloudinaryUrl(publicId, {
      width,
      height,
      quality: 'auto:good',
      format: 'auto',
      crop: 'fill',
      gravity: 'auto',
      flags: ['progressive', 'strip_profile'],
      dpr: 'auto',
    }),
  
  // Placeholder/blur images
  placeholder: (publicId: string, width = 20, height = 20) =>
    getCloudinaryUrl(publicId, {
      width,
      height,
      quality: 'auto:low',
      format: 'auto',
      crop: 'fill',
      gravity: 'auto',
      effect: 'blur:300',
      flags: ['progressive'],
    }),
  
  // High-quality images for retina displays
  retina: (publicId: string, width: number, height: number) =>
    getCloudinaryUrl(publicId, {
      width: width * 2,
      height: height * 2,
      quality: 'auto:best',
      format: 'auto',
      crop: 'fill',
      gravity: 'auto',
      flags: ['progressive', 'strip_profile'],
      dpr: 2,
    }),
};

// Generate responsive image sources for different screen sizes
export function generateResponsiveImageSources(
  publicId: string,
  baseWidth: number,
  baseHeight: number
) {
  const breakpoints = [
    { width: baseWidth, height: baseHeight, media: '(max-width: 640px)' },
    { width: baseWidth * 1.5, height: baseHeight * 1.5, media: '(max-width: 1024px)' },
    { width: baseWidth * 2, height: baseHeight * 2, media: '(min-width: 1025px)' },
  ];
  
  return breakpoints.map(({ width, height, media }) => ({
    src: getCloudinaryUrl(publicId, {
      width,
      height,
      quality: 'auto',
      format: 'auto',
      crop: 'fill',
      gravity: 'auto',
      flags: ['progressive', 'strip_profile'],
    }),
    media,
    width,
    height,
  }));
}
