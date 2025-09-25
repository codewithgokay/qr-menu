import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (server-side only)
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Missing Cloudinary environment variables:', {
    cloudName: !!cloudName,
    apiKey: !!apiKey,
    apiSecret: !!apiSecret
  });
  throw new Error('Cloudinary environment variables are not properly configured');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export { cloudinary };

// Helper function to upload image to Cloudinary (server-side only)
export async function uploadImageToCloudinary(
  file: File | string,
  folder: string = 'qr-menu'
): Promise<{ url: string; publicId: string }> {
  try {
    let uploadResult;
    
    if (typeof file === 'string') {
      // If it's a base64 string or URL
      uploadResult = await cloudinary.uploader.upload(file, {
        folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
      });
    } else {
      // If it's a File object, convert to base64
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const dataURI = `data:${file.type};base64,${base64}`;
      
      uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
      });
    }

    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

// Helper function to delete image from Cloudinary (server-side only)
export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}
