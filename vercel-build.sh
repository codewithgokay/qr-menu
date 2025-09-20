#!/bin/bash

# Vercel build script for database migration
echo "🚀 Starting Vercel build process..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Test database connection
echo "🔍 Testing database connection..."
npx prisma db push --accept-data-loss

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"
