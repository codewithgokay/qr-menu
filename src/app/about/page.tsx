'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { restaurant } from '@/data/menu';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Heart, Users, Award, ChefHat } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary-cream">
      <Header restaurant={restaurant} />
      
      <main className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 font-heading">
              Hakkımızda
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Bella Vista olarak, 2015 yılından beri İtalya&apos;nın en otantik lezzetlerini 
              sizlere sunmanın gururunu yaşıyoruz.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-6 font-heading">
                  Hikayemiz
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    Bella Vista, İtalya&apos;nın güneyindeki küçük bir kasabada doğan bir aşk hikayesidir. 
                    Kurucumuz Mario&apos;nun büyükannesi Maria&apos;nın mutfağında başlayan bu yolculuk, 
                    bugün İstanbul&apos;un kalbinde en seçkin İtalyan restoranlarından biri olarak devam ediyor.
                  </p>
                  <p>
                    Her yemeğimizde, İtalya&apos;nın sıcaklığını, ailenin sıcaklığını ve geleneksel 
                    lezzetlerin büyüsünü hissedeceksiniz. Taze malzemeler, geleneksel tarifler ve 
                    modern sunum teknikleriyle harmanladığımız mutfağımız, sizleri İtalya&apos;ya götürüyor.
                  </p>
                  <p>
                    Sadece yemek değil, bir deneyim sunuyoruz. Her ziyaretinizde, sıcak bir karşılama, 
                    samimi bir atmosfer ve unutulmaz lezzetlerle dolu bir akşam geçireceksiniz.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-sage/20 to-warm-beige/20 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <ChefHat className="h-16 w-16 text-sage mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-text-primary mb-2">Geleneksel Lezzetler</h3>
                    <p className="text-text-secondary">Aile tariflerimizle hazırlanan otantik İtalyan yemekleri</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Values Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center font-heading">
              Değerlerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center"
              >
                <Heart className="h-12 w-12 text-sage mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-3">Aşk</h3>
                <p className="text-text-secondary">
                  Yemek yapmaya olan aşkımız, her tabağımızda hissedilir. 
                  Sadece lezzet değil, duygu da sunuyoruz.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center"
              >
                <Users className="h-12 w-12 text-sage mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-3">Topluluk</h3>
                <p className="text-text-secondary">
                  Müşterilerimiz ailemizin bir parçası. Her ziyaretinizde 
                  sıcak bir karşılama ve samimi bir atmosfer bulacaksınız.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center"
              >
                <Award className="h-12 w-12 text-sage mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-3">Kalite</h3>
                <p className="text-text-secondary">
                  En taze malzemeler, geleneksel tarifler ve modern sunum 
                  teknikleriyle en yüksek kaliteyi garanti ediyoruz.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Contact Info Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center font-heading">
              İletişim Bilgileri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-sage mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-2">Adres</h3>
                <p className="text-text-secondary">{restaurant.address}</p>
              </div>
              
              <div className="text-center">
                <Phone className="h-8 w-8 text-sage mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-2">Telefon</h3>
                <a 
                  href={`tel:${restaurant.phone}`}
                  className="text-text-secondary hover:text-sage transition-colors"
                >
                  {restaurant.phone}
                </a>
              </div>
              
              <div className="text-center">
                <Clock className="h-8 w-8 text-sage mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary mb-2">Çalışma Saatleri</h3>
                <p className="text-text-secondary">
                  Pazartesi - Pazar<br />
                  11:00 - 23:00
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      
      <Footer restaurant={restaurant} />
    </div>
  );
}
