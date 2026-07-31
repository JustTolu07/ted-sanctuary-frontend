// src/components/PhotoGallery/MemoryStack.tsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Memory } from '@/types';

interface MemoryStackProps {
  memories: Memory[];
  stackIndex: number;
  onStackChange: (index: number) => void;
  onMemorySelect: (memory: Memory) => void;
}

export default function MemoryStack({
  memories,
  stackIndex,
  onStackChange,
  onMemorySelect,
}: MemoryStackProps) {
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStackChange((stackIndex + 1) % memories.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStackChange((stackIndex - 1 + memories.length) % memories.length);
  };

  // We show only top 3 cards for performance
  const visibleMemories = memories.slice(stackIndex, stackIndex + 3);
  if (visibleMemories.length < 3) {
    // Wrap around if needed
    const wrap = memories.slice(0, 3 - visibleMemories.length);
    visibleMemories.push(...wrap);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-md mx-auto h-[450px] flex items-center justify-center"
    >
      {visibleMemories.map((memory, idx) => {
        const isTop = idx === 0;
        const position = idx; // 0 = top, 1 = second, 2 = third
        return (
          <motion.div
            key={memory.id}
            onClick={() => isTop && onMemorySelect(memory)}
            style={{
              zIndex: visibleMemories.length - position,
            }}
            animate={{
              scale: 1 - position * 0.06,
              y: position * -18,
              rotate: isTop ? 0 : (position % 2 === 0 ? 3 : -3) * position,
              opacity: 1 - position * 0.25,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            className={`absolute w-full max-w-sm bg-white rounded-lg p-5 border-2 border-rose-950 shadow-[6px_6px_0px_0px_#4c0519] ${
              isTop ? 'cursor-pointer' : 'pointer-events-none'
            }`}
          >
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-rose-50 mb-4 shadow-inner">
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
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

            {isTop && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-rose-50">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors focus:outline-none touch-manipulation min-h-[44px] min-w-[44px]"
                >
                  ← Prev
                </button>
                <span className="text-xs font-display font-semibold text-rose-950">
                  {stackIndex + 1} of {memories.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors focus:outline-none touch-manipulation min-h-[44px] min-w-[44px]"
                >
                  Next →
                </button>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}