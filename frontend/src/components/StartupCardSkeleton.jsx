// src/components/StartupCardSkeleton.jsx
import React from 'react';

const StartupCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-1.5 bg-gray-200"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start space-x-3">
            <div className="mt-1 w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-4 bg-gray-200 rounded"></div>
            <div className="w-10 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default StartupCardSkeleton;