import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { categories } from '@/data/menu'

// GET /api/categories - Get all categories
export async function GET() {
  try {
    // Try to fetch from database first
    const dbCategories = await prisma.menuCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    // Transform the data to match the expected format
    const transformedCategories = dbCategories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      order: category.order
    }))

    const response = NextResponse.json(transformedCategories)
    
    // Disable caching for immediate updates
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Database error, falling back to static data:', error)
    
    // Fallback to static data when database is not available
    const transformedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      order: category.order
    }))

    return NextResponse.json(transformedCategories)
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, icon, order } = body

    // Get the first restaurant (assuming single restaurant for now)
    const restaurant = await prisma.restaurant.findFirst()
    if (!restaurant) {
      return NextResponse.json({ error: 'No restaurant found' }, { status: 400 })
    }

    // Get the next order number if not provided
    let categoryOrder = order
    if (categoryOrder === undefined) {
      const lastCategory = await prisma.menuCategory.findFirst({
        where: { restaurantId: restaurant.id },
        orderBy: { order: 'desc' }
      })
      categoryOrder = lastCategory ? lastCategory.order + 1 : 1
    }

    const category = await prisma.menuCategory.create({
      data: {
        restaurantId: restaurant.id,
        name,
        description,
        icon,
        order: categoryOrder
      }
    })

    // Transform the response
    const transformedCategory = {
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      order: category.order
    }

    return NextResponse.json(transformedCategory, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
