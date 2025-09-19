import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/menu-items - Get all menu items
export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: { isActive: true },
      include: {
        category: true,
        allergens: {
          include: {
            allergen: true
          }
        }
      },
      orderBy: { order: 'asc' }
    })

    // Transform the data to match the expected format
    const transformedItems = menuItems.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category.id,
      image: item.image,
      allergens: item.allergens.map(a => a.allergen.name),
      isVegetarian: item.isVegetarian,
      isVegan: item.isVegan,
      isSpicy: item.isSpicy,
      isPopular: item.isPopular,
      isGlutenFree: item.isGlutenFree,
      isDairyFree: item.isDairyFree,
      calories: item.calories,
      prepTime: item.prepTime
    }))

    return NextResponse.json(transformedItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 })
  }
}

// POST /api/menu-items - Create a new menu item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, category, image, allergens, ...otherFields } = body

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
      allergens: menuItem.allergens.map(a => a.allergen.name),
      isVegetarian: menuItem.isVegetarian,
      isVegan: menuItem.isVegan,
      isSpicy: menuItem.isSpicy,
      isPopular: menuItem.isPopular,
      isGlutenFree: menuItem.isGlutenFree,
      isDairyFree: menuItem.isDairyFree,
      calories: menuItem.calories,
      prepTime: menuItem.prepTime
    }

    return NextResponse.json(transformedItem, { status: 201 })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 })
  }
}
