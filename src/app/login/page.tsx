'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            if (response.ok) {
                // In a real app, we would store the token and redirect to admin dashboard
                alert('Login successful!');
                router.push('/admin');
            } else {
                alert('Login failed: ' + data.error);
            }
        } catch (error) {
            alert('Error during login. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-8">
            <div className="max-w-md w-full">
                <h1 className="text-4xl font-bold mb-8 text-center">Admin Login</h1>
                
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full p-2 border rounded"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="w-full p-2 border rounded"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}