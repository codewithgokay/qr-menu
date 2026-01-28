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
    instagram: '@republiccanakkale',
    facebook: 'RepublicCanakkale',
    twitter: '@RepublicCanakkale'
  },
  operatingHours: {
    Pazartesi: { open: '12:00', close: '02:00' },
    Salı: { open: '12:00', close: '02:00' },
    Çarşamba: { open: '12:00', close: '02:00' },
    Perşembe: { open: '12:00', close: '02:00' },
    Cuma: { open: '12:00', close: '04:00' },
    Cumartesi: { open: '12:00', close: '04:00' },
    Pazar: { open: '12:00', close: '02:00' }
  },
  currency: 'TRY',
  language: 'tr'
};

export const categories: MenuCategory[] = [
  { id: 'coffee', name: 'Kahveler', description: 'Özel çekirdeklerden hazırlanan kahveler', order: 1 },
  { id: 'cold-drinks', name: 'Soğuk İçecekler', description: 'Serinletici içecekler', order: 2 },
  { id: 'pastries', name: 'Pastalar & Tatlılar', description: 'Ev yapımı pastalar ve tatlılar', order: 3 },
  { id: 'sandwiches', name: 'Sandviçler', description: 'Taze sandviçler ve tostlar', order: 4 },
  { id: 'breakfast', name: 'Kahvaltı', description: 'Günün en önemli öğünü', order: 5 },
  { id: 'snacks', name: 'Atıştırmalıklar', description: 'Hafif atıştırmalıklar', order: 6 }
];

export const menuItems: MenuItem[] = [
  // Kahveler
  {
    id: '1',
    name: 'Türk Kahvesi',
    description: 'Geleneksel Türk kahvesi, lokum eşliğinde',
    price: 15.00,
    category: 'coffee',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '2',
    name: 'Espresso',
    description: 'Tek shot özel çekirdek espressosu',
    price: 12.00,
    category: 'coffee',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '3',
    name: 'Americano',
    description: 'Espresso + sıcak su',
    price: 14.00,
    category: 'coffee',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '4',
    name: 'Cappuccino',
    description: 'Espresso + buharda ısıtılmış süt + süt köpüğü',
    price: 18.00,
    category: 'coffee',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '5',
    name: 'Latte',
    description: 'Espresso + bol sıcak süt + az köpük',
    price: 20.00,
    category: 'coffee',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '6',
    name: 'Mocha',
    description: 'Espresso + çikolata + sıcak süt + krema',
    price: 22.00,
    category: 'coffee',
    image: undefined,
    imagePublicId: undefined
  },

  // Soğuk İçecekler
  {
    id: '7',
    name: 'Cold Brew',
    description: '12 saat soğuk demleme, buz ile servis',
    price: 16.00,
    category: 'cold-drinks',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '8',
    name: 'Iced Latte',
    description: 'Espresso + soğuk süt + buz',
    price: 18.00,
    category: 'cold-drinks',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '9',
    name: 'Frappé',
    description: 'Buzlu kahve + süt + şeker, blender ile',
    price: 20.00,
    category: 'cold-drinks',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '10',
    name: 'Taze Sıkma Portakal Suyu',
    description: 'Günlük taze sıkılmış portakal suyu',
    price: 12.00,
    category: 'cold-drinks',
    image: undefined,
    imagePublicId: undefined
  },

  // Pastalar & Tatlılar
  {
    id: '11',
    name: 'Cheesecake',
    description: 'Ev yapımı New York usulü cheesecake',
    price: 25.00,
    category: 'pastries',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '12',
    name: 'Brownie',
    description: 'Çikolatalı brownie, dondurma ile',
    price: 18.00,
    category: 'pastries',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '13',
    name: 'Tiramisu',
    description: 'Kahve ve mascarpone ile klasik tiramisu',
    price: 22.00,
    category: 'pastries',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '14',
    name: 'Croissant',
    description: 'Tereyağlı kruvasan, reçel ile',
    price: 8.00,
    category: 'pastries',
    image: undefined,
    imagePublicId: undefined
  },

  // Sandviçler
  {
    id: '15',
    name: 'Club Sandviç',
    description: 'Tavuk, domates, marul, mayonez',
    price: 28.00,
    category: 'sandwiches',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '16',
    name: 'Tuna Melt',
    description: 'Ton balığı, kaşar peyniri, soğan',
    price: 26.00,
    category: 'sandwiches',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '17',
    name: 'Veggie Sandviç',
    description: 'Avokado, domates, salatalık, marul',
    price: 22.00,
    category: 'sandwiches',
    image: undefined,
    imagePublicId: undefined
  },

  // Kahvaltı
  {
    id: '18',
    name: 'Menemen',
    description: 'Yumurta, domates, biber, soğan',
    price: 24.00,
    category: 'breakfast',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '19',
    name: 'Omlet',
    description: '3 yumurta, peynir, mantar, domates',
    price: 20.00,
    category: 'breakfast',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '20',
    name: 'Pancake',
    description: '3 adet pancake, bal ve tereyağı',
    price: 18.00,
    category: 'breakfast',
    image: undefined,
    imagePublicId: undefined
  },

  // Atıştırmalıklar
  {
    id: '21',
    name: 'Çikolatalı Kurabiye',
    description: 'Ev yapımı çikolatalı kurabiye',
    price: 6.00,
    category: 'snacks',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '22',
    name: 'Granola Bar',
    description: 'Yulaf, kuruyemiş, bal ile ev yapımı',
    price: 8.00,
    category: 'snacks',
    image: undefined,
    imagePublicId: undefined
  },
  {
    id: '23',
    name: 'Kuruyemiş Karışımı',
    description: 'Badem, ceviz, fındık karışımı',
    price: 12.00,
    category: 'snacks',
    image: undefined,
    imagePublicId: undefined
  }
];
