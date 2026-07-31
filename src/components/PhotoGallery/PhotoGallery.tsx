/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camwwra, Layers, Grid, Sparkles, Heart } from 'lucide-react';
import { MEMORIES } from '../../data';
import { Memory } from '../../types';

interface PhotoGalleryProps {
  onMemorySelect: (memory: Memory) => void;
}

export default function PhotoGallery({ onMemorySelect }: PhotoGalleryProps) {
  const [viewMode, setViewMode] = useState<'polaroid' | 'stack'>('polaroid');
  const [stackIndex, setStackIndex] = useState(0);

  // Polaroid rotation presets to give that hand-placed "scrapbook" feeling
  const rotations = ['-rotate-3', 'rotate-2', '-rotate-2', 'rotate-3', 'rotate-1', '-rotate-1'];

  const handleNextStack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStackIndex((prev) => (prev + 1) % MEMORIES.length);
  };

  const handlePrevStack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStackIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
  };

  return (
    <div 
      className="max-w-6xl mx-auto px-4 py-16 relative overflow-hidden"
      id="photo-gallery-section"
    >
      {/* Decorative ambient visual filters */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Control Toggles */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-12">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200/60 rounded-full text-[10px] font-sans font-semibold text-rose-800 mb-2">
            <Camera className="w-3.5 h-3.5 text-rose-500" />
            <span>Nigeria ➔ Canada Scrapbook</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-bold text-[#3D2616] tracking-tight mb-1">
            Preserved Moments
          </h2>
          <p className="text-xs sm:text-sm text-[#5c3a21]/70 font-sans max-w-md">
            A digital collection of our shared moments. Tap any photo to unlock memories.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md border border-[#5c3a21]/10 p-1 rounded-full shadow-2xs">
          <button
            onClick={() => setViewMode('polaroid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-300 cursor-pointer ${
              viewMode === 'polaroid'
                ? 'bg-[#5c3a21] text-white shadow-2xs'
                : 'text-[#5c3a21]/70 hover:text-[#5c3a21]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Polaroid Wall</span>
          </button>
          <button
            onClick={() => setViewMode('stack')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-300 cursor-pointer ${
              viewMode === 'stack'
                ? 'bg-[#5c3a21] text-white shadow-2xs'
                : 'text-[#5c3a21]/70 hover:text-[#5c3a21]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Memory Stack</span>
          </button>
        </div>
      </div>

      {/* Gallery Canvas */}
      <div className="min-h-[420px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {viewMode === 'polaroid' ? (
            /* POLAROID SCRAPBOOK WALL - 2-Column Mobile Grid, 4-Column Desktop Grid */
            <motion.div
              key="polaroid-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full"
            >
              {MEMORIES.map((memory) => {
                return (
                  <motion.div
                    key={memory.id}
                    whileHover={{ scale: 1.02, y: -3 }}
                    onClick={() => onMemorySelect(memory)}
                    className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-xs hover:shadow-sm border border-[#5c3a21]/10 cursor-pointer transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Polaroid Image Section */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-rose-50 mb-2 sm:mb-3 group shadow-2xs">
                      <img
                        src={memory.imageUrl}
                        alt={memory.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
                        <span className="text-[10px] font-sans text-white font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-300 fill-current animate-pulse" />
                          <span>View Story</span>
                        </span>
                      </div>
                    </div>

                    {/* Handwritten Polaroid Label */}
                    <div className="pt-1 text-center pb-0.5">
                      <h3 className="font-serif italic font-bold text-xs sm:text-sm text-[#3D2616] truncate">
                        {memory.title}
                      </h3>
                      <div className="flex items-center justify-center gap-1 mt-0.5 text-[10px] font-sans text-rose-500/80">
                        <Heart className="w-2.5 h-2.5 fill-current" />
                        <span>{memory.date}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* 3D INTERACTIVE MEMORY STACK */
            <motion.div
              key="stack-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-md h-[450px] flex items-center justify-center"
            >
              {MEMORIES.map((memory, index) => {
                // Calculate relative position in the stack
                const position = (index - stackIndex + MEMORIES.length) % MEMORIES.length;
                const isTop = position === 0;
                
                // We only render the top few layers for clean performance
                if (position > 2) return null;

                return (
                  <motion.div
                    key={memory.id}
                    onClick={() => isTop && onMemorySelect(memory)}
                    style={{
                      zIndex: MEMORIES.length - position,
                    }}
                    animate={{
                      scale: 1 - position * 0.05,
                      y: position * -20,
                      rotate: isTop ? 0 : position * 4 * (index % 2 === 0 ? 1 : -1),
                      opacity: 1 - position * 0.3,
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                    className={`absolute w-full max-w-sm bg-white rounded-none p-5 border-2 border-rose-950 shadow-[6px_6px_0px_0px_#4c0519] ${
                      isTop ? 'cursor-pointer' : 'pointer-events-none'
                    }`}
                  >
                    {/* Cover Photo */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-rose-50 mb-4 shadow-inner">
                      <img
                        src={memory.imageUrl}
                        alt={memory.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    {/* Metadata & Description */}
                    <div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-rose-400">
                        {memory.date}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-rose-950 tracking-tight leading-snug mt-1 mb-2">
                        {memory.title}
                      </h3>
                      <p className="text-xs text-rose-900/60 font-sans line-clamp-2 leading-relaxed">
                        {memory.description}
                      </p>
                    </div>

                    {/* Stack Controls for the active slide */}
                    {isTop && (
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-rose-50">
                        <button
                          onClick={handlePrevStack}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors focus:outline-none"
                        >
                          &larr; Prev
                        </button>
                        <span className="text-xs font-display font-semibold text-rose-950">
                          {stackIndex + 1} of {MEMORIES.length}
                        </span>
                        <button
                          onClick={handleNextStack}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors focus:outline-none"
                        >
                          Next &rarr;
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
