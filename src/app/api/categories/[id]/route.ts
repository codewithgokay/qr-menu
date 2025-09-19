import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/categories/[id] - Get a specific category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const category = await prisma.menuCategory.findUnique({
      where: { id }
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Transform the data
    const transformedCategory = {
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      order: category.order
    }

    return NextResponse.json(transformedCategory)
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 })
  }
}

// PUT /api/categories/[id] - Update a category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, icon, order } = body

    const category = await prisma.menuCategory.update({
      where: { id },
      data: {
        name,
        description,
        icon,
        order
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

    return NextResponse.json(transformedCategory)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

// DELETE /api/categories/[id] - Soft delete a category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if category has menu items
    const menuItemsCount = await prisma.menuItem.count({
      where: { 
        categoryId: id,
        isActive: true
      }
    })

    if (menuItemsCount > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete category with active menu items' 
      }, { status: 400 })
    }

    await prisma.menuCategory.update({
      where: { id },
      data: { isActive: false }
    })

    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
