// src/components/PhotoGallery/GalleryToolbar.tsx
import React from 'react';
import { motion } from 'motion/react';
import { Camera, Grid, Layers, Plus } from 'lucide-react';

interface GalleryToolbarProps {
  viewMode: 'polaroid' | 'stack';
  onViewModeChange: (mode: 'polaroid' | 'stack') => void;
  onAddMemory: () => void;
}

export default function GalleryToolbar({
  viewMode,
  onViewModeChange,
  onAddMemory,
}: GalleryToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200/60 rounded-full text-[10px] font-sans font-semibold text-rose-800">
          <Camera className="w-3.5 h-3.5 text-rose-500" />
          <span>Nigeria ➔ Canada Scrapbook</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-bold text-[#3D2616] tracking-tight">
          Preserved Moments
        </h2>
        <p className="text-xs sm:text-sm text-[#5c3a21]/70 font-sans">
          Tap any photo to unlock memories.
        </p>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md border border-[#5c3a21]/10 p-1 rounded-full shadow-sm">
          <button
            onClick={() => onViewModeChange('polaroid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-300 cursor-pointer touch-manipulation ${
              viewMode === 'polaroid'
                ? 'bg-[#5c3a21] text-white shadow-sm'
                : 'text-[#5c3a21]/70 hover:text-[#5c3a21]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Polaroid Wall</span>
          </button>
          <button
            onClick={() => onViewModeChange('stack')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-300 cursor-pointer touch-manipulation ${
              viewMode === 'stack'
                ? 'bg-[#5c3a21] text-white shadow-sm'
                : 'text-[#5c3a21]/70 hover:text-[#5c3a21]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Memory Stack</span>
          </button>
        </div>

        <button
          onClick={onAddMemory}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-sm font-semibold transition-colors shadow-sm touch-manipulation min-h-[48px] min-w-[48px]"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Memory</span>
        </button>
      </div>
    </div>
  );
}