import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/categories/reorder - Update category order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { categories } = body

    if (!Array.isArray(categories)) {
      return NextResponse.json({ error: 'Categories must be an array' }, { status: 400 })
    }

    // Update each category's order
    const updatePromises = categories.map((category: { id: string; order: number }) =>
      prisma.menuCategory.update({
        where: { id: category.id },
        data: { order: category.order }
      })
    )

    await Promise.all(updatePromises)

    return NextResponse.json({ message: 'Categories reordered successfully' })
  } catch (error) {
    console.error('Error reordering categories:', error)
    return NextResponse.json({ error: 'Failed to reorder categories' }, { status: 500 })
  }
}
