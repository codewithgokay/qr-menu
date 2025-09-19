'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdminButton } from '@/components/admin/AdminButton';
import { restaurant } from '@/data/menu';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary-cream">
      <Header restaurant={restaurant} />
      
      <main className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 font-heading">
            Bella Vista&apos;ya Hoş Geldiniz
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed">
            Modern dokunuşlarla otantik İtalyan mutfağı. Her yemeğimizde İtalya&apos;nın sıcaklığını hissedeceksiniz.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/menu" 
              className="inline-block bg-sage text-white px-8 py-3 rounded-lg font-semibold hover:bg-sage/90 transition-colors"
            >
              Menüyü Görüntüle
            </Link>
          </div>
        </div>
      </main>
      
      <Footer restaurant={restaurant} />
      <AdminButton />
    </div>
  );
}