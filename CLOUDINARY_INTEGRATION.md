# Cloudinary Integration for QR Menu

This document explains the Cloudinary integration that has been added to the QR Menu project for optimized image delivery and faster page loads.

## Overview

Cloudinary has been integrated to provide:
- Automatic image optimization and compression
- Responsive image delivery
- CDN-based fast image loading
- Multiple format support (WebP, AVIF, etc.)
- Automatic quality adjustment

## Configuration

### Environment Variables

The following environment variables have been added to `.env.local`:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dmudabrcn
CLOUDINARY_API_KEY=121123814969547
CLOUDINARY_API_SECRET=JUKOqCQdCj2klslERrDxCXtHJ7U
```

### Database Schema Updates

The Prisma schema has been updated to store Cloudinary public IDs alongside image URLs:

- `Restaurant` model: Added `logoPublicId` and `coverImagePublicId`
- `MenuCategory` model: Added `iconPublicId`
- `MenuItem` model: Added `imagePublicId`

## Files Added/Modified

### New Files
- `src/lib/cloudinary.ts` - Cloudinary configuration and utility functions
- `src/app/api/upload/route.ts` - API endpoint for image uploads
- `src/components/test/CloudinaryTest.tsx` - Test component for Cloudinary integration
- `src/app/test-cloudinary/page.tsx` - Test page for Cloudinary functionality

### Modified Files
- `src/components/common/ImageOptimized.tsx` - Updated to use Cloudinary for optimized images
- `src/components/admin/MenuItemForm.tsx` - Updated to upload images to Cloudinary
- `src/components/menu/MenuItem.tsx` - Updated to use Cloudinary-optimized images
- `src/components/menu/MobileMenuItem.tsx` - Updated to use Cloudinary-optimized images
- `src/app/api/menu-items/route.ts` - Updated to handle `imagePublicId` field
- `src/app/api/menu-items/[id]/route.ts` - Updated to handle `imagePublicId` field
- `prisma/schema.prisma` - Added Cloudinary public ID fields

## Usage

### Image Upload

When uploading images through the admin panel:

1. Select an image file
2. The image is automatically uploaded to Cloudinary
3. Both the Cloudinary URL and public ID are stored in the database
4. The `ImageOptimized` component uses the public ID for optimized delivery

### Image Display

The `ImageOptimized` component automatically:
- Uses Cloudinary URLs when a `cloudinaryPublicId` is provided
- Applies automatic optimization (quality, format, size)
- Falls back to the original URL if no public ID is available

### API Endpoints

#### Upload Image
```
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: Image file
- folder: Cloudinary folder (optional, defaults to 'qr-menu')
```

Response:
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "publicId": "qr-menu/menu-items/abc123"
}
```

## Testing

To test the Cloudinary integration:

1. Start the development server: `npm run dev`
2. Navigate to `/test-cloudinary`
3. Upload an image and verify it appears optimized

## Migration

To apply the database changes:

1. Update your `POSTGRES_URL` in `.env` with your actual Neon database URL
2. Run the migration: `npx prisma migrate dev --name add_cloudinary_fields`
3. Generate the Prisma client: `npx prisma generate`

## Benefits

1. **Faster Page Loads**: Images are automatically optimized and served via CDN
2. **Responsive Images**: Different sizes are served based on device requirements
3. **Format Optimization**: Modern formats (WebP, AVIF) are served when supported
4. **Quality Optimization**: Images are compressed without visible quality loss
5. **Bandwidth Savings**: Reduced data usage for users

## Cloudinary Features Used

- **Automatic Format Selection**: Serves WebP/AVIF when supported
- **Quality Optimization**: Automatic quality adjustment
- **Responsive Images**: Different sizes for different screen sizes
- **CDN Delivery**: Global content delivery network
- **Image Transformations**: Automatic cropping and resizing

## Troubleshooting

### Common Issues

1. **Upload Fails**: Check that environment variables are correctly set
2. **Images Not Optimized**: Ensure `cloudinaryPublicId` is being passed to `ImageOptimized`
3. **Database Errors**: Run migrations and regenerate Prisma client

### Environment Setup

Make sure your `.env` file contains:
- Valid `POSTGRES_URL` for your Neon database
- Correct Cloudinary credentials
- All required environment variables

## Future Enhancements

- Image lazy loading optimization
- Advanced image transformations
- Image analytics and monitoring
- Bulk image upload functionality
- Image compression before upload
