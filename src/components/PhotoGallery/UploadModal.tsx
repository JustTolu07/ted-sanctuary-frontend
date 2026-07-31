import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import UploadDropzone from './UploadDropzone';
import UploadPreview from './UploadPreview';
import UploadForm from './UploadForm';
import UploadFooter from './UploadFooter';
import LoadingOverlay from './LoadingOverlay';
import type { CreateMemoryPayload } from '@/services/memories';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (payload: CreateMemoryPayload) => Promise<void>;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prev;
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (file) setPreviewUrl(URL.createObjectURL(file));
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleUpload = async (payload: Omit<CreateMemoryPayload, 'image'>) => {
    if (!file) return;
    setIsUploading(true);
    try {
      await onUpload({ ...payload, image: file });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            // click outside closes
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-[560px] bg-white rounded-t-[32px] sm:rounded-2xl shadow-2xl mx-auto overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
                <div>
                  <h3 className="text-base font-semibold text-[#3D2616]">Add Memory</h3>
                  <p className="text-xs text-gray-500">Capture a moment that matters</p>
                </div>
              </div>
            </div>

            {/* Body (only body scrolls) */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4" style={{ maxHeight: 'calc(92vh - 140px)' }}>
              <UploadDropzone file={file} onFile={setFile} />
              {file && previewUrl && <UploadPreview file={file} previewUrl={previewUrl} onRemove={() => setFile(null)} />}
              <UploadForm ref={formRef} onSubmit={handleUpload} disabled={isUploading} />
            </div>

            {/* Footer */}
            <UploadFooter onClose={onClose} onSave={() => formRef.current?.requestSubmit()} disabled={isUploading} hasFile={!!file} />

            {isUploading && <LoadingOverlay />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
