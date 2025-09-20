import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/setup - Setup database and seed data
export async function POST() {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Check if restaurant exists
    const restaurant = await prisma.restaurant.findFirst()
    console.log('Restaurant found:', restaurant?.name || 'None')
    
    // Check menu items count
    const menuItemsCount = await prisma.menuItem.count()
    console.log('Menu items count:', menuItemsCount)
    
    // Check categories count
    const categoriesCount = await prisma.menuCategory.count()
    console.log('Categories count:', categoriesCount)
    
    await prisma.$disconnect()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        restaurant: restaurant?.name || 'None',
        menuItems: menuItemsCount,
        categories: categoriesCount
      }
    })
  } catch (error) {
    console.error('❌ Database setup error:', error)
    await prisma.$disconnect()
    
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
