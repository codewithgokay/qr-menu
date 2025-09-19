import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/menu-items/reorder - Update menu item order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Items must be an array' }, { status: 400 })
    }

    // Update each item's order
    const updatePromises = items.map((item: { id: string; order: number }) =>
      prisma.menuItem.update({
        where: { id: item.id },
        data: { order: item.order }
      })
    )

    await Promise.all(updatePromises)

    return NextResponse.json({ message: 'Menu items reordered successfully' })
  } catch (error) {
    console.error('Error reordering menu items:', error)
    return NextResponse.json({ error: 'Failed to reorder menu items' }, { status: 500 })
  }
}
