'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      router.push(`/track/${trackingNumber}`);
    }
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-600">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">State Global Logistics</h1>
          <div className="animate-pulse">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-white mt-4 text-lg">Connecting the world, one package at a time</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-blue-600">State Global Logistics</h1>
          <p className="text-xl text-gray-600">Your Trusted Global Shipping Partner</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Track Your Shipment</h2>
          <form className="flex gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter tracking number"
              className="flex-1 p-2 border rounded text-gray-900"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Track
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/shipping" className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Ship a Package</h3>
            <p className="text-gray-600">Create a new shipment and get a tracking number</p>
          </Link>

          <Link href="/login" className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Admin Login</h3>
            <p className="text-gray-600">Login to manage packages and tracking updates</p>
          </Link>
        </div>
      </div>
    </div>
  );
}