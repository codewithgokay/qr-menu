'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SlidingImage {
  publicId: string;
  alt: string;
  id: number;
}

const foodImages: SlidingImage[] = [
  {
    publicId: 'https://res.cloudinary.com/dmudabrcn/image/upload/v1769291640/pub1_vx8wfc.jpg',
    alt: 'Republic - Ambiance',
    id: 1
  },
  {
    publicId: 'https://res.cloudinary.com/dmudabrcn/image/upload/v1769291643/pub2_iidsi7.jpg',
    alt: 'Republic - Detail',
    id: 2
  },
  {
    publicId: 'https://res.cloudinary.com/dmudabrcn/image/upload/v1769291646/pub3_tufbng.jpg',
    alt: 'Republic - Drinks',
    id: 3
  }
];

export function SlidingBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % foodImages.length
        );
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Main sliding image */}
      <div className="relative w-full h-full">
        <Image
          src={foodImages[currentImageIndex].publicId}
          alt={foodImages[currentImageIndex].alt}
          fill
          className={`object-cover transition-all duration-1000 ${isTransitioning ? 'scale-110 blur-sm' : 'scale-100 blur-0'
            }`}
          priority
          sizes="100vw"
          quality={75}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlays for better visual effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

    </div>
  );
}
