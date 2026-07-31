// src/components/PhotoGallery/LoadingSkeleton.tsx
import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="h-5 w-40 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-8 w-60 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-28 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-10 w-28 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-2.5 sm:p-4 shadow-sm border border-gray-100">
            <div className="aspect-square w-full rounded-xl bg-gray-200 animate-pulse" />
            <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="mt-1 h-3 w-1/2 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}