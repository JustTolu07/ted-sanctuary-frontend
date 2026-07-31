import React, { forwardRef, useRef, useImperativeHandle } from 'react';

interface Props {
  onSubmit: (payload: { title: string; description: string; date: string }) => Promise<void>;
  disabled?: boolean;
}

export default forwardRef<HTMLFormElement, Props>(function UploadForm({ onSubmit, disabled }, ref) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useImperativeHandle(ref, () => formRef.current as HTMLFormElement);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    const title = titleRef.current?.value || '';
    const description = descRef.current?.value || '';
    const date = dateRef.current?.value || '';
    await onSubmit({ title, description, date });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" aria-label="Memory form">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input ref={titleRef} className="mt-2 w-full px-3 py-2 min-h-[48px] border border-gray-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300" placeholder="Give it a name" disabled={disabled} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Story</label>
        <textarea ref={descRef} rows={4} className="mt-2 w-full px-3 py-3 min-h-[96px] border border-gray-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300" placeholder="A short memory..." disabled={disabled} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input ref={dateRef} type="date" className="mt-2 w-full px-3 py-2 min-h-[48px] border border-gray-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300" disabled={disabled} />
        </div>
        <div>
          {/* kept empty for spacing / future optional field */}
        </div>
      </div>

      <div className="pt-2" />
    </form>
  );
});
