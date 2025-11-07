'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShippingPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        senderName: '',
        senderAddress: '',
        recipientName: '',
        recipientAddress: '',
        packageDescription: '',
        weight: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/shipping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                alert(data.error || 'Failed to create shipment');
                return;
            }
            
            if (!data.shipment?.trackingNumber) {
                alert('Error: No tracking number received');
                return;
            }
            
            alert(`Shipment created! Tracking number: ${data.shipment.trackingNumber}`);
            router.push(`/track/${data.shipment.trackingNumber}`);
        } catch (error) {
            console.error('Shipping error:', error);
            alert('Error creating shipment. Please check all fields and try again.');
        }
    };

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-600">State Global Logistics</h1>
                    <p className="text-xl text-gray-600 mt-2">Create New Shipment</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Sender Information */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900">Sender Information</h2>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2 border rounded"
                                        value={formData.senderName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, senderName: e.target.value }))}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        required
                                        className="w-full p-2 border rounded"
                                        rows={3}
                                        value={formData.senderAddress}
                                        onChange={(e) => setFormData(prev => ({ ...prev, senderAddress: e.target.value }))}
                                    />
                                </div>
                            </div>

                            {/* Recipient Information */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900">Recipient Information</h2>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2 border rounded"
                                        value={formData.recipientName}
                                        onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        required
                                        className="w-full p-2 border rounded"
                                        rows={3}
                                        value={formData.recipientAddress}
                                        onChange={(e) => setFormData(prev => ({ ...prev, recipientAddress: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Package Information */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">Package Information</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2 border rounded"
                                        value={formData.packageDescription}
                                        onChange={(e) => setFormData(prev => ({ ...prev, packageDescription: e.target.value }))}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Weight (kg)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        required
                                        className="w-full p-2 border rounded"
                                        value={formData.weight}
                                        onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Create Shipment
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}