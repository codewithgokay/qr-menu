'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SlidingBackground } from '@/components/common/SlidingBackground';
import { restaurant } from '@/data/menu';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-republic-cream">
      <Header restaurant={restaurant} />

      {/* Welcome Section with Sliding Background - Mobile First */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-8 sm:px-6">
        <SlidingBackground />
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4 bg-black/40 p-8 rounded-3xl backdrop-blur-sm border border-republic-gold/30">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 font-heading drop-shadow-2xl leading-tight">
            Republic&apos;e Hoş Geldiniz
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-republic-cream mb-8 sm:mb-10 leading-relaxed drop-shadow-lg max-w-3xl mx-auto">
            Çanakkale&apos;nin en iyi pub deneyimi. Özel içecekler, lezzetli atıştırmalıklar ve harika atmosfer.
          </p>
          <div className="flex justify-center">
            <Link
              href="/menu"
              className="inline-block bg-republic-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-republic-green/90 transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-republic-gold"
            >
              Menüyü Görüntüle
            </Link>
          </div>
        </div>
      </section>

      <Footer restaurant={restaurant} />
    </div>
  );
}