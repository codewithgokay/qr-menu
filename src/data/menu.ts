import { MenuItem, MenuCategory, Restaurant } from '@/lib/types';

export const restaurant: Restaurant = {
  id: '1',
  name: 'Dükkan',
  description: 'Çanakkale\'nin en sevilen kahve dükkanı - özel kahve çekirdekleri ve ev yapımı lezzetler',
  logo: '/images/logo.png',
  coverImage: '/images/restaurant-cover.jpg',
  address: 'Çanakkale Merkez, Türkiye',
  phone: '+90 (286) 123-4567',
  email: 'info@dukkancanakkale.com',
  website: 'https://dukkancanakkale.com',
  socialMedia: {
    instagram: '@dukkancanakkale',
    facebook: 'DukkanCanakkale',
    twitter: '@DukkanCanakkale'
  },
  operatingHours: {
    Pazartesi: { open: '07:00', close: '22:00' },
    Salı: { open: '07:00', close: '22:00' },
    Çarşamba: { open: '07:00', close: '22:00' },
    Perşembe: { open: '07:00', close: '22:00' },
    Cuma: { open: '07:00', close: '23:00' },
    Cumartesi: { open: '08:00', close: '23:00' },
    Pazar: { open: '08:00', close: '22:00' }
  },
  currency: 'TRY',
  language: 'tr'
};

export const categories: MenuCategory[] = [
  { id: 'coffee', name: 'Kahveler', description: 'Özel çekirdeklerden hazırlanan kahveler', icon: '☕', order: 1 },
  { id: 'cold-drinks', name: 'Soğuk İçecekler', description: 'Serinletici içecekler', icon: '🧊', order: 2 },
  { id: 'pastries', name: 'Pastalar & Tatlılar', description: 'Ev yapımı pastalar ve tatlılar', icon: '🧁', order: 3 },
  { id: 'sandwiches', name: 'Sandviçler', description: 'Taze sandviçler ve tostlar', icon: '🥪', order: 4 },
  { id: 'breakfast', name: 'Kahvaltı', description: 'Günün en önemli öğünü', icon: '🍳', order: 5 },
  { id: 'snacks', name: 'Atıştırmalıklar', description: 'Hafif atıştırmalıklar', icon: '🥜', order: 6 }
];

export const menuItems: MenuItem[] = [
  // Kahveler
  {
    id: '1',
    name: 'Türk Kahvesi',
    description: 'Geleneksel Türk kahvesi, lokum eşliğinde',
    price: 15.00,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegan: true,
    isGlutenFree: true,
    calories: 5,
    prepTime: 5,
    isPopular: true
  },
  {
    id: '2',
    name: 'Espresso',
    description: 'Tek shot özel çekirdek espressosu',
    price: 12.00,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegan: true,
    isGlutenFree: true,
    calories: 5,
    prepTime: 3
  },
  {
    id: '3',
    name: 'Americano',
    description: 'Espresso + sıcak su',
    price: 14.00,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegan: true,
    isGlutenFree: true,
    calories: 5,
    prepTime: 3
  },
  {
    id: '4',
    name: 'Cappuccino',
    description: 'Espresso + buharda ısıtılmış süt + süt köpüğü',
    price: 18.00,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy'],
    calories: 80,
    prepTime: 4
  },
  {
    id: '5',
    name: 'Latte',
    description: 'Espresso + bol sıcak süt + az köpük',
    price: 20.00,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy'],
    calories: 120,
    prepTime: 4
  },
  {
    id: '6',
    name: 'Mocha',
    description: 'Espresso + çikolata + sıcak süt + krema',
    price: 22.00,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy'],
    calories: 200,
    prepTime: 5
  },

  // Soğuk İçecekler
  {
    id: '7',
    name: 'Cold Brew',
    description: '12 saat soğuk demleme, buz ile servis',
    price: 16.00,
    category: 'cold-drinks',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegan: true,
    isGlutenFree: true,
    calories: 5,
    prepTime: 2
  },
  {
    id: '8',
    name: 'Iced Latte',
    description: 'Espresso + soğuk süt + buz',
    price: 18.00,
    category: 'cold-drinks',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy'],
    calories: 100,
    prepTime: 3
  },
  {
    id: '9',
    name: 'Frappé',
    description: 'Buzlu kahve + süt + şeker, blender ile',
    price: 20.00,
    category: 'cold-drinks',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy'],
    calories: 150,
    prepTime: 4
  },
  {
    id: '10',
    name: 'Taze Sıkma Portakal Suyu',
    description: 'Günlük taze sıkılmış portakal suyu',
    price: 12.00,
    category: 'cold-drinks',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegan: true,
    isGlutenFree: true,
    calories: 110,
    prepTime: 3
  },

  // Pastalar & Tatlılar
  {
    id: '11',
    name: 'Cheesecake',
    description: 'Ev yapımı New York usulü cheesecake',
    price: 25.00,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'eggs', 'gluten'],
    isVegetarian: true,
    calories: 350,
    prepTime: 2,
    isPopular: true
  },
  {
    id: '12',
    name: 'Brownie',
    description: 'Çikolatalı brownie, dondurma ile',
    price: 18.00,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'eggs', 'gluten'],
    isVegetarian: true,
    calories: 280,
    prepTime: 2
  },
  {
    id: '13',
    name: 'Tiramisu',
    description: 'Kahve ve mascarpone ile klasik tiramisu',
    price: 22.00,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'eggs', 'gluten'],
    isVegetarian: true,
    calories: 320,
    prepTime: 2
  },
  {
    id: '14',
    name: 'Croissant',
    description: 'Tereyağlı kruvasan, reçel ile',
    price: 8.00,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'eggs', 'gluten'],
    isVegetarian: true,
    calories: 200,
    prepTime: 1
  },

  // Sandviçler
  {
    id: '15',
    name: 'Club Sandviç',
    description: 'Tavuk, domates, marul, mayonez',
    price: 28.00,
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['gluten', 'eggs'],
    calories: 450,
    prepTime: 8
  },
  {
    id: '16',
    name: 'Tuna Melt',
    description: 'Ton balığı, kaşar peyniri, soğan',
    price: 26.00,
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['seafood', 'dairy', 'gluten'],
    calories: 420,
    prepTime: 7
  },
  {
    id: '17',
    name: 'Veggie Sandviç',
    description: 'Avokado, domates, salatalık, marul',
    price: 22.00,
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    calories: 300,
    prepTime: 5
  },

  // Kahvaltı
  {
    id: '18',
    name: 'Menemen',
    description: 'Yumurta, domates, biber, soğan',
    price: 24.00,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['eggs'],
    isVegetarian: true,
    calories: 250,
    prepTime: 10,
    isPopular: true
  },
  {
    id: '19',
    name: 'Omlet',
    description: '3 yumurta, peynir, mantar, domates',
    price: 20.00,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['eggs', 'dairy'],
    isVegetarian: true,
    calories: 300,
    prepTime: 8
  },
  {
    id: '20',
    name: 'Pancake',
    description: '3 adet pancake, bal ve tereyağı',
    price: 18.00,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'eggs', 'gluten'],
    isVegetarian: true,
    calories: 400,
    prepTime: 12
  },

  // Atıştırmalıklar
  {
    id: '21',
    name: 'Çikolatalı Kurabiye',
    description: 'Ev yapımı çikolatalı kurabiye',
    price: 6.00,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'eggs', 'gluten'],
    isVegetarian: true,
    calories: 150,
    prepTime: 1
  },
  {
    id: '22',
    name: 'Granola Bar',
    description: 'Yulaf, kuruyemiş, bal ile ev yapımı',
    price: 8.00,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['nuts'],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    calories: 200,
    prepTime: 1
  },
  {
    id: '23',
    name: 'Kuruyemiş Karışımı',
    description: 'Badem, ceviz, fındık karışımı',
    price: 12.00,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['nuts'],
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    calories: 300,
    prepTime: 1
  }
];
