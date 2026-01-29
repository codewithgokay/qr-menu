
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Starting targeted content update...')

  try {
    const restaurant = await prisma.restaurant.findFirst()

    if (!restaurant) {
      console.log('❌ No restaurant found.')
      return
    }

    // 1. Update Instagram
    console.log('📱 Updating Instagram...')
    await prisma.restaurant.update({
      where: { id: restaurant.id },
      data: {
        socialMedia: {
          ...(restaurant.socialMedia as any || {}),
          instagram: 'republicanakkale' // No @ as requested/corrected
        }
      }
    })

    // 2. Update Hours for Specific Days (Perşembe, Cuma)
    // We use updateMany or upsert logic. 
    // Since we want to be safe, we'll try to update specific days if they exist.
    
    console.log('⏰ Updating Operating Hours...')

    const updates = [
      { day: 'Perşembe', close: '02:00' }, // Thursday
      { day: 'Cuma', close: '02:00' }      // Friday
    ]

    for (const update of updates) {
      // Try to find the record first
      const hourRecord = await prisma.restaurantOperatingHours.findUnique({
         where: {
            restaurantId_dayOfWeek: {
                restaurantId: restaurant.id,
                dayOfWeek: update.day
            }
         }
      })

      if (hourRecord) {
         await prisma.restaurantOperatingHours.update({
            where: { id: hourRecord.id },
            data: { closeTime: update.close }
         })
         console.log(`   ✅ Updated ${update.day} to close at ${update.close}`)
      } else {
         console.log(`   ⚠️ Could not find record for ${update.day}, skipping...`)
      }
    }

  } catch (error) {
    console.error('❌ Error updating data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
