// components/ui/LoadingSpinner.jsx
import React from 'react';

/**
 * A reusable loading component.
 * @param {string} message - Optional text to show below the spinner.
 * @param {boolean} fullHeight - If true, it centers itself in the available vertical space.
 */
export const LoadingSpinner = ({ 
  message = "Loading...", 
  fullHeight = true 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${fullHeight ? 'min-h-[60vh]' : 'p-8'}`}>
      {/* The Animated Ring */}
      <div className="relative">
        {/* Static Background Ring */}
        <div className="w-12 h-12 border-4 border-slate-100 rounded-full"></div>
        
        {/* Spinning Top Ring */}
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Message */}
      {message && (
        <p className="mt-4 text-slate-500 font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};