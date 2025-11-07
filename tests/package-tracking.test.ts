import { expect, test, describe, beforeAll, afterAll } from 'vitest';
import { prisma } from '../src/lib/prisma';

describe('Package Tracking System', () => {
  // Clear the database before tests
  beforeAll(async () => {
    await prisma.trackingUpdate.deleteMany();
    await prisma.package.deleteMany();
    await prisma.user.deleteMany();
  });

  test('Create new package', async () => {
    const newPackage = await prisma.package.create({
      data: {
        trackingNumber: `TRK${Date.now()}`,
        status: 'Processing',
        description: 'Test Package',
        currentLocation: 'Sorting Facility',
        trackingUpdates: {
          create: {
            status: 'Package Received',
            location: 'Sorting Facility'
          }
        }
      },
      include: {
        trackingUpdates: true
      }
    });

    expect(newPackage.trackingNumber).toMatch(/^TRK\d+$/);
    expect(newPackage.status).toBe('Processing');
    expect(newPackage.trackingUpdates).toHaveLength(1);
  });

  test('Retrieve package by tracking number', async () => {
    // Create a package first
    const trackingNumber = `TRK${Date.now()}`;
    await prisma.package.create({
      data: {
        trackingNumber,
        status: 'In Transit',
        description: 'Test Package',
        currentLocation: 'Test Location',
        trackingUpdates: {
          create: {
            status: 'In Transit',
            location: 'Test Location'
          }
        }
      }
    });

    // Retrieve the package
    const package_ = await prisma.package.findFirst({
      where: {
        trackingNumber
      },
      include: {
        trackingUpdates: true
      }
    });

    expect(package_).not.toBeNull();
    expect(package_?.trackingNumber).toBe(trackingNumber);
    expect(package_?.trackingUpdates).toHaveLength(1);
  });

  test('Add tracking update', async () => {
    // Create a package
    const newPackage = await prisma.package.create({
      data: {
        trackingNumber: `TRK${Date.now()}`,
        status: 'Processing',
        description: 'Test Package',
        currentLocation: 'Initial Location'
      }
    });

    // Add a tracking update
    const update = await prisma.trackingUpdate.create({
      data: {
        status: 'In Transit',
        location: 'New Location',
        packageId: newPackage.id
      }
    });

    // Update package status and location
    await prisma.package.update({
      where: {
        id: newPackage.id
      },
      data: {
        status: update.status,
        currentLocation: update.location
      }
    });

    // Retrieve updated package
    const updatedPackage = await prisma.package.findUnique({
      where: {
        id: newPackage.id
      },
      include: {
        trackingUpdates: true
      }
    });

    expect(updatedPackage?.status).toBe('In Transit');
    expect(updatedPackage?.currentLocation).toBe('New Location');
    expect(updatedPackage?.trackingUpdates).toHaveLength(1);
  });

  // Clean up after tests
  afterAll(async () => {
    await prisma.trackingUpdate.deleteMany();
    await prisma.package.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });
});