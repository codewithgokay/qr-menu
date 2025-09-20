import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Function to ensure channel_binding=require is added to the connection string
function getConnectionString() {
  const originalUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL
  
  if (!originalUrl) {
    throw new Error('POSTGRES_URL or DATABASE_URL environment variable is not set')
  }

  // If the URL already contains channel_binding, return as is
  if (originalUrl.includes('channel_binding=')) {
    return originalUrl
  }

  // Add channel_binding=require to the connection string
  const separator = originalUrl.includes('?') ? '&' : '?'
  return `${originalUrl}${separator}channel_binding=require`
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getConnectionString()
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
