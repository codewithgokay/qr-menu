import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { menuItems } from '@/data/menu'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET /api/menu-items - Get all menu items
export async function GET() {
  try {
    // Try to fetch from database first
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
        order: true
      },
      orderBy: { order: 'asc' }
    })

    let transformedItems

    if (dbMenuItems.length > 0) {
      // Database has data - use it but replace Cloudinary URLs with working images

      transformedItems = dbMenuItems.map(item => {
        let workingImage = item.image
        let workingPublicId = item.imagePublicId

        // Fix Cloudinary public ID paths - remove duplicate folder structure
        if (item.imagePublicId && item.imagePublicId.includes('qr-menu/menu-items/qr-menu/menu-items/')) {
          // Fix the duplicate path issue
          workingPublicId = item.imagePublicId.replace('qr-menu/menu-items/qr-menu/menu-items/', 'qr-menu/menu-items/')
          // Generate correct Cloudinary URL
          workingImage = `https://res.cloudinary.com/dmudabrcn/image/upload/v1/${workingPublicId}`
        } else if (item.imagePublicId && item.image && !item.image.includes('res.cloudinary.com')) {
          // Generate Cloudinary URL if we have public ID but no full URL
          workingImage = `https://res.cloudinary.com/dmudabrcn/image/upload/v1/${item.imagePublicId}`
        }
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.categoryId,
          image: workingImage,
          imagePublicId: workingPublicId,
          order: item.order || 0
        }
      })
    } else {
      // No database data - use static fallback

      transformedItems = menuItems.map((item, index) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        imagePublicId: item.imagePublicId || null,
        order: index + 1
      }))
    }


    const response = NextResponse.json(transformedItems)

    // Disable all forms of caching for immediate updates
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Last-Modified', new Date().toUTCString())
    response.headers.set('ETag', `"${Date.now()}"`)

    return response
  } catch (error) {
    console.error('Error fetching menu items:', error)

    // Fallback to static data on error
    const transformedItems = menuItems.map((item, index) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      imagePublicId: item.imagePublicId || null,
      order: index + 1
    }))

    return NextResponse.json(transformedItems)
  }
}

// POST /api/menu-items - Create a new menu item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, category, image, imagePublicId, ...otherFields } = body

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
        ...otherFields
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

    return NextResponse.json(transformedItem, { status: 201 })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json({
      error: 'Database not available. Please ensure your database is properly configured.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
