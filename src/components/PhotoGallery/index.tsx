// src/components/PhotoGallery/index.tsx
import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useMemories } from '@/hooks/useMemories';
import { Memory } from '@/types';
import GalleryToolbar from './GalleryToolbar';
import GalleryGrid from './GalleryGrid';
import MemoryStack from './MemoryStack';
import UploadModal from './UploadModal';
import EditMemoryModal from './EditMemoryModal';
import DeleteMemoryDialog from './DeleteMemoryDialog';
import EmptyState from './EmptyState';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorState from './ErrorState';

export default function PhotoGallery() {
  const {
    memories,
    loading,
    error,
    refetch,
    createMemory,
    updateMemory,
    deleteMemory,
    hasMore,
    loadMore,
  } = useMemories();

  const [viewMode, setViewMode] = useState<'polaroid' | 'stack'>('polaroid');
  const [stackIndex, setStackIndex] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleMemorySelect = (memory: Memory) => {
    setSelectedMemory(memory);
    // For now, we just set the selected; you can also open a detail view.
  };

  const handleMemoryClick = (memory: Memory) => {
    // In polaroid mode, open edit/delete? Or just detail.
    setSelectedMemory(memory);
  };

  if (loading && memories.length === 0) {
    return <LoadingSkeleton />;
  }

  if (error && memories.length === 0) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      <GalleryToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddMemory={() => setIsUploadOpen(true)}
      />

      {memories.length === 0 ? (
        <EmptyState onAdd={() => setIsUploadOpen(true)} />
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'polaroid' ? (
            <GalleryGrid
              key="grid"
              memories={memories}
              onMemorySelect={handleMemorySelect}
              onMemoryClick={handleMemoryClick}
              hasMore={hasMore}
              loadMore={loadMore}
            />
          ) : (
            <MemoryStack
              key="stack"
              memories={memories}
              stackIndex={stackIndex}
              onStackChange={setStackIndex}
              onMemorySelect={handleMemorySelect}
            />
          )}
        </AnimatePresence>
      )}

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={async (payload) => {
          await createMemory(payload);
          setIsUploadOpen(false);
          // TODO: show toast "Memory saved ❤️"
        }}
      />

      <EditMemoryModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        memory={selectedMemory}
        onUpdate={updateMemory}
      />

      <DeleteMemoryDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        memory={selectedMemory}
        onDelete={deleteMemory}
      />
    </div>
  );
}