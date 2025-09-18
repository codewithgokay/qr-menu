import { MenuItem, MenuCategory, Restaurant } from '@/lib/types';

export const restaurant: Restaurant = {
  id: '1',
  name: 'Bella Vista',
  description: 'Authentic Italian cuisine with a modern twist',
  logo: '/images/logo.png',
  coverImage: '/images/restaurant-cover.jpg',
  address: '123 Main Street, Downtown',
  phone: '+1 (555) 123-4567',
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
  currency: 'USD',
  language: 'en'
};

export const categories: MenuCategory[] = [
  { id: 'appetizers', name: 'Appetizers', description: 'Start your meal right', icon: '🥗', order: 1 },
  { id: 'pasta', name: 'Pasta', description: 'Fresh pasta dishes', icon: '🍝', order: 2 },
  { id: 'pizza', name: 'Pizza', description: 'Wood-fired pizzas', icon: '🍕', order: 3 },
  { id: 'mains', name: 'Main Courses', description: 'Hearty main dishes', icon: '🍖', order: 4 },
  { id: 'desserts', name: 'Desserts', description: 'Sweet endings', icon: '🍰', order: 5 },
  { id: 'beverages', name: 'Beverages', description: 'Drinks & more', icon: '🥤', order: 6 }
];

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: '1',
    name: 'Bruschetta Classica',
    description: 'Grilled bread topped with fresh tomatoes, basil, and garlic',
    price: 12.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    calories: 180,
    prepTime: 10
  },
  {
    id: '2',
    name: 'Antipasto Platter',
    description: 'Selection of cured meats, cheeses, olives, and vegetables',
    price: 18.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center',
    allergens: ['dairy', 'nuts'],
    calories: 320,
    prepTime: 5
  },
  {
    id: '3',
    name: 'Calamari Fritti',
    description: 'Crispy fried squid rings with marinara sauce',
    price: 16.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
    allergens: ['seafood', 'gluten'],
    calories: 280,
    prepTime: 15
  },

  // Pasta
  {
    id: '4',
    name: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with eggs, pancetta, and pecorino cheese',
    price: 22.99,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center',
    allergens: ['dairy', 'eggs', 'gluten'],
    calories: 650,
    prepTime: 20
  },
  {
    id: '5',
    name: 'Penne Arrabbiata',
    description: 'Spicy penne pasta with tomato sauce and red peppers',
    price: 19.99,
    category: 'pasta',
    image: '/images/arrabbiata.jpg',
    isVegetarian: true,
    isVegan: true,
    isSpicy: true,
    isGlutenFree: false,
    calories: 520,
    prepTime: 18
  },
  {
    id: '6',
    name: 'Lobster Ravioli',
    description: 'Homemade ravioli filled with lobster and ricotta in cream sauce',
    price: 28.99,
    category: 'pasta',
    image: '/images/lobster-ravioli.jpg',
    allergens: ['seafood', 'dairy', 'eggs', 'gluten'],
    isPopular: true,
    calories: 720,
    prepTime: 25
  },

  // Pizza
  {
    id: '7',
    name: 'Margherita',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 16.99,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
    isVegetarian: true,
    isGlutenFree: false,
    calories: 480,
    prepTime: 12
  },
  {
    id: '8',
    name: 'Quattro Stagioni',
    description: 'Four seasons pizza with artichokes, mushrooms, prosciutto, and olives',
    price: 24.99,
    category: 'pizza',
    image: '/images/quattro-stagioni.jpg',
    allergens: ['dairy', 'gluten'],
    calories: 620,
    prepTime: 15
  },
  {
    id: '9',
    name: 'Diavola',
    description: 'Spicy pizza with tomato sauce, mozzarella, and spicy salami',
    price: 20.99,
    category: 'pizza',
    image: '/images/diavola.jpg',
    isSpicy: true,
    allergens: ['dairy', 'gluten'],
    calories: 580,
    prepTime: 12
  },

  // Main Courses
  {
    id: '10',
    name: 'Osso Buco',
    description: 'Braised veal shanks with risotto and gremolata',
    price: 32.99,
    category: 'mains',
    image: '/images/osso-buco.jpg',
    allergens: ['dairy', 'gluten'],
    isPopular: true,
    calories: 850,
    prepTime: 45
  },
  {
    id: '11',
    name: 'Branzino al Sale',
    description: 'Mediterranean sea bass baked in salt crust with herbs',
    price: 28.99,
    category: 'mains',
    image: '/images/branzino.jpg',
    allergens: ['seafood'],
    isGlutenFree: true,
    calories: 420,
    prepTime: 30
  },
  {
    id: '12',
    name: 'Vitello Tonnato',
    description: 'Cold sliced veal with tuna sauce and capers',
    price: 26.99,
    category: 'mains',
    image: '/images/vitello-tonnato.jpg',
    allergens: ['seafood', 'eggs'],
    calories: 380,
    prepTime: 20
  },

  // Desserts
  {
    id: '13',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee, mascarpone, and cocoa',
    price: 8.99,
    category: 'desserts',
    image: '/images/tiramisu.jpg',
    allergens: ['dairy', 'eggs', 'gluten'],
    isVegetarian: true,
    calories: 320,
    prepTime: 5
  },
  {
    id: '14',
    name: 'Panna Cotta',
    description: 'Vanilla panna cotta with berry compote',
    price: 7.99,
    category: 'desserts',
    image: '/images/panna-cotta.jpg',
    allergens: ['dairy'],
    isVegetarian: true,
    isGlutenFree: true,
    calories: 280,
    prepTime: 5
  },
  {
    id: '15',
    name: 'Gelato Selection',
    description: 'Three scoops of artisanal gelato (vanilla, chocolate, strawberry)',
    price: 9.99,
    category: 'desserts',
    image: '/images/gelato.jpg',
    allergens: ['dairy'],
    isVegetarian: true,
    calories: 240,
    prepTime: 3
  },

  // Beverages
  {
    id: '16',
    name: 'Italian Soda',
    description: 'Sparkling water with flavored syrup (lemon, cherry, or vanilla)',
    price: 4.99,
    category: 'beverages',
    image: '/images/italian-soda.jpg',
    isVegan: true,
    isGlutenFree: true,
    calories: 80,
    prepTime: 2
  },
  {
    id: '17',
    name: 'Espresso',
    description: 'Single shot of premium Italian espresso',
    price: 3.99,
    category: 'beverages',
    image: '/images/espresso.jpg',
    isVegan: true,
    isGlutenFree: true,
    calories: 5,
    prepTime: 3
  },
  {
    id: '18',
    name: 'House Wine',
    description: 'Selection of Italian wines by the glass (red, white, or rosé)',
    price: 12.99,
    category: 'beverages',
    image: '/images/house-wine.jpg',
    isVegan: true,
    isGlutenFree: true,
    calories: 120,
    prepTime: 2
  }
];
