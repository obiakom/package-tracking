import { prisma } from '../src/lib/prisma';
import { hash } from 'bcryptjs';

async function createAdminUser() {
  try {
    const hashedPassword = await hash('admin123', 10);
    
    const adminUser = await prisma.user.upsert({
      where: {
        email: 'admin@stateglobal.com'
      },
      update: {
        password: hashedPassword
      },
      create: {
        email: 'admin@stateglobal.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      }
    });

    console.log('Admin user created:', adminUser);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();