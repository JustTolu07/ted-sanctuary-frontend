import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Play, Pause, Music, Volume2, MessageCircle, ArrowRight, Shield, Coffee, Moon, Sun, CloudRain } from 'lucide-react';

export interface MoodResponse {
  moodId: string;
  emoji: string;
  label: string;
  tedLetter: string;
  songTitle: string;
  songArtist: string;
  ambientType: string;
  comfortAction: string;
  bgGradient: string;
}

interface FeelingSanctuaryModalProps {
  mood: MoodResponse;
  onClose: () => void;
  onOpenTedChat: () => void;
  onNavigateToCare?: () => void;
}

export default function FeelingSanctuaryModal({
  mood,
  onClose,
  onOpenTedChat,
  onNavigateToCare
}: FeelingSanctuaryModalProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(true);
  const [squeezeCount, setSqueezeCount] = useState<number>(1);
  const [squeezeBurst, setSqueezeBurst] = useState<boolean>(false);
  const [actionDone, setActionDone] = useState<boolean>(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  // Trigger floating particle microinteraction
  const triggerParticle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const emojis = ['💖', '🧸', '✨', '🌸', '💕'];
    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    };

    setParticles(prev => [...prev.slice(-10), newParticle]);
  };

  const handleSqueezeTed = (e: React.MouseEvent) => {
    triggerParticle(e);
    setSqueezeCount(prev => prev + 1);
    setSqueezeBurst(true);
    setTimeout(() => setSqueezeBurst(false), 600);
  };

  // Bear reaction animation mapping based on moodId
  const getBearVisual = () => {
    switch (mood.moodId) {
      case 'happy':
        return { emoji: '🥳', badge: 'Happy Bear Dance!', aura: 'from-amber-300 via-orange-300 to-amber-200' };
      case 'calm':
        return { emoji: '😌', badge: 'Peaceful Zen Hug', aura: 'from-emerald-300 via-teal-200 to-emerald-100' };
      case 'hug':
        return { emoji: '🤗', badge: 'Tight Bear Squeeze!', aura: 'from-rose-400 via-pink-300 to-rose-200' };
      case 'sad':
        return { emoji: '🥺', badge: 'Holding You Close', aura: 'from-indigo-300 via-[#5c3a21]/20 to-slate-200' };
      case 'tired':
        return { emoji: '😴', badge: 'Blanket & Pillow Time', aura: 'from-violet-300 via-purple-200 to-indigo-100' };
      case 'frustrated':
        return { emoji: '🧸', badge: 'Eating Your Stress away!', aura: 'from-amber-400 via-stone-300 to-orange-200' };
      default:
        return { emoji: '🧸', badge: 'Warm TED Hug', aura: 'from-rose-300 to-amber-200' };
    }
  };

  const bearVisual = getBearVisual();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md overflow-y-auto">
      
      {/* Background Overlay Click */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-transparent cursor-pointer"
      />

      {/* Main Animated Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-lg bg-white border border-[#5c3a21]/20 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        {/* Top Decorative Banner with Mood Color Gradient */}
        <div className={`p-6 sm:p-8 bg-gradient-to-br ${mood.bgGradient} relative overflow-hidden border-b border-[#5c3a21]/10`}>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white text-[#5c3a21] rounded-full flex items-center justify-center shadow-2xs transition-transform active:scale-95 cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Floating Micro Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 1, y: p.y, x: p.x, scale: 0.8 }}
                animate={{ opacity: 0, y: p.y - 60, scale: 1.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute text-xl pointer-events-none"
              >
                {p.emoji}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left relative z-10">
            {/* Interactive Animated TED Bear Avatar */}
            <motion.div
              animate={squeezeBurst ? { scale: [1, 1.25, 0.95, 1], rotate: [0, -10, 10, 0] } : { y: [0, -4, 0] }}
              transition={squeezeBurst ? { duration: 0.4 } : { repeat: Infinity, duration: 3, ease: "easeInOut" }}
              onClick={handleSqueezeTed}
              className={`relative w-20 h-20 bg-gradient-to-tr ${bearVisual.aura} rounded-3xl p-1 shadow-md flex items-center justify-center cursor-pointer group shrink-0`}
              title="Click to Squeeze TED!"
            >
              <div className="w-full h-full bg-white/90 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <span className="text-3xl filter drop-shadow-xs group-hover:scale-110 transition-transform">
                  {bearVisual.emoji}
                </span>
                <span className="text-[9px] font-mono font-bold text-[#5c3a21] pt-0.5">
                  Squeeze!
                </span>
              </div>

              {/* Squeeze Counter Badge */}
              <motion.span
                key={squeezeCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-[#5c3a21] text-amber-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-amber-300 shadow-2xs"
              >
                x{squeezeCount}
              </motion.span>
            </motion.div>

            {/* Mood Title & Ambient Badge */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white/90 border border-[#5c3a21]/15 rounded-full text-[10px] font-mono text-[#5c3a21] font-bold shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>{bearVisual.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-[#3D2616]">
                Feeling {mood.label} {mood.emoji}
              </h3>
              <p className="text-xs text-[#5c3a21]/70 font-sans">
                {mood.ambientType} • Prepared with love in Nigeria & Canada
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Personal Letter from TED */}
          <div className="bg-[#FAF7F2] border border-[#5c3a21]/15 p-5 rounded-2xl space-y-2 relative">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-800 tracking-wider block">
              🧸 TED's Loving Letter to Smadar
            </span>
            <p className="text-sm font-serif italic text-[#3D2616] leading-relaxed pl-2 border-l-2 border-amber-500">
              "{mood.tedLetter}"
            </p>
          </div>

          {/* Interactive Lofi Audio Player */}
          <div className="bg-white border border-[#5c3a21]/15 p-4 rounded-2xl shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(prev => !prev)}
                  className="w-10 h-10 bg-[#5c3a21] hover:bg-[#3D2616] text-white rounded-full flex items-center justify-center shadow-xs cursor-pointer transition-transform active:scale-95 shrink-0"
                >
                  {isPlayingAudio ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
                <div>
                  <span className="text-[9px] font-mono text-amber-800 font-bold uppercase block">
                    🎵 Calming Soundscape
                  </span>
                  <h4 className="text-xs font-display font-bold text-[#3D2616]">
                    {mood.songTitle}
                  </h4>
                  <p className="text-[10px] font-sans text-[#5c3a21]/60">
                    {mood.songArtist}
                  </p>
                </div>
              </div>

              {/* Animated Waveform Equalizer */}
              <div className="flex items-center gap-1 h-6">
                {[40, 80, 50, 100, 65, 30, 85, 45].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={isPlayingAudio ? { height: [`${h}%`, `${(h + 30) % 100}%`, `${h}%`] } : { height: '20%' }}
                    transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: "easeInOut" }}
                    className={`w-1 rounded-full ${isPlayingAudio ? 'bg-amber-600' : 'bg-stone-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Micro-Interaction Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={(e) => {
                triggerParticle(e);
                setActionDone(true);
              }}
              className="p-3.5 bg-[#5c3a21] hover:bg-[#3D2616] text-white text-xs font-sans font-bold rounded-2xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Heart className="w-4 h-4 fill-current text-rose-300" />
              <span>{actionDone ? "Warmth Delivered to Toluwani! 💖" : mood.comfortAction}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenTedChat();
              }}
              className="p-3.5 bg-amber-50 hover:bg-amber-100/80 text-[#3D2616] border border-amber-300 text-xs font-sans font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-amber-700" />
              <span>Chat Deeply with TED 🧸</span>
            </button>
          </div>

          {onNavigateToCare && (
            <div className="text-center pt-2">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToCare();
                }}
                className="text-xs font-sans font-semibold text-[#5c3a21] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Check Cycle & Tummy Comfort Kit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
}
