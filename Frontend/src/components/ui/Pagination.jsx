import React from 'react';

export default function Pagination({ currentPage, totalPages, onNext, onPrevious }) {
  // Hide component if pagination is not needed
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 pt-4 border-t border-slate-100">
      <button
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        Previous
      </button>
      
      <span className="text-sm font-medium text-slate-500">
        Page <span className="text-slate-900 font-bold">{currentPage}</span> of {totalPages}
      </span>
      
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        Next
      </button>
    </div>
  );
}