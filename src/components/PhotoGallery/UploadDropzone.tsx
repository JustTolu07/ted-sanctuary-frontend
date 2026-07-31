import React, { useRef, useState } from 'react';
import { Image, File as FileIcon } from 'lucide-react';

const ALLOWED = ['image/png','image/jpeg','image/jpg','image/webp','image/gif','video/mp4','video/quicktime'];

interface Props {
  file: File | null;
  onFile: (f: File | null) => void;
}

export default function UploadDropzone({ file, onFile }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (f: File | null) => {
    if (!f) return;
    if (!ALLOWED.includes(f.type)) {
      // simple client-side validation
      alert('Unsupported file type');
      return;
    }
    onFile(f);
  };

  return (
    <div
      className={`relative rounded-2xl border-2 border-dashed p-4 transition-colors ${dragging ? 'border-rose-400 bg-rose-50' : 'border-gray-200 hover:border-rose-200'}`}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files[0] || null); }}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED.join(',')}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => handleFiles(e.target.files?.[0] || null)}
      />

      <div className="flex items-center gap-4">
        <div className="w-36 h-36 flex-shrink-0 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center">
          <FileIcon className="w-14 h-14 text-gray-300" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Image className="w-7 h-7 text-gray-400" />
            <h4 className="text-sm font-semibold text-gray-700">Upload</h4>
          </div>
          <p className="mt-1 text-sm text-gray-500">PNG, JPG, WEBP, GIF, MP4, MOV — Tap to browse or drag files here</p>
          {file && (
            <p className="mt-2 text-xs text-gray-400">Selected: {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          )}
        </div>
      </div>
    </div>
  );
}
