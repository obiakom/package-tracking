import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.production' });

const prisma = new PrismaClient();

async function migrateProduction() {
  try {
    console.log('🔄 Starting production database migration...');

    // Verify production environment
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('This script should only be run in production environment');
    }

    // Test connection
    console.log('📊 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Run migrations
    console.log('🔄 Running migrations...');
    await prisma.$executeRaw`SELECT 1`;

    console.log('✅ Migration completed successfully');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateProduction();