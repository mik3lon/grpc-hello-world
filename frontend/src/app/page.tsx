'use client'

import {useState} from 'react';
import {sayHello} from '@/services/grpcClient';

export default function HomePage() {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>('');

    const handleGreeting = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await sayHello(name);
            setGreeting(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleGreeting();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-6 text-gray-700">gRPC Client Example</h1>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyPress}  // Listen for 'Enter' keypress
                    placeholder="Enter your name"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleGreeting}
                    disabled={loading}
                    className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Loading...' : 'Say Hello'}
                </button>
                {greeting && (
                    <p className="mt-4 text-green-600 font-semibold">Greeting: {greeting}</p>
                )}
                {error && (
                    <p className="mt-4 text-red-500">Error: {error}</p>
                )}
            </div>
        </div>
    );
}
