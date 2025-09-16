"use client";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>

      {/* Panel skeleton */}
      <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 border rounded-lg">
        <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
        
        {/* Form skeleton */}
        <div className="space-y-4">
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 border rounded-lg">
        <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
        
        {/* Table header skeleton */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
        </div>
        
        {/* Table rows skeleton */}
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-4">
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Another panel skeleton */}
      <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 border rounded-lg">
        <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
