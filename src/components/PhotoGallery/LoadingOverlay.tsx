import React from 'react';

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
        <div className="text-sm text-rose-600 font-medium">Saving...</div>
      </div>
    </div>
  );
}
