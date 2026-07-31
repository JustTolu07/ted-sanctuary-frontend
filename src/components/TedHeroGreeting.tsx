import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, MessageCircle } from 'lucide-react';

interface TedHeroGreetingProps {
  onOpenTedChat?: () => void;
  onOpenLetters?: () => void;
}

export const TedHeroGreeting: React.FC<TedHeroGreetingProps> = ({
  onOpenTedChat,
  onOpenLetters,
}) => {
  const [greetingText, setGreetingText] = useState('Good morning, Smadar.');
  const [speechQuote, setSpeechQuote] = useState("I've been waiting to see you.");
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // Time-based greeting check
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreetingText('Good morning, Smadar.');
    } else if (hour >= 12 && hour < 17) {
      setGreetingText('Good afternoon, Smadar.');
    } else if (hour >= 17 && hour < 22) {
      setGreetingText('Good evening, Smadar.');
    } else {
      setGreetingText('Rest well, Smadar.');
    }

    // Speech quote pool
    const quotes = [
      "I've been waiting to see you.",
      "Toluwani asked me to hold your hand today.",
      "Remember to take a deep breath and drink warm water.",
      "You are doing so wonderfully, my sweet baby.",
      "Distance means nothing when someone means everything."
    ];

    const interval = setInterval(() => {
      setSpeechQuote((prev) => {
        const nextIdx = (quotes.indexOf(prev) + 1) % quotes.length;
        return quotes[nextIdx];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Blinking animation trigger
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative text-center py-6 md:py-10 space-y-6 max-w-2xl mx-auto"
    >
      {/* Living Animated TED Bear */}
      <div className="relative inline-block">
        {/* Breathing & Idle Floating Avatar */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={onOpenTedChat}
          className="relative w-24 h-24 md:w-28 md:h-28 mx-auto bg-[#B45309] rounded-full border-2 border-[#5c3a21]/30 flex items-center justify-center shadow-lg cursor-pointer group hover:scale-105 transition-transform"
        >
          {/* Plush Ears */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#B45309] rounded-full border-2 border-[#5c3a21]/30 flex items-center justify-center">
            <div className="w-3.5 h-3.5 bg-rose-200/80 rounded-full" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#B45309] rounded-full border-2 border-[#5c3a21]/30 flex items-center justify-center">
            <div className="w-3.5 h-3.5 bg-rose-200/80 rounded-full" />
          </div>

          {/* Blinking Eyes */}
          <div
            className={`absolute top-8 left-6 md:left-7 w-2 h-2.5 bg-[#3D2616] rounded-full transition-all duration-100 ${
              isBlinking ? 'scale-y-[0.1]' : 'scale-y-100'
            }`}
          />
          <div
            className={`absolute top-8 right-6 md:right-7 w-2 h-2.5 bg-[#3D2616] rounded-full transition-all duration-100 ${
              isBlinking ? 'scale-y-[0.1]' : 'scale-y-100'
            }`}
          />

          {/* Snout */}
          <div className="absolute bottom-4 inset-x-6 bg-[#FEF3C7] rounded-full h-8 border border-[#5c3a21]/20 flex flex-col items-center justify-center pt-0.5 shadow-inner">
            {/* Nose */}
            <div className="w-3 h-2 bg-[#3D2616] rounded-full" />
            {/* Mouth */}
            <div className="w-[1.5px] h-2 bg-[#3D2616]" />
          </div>

          {/* Blush Cheeks */}
          <div className="absolute top-11 left-3.5 w-3 h-1.5 bg-rose-300/60 rounded-full blur-[0.5px]" />
          <div className="absolute top-11 right-3.5 w-3 h-1.5 bg-rose-300/60 rounded-full blur-[0.5px]" />

          {/* Online Soft Pulse Badge */}
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#FAF7F2] shadow-sm animate-pulse" />
        </motion.div>

        {/* Ambient warmth aura */}
        <div className="absolute inset-0 bg-amber-200/20 rounded-full blur-2xl pointer-events-none -z-10" />
      </div>

      {/* Greeting Typography */}
      <div className="space-y-2">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl md:text-5xl text-[#3D2616] tracking-tight leading-tight">
          {greetingText}
        </h1>
        <p className="font-sans text-sm md:text-base font-medium text-[#5c3a21]/60">
          How is you today?
        </p>
      </div>

      {/* Conversational Speech Bubble */}
      <div className="relative inline-block max-w-md mx-auto pt-2">
        <motion.div
          key={speechQuote}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-[#5c3a21]/15 px-6 py-4 rounded-3xl shadow-sm text-center relative"
        >
          {/* Subtle Speech Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-[#5c3a21]/15 rotate-45" />

          <p className="font-serif italic text-sm md:text-base text-[#3D2616] leading-relaxed">
            "{speechQuote}"
          </p>
        </motion.div>
      </div>

      {/* Gentle Primary Action Controls */}
      <div className="flex items-center justify-center gap-3 pt-2">
        {onOpenTedChat && (
          <button
            onClick={onOpenTedChat}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#5c3a21] hover:bg-[#4A2E1B] text-white text-xs font-sans font-semibold rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>Talk with TED</span>
          </button>
        )}

        {onOpenLetters && (
          <button
            onClick={onOpenLetters}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-amber-50/80 border border-[#5c3a21]/15 text-[#5c3a21] text-xs font-sans font-semibold rounded-full shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Open a Letter</span>
          </button>
        )}
      </div>
    </motion.section>
  );
};
