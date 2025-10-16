// src/components/EmptyState.jsx
import React from 'react';

const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex justify-center">
        <div className="mb-4 text-gray-400">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">{description}</p>
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;