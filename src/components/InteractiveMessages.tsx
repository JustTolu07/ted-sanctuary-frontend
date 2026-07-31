/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, MailOpen, Send, Sparkles, Heart, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LETTERS } from '../data';
import { InteractiveLetter } from '../types';

export default function InteractiveMessages() {
  const [lettersList, setLettersList] = useState<InteractiveLetter[]>(LETTERS);
  const [activeLetter, setActiveLetter] = useState<InteractiveLetter | null>(null);
  
  // States for writing a custom wish
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSignature, setNewSignature] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleOpenLetter = (letter: InteractiveLetter) => {
    setActiveLetter(letter);
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent || !newSignature) return;

    setIsSending(true);

    // Simulate romantic dispatch animation delay
    setTimeout(() => {
      const generatedLetter: InteractiveLetter = {
        id: `custom-letter-${Date.now()}`,
        title: newTitle,
        preview: `${newContent.substring(0, 30)}...`,
        content: newContent,
        signature: newSignature,
        date: 'Just Now 💖',
        color: 'bg-rose-50 border-rose-300 text-rose-900 shadow-rose-200/50'
      };

      setLettersList((prev) => [generatedLetter, ...prev]);
      
      // Reset form
      setNewTitle('');
      setNewContent('');
      setNewSignature('');
      setIsSending(false);
      
      // Trigger success state
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 1200);
  };

  return (
    <div 
      className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 border-t border-rose-100/30 bg-rose-50/20"
      id="love-letters-section"
    >
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 rounded-none text-xs font-semibold uppercase tracking-wider text-amber-600 mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>The Eternal Message Wall</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-rose-950 tracking-tight mb-4">
          Letters Placed in the Sky
        </h2>
        <p className="max-w-md mx-auto text-sm md:text-base text-rose-900/60 font-sans">
          Click any folded letter below to open its seal. These letters are permanently hosted on the internet so that whenever you feel the distance between Nigeria and Canada, you can read them and remember.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Letters Grid Column */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xl font-display font-semibold text-rose-950 flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-rose-500" />
            <span>Unread Envelopes ({lettersList.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {lettersList.map((letter) => {
              const isOpened = activeLetter?.id === letter.id;
              return (
                <motion.div
                  key={letter.id}
                  layoutId={`envelope-wrapper-${letter.id}`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenLetter(letter)}
                  className="bg-white rounded-2xl p-6 border border-rose-100/40 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between h-48 relative overflow-hidden group"
                >
                  {/* Decorative stamp in corner */}
                  <div className="absolute -right-2 -top-2 w-12 h-12 border-2 border-dashed border-rose-100 rounded-full flex items-center justify-center rotate-12 group-hover:rotate-45 transition-transform duration-500 opacity-60">
                    <Heart className="w-5 h-5 text-rose-200 fill-current" />
                  </div>

                  <div>
                    {/* Folded seal icon */}
                    <div className="mb-4">
                      {isOpened ? (
                        <MailOpen className="w-6 h-6 text-rose-500 fill-current" />
                      ) : (
                        <div className="relative">
                          <Mail className="w-6 h-6 text-rose-400 fill-rose-50" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[2px] w-2 h-2 bg-rose-500 rounded-full shadow-sm animate-pulse" />
                        </div>
                      )}
                    </div>

                    <h4 className="text-base font-serif font-bold text-rose-950 mb-1 group-hover:text-rose-600 transition-colors">
                      {letter.title}
                    </h4>
                    <p className="text-xs text-rose-900/60 font-sans line-clamp-2">
                      {letter.preview}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-rose-50/80 mt-2">
                    <span className="text-[10px] font-sans font-medium text-rose-900/40">
                      {letter.date}
                    </span>
                    <span className="text-[10px] font-serif italic text-rose-500 font-semibold">
                      - {letter.signature}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dispatch Form Column */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-rose-100/60 shadow-xl relative overflow-hidden">
          {/* Subtle sparkles background */}
          <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-gradient-to-tr from-pink-100/40 to-transparent rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-2xl font-serif font-bold text-rose-950 tracking-tight mb-2">
            Send a Floating Wish
          </h3>
          <p className="text-xs text-rose-900/60 font-sans mb-6">
            Write down a sweet birthday wish, your dreams for the future, or a secret message. Once sent, it will instantly crystallize into a letter envelope on the wall!
          </p>

          <form onSubmit={handleSendWish} className="space-y-4 relative z-10">
            <div>
              <label htmlFor="title-input" className="block text-xs font-display font-semibold text-rose-950/70 uppercase tracking-wider mb-1">
                Letter Theme / Subject
              </label>
              <input
                id="title-input"
                type="text"
                required
                placeholder="e.g. My Favorite Thing About You"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-rose-50/50 border border-rose-100/60 rounded-xl px-4 py-2.5 text-sm text-rose-950 placeholder-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="content-input" className="block text-xs font-display font-semibold text-rose-950/70 uppercase tracking-wider mb-1">
                Your Handwritten Message
              </label>
              <textarea
                id="content-input"
                required
                rows={4}
                placeholder="Write your heartfelt words here..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-rose-50/50 border border-rose-100/60 rounded-xl px-4 py-2.5 text-sm text-rose-950 placeholder-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all resize-none"
              />
            </div>

            <div>
              <label htmlFor="sig-input" className="block text-xs font-display font-semibold text-rose-950/70 uppercase tracking-wider mb-1">
                How Should It Be Signed?
              </label>
              <input
                id="sig-input"
                type="text"
                required
                placeholder="e.g. Your Partner In Crime"
                value={newSignature}
                onChange={(e) => setNewSignature(e.target.value)}
                className="w-full bg-rose-50/50 border border-rose-100/60 rounded-xl px-4 py-2.5 text-sm text-rose-950 placeholder-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-display font-medium text-sm py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-95 ${
                isSending ? 'opacity-85 pointer-events-none' : ''
              }`}
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sealing with Wax...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Floating Letter!</span>
                </>
              )}
            </button>
          </form>

          {/* Toast Notification */}
          <AnimatePresence>
            {showSuccessToast && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="absolute inset-x-6 bottom-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-400/20 flex items-center gap-2 z-20"
              >
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
                <div className="flex-1">
                  <h4 className="text-xs font-bold font-display">Sent Successfully!</h4>
                  <p className="text-[10px] text-emerald-50 font-sans leading-none mt-0.5">Your romantic letter floated onto the wall!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal - Opened Letter View */}
      <AnimatePresence>
        {activeLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLetter(null)}
              className="fixed inset-0 bg-rose-950/30 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              layoutId={`envelope-wrapper-${activeLetter.id}`}
              transition={{ type: 'spring', damping: 24, stiffness: 180 }}
              className={`relative w-full max-w-lg ${activeLetter.color} border p-8 md:p-10 rounded-3xl shadow-2xl z-10 flex flex-col justify-between max-h-[85vh] overflow-y-auto`}
            >
              <div>
                {/* Vintage Letter Header */}
                <div className="flex items-center justify-between pb-4 border-b border-rose-200/40 mb-6">
                  <div className="flex items-center gap-2 text-rose-500">
                    <MailOpen className="w-5 h-5" />
                    <span className="text-xs font-display font-bold uppercase tracking-widest">
                      Opened Letter
                    </span>
                  </div>
                  <span className="text-xs font-sans text-rose-900/50">{activeLetter.date}</span>
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-rose-950 mb-4 tracking-tight leading-tight">
                  {activeLetter.title}
                </h3>
                <p className="text-sm text-rose-900/85 font-sans leading-relaxed whitespace-pre-line font-medium mb-8">
                  {activeLetter.content}
                </p>
              </div>

              {/* Signature */}
              <div className="flex flex-col items-end pt-4 border-t border-rose-200/40 mt-6">
                <span className="text-xs text-rose-900/40 font-sans uppercase tracking-wider mb-1">
                  Signed With Eternal Devotion
                </span>
                <span className="text-lg font-serif italic text-rose-700 font-bold">
                  {activeLetter.signature}
                </span>
                
                {/* Close Button */}
                <button
                  onClick={() => setActiveLetter(null)}
                  className="mt-6 px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-display font-medium text-xs rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  Close & Fold Envelope
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
