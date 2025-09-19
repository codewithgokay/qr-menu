# Database Integration - QR Menu Project

This document explains the database integration that has been added to the QR Menu project.

## Overview

The project now uses a SQLite database with Prisma ORM instead of localStorage for data persistence. All menu items and categories are stored in the database and can be managed through the admin panel.

## Database Schema

### Tables

1. **restaurants** - Restaurant information
2. **restaurant_operating_hours** - Operating hours for each day
3. **menu_categories** - Menu categories (appetizers, mains, etc.)
4. **menu_items** - Individual menu items
5. **allergens** - Allergen information
6. **menu_item_allergens** - Many-to-many relationship between items and allergens

### Key Features

- **Soft Deletes**: Items and categories are marked as inactive instead of being permanently deleted
- **Allergen Management**: Allergens are stored separately and linked to menu items
- **Category Ordering**: Categories have an order field for custom sorting
- **Restaurant Support**: Multi-restaurant support (currently configured for single restaurant)

## API Endpoints

### Menu Items
- `GET /api/menu-items` - Get all active menu items
- `GET /api/menu-items/[id]` - Get specific menu item
- `POST /api/menu-items` - Create new menu item
- `PUT /api/menu-items/[id]` - Update menu item
- `DELETE /api/menu-items/[id]` - Soft delete menu item

### Categories
- `GET /api/categories` - Get all active categories
- `GET /api/categories/[id]` - Get specific category
- `POST /api/categories` - Create new category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Soft delete category

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment
Create a `.env` file with:
```
DATABASE_URL="file:./dev.db"
```

### 3. Initialize Database
```bash
# Generate Prisma client
npx prisma generate

# Create and migrate database
npx prisma migrate dev --name init

# Seed the database with initial data
npm run db:seed
```

### 4. Development Commands
```bash
# Start development server
npm run dev

# Reset database and reseed
npm run db:reset

# View database in Prisma Studio
npx prisma studio
```

## Admin Panel Features

The admin panel now provides full CRUD operations:

### Menu Items
- ✅ Add new menu items with all details
- ✅ Edit existing menu items
- ✅ Delete menu items (soft delete)
- ✅ Image upload support
- ✅ Allergen management
- ✅ Dietary flags (vegetarian, vegan, etc.)

### Categories
- ✅ Add new categories
- ✅ Edit category details
- ✅ Delete categories (with validation)
- ✅ Drag-and-drop reordering
- ✅ Icon and description management

## Data Migration

The existing static data from `src/data/menu.ts` has been migrated to the database through the seeding script. The admin panel now loads data from the API instead of localStorage.

## Benefits

1. **Persistence**: Data survives server restarts and deployments
2. **Scalability**: Easy to add new features and relationships
3. **Data Integrity**: Foreign key constraints and validation
4. **Backup**: Database can be easily backed up and restored
5. **Multi-user**: Multiple admins can work simultaneously
6. **Audit Trail**: Created/updated timestamps for all records

## File Structure

```
src/
├── app/api/
│   ├── menu-items/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── categories/
│       ├── route.ts
│       └── [id]/route.ts
├── lib/
│   ├── api.ts          # API client functions
│   ├── prisma.ts       # Prisma client instance
│   └── seed.ts         # Database seeding script
└── prisma/
    ├── schema.prisma   # Database schema
    └── migrations/     # Database migrations
```

## Troubleshooting

### Database Issues
- If you encounter database errors, try resetting: `npm run db:reset`
- Check the database file exists: `ls -la dev.db`
- View database contents: `npx prisma studio`

### API Issues
- Check if the development server is running: `npm run dev`
- Test API endpoints: `curl http://localhost:3000/api/menu-items`
- Check browser console for errors

### Admin Panel Issues
- Ensure you're accessing with `?admin=true` parameter
- Check authentication status in localStorage
- Verify API endpoints are responding correctly

## Next Steps

1. **Production Setup**: Configure production database (PostgreSQL recommended)
2. **Image Storage**: Implement proper image storage (AWS S3, Cloudinary, etc.)
3. **Authentication**: Add proper user authentication system
4. **Backup Strategy**: Implement automated database backups
5. **Analytics**: Add menu item view/order tracking
6. **Multi-language**: Support multiple languages for menu items
