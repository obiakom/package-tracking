import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function backupDatabase() {
  try {
    // Fetch all data
    const [users, packages, updates] = await Promise.all([
      prisma.user.findMany(),
      prisma.package.findMany(),
      prisma.trackingUpdate.findMany()
    ]);

    // Create backup object
    const backup = {
      timestamp: new Date().toISOString(),
      data: {
        users: users.map(({ password, ...user }) => user), // Exclude sensitive data
        packages,
        updates
      }
    };

    // Save to file
    const fileName = `backup-${backup.timestamp.split('T')[0]}.json`;
    writeFileSync(
      join(process.cwd(), 'backups', fileName),
      JSON.stringify(backup, null, 2)
    );

    console.log(`Backup created successfully: ${fileName}`);
  } catch (error) {
    console.error('Backup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

backupDatabase();