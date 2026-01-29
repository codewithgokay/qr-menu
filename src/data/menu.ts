import { MenuItem, MenuCategory, Restaurant } from '@/lib/types';

export const restaurant: Restaurant = {
  id: '1',
  name: 'Republic',
  description: 'Çanakkale\'nin en iyi pub deneyimi. Özel içecekler, lezzetli atıştırmalıklar ve harika atmosfer.',
  logo: 'https://res.cloudinary.com/dmudabrcn/image/upload/v1769272325/543799471_17989578092840121_1390771300469241938_n_dpnmkw.jpg',
  coverImage: '/images/restaurant-cover.jpg',
  address: 'Çanakkale Merkez, Türkiye',
  phone: '+90 (286) 123-4567',
  email: 'info@republiccanakkale.com',
  website: 'https://republiccanakkale.com',
  socialMedia: {
    instagram: '@republicanakkale',
    facebook: 'RepublicCanakkale',
    twitter: '@RepublicCanakkale'
  },
  operatingHours: {
    Pazartesi: { open: '16:00', close: '02:00' },
    Salı: { open: '16:00', close: '02:00' },
    Çarşamba: { open: '16:00', close: '02:00' },
    Perşembe: { open: '16:00', close: '02:00' },
    Cuma: { open: '16:00', close: '02:00' },
    Cumartesi: { open: '16:00', close: '02:00' },
    Pazar: { open: '16:00', close: '02:00' }
  },
  currency: 'TRY',
  language: 'tr'
};

