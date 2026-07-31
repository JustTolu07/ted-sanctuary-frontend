// src/components/PhotoGallery/EditMemoryModal.tsx
import React from 'react';
import { Memory } from '@/types';

interface EditMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: Memory | null;
  onUpdate: (id: string, payload: any) => Promise<void>;
}

export default function EditMemoryModal({ isOpen, onClose, memory, onUpdate }: EditMemoryModalProps) {
  // Implement similar to UploadModal with pre-filled fields
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 className="text-lg font-bold">Edit Memory</h3>
        {/* Form fields pre-filled with memory data */}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</button>
      </div>
    </div>
  );
}