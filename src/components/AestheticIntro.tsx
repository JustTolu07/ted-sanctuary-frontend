import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Key, Star, Sparkles, MailOpen } from 'lucide-react';

interface AestheticIntroProps {
  onUnlock: () => void;
}

export default function AestheticIntro({ onUnlock }: AestheticIntroProps) {
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlockClick = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      onUnlock();
    }, 1500); // Allow satisfying animation to complete
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Stitched Inner Border */}
      <div className="absolute inset-4 md:inset-8 border-4 border-dashed border-[#5c3a21]/15 rounded-[2.5rem] pointer-events-none" />

      {/* Floating Sparkles and Ornaments */}
      <div className="absolute top-[15%] left-[10%] text-6xl opacity-25 select-none animate-bounce" style={{ animationDuration: '6s' }}>🧸</div>
      <div className="absolute bottom-[15%] right-[10%] text-6xl opacity-25 select-none animate-bounce" style={{ animationDuration: '8s' }}>☕</div>
      <div className="absolute top-[20%] right-[15%] text-pink-300 opacity-40 select-none animate-pulse">💖</div>
      <div className="absolute bottom-[20%] left-[15%] text-amber-500 opacity-40 select-none animate-pulse">✨</div>

      {/* Heartfelt card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-xl w-full bg-white border-4 border-[#5c3a21] rounded-[3rem] p-8 md:p-12 shadow-[12px_12px_0px_0px_#5c3a21] text-center relative overflow-hidden"
      >
        {/* Pink heart medallion */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-rose-50 border-2 border-[#5c3a21] flex items-center justify-center shadow-md relative">
            <Heart className="w-8 h-8 text-rose-500 fill-current animate-pulse" />
            <div className="absolute -top-1 -right-1 text-xs">✨</div>
          </div>
        </div>

        {/* Happy Birthday Heading */}
        <h2 className="font-serif italic text-lg md:text-xl text-rose-600 tracking-wide font-black mb-2">
          Happy Birthday, Smadar
        </h2>
        
        <h1 className="text-4xl md:text-5xl font-display font-black text-[#5c3a21] uppercase tracking-tighter mb-6">
          YOUR DIGITAL SANCTUARY
        </h1>

        {/* Heartfelt Letter copy */}
        <div className="font-serif italic text-base md:text-lg text-[#5c3a21]/90 leading-relaxed space-y-4 mb-8 bg-[#FAF6F0]/50 p-6 rounded-2xl border border-[#5c3a21]/10">
          <p>
            "They say the internet never forgets. So I wanted to build something that would make sure you never forget how beautiful, loved, appreciated, and special you are."
          </p>
          <p>
            "This isn't just a birthday website. It's your own little corner of the internet, crafted with love, where you'll always have a safe place to come back to."
          </p>
        </div>

        <p className="text-[10px] text-[#5c3a21]/50 font-mono uppercase tracking-widest mb-8">
          The birthday is the day you receive the keys • Welcome home
        </p>

        {/* Animated Key Button to enter home */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleUnlockClick}
            disabled={isUnlocking}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-5 rounded-2xl font-display font-black text-xs uppercase tracking-widest border-2 border-[#5c3a21] cursor-pointer flex items-center gap-3 transition-all ${
              isUnlocking
                ? 'bg-[#b45309] text-white shadow-inner scale-95'
                : 'bg-[#5c3a21] text-white shadow-[6px_6px_0px_0px_#fbcfe8] hover:translate-x-[-1px] hover:translate-y-[-1px]'
            }`}
          >
            <motion.div
              animate={isUnlocking ? { rotate: 360 } : {}}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <Key className="w-5 h-5 text-amber-300" />
            </motion.div>
            <span>
              {isUnlocking ? 'Unlocking Your Cozy Sanctuary...' : 'Unlock Your Permanent Home'}
            </span>
          </motion.button>
        </div>

        {/* Hidden mini text credit */}
        <div className="mt-8 pt-4 border-t border-[#5c3a21]/10 flex items-center justify-between text-[8px] font-mono text-[#5c3a21]/30 uppercase tracking-widest">
          <span>COZY SANCTUARY INITIALIZATION PROTOCOL</span>
          <span>STITCHED WITH LOVE BY TOLUWANI</span>
        </div>
      </motion.div>
    </div>
  );
}
