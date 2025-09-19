import { PrismaClient } from '@prisma/client'
import { restaurant, categories, menuItems } from '../src/data/menu'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create restaurant
  const createdRestaurant = await prisma.restaurant.upsert({
    where: { id: restaurant.id },
    update: {},
    create: {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      logo: restaurant.logo,
      coverImage: restaurant.coverImage,
      address: restaurant.address,
      phone: restaurant.phone,
      email: restaurant.email,
      website: restaurant.website,
      instagram: restaurant.socialMedia?.instagram,
      facebook: restaurant.socialMedia?.facebook,
      twitter: restaurant.socialMedia?.twitter,
      currency: restaurant.currency,
      language: restaurant.language,
    }
  })

  console.log('✅ Restaurant created:', createdRestaurant.name)

  // Create operating hours
  for (const [day, hours] of Object.entries(restaurant.operatingHours)) {
    await prisma.restaurantOperatingHours.upsert({
      where: {
        restaurantId_dayOfWeek: {
          restaurantId: createdRestaurant.id,
          dayOfWeek: day
        }
      },
      update: {},
      create: {
        restaurantId: createdRestaurant.id,
        dayOfWeek: day,
        openTime: hours.open,
        closeTime: hours.close,
        isClosed: hours.isClosed || false
      }
    })
  }

  console.log('✅ Operating hours created')

  // Create categories
  for (const category of categories) {
    await prisma.menuCategory.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        restaurantId: createdRestaurant.id,
        name: category.name,
        description: category.description,
        icon: category.icon,
        order: category.order
      }
    })
  }

  console.log('✅ Categories created')

  // Create allergens
  const allergenNames = new Set<string>()
  menuItems.forEach(item => {
    if (item.allergens) {
      item.allergens.forEach(allergen => allergenNames.add(allergen))
    }
  })

  for (const allergenName of allergenNames) {
    await prisma.allergen.upsert({
      where: { name: allergenName },
      update: {},
      create: { name: allergenName }
    })
  }

  console.log('✅ Allergens created')

  // Create menu items
  for (const item of menuItems) {
    const createdItem = await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        restaurantId: createdRestaurant.id,
        categoryId: item.category,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        calories: item.calories,
        prepTime: item.prepTime,
        isVegetarian: item.isVegetarian || false,
        isVegan: item.isVegan || false,
        isSpicy: item.isSpicy || false,
        isPopular: item.isPopular || false,
        isGlutenFree: item.isGlutenFree || false,
        isDairyFree: item.isDairyFree || false,
      }
    })

    // Create allergen relationships
    if (item.allergens && item.allergens.length > 0) {
      for (const allergenName of item.allergens) {
        const allergen = await prisma.allergen.findUnique({
          where: { name: allergenName }
        })
        
        if (allergen) {
          await prisma.menuItemAllergen.upsert({
            where: {
              menuItemId_allergenId: {
                menuItemId: createdItem.id,
                allergenId: allergen.id
              }
            },
            update: {},
            create: {
              menuItemId: createdItem.id,
              allergenId: allergen.id
            }
          })
        }
      }
    }
  }

  console.log('✅ Menu items created')
  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
