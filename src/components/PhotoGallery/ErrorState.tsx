// src/components/PhotoGallery/ErrorState.tsx
import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  onRetry: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-10 h-10 text-rose-500" />
      </div>
      <h3 className="text-xl font-serif font-bold text-[#3D2616]">Oops, something went wrong</h3>
      <p className="text-sm text-[#5c3a21]/70 max-w-sm mt-1">
        We couldn't load your memories. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-sm font-semibold transition-colors shadow-sm touch-manipulation min-h-[48px]"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </motion.div>
  );
}