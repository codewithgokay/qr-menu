'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SlidingBackground } from '@/components/common/SlidingBackground';
import { restaurant } from '@/data/menu';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary-cream">
      <Header restaurant={restaurant} />
      
      {/* Welcome Section with Sliding Background */}
      <section className="relative min-h-[calc(100vh-200px)] flex items-center justify-center">
        <SlidingBackground />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading drop-shadow-2xl">
            Bella Vista&apos;ya Hoş Geldiniz
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
            Modern dokunuşlarla otantik İtalyan mutfağı. Her yemeğimizde İtalya&apos;nın sıcaklığını hissedeceksiniz.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/menu" 
              className="inline-block bg-sage text-white px-8 py-4 rounded-lg font-semibold hover:bg-sage/90 transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm bg-opacity-90"
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