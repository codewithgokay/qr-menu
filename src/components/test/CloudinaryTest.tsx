'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageOptimized } from '@/components/common/ImageOptimized';

export function CloudinaryTest() {
  const [testImage, setTestImage] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [uploadedPublicId, setUploadedPublicId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTestImage(file);
    }
  };

  const handleUpload = async () => {
    if (!testImage) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', testImage);
      formData.append('folder', 'qr-menu/test');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadedUrl(result.url);
        setUploadedPublicId(result.publicId);
      } else {
        console.error('Upload failed:', result.error);
        alert('Upload failed: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cloudinary Integration Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Select an image to test upload:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {testImage && (
          <div>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
            </button>
          </div>
        )}

        {uploadedUrl && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Uploaded Image (Original URL):</h3>
              <Image 
                src={uploadedUrl} 
                alt="Uploaded" 
                width={300}
                height={200}
                className="max-w-xs h-auto rounded"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold">Optimized Image (via ImageOptimized component):</h3>
              <ImageOptimized
                src={uploadedUrl}
                cloudinaryPublicId={uploadedPublicId}
                alt="Optimized"
                width={300}
                height={200}
                className="max-w-xs rounded"
              />
            </div>

            <div className="text-sm text-gray-600">
              <p><strong>Public ID:</strong> {uploadedPublicId}</p>
              <p><strong>Original URL:</strong> {uploadedUrl}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
