import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Function to ensure proper connection string for Neon database
function getConnectionString() {
  const originalUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL
  
  if (!originalUrl) {
    throw new Error('POSTGRES_URL or DATABASE_URL environment variable is not set')
  }

  // Parse the URL to add necessary parameters
  const url = new URL(originalUrl)
  
  // Add Neon-specific parameters
  const params = new URLSearchParams(url.search)
  
  // Add sslmode=require if not present
  if (!params.has('sslmode')) {
    params.set('sslmode', 'require')
  }
  
  // Add connection timeout for Neon (handles cold starts)
  if (!params.has('connect_timeout')) {
    params.set('connect_timeout', '10')
  }
  
  // Add channel_binding=require for Neon compatibility
  if (!params.has('channel_binding')) {
    params.set('channel_binding', 'require')
  }
  
  // Add connection pooling parameters for serverless
  if (!params.has('pgbouncer')) {
    params.set('pgbouncer', 'true')
  }
  
  // Reconstruct the URL
  url.search = params.toString()
  return url.toString()
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getConnectionString()
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
