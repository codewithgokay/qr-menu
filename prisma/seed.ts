import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear all existing data first
  console.log('🗑️  Clearing existing data...')
  try {
    await prisma.menuItem.deleteMany()
    await prisma.menuCategory.deleteMany()
    await prisma.restaurantOperatingHours.deleteMany()
    await prisma.restaurant.deleteMany()
    console.log('✅ Data cleared successfully')
  } catch (error) {
    console.warn('Warning: Error while clearing data (might represent first run):', error)
  }

  console.log('🎉 Database cleared successfully (Ready for new project)!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })