'use client';

import { useEffect, useState } from 'react';

interface TrackingUpdate {
    status: string;
    location: string;
    timestamp: string;
}

interface PackageData {
    trackingNumber: string;
    status: string;
    currentLocation: string;
    updates: TrackingUpdate[];
}

export default function TrackingPage({
    params
}: {
    params: { id: string }
}) {
    const [packageData, setPackageData] = useState<PackageData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await fetch(`/api/packages/${params.id}`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch package data');
                }
                
                setPackageData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
        };

        fetchPackage();
    }, [params.id]);

    if (error) {
        return (
            <main className="min-h-screen p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Error</h1>
                    <div className="bg-red-50 p-6 rounded-lg shadow-lg mb-8">
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </main>
        );
    }

    if (!packageData) {
        return (
            <main className="min-h-screen p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Loading...</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Tracking Details</h1>
                
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Tracking Number: {packageData.trackingNumber}</h2>
                        <p className="text-lg text-blue-600 font-semibold">Status: {packageData.status}</p>
                        <p className="text-gray-600">Current Location: {packageData.currentLocation}</p>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-xl font-semibold mb-4">Tracking History</h3>
                        <div className="space-y-4">
                            {packageData.updates.map((update: TrackingUpdate, index: number) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                                    <div>
                                        <p className="font-medium">{update.status}</p>
                                        <p className="text-gray-600">{update.location}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(update.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}