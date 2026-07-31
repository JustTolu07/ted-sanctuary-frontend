// src/components/PhotoGallery/GalleryGrid.tsx
import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import MemoryCard from './MemoryCard';
import { Memory } from '@/types';

interface GalleryGridProps {
  memories: Memory[];
  onMemorySelect: (memory: Memory) => void;
  onMemoryClick: (memory: Memory) => void;
  hasMore: boolean;
  loadMore: () => void;
}

export default function GalleryGrid({
  memories,
  onMemorySelect,
  onMemoryClick,
  hasMore,
  loadMore,
}: GalleryGridProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full"
    >
      {memories.map((memory, index) => (
        <MemoryCard
          key={memory.id}
          memory={memory}
          index={index}
          onClick={() => onMemoryClick(memory)}
          onSelect={() => onMemorySelect(memory)}
        />
      ))}
      {hasMore && (
        <div ref={loaderRef} className="col-span-full flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  );
}