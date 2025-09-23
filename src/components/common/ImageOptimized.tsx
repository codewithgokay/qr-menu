'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/lib/cloudinary';

interface ImageOptimizedProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackText?: string;
  cloudinaryPublicId?: string;
  quality?: string | number;
  crop?: string;
  gravity?: string;
  priority?: boolean;
  lazy?: boolean;
}

export function ImageOptimized({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  className = '',
  fallbackText = 'No Image',
  cloudinaryPublicId,
  quality = 'auto',
  crop = 'fill',
  gravity = 'auto',
  priority = false,
  lazy = true
}: ImageOptimizedProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1 
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [lazy]);

  // Determine the image source - prioritize Cloudinary if publicId is provided
  const imageSrc = cloudinaryPublicId 
    ? getCloudinaryUrl(cloudinaryPublicId, {
        width,
        height,
        quality,
        crop,
        gravity,
        format: 'auto'
      })
    : src;

  if (imageError || !imageSrc) {
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
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {isInView ? (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          className={`object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: `${width}/${height}`
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      ) : (
        <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">🍽️</div>
            <p className="text-xs text-muted-foreground">Loading...</p>
          </div>
        </div>
      )}
      
      {isInView && !imageLoaded && (
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
