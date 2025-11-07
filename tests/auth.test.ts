import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '@/lib/prisma';
import { hash, compare } from 'bcryptjs';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/auth/login/route';

describe('Authentication', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'test123',
    role: 'ADMIN'
  };

  beforeAll(async () => {
    // Create a test user with hashed password
    const hashedPassword = await hash(testUser.password, 10);
    await prisma.user.create({
      data: {
        email: testUser.email,
        password: hashedPassword,
        role: testUser.role
      }
    });
  });

  afterAll(async () => {
    // Clean up test user
    await prisma.user.delete({
      where: { email: testUser.email }
    });
    await prisma.$disconnect();
  });

  it('should login successfully with correct credentials', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
      }),
    });

    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('token');
    expect(data.email).toBe(testUser.email);
    expect(data.role).toBe(testUser.role);
  });

  it('should fail with incorrect password', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: 'wrongpassword',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  it('should fail with non-existent user', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'nonexistent@example.com',
        password: 'anypassword',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });
});