'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageOptimizedProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackText?: string;
}

export function ImageOptimized({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  className = '',
  fallbackText = 'No Image'
}: ImageOptimizedProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate a placeholder image URL based on the alt text
  const _placeholderUrl = `https://via.placeholder.com/${width}x${height}/f3f4f6/9ca3af?text=${encodeURIComponent(alt)}`;

  if (imageError || !src) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🍽️</div>
          <p className="text-sm text-muted-foreground">{fallbackText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover transition-all duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '100%',
          height: 'auto'
        }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">🍽️</div>
            <p className="text-xs text-muted-foreground">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
