import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear all existing data first
  console.log('🗑️  Clearing existing data...')
  await prisma.menuItem.deleteMany()
  await prisma.menuCategory.deleteMany()
  await prisma.restaurantOperatingHours.deleteMany()
  await prisma.restaurant.deleteMany()
  console.log('✅ Data cleared successfully')

  // Create restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      id: '1',
      name: 'Republic',
      description: 'Çanakkale\'nin en iyi pub deneyimi. Özel içecekler, lezzetli atıştırmalıklar ve harika atmosfer.',
      logo: 'https://res.cloudinary.com/dmudabrcn/image/upload/v1769272325/543799471_17989578092840121_1390771300469241938_n_dpnmkw.jpg',
      coverImage: '/images/restaurant-cover.jpg',
      address: 'Çanakkale Merkez, Türkiye',
      phone: '+90 (286) 123-4567',
      email: 'info@republiccanakkale.com',
      website: 'https://republiccanakkale.com',
      instagram: '@republiccanakkale',
      facebook: 'RepublicCanakkale',
      twitter: '@RepublicCanakkale',
      currency: 'TRY',
      language: 'tr'
    }
  })
  console.log('✅ Restaurant created:', restaurant.name)

  // Create operating hours
  const operatingHours = [
    { dayOfWeek: 'monday', openTime: '12:00', closeTime: '02:00' },
    { dayOfWeek: 'tuesday', openTime: '12:00', closeTime: '02:00' },
    { dayOfWeek: 'wednesday', openTime: '12:00', closeTime: '02:00' },
    { dayOfWeek: 'thursday', openTime: '12:00', closeTime: '02:00' },
    { dayOfWeek: 'friday', openTime: '12:00', closeTime: '04:00' },
    { dayOfWeek: 'saturday', openTime: '12:00', closeTime: '04:00' },
    { dayOfWeek: 'sunday', openTime: '12:00', closeTime: '02:00' }
  ]

  for (const hours of operatingHours) {
    await prisma.restaurantOperatingHours.create({
      data: {
        restaurantId: restaurant.id,
        ...hours
      }
    })
  }
  console.log('✅ Operating hours created')

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
  console.log('✅ Categories created')

  // Create menu items
  const menuItems = [
    // Kahveler
    {
      id: '1',
      name: 'Türk Kahvesi',
      description: 'Geleneksel Türk kahvesi, lokum eşliğinde',
      price: 15.00,
      categoryId: 'coffee',
      order: 1
    },
    {
      id: '2',
      name: 'Espresso',
      description: 'Tek shot özel çekirdek espressosu',
      price: 12.00,
      categoryId: 'coffee',
      order: 2
    },
    {
      id: '3',
      name: 'Americano',
      description: 'Espresso + sıcak su',
      price: 14.00,
      categoryId: 'coffee',
      order: 3
    },
    {
      id: '4',
      name: 'Cappuccino',
      description: 'Espresso + buharda ısıtılmış süt + süt köpüğü',
      price: 18.00,
      categoryId: 'coffee',
      order: 4
    },
    {
      id: '5',
      name: 'Latte',
      description: 'Espresso + bol sıcak süt + az köpük',
      price: 20.00,
      categoryId: 'coffee',
      order: 5
    },
    {
      id: '6',
      name: 'Mocha',
      description: 'Espresso + çikolata + sıcak süt + krema',
      price: 22.00,
      categoryId: 'coffee',
      order: 6
    },

    // Soğuk İçecekler
    {
      id: '7',
      name: 'Cold Brew',
      description: '12 saat soğuk demleme, buz ile servis',
      price: 16.00,
      categoryId: 'cold-drinks',
      order: 7
    },
    {
      id: '8',
      name: 'Iced Latte',
      description: 'Espresso + soğuk süt + buz',
      price: 18.00,
      categoryId: 'cold-drinks',
      order: 8
    },
    {
      id: '9',
      name: 'Frappé',
      description: 'Buzlu kahve + süt + şeker, blender ile',
      price: 20.00,
      categoryId: 'cold-drinks',
      order: 9
    },
    {
      id: '10',
      name: 'Taze Sıkma Portakal Suyu',
      description: 'Günlük taze sıkılmış portakal suyu',
      price: 12.00,
      categoryId: 'cold-drinks',
      order: 10
    },

    // Pastalar & Tatlılar
    {
      id: '11',
      name: 'Cheesecake',
      description: 'Ev yapımı New York usulü cheesecake',
      price: 25.00,
      categoryId: 'pastries',
      order: 11
    },
    {
      id: '12',
      name: 'Brownie',
      description: 'Çikolatalı brownie, dondurma ile',
      price: 18.00,
      categoryId: 'pastries',
      order: 12
    },
    {
      id: '13',
      name: 'Tiramisu',
      description: 'Kahve ve mascarpone ile klasik tiramisu',
      price: 22.00,
      categoryId: 'pastries',
      order: 13
    },
    {
      id: '14',
      name: 'Croissant',
      description: 'Tereyağlı kruvasan, reçel ile',
      price: 8.00,
      categoryId: 'pastries',
      order: 14
    },

    // Sandviçler
    {
      id: '15',
      name: 'Club Sandviç',
      description: 'Tavuk, domates, marul, mayonez',
      price: 28.00,
      categoryId: 'sandwiches',
      order: 15
    },
    {
      id: '16',
      name: 'Tuna Melt',
      description: 'Ton balığı, kaşar peyniri, soğan',
      price: 26.00,
      categoryId: 'sandwiches',
      order: 16
    },
    {
      id: '17',
      name: 'Veggie Sandviç',
      description: 'Avokado, domates, salatalık, marul',
      price: 22.00,
      categoryId: 'sandwiches',
      order: 17
    },

    // Kahvaltı
    {
      id: '18',
      name: 'Menemen',
      description: 'Yumurta, domates, biber, soğan',
      price: 24.00,
      categoryId: 'breakfast',
      order: 18
    },
    {
      id: '19',
      name: 'Omlet',
      description: '3 yumurta, peynir, mantar, domates',
      price: 20.00,
      categoryId: 'breakfast',
      order: 19
    },
    {
      id: '20',
      name: 'Pancake',
      description: '3 adet pancake, bal ve tereyağı',
      price: 18.00,
      categoryId: 'breakfast',
      order: 20
    },

    // Atıştırmalıklar
    {
      id: '21',
      name: 'Çikolatalı Kurabiye',
      description: 'Ev yapımı çikolatalı kurabiye',
      price: 6.00,
      categoryId: 'snacks',
      order: 21
    },
    {
      id: '22',
      name: 'Granola Bar',
      description: 'Yulaf, kuruyemiş, bal ile ev yapımı',
      price: 8.00,
      categoryId: 'snacks',
      order: 22
    },
    {
      id: '23',
      name: 'Kuruyemiş Karışımı',
      description: 'Badem, ceviz, fındık karışımı',
      price: 12.00,
      categoryId: 'snacks',
      order: 23
    }
  ]

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i]

    // Create the menu item with order
    await prisma.menuItem.create({
      data: {
        restaurantId: restaurant.id,
        ...item,
        order: i + 1
      }
    })
  }
  console.log('✅ Menu items created')
  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })