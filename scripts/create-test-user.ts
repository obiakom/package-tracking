import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function createUser() {
  const hashedPassword = await hash('test123', 10);
  try {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();