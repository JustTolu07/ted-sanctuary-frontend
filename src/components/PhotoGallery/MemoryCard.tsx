// src/components/PhotoGallery/MemoryCard.tsx
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { Memory } from '@/types';

interface MemoryCardProps {
  memory: Memory;
  index: number;
  onClick: () => void;
  onSelect: () => void;
}

export default function MemoryCard({ memory, index, onClick, onSelect }: MemoryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -3 }}
      onClick={onClick}
      className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-sm hover:shadow-md border border-[#5c3a21]/10 cursor-pointer transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-rose-50 mb-2 sm:mb-3 group">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-amber-100/50 animate-pulse" />
        )}
        <img
          src={memory.imageUrl}
          alt={memory.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-105 transition-transform duration-700`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
          <span className="text-[10px] font-sans text-white font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300 fill-current animate-pulse" />
            <span>View Story</span>
          </span>
        </div>
      </div>

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
}