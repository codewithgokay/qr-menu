import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/menu-items/[id] - Get a specific menu item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
        allergens: {
          include: {
            allergen: true
          }
        }
      }
    })

    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 })
    }

    // Transform the data
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

    return NextResponse.json(transformedItem)
  } catch (error) {
    console.error('Error fetching menu item:', error)
    return NextResponse.json({ error: 'Failed to fetch menu item' }, { status: 500 })
  }
}

// PUT /api/menu-items/[id] - Update a menu item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, price, category, image, imagePublicId, allergens, ...otherFields } = body

    // Handle allergens efficiently with batch operations
    if (allergens && allergens.length > 0) {
      // Delete existing allergens
      await prisma.menuItemAllergen.deleteMany({
        where: { menuItemId: id }
      })

      // Batch upsert allergens
      const allergenUpserts = allergens.map((allergenName: string) =>
        prisma.allergen.upsert({
          where: { name: allergenName },
          update: {},
          create: { name: allergenName }
        })
      )
      
      const upsertedAllergens = await Promise.all(allergenUpserts)
      
      // Batch create menu item allergen relationships
      const menuItemAllergenCreates = upsertedAllergens.map(allergen =>
        prisma.menuItemAllergen.create({
          data: {
            menuItemId: id,
            allergenId: allergen.id
          }
        })
      )
      
      await Promise.all(menuItemAllergenCreates)
    } else {
      // Only delete if no allergens provided
      await prisma.menuItemAllergen.deleteMany({
        where: { menuItemId: id }
      })
    }

    // Update the menu item
    const menuItem = await prisma.menuItem.update({
      where: { id: id },
      data: {
        categoryId: category,
        name,
        description,
        price: parseFloat(price),
        image,
        imagePublicId,
        ...otherFields
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

    return NextResponse.json(transformedItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 })
  }
}

// DELETE /api/menu-items/[id] - Soft delete a menu item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Check if menu item exists and soft delete in one operation
    const result = await prisma.menuItem.updateMany({
      where: { 
        id,
        isActive: true // Only update if currently active
      },
      data: { isActive: false }
    })
    
    if (result.count === 0) {
      return NextResponse.json({ 
        error: 'Menu item not found or already deleted' 
      }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Menu item deleted successfully' })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    
    return NextResponse.json({ 
      error: 'Failed to delete menu item',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
