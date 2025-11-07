import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateRequiredFields, handleApiError } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    if (!prisma) {
      throw new Error('Database connection failed');
    }

    const body = await request.json();
    
    // Validate all required fields
    validateRequiredFields(body, [
      'senderName',
      'senderAddress',
      'recipientName',
      'recipientAddress',
      'packageDescription',
      'weight'
    ]);

    // Generate a unique tracking number
    const trackingNumber = `TRK${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create the shipment with a transaction to ensure both package and update are created
    const newShipment = await prisma.$transaction(async (tx: Omit<typeof prisma, "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends">) => {
      const package_ = await tx.package.create({
        data: {
          trackingNumber,
          status: 'Processing',
          description: `${body.packageDescription} (${body.weight}kg)`,
          currentLocation: 'Sorting Facility',
        }
      });

      const update = await tx.trackingUpdate.create({
        data: {
          status: 'Package Received',
          location: 'Sorting Facility',
          notes: `From: ${body.senderName}\nTo: ${body.recipientName}`,
          packageId: package_.id
        }
      });

      return {
        ...package_,
        trackingUpdates: [update]
      };
    });

    return NextResponse.json({
      success: true,
      shipment: newShipment
    });

  } catch (error) {
    console.error('Shipping error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create shipment' },
      { status: 500 }
    );
  }
}