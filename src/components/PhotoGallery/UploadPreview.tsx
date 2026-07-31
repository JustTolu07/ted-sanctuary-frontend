import React from 'react';
import { X } from 'lucide-react';

interface Props {
  file: File;
  previewUrl: string;
  onRemove: () => void;
}

export default function UploadPreview({ file, previewUrl, onRemove }: Props) {
  const isVideo = file.type.startsWith('video/');

  return (
    <div className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
      <div className="relative">
        {isVideo ? (
          <video src={previewUrl} controls className="w-full max-h-[320px] object-contain" />
        ) : (
          <img src={previewUrl} alt={file.name} className="w-full max-h-[320px] object-contain" />
        )}
        <button
          onClick={onRemove}
          aria-label="Remove file"
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
        >
          <X className="w-4 h-4 text-gray-700" />
        </button>
      </div>
      <div className="px-4 py-2 text-xs text-gray-500">{file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB</div>
    </div>
  );
}
