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
        category: true
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
    const { name, description, price, category, image, imagePublicId, order } = body

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
        order
      },
      include: {
        category: true
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
