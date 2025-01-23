"use client"
import React from 'react';

const TiffinPageSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Image placeholder */}
            <div className="w-full h-48 bg-slate-200 animate-pulse" />

            <div className="p-6">
                {/* Title placeholder */}
                <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-4 animate-pulse" />

                {/* Description placeholder */}
                <div className="space-y-2 mb-6">
                    <div className="h-4 bg-slate-200 rounded-md w-full animate-pulse" />
                </div>

                {/* Stats row */}
                <div className="flex justify-between mb-4">
                    <div className="h-4 bg-slate-200 rounded-md w-16 animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded-md w-16 animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded-md w-16 animate-pulse" />
                </div>

                {/* Button placeholder */}
                <div className="h-10 bg-slate-200 rounded-xl w-full animate-pulse" />
            </div>

            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
    );
};

export default TiffinPageSkeleton;