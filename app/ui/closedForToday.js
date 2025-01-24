'use client';
import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ClosedToday = () => {

    const router = useRouter();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fade-in">
            <div className="relative p-8 rounded-xl shadow-lg bg-white border border-gray-200 text-center max-w-md transform transition-transform duration-300 hover:scale-105">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-100 p-4 rounded-full shadow-md">
                    <Clock className="w-12 h-12 text-gray-500 animate-spin-slow" />
                </div>

                <h2 className="mt-8 text-3xl font-semibold text-gray-900">Closed for Today</h2>
                <p className="mt-4 text-lg text-gray-600">
                    We’ll be back soon! Take a break and recharge.
                </p>

                <div className="mt-6 flex justify-center items-center gap-2 text-sm text-gray-500 animate-pulse">
                    <span className="text-xl">🕒</span>
                    <span>Check back later</span>
                    <span className="text-xl">🚪</span>
                </div>

                <div className="mt-8">
                    <button
                        className="px-6 py-2 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 focus:outline-none transition-all duration-200"
                        onClick={() => { router.push('/') }}
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClosedToday;
