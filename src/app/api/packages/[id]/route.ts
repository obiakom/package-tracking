import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateTrackingNumber, handleApiError } from '@/lib/validation';

import { NextRequest } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const params = await context.params;
    validateTrackingNumber(params.id);
    const package_ = await prisma.package.findFirst({
      where: {
        trackingNumber: params.id
      },
      include: {
        trackingUpdates: {
          orderBy: {
            timestamp: 'desc'
          }
        }
      }
    });
    
    if (!package_) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(package_);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newPackage = await prisma.package.create({
      data: {
        trackingNumber: `TRK${Date.now()}`,
        status: 'Processing',
        description: body.description || '',
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
    
    return NextResponse.json(newPackage);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    );
  }
}