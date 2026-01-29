import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database update...')

  try {
    // Check if restaurant exists
    const existingRestaurant = await prisma.restaurant.findFirst()

    if (existingRestaurant) {
      console.log('🔄 Updating existing restaurant...')

      // Update restaurant details (socials)
      await prisma.restaurant.update({
        where: { id: existingRestaurant.id },
        data: {
          instagram: '@republicanakkale',
          twitter: '@republicpub',
          facebook: 'Republic Pub',
        }
      })

      // Update Hours: Delete old ones and create new ones
      await prisma.restaurantOperatingHours.deleteMany({
        where: { restaurantId: existingRestaurant.id }
      })

      const hoursData = [
        { dayOfWeek: "Pazartesi", openTime: "12:00", closeTime: "00:00" },
        { dayOfWeek: "Salı", openTime: "12:00", closeTime: "00:00" },
        { dayOfWeek: "Çarşamba", openTime: "12:00", closeTime: "00:00" },
        { dayOfWeek: "Perşembe", openTime: "12:00", closeTime: "00:00" },
        { dayOfWeek: "Cuma", openTime: "12:00", closeTime: "02:00" },
        { dayOfWeek: "Cumartesi", openTime: "12:00", closeTime: "02:00" },
        { dayOfWeek: "Pazar", openTime: "12:00", closeTime: "00:00" }
      ]

      await prisma.restaurantOperatingHours.createMany({
        data: hoursData.map(h => ({
          ...h,
          restaurantId: existingRestaurant.id
        }))
      })

      console.log('✅ Restaurant data updated successfully')
    } else {
      console.log('⚠️ No restaurant found to update. Please run full seed if this is a fresh install.')
    }

  } catch (error) {
    console.warn('Error updating data:', error)
  }

  console.log('🎉 Database update completed!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })