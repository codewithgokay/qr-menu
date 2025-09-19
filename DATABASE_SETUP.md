# Database Setup Guide for Vercel Deployment

## PostgreSQL Database Options for Vercel

### Option 1: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string
4. Add to Vercel environment variables as `DATABASE_URL`

### Option 2: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Add to Vercel environment variables as `DATABASE_URL`

### Option 3: PlanetScale
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get the connection string
4. Add to Vercel environment variables as `DATABASE_URL`

## Environment Variables

Add these to your Vercel project settings:

```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
ADMIN_PASSWORD=your_secure_password_here
```

## Local Development Setup

1. Install PostgreSQL locally or use Docker
2. Create a `.env.local` file:
```
DATABASE_URL="postgresql://username:password@localhost:5432/qr_menu_db?schema=public"
ADMIN_PASSWORD="your_secure_password_here"
```

## Database Migration

After setting up the database:

1. Run: `npx prisma migrate dev --name init`
2. Run: `npx prisma generate`
3. Run: `npx prisma db seed` (if you have seed data)

## Vercel Deployment

1. Add environment variables in Vercel dashboard
2. Deploy your project
3. Run migration: `npx prisma migrate deploy` (in Vercel functions or locally)

## Testing

- Check database connection in Vercel functions
- Verify admin panel works with real database
- Test CRUD operations
