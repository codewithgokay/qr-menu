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
      
      {/* Welcome Section with Sliding Background - Mobile First */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-8 sm:px-6">
        <SlidingBackground />
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 font-heading drop-shadow-2xl leading-tight">
            Dükkan&apos;a Hoş Geldiniz
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 leading-relaxed drop-shadow-lg max-w-3xl mx-auto">
            Çanakkale&apos;nin en sevilen kahve dükkanına hoş geldiniz. Özenle seçilmiş özel çekirdeklerden hazırlanan birinci sınıf kahvelerimiz, ev yapımı lezzetlerimiz ve sıcak atmosferimizle gününüzü güzelleştiriyoruz. Her yudumda fark edeceğiniz kalite ve lezzet arayışımızla, sizlere unutulmaz bir kahve deneyimi sunuyoruz.
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