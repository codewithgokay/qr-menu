import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { menuItems } from '@/data/menu'

// GET /api/menu-items - Get all menu items
export async function GET() {
  try {
    // Optimized query - fetch only essential data first
    const dbMenuItems = await prisma.menuItem.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        categoryId: true,
        image: true,
        imagePublicId: true,
        isVegetarian: true,
        isVegan: true,
        isSpicy: true,
        isPopular: true,
        isGlutenFree: true,
        isDairyFree: true,
        calories: true,
        prepTime: true,
        order: true,
        allergens: {
          include: {
            allergen: true
          }
        }
      },
      orderBy: { order: 'asc' }
    })

    // Transform the data to match the expected format
    const transformedItems = dbMenuItems.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.categoryId,
      image: item.image,
      imagePublicId: item.imagePublicId,
      allergens: item.allergens.map(a => a.allergen.name),
      isVegetarian: item.isVegetarian,
      isVegan: item.isVegan,
      isSpicy: item.isSpicy,
      isPopular: item.isPopular,
      isGlutenFree: item.isGlutenFree,
      isDairyFree: item.isDairyFree,
      calories: item.calories,
      prepTime: item.prepTime,
      order: item.order
    }))

    const response = NextResponse.json(transformedItems)
    
    // Add aggressive caching headers for better performance
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600, max-age=60')
    response.headers.set('ETag', `"menu-items-${Date.now()}"`)
    
    return response
  } catch (error) {
    console.error('Database error, falling back to static data:', error)
    
    // Fallback to static data when database is not available
    const transformedItems = menuItems.map((item, index) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      allergens: item.allergens || [],
      isVegetarian: item.isVegetarian || false,
      isVegan: item.isVegan || false,
      isSpicy: item.isSpicy || false,
      isPopular: item.isPopular || false,
      isGlutenFree: item.isGlutenFree || false,
      isDairyFree: item.isDairyFree || false,
      calories: item.calories || 0,
      prepTime: item.prepTime || 0,
      order: index + 1 // Use array index as order for static data
    }))

    return NextResponse.json(transformedItems)
  }
}

// POST /api/menu-items - Create a new menu item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, category, image, imagePublicId, allergens, ...otherFields } = body

    // First, get or create allergens
    const allergenIds = []
    if (allergens && allergens.length > 0) {
      for (const allergenName of allergens) {
        const allergen = await prisma.allergen.upsert({
          where: { name: allergenName },
          update: {},
          create: { name: allergenName }
        })
        allergenIds.push(allergen.id)
      }
    }

    // Get the first restaurant (assuming single restaurant for now)
    const restaurant = await prisma.restaurant.findFirst()
    if (!restaurant) {
      return NextResponse.json({ error: 'No restaurant found' }, { status: 400 })
    }

    // Create the menu item
    const menuItem = await prisma.menuItem.create({
      data: {
        restaurantId: restaurant.id,
        categoryId: category,
        name,
        description,
        price: parseFloat(price),
        image,
        imagePublicId,
        ...otherFields,
        allergens: {
          create: allergenIds.map(allergenId => ({
            allergenId
          }))
        }
      },
      include: {
        category: true,
        allergens: {
          include: {
            allergen: true
          }
        }
      }
    })

    // Transform the response
    const transformedItem = {
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      category: menuItem.category.id,
      image: menuItem.image,
      imagePublicId: menuItem.imagePublicId,
      allergens: menuItem.allergens.map(a => a.allergen.name),
      isVegetarian: menuItem.isVegetarian,
      isVegan: menuItem.isVegan,
      isSpicy: menuItem.isSpicy,
      isPopular: menuItem.isPopular,
      isGlutenFree: menuItem.isGlutenFree,
      isDairyFree: menuItem.isDairyFree,
      calories: menuItem.calories,
      prepTime: menuItem.prepTime,
      order: menuItem.order
    }

    return NextResponse.json(transformedItem, { status: 201 })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json({ 
      error: 'Database not available. Please ensure your database is properly configured.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
