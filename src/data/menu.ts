import { MenuItem, MenuCategory, Restaurant } from '@/lib/types';

export const restaurant: Restaurant = {
  id: '1',
  name: 'Bella Vista',
  description: 'Modern dokunuşlarla otantik İtalyan mutfağı',
  logo: '/images/logo.png',
  coverImage: '/images/restaurant-cover.jpg',
  address: '123 Ana Cadde, Şehir Merkezi',
  phone: '+90 (555) 123-4567',
  email: 'info@bellavista.com',
  website: 'https://bellavista.com',
  socialMedia: {
    instagram: '@bellavista_restaurant',
    facebook: 'BellaVistaRestaurant',
    twitter: '@BellaVistaEats'
  },
  operatingHours: {
    monday: { open: '11:00', close: '22:00' },
    tuesday: { open: '11:00', close: '22:00' },
    wednesday: { open: '11:00', close: '22:00' },
    thursday: { open: '11:00', close: '22:00' },
    friday: { open: '11:00', close: '23:00' },
    saturday: { open: '10:00', close: '23:00' },
    sunday: { open: '10:00', close: '21:00' }
  },
  currency: 'TRY',
  language: 'tr'
};

export const categories: MenuCategory[] = [
  { id: 'appetizers', name: 'Mezeler', description: 'Yemeğinizi doğru şekilde başlatın', icon: '🥗', order: 1 },
  { id: 'pasta', name: 'Makarna', description: 'Taze makarna yemekleri', icon: '🍝', order: 2 },
  { id: 'pizza', name: 'Pizza', description: 'Odun ateşinde pişmiş pizzalar', icon: '🍕', order: 3 },
  { id: 'mains', name: 'Ana Yemekler', description: 'Doyurucu ana yemekler', icon: '🍖', order: 4 },
  { id: 'desserts', name: 'Tatlılar', description: 'Tatlı sonlar', icon: '🍰', order: 5 },
  { id: 'beverages', name: 'İçecekler', description: 'İçecekler ve daha fazlası', icon: '🥤', order: 6 }
];

export const menuItems: MenuItem[] = [
  // Mezeler
  {
    id: '1',
    name: 'Bruschetta Classica',
    description: 'Taze domates, fesleğen ve sarımsak ile süslenmiş ızgara ekmek',
    price: 12.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    calories: 180,
    prepTime: 10
  },
  {
    id: '2',
    name: 'Antipasto Tabağı',
    description: 'Kurutulmuş etler, peynirler, zeytinler ve sebzelerden seçmeler',
    price: 18.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'nuts'],
    calories: 320,
    prepTime: 5
  },
  {
    id: '3',
    name: 'Kalamar Tava',
    description: 'Marinara sos ile çıtır kızartılmış kalamar halkaları',
    price: 16.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['seafood', 'gluten'],
    calories: 280,
    prepTime: 15
  },

  // Makarna
  {
    id: '4',
    name: 'Spaghetti Carbonara',
    description: 'Yumurta, pancetta ve pecorino peyniri ile klasik Roma makarnası',
    price: 22.99,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'eggs', 'gluten'],
    calories: 650,
    prepTime: 20
  },
  {
    id: '5',
    name: 'Penne Arrabbiata',
    description: 'Domates sosu ve kırmızı biber ile acılı penne makarnası',
    price: 19.99,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegetarian: true,
    isVegan: true,
    isSpicy: true,
    isGlutenFree: false,
    calories: 520,
    prepTime: 18
  },
  {
    id: '6',
    name: 'Istakoz Ravioli',
    description: 'Krem sos ile istakoz ve ricotta doldurulmuş ev yapımı ravioli',
    price: 28.99,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['seafood', 'dairy', 'eggs', 'gluten'],
    isPopular: true,
    calories: 720,
    prepTime: 25
  },

  // Pizza
  {
    id: '7',
    name: 'Margherita',
    description: 'Domates sosu, mozzarella ve taze fesleğen ile klasik pizza',
    price: 16.99,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegetarian: true,
    isGlutenFree: false,
    calories: 480,
    prepTime: 12
  },
  {
    id: '8',
    name: 'Quattro Stagioni',
    description: 'Enginar, mantar, prosciutto ve zeytin ile dört mevsim pizzası',
    price: 24.99,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'gluten'],
    calories: 620,
    prepTime: 15
  },
  {
    id: '9',
    name: 'Diavola',
    description: 'Domates sosu, mozzarella ve acılı salam ile acılı pizza',
    price: 20.99,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isSpicy: true,
    allergens: ['dairy', 'gluten'],
    calories: 580,
    prepTime: 12
  },

  // Ana Yemekler
  {
    id: '10',
    name: 'Osso Buco',
    description: 'Risotto ve gremolata ile yavaş pişmiş dana incik',
    price: 32.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'gluten'],
    isPopular: true,
    calories: 850,
    prepTime: 45
  },
  {
    id: '11',
    name: 'Branzino al Sale',
    description: 'Otlar ile tuz kabuğunda pişirilmiş Akdeniz levreği',
    price: 28.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['seafood'],
    isGlutenFree: true,
    calories: 420,
    prepTime: 30
  },
  {
    id: '12',
    name: 'Vitello Tonnato',
    description: 'Ton balığı sosu ve kapari ile soğuk dilimlenmiş dana eti',
    price: 26.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['seafood', 'eggs'],
    calories: 380,
    prepTime: 20
  },

  // Tatlılar
  {
    id: '13',
    name: 'Tiramisu',
    description: 'Kahve, mascarpone ve kakao ile klasik İtalyan tatlısı',
    price: 8.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy', 'eggs', 'gluten'],
    isVegetarian: true,
    calories: 320,
    prepTime: 5
  },
  {
    id: '14',
    name: 'Panna Cotta',
    description: 'Meyve kompostosu ile vanilyalı panna cotta',
    price: 7.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy'],
    isVegetarian: true,
    isGlutenFree: true,
    calories: 280,
    prepTime: 5
  },
  {
    id: '15',
    name: 'Gelato Seçimi',
    description: 'Üç top el yapımı gelato (vanilya, çikolata, çilek)',
    price: 9.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    allergens: ['dairy'],
    isVegetarian: true,
    calories: 240,
    prepTime: 3
  },

  // İçecekler
  {
    id: '16',
    name: 'İtalyan Sodası',
    description: 'Aromalı şurup ile maden suyu (limon, kiraz veya vanilya)',
    price: 4.99,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegan: true,
    isGlutenFree: true,
    calories: 80,
    prepTime: 2
  },
  {
    id: '17',
    name: 'Espresso',
    description: 'Tek shot premium İtalyan espressosu',
    price: 3.99,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegan: true,
    isGlutenFree: true,
    calories: 5,
    prepTime: 3
  },
  {
    id: '18',
    name: 'Ev Şarabı',
    description: 'Bardakta İtalyan şarapları seçimi (kırmızı, beyaz veya rosé)',
    price: 12.99,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
    imagePublicId: undefined,
    isVegan: true,
    isGlutenFree: true,
    calories: 120,
    prepTime: 2
  }
];
