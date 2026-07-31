/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Heart, Award, Coffee, Compass } from 'lucide-react';
import { Memory } from '../types';

interface MemoryModalProps {
  memory: Memory | null;
  onClose: () => void;
}

export default function MemoryModal({ memory, onClose }: MemoryModalProps) {
  if (!memory) return null;

  // Render icon based on memory category
  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case 'cozy':
        return <Coffee className="w-5 h-5 text-amber-500" />;
      case 'adventure':
        return <Compass className="w-5 h-5 text-indigo-500" />;
      case 'romantic':
        return <Heart className="w-5 h-5 text-rose-500 fill-current" />;
      default:
        return <Award className="w-5 h-5 text-pink-500" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-rose-950/40 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl bg-white/95 rounded-3xl overflow-hidden shadow-2xl border border-rose-100/60 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-rose-50 text-rose-950/70 hover:text-rose-600 shadow-md transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column - Beautiful Custom Illustration */}
          <div className="relative w-full md:w-1/2 h-32 md:h-auto md:min-h-[220px] min-h-0 bg-rose-50 overflow-hidden group">
            <img
              src={memory.imageUrl}
              alt={memory.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10" />
            
            {/* Visual badge on image */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
              {renderCategoryIcon(memory.category)}
              <span className="text-xs font-display font-semibold tracking-wider text-rose-950 capitalize">
                {memory.category}
              </span>
            </div>
          </div>

          {/* Right Column - Heartfelt Narrative */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white overflow-y-auto max-h-[50vh] md:max-h-[600px]">
            <div>
              {/* Header metadata */}
              <div className="flex items-center gap-2 text-rose-400 font-sans text-xs font-semibold tracking-widest uppercase mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{memory.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-serif font-bold text-rose-950 tracking-tight leading-tight mb-4">
                {memory.title}
              </h3>

              {/* Decorative line */}
              <div className="w-12 h-0.5 bg-rose-200 mb-4" />

              {/* Story body */}
              <p className="text-sm text-rose-900/80 font-sans leading-relaxed whitespace-pre-line">
                {memory.detailedStory}
              </p>
            </div>

            {/* Cozy footer wish */}
            <div className="mt-6 pt-4 border-t border-rose-100/60 flex items-center gap-2 text-rose-500 font-serif italic text-xs">
              <Heart className="w-3.5 h-3.5 fill-current animate-pulse text-rose-500" />
              <span>For my beautiful Smadar, with love.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
