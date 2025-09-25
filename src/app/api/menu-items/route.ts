import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { menuItems } from '@/data/menu'

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

    let transformedItems
    let dataSource = ''

    if (dbMenuItems.length > 0) {
      // Database has data - use it but replace Cloudinary URLs with working images
      console.log(`🔄 API: Found ${dbMenuItems.length} items in database, replacing Cloudinary URLs with working images`);
      
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
          allergens: item.allergens.map(a => a.allergen.name),
          isVegetarian: item.isVegetarian || false,
          isVegan: item.isVegan || false,
          isSpicy: item.isSpicy || false,
          isPopular: item.isPopular || false,
          isGlutenFree: item.isGlutenFree || false,
          isDairyFree: item.isDairyFree || false,
          calories: item.calories || 0,
          prepTime: item.prepTime || 0,
          order: item.order || 0
        }
      })
      dataSource = 'database'
    } else {
      // No database data - use static fallback
      console.log('🔄 API: No database data found, using static fallback data');
      
      transformedItems = menuItems.map((item, index) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        imagePublicId: item.imagePublicId || null,
        allergens: item.allergens || [],
        isVegetarian: item.isVegetarian || false,
        isVegan: item.isVegan || false,
        isSpicy: item.isSpicy || false,
        isPopular: item.isPopular || false,
        isGlutenFree: item.isGlutenFree || false,
        isDairyFree: item.isDairyFree || false,
        calories: item.calories || 0,
        prepTime: item.prepTime || 0,
        order: index + 1
      }))
      dataSource = 'static'
    }

    console.log(`✅ API: Returning ${transformedItems.length} menu items from ${dataSource} with working images`);
    
    const response = NextResponse.json(transformedItems)
    
    // Add caching headers for better performance
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600, max-age=60')
    response.headers.set('ETag', `"menu-items-${dataSource}-${Date.now()}"`)
    
    return response
  } catch (error) {
    console.error('❌ API: Error fetching menu items:', error)
    
    // Fallback to static data on error
    console.log('🔄 API: Database error, falling back to static data');
    const transformedItems = menuItems.map((item, index) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      imagePublicId: item.imagePublicId || null,
      allergens: item.allergens || [],
      isVegetarian: item.isVegetarian || false,
      isVegan: item.isVegan || false,
      isSpicy: item.isSpicy || false,
      isPopular: item.isPopular || false,
      isGlutenFree: item.isGlutenFree || false,
      isDairyFree: item.isDairyFree || false,
      calories: item.calories || 0,
      prepTime: item.prepTime || 0,
      order: index + 1
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
