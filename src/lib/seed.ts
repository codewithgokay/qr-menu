import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create restaurant
  const restaurant = await prisma.restaurant.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Bella Vista',
      description: 'Modern dokunuşlarla otantik İtalyan mutfağı',
      logo: '/images/logo.png',
      coverImage: '/images/restaurant-cover.jpg',
      address: '123 Ana Cadde, Şehir Merkezi',
      phone: '+90 (555) 123-4567',
      email: 'info@bellavista.com',
      website: 'https://bellavista.com',
      instagram: '@bellavista_restaurant',
      facebook: 'BellaVistaRestaurant',
      twitter: '@BellaVistaEats',
      currency: 'TRY',
      language: 'tr'
    }
  })

  // Create operating hours
  const operatingHours = [
    { dayOfWeek: 'monday', openTime: '11:00', closeTime: '22:00' },
    { dayOfWeek: 'tuesday', openTime: '11:00', closeTime: '22:00' },
    { dayOfWeek: 'wednesday', openTime: '11:00', closeTime: '22:00' },
    { dayOfWeek: 'thursday', openTime: '11:00', closeTime: '22:00' },
    { dayOfWeek: 'friday', openTime: '11:00', closeTime: '23:00' },
    { dayOfWeek: 'saturday', openTime: '10:00', closeTime: '23:00' },
    { dayOfWeek: 'sunday', openTime: '10:00', closeTime: '21:00' }
  ]

  for (const hours of operatingHours) {
    await prisma.restaurantOperatingHours.upsert({
      where: {
        restaurantId_dayOfWeek: {
          restaurantId: restaurant.id,
          dayOfWeek: hours.dayOfWeek
        }
      },
      update: hours,
      create: {
        restaurantId: restaurant.id,
        ...hours
      }
    })
  }

  // Create categories
  const categories = [
    { id: 'appetizers', name: 'Mezeler', description: 'Yemeğinizi doğru şekilde başlatın', icon: '🥗', order: 1 },
    { id: 'pasta', name: 'Makarna', description: 'Taze makarna yemekleri', icon: '🍝', order: 2 },
    { id: 'pizza', name: 'Pizza', description: 'Odun ateşinde pişmiş pizzalar', icon: '🍕', order: 3 },
    { id: 'mains', name: 'Ana Yemekler', description: 'Doyurucu ana yemekler', icon: '🍖', order: 4 },
    { id: 'desserts', name: 'Tatlılar', description: 'Tatlı sonlar', icon: '🍰', order: 5 },
    { id: 'beverages', name: 'İçecekler', description: 'İçecekler ve daha fazlası', icon: '🥤', order: 6 }
  ]

  for (const category of categories) {
    await prisma.menuCategory.upsert({
      where: { id: category.id },
      update: category,
      create: {
        restaurantId: restaurant.id,
        ...category
      }
    })
  }

  // Create allergens
  const allergenNames = ['dairy', 'nuts', 'seafood', 'gluten', 'eggs']
  for (const allergenName of allergenNames) {
    await prisma.allergen.upsert({
      where: { name: allergenName },
      update: {},
      create: { name: allergenName }
    })
  }

  // Create menu items
  const menuItems = [
    // Mezeler
    {
      id: '1',
      name: 'Bruschetta Classica',
      description: 'Taze domates, fesleğen ve sarımsak ile süslenmiş ızgara ekmek',
      price: 12.99,
      categoryId: 'appetizers',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      calories: 180,
      prepTime: 10,
      order: 1,
      allergens: []
    },
    {
      id: '2',
      name: 'Antipasto Tabağı',
      description: 'Kurutulmuş etler, peynirler, zeytinler ve sebzelerden seçmeler',
      price: 18.99,
      categoryId: 'appetizers',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center',
      calories: 320,
      prepTime: 5,
      allergens: ['dairy', 'nuts']
    },
    {
      id: '3',
      name: 'Kalamar Tava',
      description: 'Marinara sos ile çıtır kızartılmış kalamar halkaları',
      price: 16.99,
      categoryId: 'appetizers',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center',
      calories: 280,
      prepTime: 15,
      allergens: ['seafood', 'gluten']
    },
    // Makarna
    {
      id: '4',
      name: 'Spaghetti Carbonara',
      description: 'Yumurta, pancetta ve pecorino peyniri ile klasik Roma makarnası',
      price: 22.99,
      categoryId: 'pasta',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&crop=center',
      calories: 650,
      prepTime: 20,
      allergens: ['dairy', 'eggs', 'gluten']
    },
    {
      id: '5',
      name: 'Penne Arrabbiata',
      description: 'Domates sosu ve kırmızı biber ile acılı penne makarnası',
      price: 19.99,
      categoryId: 'pasta',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&crop=center',
      isVegetarian: true,
      isVegan: true,
      isSpicy: true,
      isGlutenFree: false,
      calories: 520,
      prepTime: 18,
      allergens: []
    },
    {
      id: '6',
      name: 'Istakoz Ravioli',
      description: 'Krem sos ile istakoz ve ricotta doldurulmuş ev yapımı ravioli',
      price: 28.99,
      categoryId: 'pasta',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&crop=center',
      isPopular: true,
      calories: 720,
      prepTime: 25,
      allergens: ['seafood', 'dairy', 'eggs', 'gluten']
    },
    // Pizza
    {
      id: '7',
      name: 'Margherita',
      description: 'Domates sosu, mozzarella ve taze fesleğen ile klasik pizza',
      price: 16.99,
      categoryId: 'pizza',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
      isVegetarian: true,
      isGlutenFree: false,
      calories: 480,
      prepTime: 12,
      allergens: ['dairy', 'gluten']
    },
    {
      id: '8',
      name: 'Quattro Stagioni',
      description: 'Enginar, mantar, prosciutto ve zeytin ile dört mevsim pizzası',
      price: 24.99,
      categoryId: 'pizza',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
      calories: 620,
      prepTime: 15,
      allergens: ['dairy', 'gluten']
    },
    {
      id: '9',
      name: 'Diavola',
      description: 'Domates sosu, mozzarella ve acılı salam ile acılı pizza',
      price: 20.99,
      categoryId: 'pizza',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center',
      isSpicy: true,
      calories: 580,
      prepTime: 12,
      allergens: ['dairy', 'gluten']
    },
    // Ana Yemekler
    {
      id: '10',
      name: 'Osso Buco',
      description: 'Risotto ve gremolata ile yavaş pişmiş dana incik',
      price: 32.99,
      categoryId: 'mains',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center',
      isPopular: true,
      calories: 850,
      prepTime: 45,
      allergens: ['dairy', 'gluten']
    },
    {
      id: '11',
      name: 'Branzino al Sale',
      description: 'Otlar ile tuz kabuğunda pişirilmiş Akdeniz levreği',
      price: 28.99,
      categoryId: 'mains',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center',
      isGlutenFree: true,
      calories: 420,
      prepTime: 30,
      allergens: ['seafood']
    },
    {
      id: '12',
      name: 'Vitello Tonnato',
      description: 'Ton balığı sosu ve kapari ile soğuk dilimlenmiş dana eti',
      price: 26.99,
      categoryId: 'mains',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center',
      calories: 380,
      prepTime: 20,
      allergens: ['seafood', 'eggs']
    },
    // Tatlılar
    {
      id: '13',
      name: 'Tiramisu',
      description: 'Kahve, mascarpone ve kakao ile klasik İtalyan tatlısı',
      price: 8.99,
      categoryId: 'desserts',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
      isVegetarian: true,
      calories: 320,
      prepTime: 5,
      allergens: ['dairy', 'eggs', 'gluten']
    },
    {
      id: '14',
      name: 'Panna Cotta',
      description: 'Meyve kompostosu ile vanilyalı panna cotta',
      price: 7.99,
      categoryId: 'desserts',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
      isVegetarian: true,
      isGlutenFree: true,
      calories: 280,
      prepTime: 5,
      allergens: ['dairy']
    },
    {
      id: '15',
      name: 'Gelato Seçimi',
      description: 'Üç top el yapımı gelato (vanilya, çikolata, çilek)',
      price: 9.99,
      categoryId: 'desserts',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center',
      isVegetarian: true,
      calories: 240,
      prepTime: 3,
      allergens: ['dairy']
    },
    // İçecekler
    {
      id: '16',
      name: 'İtalyan Sodası',
      description: 'Aromalı şurup ile maden suyu (limon, kiraz veya vanilya)',
      price: 4.99,
      categoryId: 'beverages',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
      isVegan: true,
      isGlutenFree: true,
      calories: 80,
      prepTime: 2,
      allergens: []
    },
    {
      id: '17',
      name: 'Espresso',
      description: 'Tek shot premium İtalyan espressosu',
      price: 3.99,
      categoryId: 'beverages',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&crop=center',
      isVegan: true,
      isGlutenFree: true,
      calories: 5,
      prepTime: 3,
      allergens: []
    },
    {
      id: '18',
      name: 'Ev Şarabı',
      description: 'Bardakta İtalyan şarapları seçimi (kırmızı, beyaz veya rosé)',
      price: 12.99,
      categoryId: 'beverages',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
      isVegan: true,
      isGlutenFree: true,
      calories: 120,
      prepTime: 2,
      allergens: []
    }
  ]

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const { allergens, ...itemData } = item
    
    // Create the menu item with order
    const menuItem = await prisma.menuItem.upsert({
      where: { id: item.id },
      update: { ...itemData, order: i + 1 },
      create: {
        restaurantId: restaurant.id,
        ...itemData,
        order: i + 1
      }
    })

    // Create allergen associations
    if (allergens && allergens.length > 0) {
      for (const allergenName of allergens) {
        const allergen = await prisma.allergen.findUnique({
          where: { name: allergenName }
        })

        if (allergen) {
          await prisma.menuItemAllergen.upsert({
            where: {
              menuItemId_allergenId: {
                menuItemId: menuItem.id,
                allergenId: allergen.id
              }
            },
            update: {},
            create: {
              menuItemId: menuItem.id,
              allergenId: allergen.id
            }
          })
        }
      }
    }
  }

  console.log('Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
