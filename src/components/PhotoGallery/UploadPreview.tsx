import React from 'react';
import { X, Music } from 'lucide-react';

interface Props {
  file: File;
  previewUrl: string;
  onRemove: () => void;
}

export default function UploadPreview({ file, previewUrl, onRemove }: Props) {
  const isVideo = file.type.startsWith('video/');
  const isAudio = file.type.startsWith('audio/');

  return (
    <div className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
      <div className="relative">
        {isVideo ? (
          <video src={previewUrl} controls className="w-full max-h-[320px] object-contain" />
        ) : isAudio ? (
          <div className="p-6 bg-gray-100 text-center">
            <Music className="mx-auto mb-3 w-10 h-10 text-gray-500" />
            <p className="text-sm font-medium text-gray-700">Audio preview</p>
            <audio src={previewUrl} controls className="mt-3 w-full" />
          </div>
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
