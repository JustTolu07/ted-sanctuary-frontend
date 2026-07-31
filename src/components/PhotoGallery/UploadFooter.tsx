import React from 'react';
import { Upload } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: () => void;
  disabled?: boolean;
  hasFile?: boolean;
}

export default function UploadFooter({ onClose, onSave, disabled, hasFile }: Props) {
  return (
    <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-4">
      <div className="flex items-center gap-3">
        <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium">
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={disabled || !hasFile}
          className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-4 h-4" />
          Save Memory
        </button>
      </div>
    </div>
  );
}
