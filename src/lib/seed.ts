import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  // Clear all existing data first
  await prisma.menuItemAllergen.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.menuCategory.deleteMany()
  await prisma.restaurantOperatingHours.deleteMany()
  await prisma.restaurant.deleteMany()
  await prisma.allergen.deleteMany()

  // Create restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      id: '1',
      name: 'Republic',
      description: 'Çanakkale\'nin en iyi pub deneyimi',
      logo: '/images/logo.png',
      coverImage: '/images/restaurant-cover.jpg',
      address: 'Çanakkale Merkez, Türkiye',
      phone: '+90 (286) 123-4567',
      email: 'info@dukkancanakkale.com',
      website: 'https://dukkancanakkale.com',
      instagram: '@dukkancanakkale',
      facebook: 'DukkanCanakkale',
      twitter: '@DukkanCanakkale',
      currency: 'TRY',
      language: 'tr'
    }
  })

  // Create operating hours
  const operatingHours = [
    { dayOfWeek: 'monday', openTime: '07:00', closeTime: '22:00' },
    { dayOfWeek: 'tuesday', openTime: '07:00', closeTime: '22:00' },
    { dayOfWeek: 'wednesday', openTime: '07:00', closeTime: '22:00' },
    { dayOfWeek: 'thursday', openTime: '07:00', closeTime: '22:00' },
    { dayOfWeek: 'friday', openTime: '07:00', closeTime: '23:00' },
    { dayOfWeek: 'saturday', openTime: '08:00', closeTime: '23:00' },
    { dayOfWeek: 'sunday', openTime: '08:00', closeTime: '22:00' }
  ]

  for (const hours of operatingHours) {
    await prisma.restaurantOperatingHours.create({
      data: {
        restaurantId: restaurant.id,
        ...hours
      }
    })
  }

  // Create categories
  const categories = [
    { id: 'coffee', name: 'Kahveler', description: 'Özel çekirdeklerden hazırlanan kahveler', icon: '☕', order: 1 },
    { id: 'cold-drinks', name: 'Soğuk İçecekler', description: 'Serinletici içecekler', icon: '🧊', order: 2 },
    { id: 'pastries', name: 'Pastalar & Tatlılar', description: 'Ev yapımı pastalar ve tatlılar', icon: '🧁', order: 3 },
    { id: 'sandwiches', name: 'Sandviçler', description: 'Taze sandviçler ve tostlar', icon: '🥪', order: 4 },
    { id: 'breakfast', name: 'Kahvaltı', description: 'Günün en önemli öğünü', icon: '🍳', order: 5 },
    { id: 'snacks', name: 'Atıştırmalıklar', description: 'Hafif atıştırmalıklar', icon: '🥜', order: 6 }
  ]

  for (const category of categories) {
    await prisma.menuCategory.create({
      data: {
        restaurantId: restaurant.id,
        ...category
      }
    })
  }

  // Create allergens
  const allergenNames = ['dairy', 'nuts', 'seafood', 'gluten', 'eggs', 'sulfites']
  for (const allergenName of allergenNames) {
    await prisma.allergen.create({
      data: { name: allergenName }
    })
  }

  // Create menu items
  const menuItems = [
    // Kahveler
    {
      id: '1',
      name: 'Türk Kahvesi',
      description: 'Geleneksel Türk kahvesi, lokum eşliğinde',
      price: 15.00,
      categoryId: 'coffee',
      calories: 5,
      prepTime: 5,
      order: 1,
      allergens: []
    },
    {
      id: '2',
      name: 'Espresso',
      description: 'Tek shot özel çekirdek espressosu',
      price: 12.00,
      categoryId: 'coffee',
      calories: 5,
      prepTime: 3,
      order: 2,
      allergens: []
    },
    {
      id: '3',
      name: 'Americano',
      description: 'Espresso + sıcak su',
      price: 14.00,
      categoryId: 'coffee',
      calories: 5,
      prepTime: 3,
      order: 3,
      allergens: []
    },
    {
      id: '4',
      name: 'Cappuccino',
      description: 'Espresso + buharda ısıtılmış süt + süt köpüğü',
      price: 18.00,
      categoryId: 'coffee',
      calories: 80,
      prepTime: 4,
      order: 4,
      allergens: ['dairy']
    },
    {
      id: '5',
      name: 'Latte',
      description: 'Espresso + bol sıcak süt + az köpük',
      price: 20.00,
      categoryId: 'coffee',
      calories: 120,
      prepTime: 4,
      order: 5,
      allergens: ['dairy']
    },
    {
      id: '6',
      name: 'Mocha',
      description: 'Espresso + çikolata + sıcak süt + krema',
      price: 22.00,
      categoryId: 'coffee',
      calories: 200,
      prepTime: 5,
      order: 6,
      allergens: ['dairy']
    },

    // Soğuk İçecekler
    {
      id: '7',
      name: 'Cold Brew',
      description: '12 saat soğuk demleme, buz ile servis',
      price: 16.00,
      categoryId: 'cold-drinks',
      calories: 5,
      prepTime: 2,
      order: 7,
      allergens: []
    },
    {
      id: '8',
      name: 'Iced Latte',
      description: 'Espresso + soğuk süt + buz',
      price: 18.00,
      categoryId: 'cold-drinks',
      calories: 100,
      prepTime: 3,
      order: 8,
      allergens: ['dairy']
    },
    {
      id: '9',
      name: 'Frappé',
      description: 'Buzlu kahve + süt + şeker, blender ile',
      price: 20.00,
      categoryId: 'cold-drinks',
      calories: 150,
      prepTime: 4,
      order: 9,
      allergens: ['dairy']
    },
    {
      id: '10',
      name: 'Taze Sıkma Portakal Suyu',
      description: 'Günlük taze sıkılmış portakal suyu',
      price: 12.00,
      categoryId: 'cold-drinks',
      calories: 110,
      prepTime: 3,
      order: 10,
      allergens: []
    },

    // Pastalar & Tatlılar
    {
      id: '11',
      name: 'Cheesecake',
      description: 'Ev yapımı New York usulü cheesecake',
      price: 25.00,
      categoryId: 'pastries',
      calories: 350,
      prepTime: 2,
      order: 11,
      allergens: ['dairy', 'eggs', 'gluten']
    },
    {
      id: '12',
      name: 'Brownie',
      description: 'Çikolatalı brownie, dondurma ile',
      price: 18.00,
      categoryId: 'pastries',
      calories: 280,
      prepTime: 2,
      order: 12,
      allergens: ['dairy', 'eggs', 'gluten']
    },
    {
      id: '13',
      name: 'Tiramisu',
      description: 'Kahve ve mascarpone ile klasik tiramisu',
      price: 22.00,
      categoryId: 'pastries',
      calories: 320,
      prepTime: 2,
      order: 13,
      allergens: ['dairy', 'eggs', 'gluten']
    },
    {
      id: '14',
      name: 'Croissant',
      description: 'Tereyağlı kruvasan, reçel ile',
      price: 8.00,
      categoryId: 'pastries',
      calories: 200,
      prepTime: 1,
      order: 14,
      allergens: ['dairy', 'eggs', 'gluten']
    },

    // Sandviçler
    {
      id: '15',
      name: 'Club Sandviç',
      description: 'Tavuk, domates, marul, mayonez',
      price: 28.00,
      categoryId: 'sandwiches',
      calories: 450,
      prepTime: 8,
      order: 15,
      allergens: ['gluten', 'eggs']
    },
    {
      id: '16',
      name: 'Tuna Melt',
      description: 'Ton balığı, kaşar peyniri, soğan',
      price: 26.00,
      categoryId: 'sandwiches',
      calories: 420,
      prepTime: 7,
      order: 16,
      allergens: ['seafood', 'dairy', 'gluten']
    },
    {
      id: '17',
      name: 'Veggie Sandviç',
      description: 'Avokado, domates, salatalık, marul',
      price: 22.00,
      categoryId: 'sandwiches',
      calories: 300,
      prepTime: 5,
      order: 17,
      allergens: ['gluten']
    },

    // Kahvaltı
    {
      id: '18',
      name: 'Menemen',
      description: 'Yumurta, domates, biber, soğan',
      price: 24.00,
      categoryId: 'breakfast',
      calories: 250,
      prepTime: 10,
      order: 18,
      allergens: ['eggs']
    },
    {
      id: '19',
      name: 'Omlet',
      description: '3 yumurta, peynir, mantar, domates',
      price: 20.00,
      categoryId: 'breakfast',
      calories: 300,
      prepTime: 8,
      order: 19,
      allergens: ['eggs', 'dairy']
    },
    {
      id: '20',
      name: 'Pancake',
      description: '3 adet pancake, bal ve tereyağı',
      price: 18.00,
      categoryId: 'breakfast',
      calories: 400,
      prepTime: 12,
      order: 20,
      allergens: ['dairy', 'eggs', 'gluten']
    },

    // Atıştırmalıklar
    {
      id: '21',
      name: 'Çikolatalı Kurabiye',
      description: 'Ev yapımı çikolatalı kurabiye',
      price: 6.00,
      categoryId: 'snacks',
      calories: 150,
      prepTime: 1,
      order: 21,
      allergens: ['dairy', 'eggs', 'gluten']
    },
    {
      id: '22',
      name: 'Granola Bar',
      description: 'Yulaf, kuruyemiş, bal ile ev yapımı',
      price: 8.00,
      categoryId: 'snacks',
      calories: 200,
      prepTime: 1,
      order: 22,
      allergens: ['nuts']
    },
    {
      id: '23',
      name: 'Kuruyemiş Karışımı',
      description: 'Badem, ceviz, fındık karışımı',
      price: 12.00,
      categoryId: 'snacks',
      calories: 300,
      prepTime: 1,
      order: 23,
      allergens: ['nuts']
    }
  ]

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const { allergens, ...itemData } = item

    // Create the menu item with order
    const menuItem = await prisma.menuItem.create({
      data: {
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
          await prisma.menuItemAllergen.create({
            data: {
              menuItemId: menuItem.id,
              allergenId: allergen.id
            }
          })
        }
      }
    }
  }

}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
