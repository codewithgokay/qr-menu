import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear all existing data first
  console.log('🗑️  Clearing existing data...')
  await prisma.menuItemAllergen.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.menuCategory.deleteMany()
  await prisma.restaurantOperatingHours.deleteMany()
  await prisma.restaurant.deleteMany()
  await prisma.allergen.deleteMany()
  console.log('✅ Data cleared successfully')

  // Create restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
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
    await prisma.restaurantOperatingHours.create({
      data: {
        restaurantId: restaurant.id,
        ...hours
      }
    })
  }

  // Create categories
  const categories = [
    { id: 'appetizers', name: 'Başlangıçlar', description: 'Yemeğinizi doğru şekilde başlatın', icon: '🥗', order: 1 },
    { id: 'pizza', name: 'Pizzalar', description: 'Odun ateşinde pişmiş pizzalar', icon: '🍕', order: 2 },
    { id: 'pasta', name: 'Makarnalar', description: 'Taze makarna yemekleri', icon: '🍝', order: 3 },
    { id: 'mains', name: 'Ana Yemekler', description: 'Doyurucu ana yemekler', icon: '🍖', order: 4 },
    { id: 'desserts', name: 'Tatlılar', description: 'Tatlı sonlar', icon: '🍰', order: 5 },
    { id: 'beverages', name: 'İçecekler', description: 'İçecekler ve daha fazlası', icon: '🥤', order: 6 }
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
    // Başlangıçlar
    {
      id: '1',
      name: 'Zeytinyağlı Yaprak Sarma',
      description: 'İnce asma yapraklarına sarılı pirinç, kuş üzümü ve fıstık dolması.',
      price: 45.00,
      categoryId: 'appetizers',
      calories: 220,
      prepTime: 15,
      order: 1,
      allergens: ['gluten', 'nuts']
    },
    {
      id: '2',
      name: 'Fava',
      description: 'Ege usulü bakla ezmesi, zeytinyağı ve dereotu ile sunulur.',
      price: 35.00,
      categoryId: 'appetizers',
      calories: 180,
      prepTime: 10,
      order: 2,
      allergens: []
    },
    {
      id: '3',
      name: 'Çerkez Tavuğu',
      description: 'Didiklenmiş tavuk, ceviz ve sarımsaklı yoğurtla harmanlanır.',
      price: 55.00,
      categoryId: 'appetizers',
      calories: 260,
      prepTime: 15,
      order: 3,
      allergens: ['nuts', 'dairy']
    },
    {
      id: '4',
      name: 'Köz Patlıcan Salatası',
      description: 'Odun ateşinde közlenmiş patlıcan, domates ve biber ile.',
      price: 40.00,
      categoryId: 'appetizers',
      calories: 90,
      prepTime: 10,
      order: 4,
      allergens: []
    },
    {
      id: '5',
      name: 'Levrek Marine',
      description: 'Balık narenciye ve zeytinyağıyla marine edilmiş ince levrek dilimleri.',
      price: 65.00,
      categoryId: 'appetizers',
      calories: 150,
      prepTime: 20,
      order: 5,
      allergens: ['seafood']
    },
    
    // Pizzalar
    {
      id: '6',
      name: 'Türk Usulü Lahmacun Pizza',
      description: 'İnce hamur, baharatlı kıyma harcı, maydanoz ve limon.',
      price: 85.00,
      categoryId: 'pizza',
      calories: 300,
      prepTime: 15,
      order: 6,
      allergens: ['gluten']
    },
    {
      id: '7',
      name: 'Sucuklu Pizza',
      description: 'Türk sucuğu, mozarella ve domates sosu.',
      price: 95.00,
      categoryId: 'pizza',
      calories: 420,
      prepTime: 20,
      order: 7,
      allergens: ['gluten', 'dairy']
    },
    {
      id: '8',
      name: 'Pastırmalı Pizza',
      description: 'Kayseri pastırması, kaşar ve taze domates.',
      price: 105.00,
      categoryId: 'pizza',
      calories: 400,
      prepTime: 20,
      order: 8,
      allergens: ['gluten', 'dairy']
    },
    {
      id: '9',
      name: 'Sebzeli Pizza',
      description: 'Közlenmiş sebzeler ve siyah zeytin.',
      price: 80.00,
      categoryId: 'pizza',
      calories: 320,
      prepTime: 18,
      order: 9,
      allergens: ['gluten', 'dairy']
    },
    {
      id: '10',
      name: 'Mantarlı Beyaz Peynirli Pizza',
      description: 'Taze mantar, ezine peyniri ve roka.',
      price: 90.00,
      categoryId: 'pizza',
      calories: 350,
      prepTime: 18,
      order: 10,
      allergens: ['gluten', 'dairy']
    },
    
    // Makarnalar
    {
      id: '11',
      name: 'Deniz Mahsullü Linguine',
      description: 'Karides, midye ve kalamar ile.',
      price: 120.00,
      categoryId: 'pasta',
      calories: 480,
      prepTime: 20,
      order: 11,
      allergens: ['gluten', 'seafood']
    },
    {
      id: '12',
      name: 'Kuzu Etli Ravioli',
      description: 'El yapımı ravioli, kuzu eti dolgusu, yoğurtlu sos.',
      price: 110.00,
      categoryId: 'pasta',
      calories: 500,
      prepTime: 25,
      order: 12,
      allergens: ['gluten', 'dairy', 'eggs']
    },
    {
      id: '13',
      name: 'Trüf Mantarlı Tagliatelle',
      description: 'Krema ve siyah trüf mantarıyla.',
      price: 130.00,
      categoryId: 'pasta',
      calories: 450,
      prepTime: 18,
      order: 13,
      allergens: ['gluten', 'dairy']
    },
    {
      id: '14',
      name: 'Domates ve Fesleğenli Penne',
      description: 'Anadolu zeytinyağı dokunuşlu klasik sos.',
      price: 75.00,
      categoryId: 'pasta',
      calories: 400,
      prepTime: 15,
      order: 14,
      allergens: ['gluten']
    },
    {
      id: '15',
      name: 'Gluten Izgara Sebzeli Spaghetti',
      description: 'Közlenmiş sebzeler ve sarımsaklı zeytinyağı.',
      price: 70.00,
      categoryId: 'pasta',
      calories: 380,
      prepTime: 18,
      order: 15,
      allergens: ['gluten']
    },
    
    // Ana Yemekler
    {
      id: '16',
      name: 'Kuzu İncik',
      description: 'Düşük ısıda pişirilmiş incik, patates püresi eşliğinde.',
      price: 180.00,
      categoryId: 'mains',
      calories: 600,
      prepTime: 40,
      order: 16,
      allergens: []
    },
    {
      id: '17',
      name: 'Fırında Levrek',
      description: 'Kekik ve limon sosuyla taş fırında.',
      price: 140.00,
      categoryId: 'mains',
      calories: 350,
      prepTime: 25,
      order: 17,
      allergens: ['seafood']
    },
    {
      id: '18',
      name: 'Dana Madalyon',
      description: 'Izgara dana fileto, demiglace sos.',
      price: 160.00,
      categoryId: 'mains',
      calories: 550,
      prepTime: 30,
      order: 18,
      allergens: []
    },
    {
      id: '19',
      name: 'Izgara Kuzu Pirzola',
      description: 'Marine edilmiş pirzola, köz patlıcan püresiyle.',
      price: 150.00,
      categoryId: 'mains',
      calories: 500,
      prepTime: 25,
      order: 19,
      allergens: []
    },
    {
      id: '20',
      name: 'Tandır Tavuk',
      description: 'Yavaş pişirilmiş tavuk, bulgur pilavı ve yoğurt sos.',
      price: 120.00,
      categoryId: 'mains',
      calories: 420,
      prepTime: 35,
      order: 20,
      allergens: ['dairy']
    },
    
    // Tatlılar
    {
      id: '21',
      name: 'Baklava Trio',
      description: 'Fıstıklı, cevizli ve kaymaklı küçük porsiyon baklava.',
      price: 60.00,
      categoryId: 'desserts',
      calories: 280,
      prepTime: 5,
      order: 21,
      allergens: ['gluten', 'nuts', 'dairy']
    },
    {
      id: '22',
      name: 'İncir Tatlısı',
      description: 'Ceviz dolgulu kuru incir, kaymak ile.',
      price: 50.00,
      categoryId: 'desserts',
      calories: 250,
      prepTime: 8,
      order: 22,
      allergens: ['nuts', 'dairy']
    },
    {
      id: '23',
      name: 'Sütlaç Brûlée',
      description: 'Karamelize üst katmanlı geleneksel sütlaç.',
      price: 45.00,
      categoryId: 'desserts',
      calories: 220,
      prepTime: 10,
      order: 23,
      allergens: ['dairy']
    },
    {
      id: '24',
      name: 'Künefe',
      description: 'Tel kadayıf içinde eriyen peynir, şerbetle.',
      price: 55.00,
      categoryId: 'desserts',
      calories: 400,
      prepTime: 20,
      order: 24,
      allergens: ['gluten', 'dairy']
    },
    {
      id: '25',
      name: 'Sakızlı Muhallebi',
      description: 'Sakız aromalı muhallebi, fıstık ve meyve ile.',
      price: 40.00,
      categoryId: 'desserts',
      calories: 200,
      prepTime: 10,
      order: 25,
      allergens: ['dairy']
    },
    
    // İçecekler
    {
      id: '26',
      name: 'Şalgam Suyu',
      description: 'Adana usulü, acılı veya acısız.',
      price: 15.00,
      categoryId: 'beverages',
      calories: 30,
      prepTime: 2,
      order: 26,
      allergens: []
    },
    {
      id: '27',
      name: 'Ev Yapımı Ayran',
      description: 'Bakır kaplarda köpüklü servis.',
      price: 12.00,
      categoryId: 'beverages',
      calories: 90,
      prepTime: 3,
      order: 27,
      allergens: ['dairy']
    },
    {
      id: '28',
      name: 'Nar Şerbeti',
      description: 'Osmanlı usulü, baharatlarla tatlandırılmış.',
      price: 18.00,
      categoryId: 'beverages',
      calories: 70,
      prepTime: 2,
      order: 28,
      allergens: []
    },
    {
      id: '29',
      name: 'Demirhindi Şerbeti',
      description: 'Ekşimsi ferahlatıcı geleneksel içecek.',
      price: 16.00,
      categoryId: 'beverages',
      calories: 60,
      prepTime: 2,
      order: 29,
      allergens: []
    },
    {
      id: '30',
      name: 'Kızılcık Şerbeti',
      description: 'Soğuk servis edilen doğal şerbet.',
      price: 14.00,
      categoryId: 'beverages',
      calories: 50,
      prepTime: 2,
      order: 30,
      allergens: []
    },
    {
      id: '31',
      name: 'Taze Sıkma Portakal Suyu',
      description: 'Günlük taze sıkılmış.',
      price: 20.00,
      categoryId: 'beverages',
      calories: 110,
      prepTime: 3,
      order: 31,
      allergens: []
    },
    {
      id: '32',
      name: 'Ev Yapımı Limonata',
      description: 'Naneli ve ferahlatıcı.',
      price: 15.00,
      categoryId: 'beverages',
      calories: 80,
      prepTime: 3,
      order: 32,
      allergens: []
    },
    {
      id: '33',
      name: 'Taze Nane-Soğuk Çay',
      description: 'Çay, nane ve limon karışımı.',
      price: 12.00,
      categoryId: 'beverages',
      calories: 40,
      prepTime: 4,
      order: 33,
      allergens: []
    },
    {
      id: '34',
      name: 'Türk Kahvesi',
      description: 'Bakır cezvede, lokum eşliğinde.',
      price: 25.00,
      categoryId: 'beverages',
      calories: 20,
      prepTime: 5,
      order: 34,
      allergens: []
    },
    {
      id: '35',
      name: 'Menengiç Kahvesi',
      description: 'Sütlü ve aromatik yöresel kahve.',
      price: 30.00,
      categoryId: 'beverages',
      calories: 60,
      prepTime: 5,
      order: 35,
      allergens: []
    },
    {
      id: '36',
      name: 'Dibek Kahvesi',
      description: 'Yoğun aromalı, taş dibekte öğütülmüş.',
      price: 28.00,
      categoryId: 'beverages',
      calories: 25,
      prepTime: 5,
      order: 36,
      allergens: []
    },
    {
      id: '37',
      name: 'Demleme Rize Çayı',
      description: 'İnce belli bardakta, geleneksel servis.',
      price: 8.00,
      categoryId: 'beverages',
      calories: 0,
      prepTime: 5,
      order: 37,
      allergens: []
    },
    {
      id: '38',
      name: 'Bitki Çayları',
      description: 'Ihlamur, adaçayı, kuşburnu, papatya.',
      price: 10.00,
      categoryId: 'beverages',
      calories: 5,
      prepTime: 5,
      order: 38,
      allergens: []
    },
    {
      id: '39',
      name: 'Nostaljik Gazoz',
      description: 'Cam şişede, meyve aromalı yerli gazoz.',
      price: 18.00,
      categoryId: 'beverages',
      calories: 120,
      prepTime: 1,
      order: 39,
      allergens: []
    },
    {
      id: '40',
      name: 'Şarap Seçkisi',
      description: 'Yerli bağlardan kırmızı, beyaz, roze.',
      price: 45.00,
      categoryId: 'beverages',
      calories: 150,
      prepTime: 1,
      order: 40,
      allergens: ['sulfites']
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
