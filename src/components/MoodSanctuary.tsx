import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Disc, Play, Pause, Music, Sliders, Star, Volume2 } from 'lucide-react';

interface MoodTrack {
  id: string;
  label: string;
  icon: string;
  emoji: string;
  title: string;
  songName: string;
  letter: string;
  note: string;
  synthFrequency: number; // for our procedural Web Audio sound
  color: string;
}

const MOOD_TRACKS: MoodTrack[] = [
  {
    id: 'lonely',
    label: 'Feeling Lonely',
    icon: '🧸',
    emoji: '❄️',
    title: 'A Warm Shield for Canada Cold',
    songName: "Ocean Bridge (Nostalgic Lullaby)",
    synthFrequency: 293.66, // D4
    color: 'bg-indigo-50 border-indigo-200 text-indigo-950',
    letter: "My beautiful girl, when you look around Canada and the winter winds or empty moments make you feel lonely, please remember this: you is never, ever alone. Every single bit of my heart resides with you. It doesn't matter if there are thousands of miles or whole oceans between us—our souls are tightly stitched together. Whenever you miss me, press play on this tape and hear the low, comforting hum of my love wrapping around you. You is my baby, forever and always.",
    note: "Toluwani's Promise: I am looking at the same stars as you, sending warm golden hugs across the sky."
  },
  {
    id: 'missing',
    label: 'Missing Me',
    icon: '📞',
    emoji: '💓',
    title: 'The Voice Memo of My Heart',
    songName: "Nigeria to Canada (Warm Sunrise chords)",
    synthFrequency: 329.63, // E4
    color: 'bg-rose-50 border-rose-200 text-rose-950',
    letter: "I know the timezone difference can make our days feel disjointed, baby. When my afternoon is busy and your morning is just starting, or when you wish you could hear my actual laughter, know that you are my very first and last thought of every day. This website is our private coordinate. The digital bridge never closes. Close your eyes, pretend I am whispering in your ear, and let this song carry my heartbeat straight into your room. I love you so vewy much.",
    note: "Toluwani's Promise: Our distance is just a temporary countdown. Every sunset brings us closer."
  },
  {
    id: 'stressed',
    label: 'Stressed / Tired',
    icon: '📚',
    emoji: '☕',
    title: 'Drop Your Heavy Armor',
    songName: "Cozy Blanket (Soft Ambient Rain)",
    synthFrequency: 261.63, // C4
    color: 'bg-amber-50 border-amber-200 text-amber-950',
    letter: "Take a deep breath right now, Smadar. Release your shoulders. Loosen your jaw. You is the most intelligent, brilliant, and resilient woman I have ever known. But you don't have to be perfect all the time. You don't have to carry the weight of the entire world on your beautiful shoulders. Drop your armor right here. Let TED and me tuck you in. This space is completely safe—no pressure, no expectations. Just pure, endless appreciation for exactly who you is.",
    note: "Toluwani's Promise: No matter how hard the exams or work are, you've already won my entire heart."
  },
  {
    id: 'happy',
    label: 'Happy / Excited',
    icon: '✨',
    emoji: '🎉',
    title: 'Celebrating Your Eternal Glow',
    songName: "Smadar's Smile (Cheerful Melody)",
    synthFrequency: 392.00, // G4
    color: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    letter: "Yes! *dances with fuzzy teddy paws* Your joy is the most beautiful thing in the whole universe. When you smile, Nigeria lights up, Canada glows, and TED spins around with happiness. I built this sanctuary not just for the quiet moments, but to stand as a celebration of your gorgeous life. Let your laughter echo across the servers! Keep shining, my little star. You are a masterpiece.",
    note: "Toluwani's Promise: I will spend my entire life making sure your laugh is the soundtrack of our future."
  },
  {
    id: 'sleepy',
    label: 'Going to Sleep',
    icon: '🌙',
    emoji: '🛌',
    title: 'Under the Velvet Canopy',
    songName: "Sweet Dreams (Sleepy Box Tune)",
    synthFrequency: 220.00, // A3
    color: 'bg-violet-50 border-violet-200 text-violet-950',
    letter: "Time to wrap yourself in cozy blankets, baby. Pretend that my arms are folded tightly around you, holding you through the night. Rest your beautiful mind. The stars above Canada are keeping watch, and my love is a permanent shield guarding your dreams. I will be waiting right here when you open your eyes in the morning. Sleep warm, my angel. Goodnight.",
    note: "Toluwani's Promise: I will always meet you in our shared dream landscape, completely untouched by geography."
  }
];

export default function MoodSanctuary() {
  const [activeMood, setActiveMood] = useState<string>('lonely');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentMood = MOOD_TRACKS.find(m => m.id === activeMood) || MOOD_TRACKS[0];

  // Procedural Web Audio API sound generation
  const startAudio = (freq: number) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Stop previous oscillator if any
      stopAudio();

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Create a warm, cozy synth tone (triangle wave)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Low frequency modulation (vibrato) for organic warmth
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(4, ctx.currentTime); // 4Hz vibration
      lfoGain.gain.setValueAtTime(2, ctx.currentTime); // depth
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      // Soft envelope (fade in)
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime((volume / 100) * 0.15, ctx.currentTime + 1.5);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gainNode;
      setIsPlaying(true);
    } catch (err) {
      console.warn("Audio Context blocked or failed:", err);
    }
  };

  const stopAudio = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (e) {}
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio(currentMood.synthFrequency);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      // Smooth transition to new frequency when mood changes
      if (oscillatorRef.current && audioCtxRef.current) {
        oscillatorRef.current.frequency.exponentialRampToValueAtTime(
          currentMood.synthFrequency,
          audioCtxRef.current.currentTime + 0.8
        );
      }
    }
  }, [activeMood, currentMood.synthFrequency]);

  // Adjust volume dynamically
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        (volume / 100) * 0.15,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <section id="mood-sanctuary" className="relative py-12 md:py-20 bg-[#FAF6F0] border-t border-[#5c3a21]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 text-[10px] font-sans font-semibold text-[#5c3a21] rounded-full mb-3">
            <Music className="w-3.5 h-3.5 text-amber-600" />
            <span>Cozy Room Radios</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#3D2616] tracking-tight mb-2">
            My Mood Sanctuary
          </h2>
          <p className="text-xs sm:text-sm text-[#5c3a21]/70 font-sans max-w-md mx-auto">
            Choose what best describes how you is feeling right now, Smadar. Let TED and Toluwani provide the perfect cozy reply.
          </p>
        </div>

        {/* Mood Grid Selectors (2-Column Grid on Mobile, 5-Column on Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-8 sm:mb-12">
          {MOOD_TRACKS.map((m) => {
            const isActive = activeMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveMood(m.id);
                  if (isPlaying) {
                    startAudio(m.synthFrequency);
                  }
                }}
                className={`flex items-center gap-2 p-2.5 sm:p-3.5 text-xs font-sans font-semibold rounded-2xl cursor-pointer transition-all duration-300 text-left ${
                  isActive
                    ? 'bg-[#5c3a21] text-white shadow-xs'
                    : 'bg-white text-[#3D2616] border border-[#5c3a21]/10 hover:border-[#5c3a21]/30 hover:bg-amber-50/40'
                }`}
              >
                <span className="text-lg shrink-0">{m.icon}</span>
                <span className="truncate">{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Layout of the Sanctuary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Handwritten Letter Column */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs hover:shadow-sm transition-all relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMood.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl">{currentMood.emoji}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-semibold">
                      Letter Coordinates Locked
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-serif italic font-bold text-[#3D2616] tracking-tight leading-tight">
                    {currentMood.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#5c3a21]/90 font-serif leading-relaxed italic font-medium">
                  "{currentMood.letter}"
                </p>

                <div className="border-t border-[#5c3a21]/10 pt-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 border border-amber-200/60 text-[10px] font-semibold text-amber-800 rounded-full mb-2">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Unbreakable Oath</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans font-semibold text-[#3D2616]">
                    {currentMood.note}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-3 border-t border-[#5c3a21]/10 flex flex-row items-center justify-between text-[10px] font-mono text-[#5c3a21]/40">
              <span>SMA-STITCHED-COZY</span>
              <span>Nigeria ➔ Canada</span>
            </div>
          </div>

          {/* Interactive Cassette Tape Radio Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs text-center relative overflow-hidden">
            {/* Cassette visualization */}
            <div className="space-y-5">
              <div className="inline-block px-3 py-1 bg-[#5c3a21] text-white text-[10px] font-sans font-semibold rounded-full">
                Virtual Sound Deck
              </div>
              
              {/* Cute Retro Tape Case */}
              <div className="bg-[#FAF6F0] border border-[#5c3a21]/15 rounded-2xl p-4 relative overflow-hidden shadow-2xs max-w-sm mx-auto">
                {/* Tape Label */}
                <div className="bg-amber-100/80 border border-[#5c3a21]/10 rounded-lg p-3 text-left relative z-10 mb-3">
                  <div className="text-[8px] font-mono text-[#5c3a21]/50 uppercase tracking-widest mb-0.5">
                    C-60 CHORD SYNTH
                  </div>
                  <div className="font-serif italic text-xs font-bold text-[#3D2616] truncate">
                    {currentMood.songName}
                  </div>
                </div>

                {/* Reels */}
                <div className="flex items-center justify-center gap-12 py-6 bg-white/75 border-2 border-dashed border-[#5c3a21]/20 rounded-xl relative">
                  {/* Left reel */}
                  <motion.div 
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="w-12 h-12 bg-[#5c3a21] rounded-full flex items-center justify-center relative shadow-md shrink-0"
                  >
                    <div className="w-4 h-4 bg-[#FAF6F0] rounded-full border border-[#5c3a21]" />
                    <div className="absolute inset-1.5 border-2 border-dashed border-amber-200/40 rounded-full" />
                  </motion.div>

                  {/* Tape window showing remaining time */}
                  <div className="w-16 h-8 bg-zinc-950 rounded border border-[#5c3a21]/40 shadow-inner flex items-center justify-center">
                    <span className="text-[10px] text-red-500 font-mono font-bold animate-pulse tracking-widest">
                      {isPlaying ? 'PLAY' : 'STOP'}
                    </span>
                  </div>

                  {/* Right reel */}
                  <motion.div 
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="w-12 h-12 bg-[#5c3a21] rounded-full flex items-center justify-center relative shadow-md shrink-0"
                  >
                    <div className="w-4 h-4 bg-[#FAF6F0] rounded-full border border-[#5c3a21]" />
                    <div className="absolute inset-1.5 border-2 border-dashed border-amber-200/40 rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* Tape controls */}
              <div className="space-y-4 max-w-sm mx-auto">
                <button
                  onClick={handlePlayToggle}
                  className={`w-full flex items-center justify-center gap-2 py-4 border-2 border-[#5c3a21] font-display font-black text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                    isPlaying
                      ? 'bg-red-500 text-white shadow-[2px_2px_0px_0px_#5c3a21]'
                      : 'bg-[#5c3a21] text-white shadow-[4px_4px_0px_0px_#fbcfe8] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current text-white animate-pulse" />
                      <span>Stop Cozy Lullaby</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current text-amber-200" />
                      <span>Start Cozy Lullaby</span>
                    </>
                  )}
                </button>

                {/* Synth Frequency description */}
                <p className="text-[10px] text-[#5c3a21]/60 font-sans leading-relaxed">
                  *This plays a customized ambient frequency ({currentMood.synthFrequency}Hz) mapped exactly to your mood to trigger calm and happiness.*
                </p>

                {/* Volume slider */}
                <div className="flex items-center gap-3 bg-white border-2 border-[#5c3a21] px-4 py-2.5">
                  <Volume2 className="w-4 h-4 text-[#5c3a21] shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-1 bg-[#5c3a21]/20 rounded-lg appearance-none cursor-pointer accent-[#5c3a21]"
                  />
                  <span className="text-[10px] font-mono font-bold text-[#5c3a21] w-8">
                    {volume}%
                  </span>
                </div>
              </div>
            </div>

            {/* Custom note of encouragement */}
            <div className="pt-6 border-t border-[#5c3a21]/10 text-left bg-[#FAF6F0]/80 p-4 rounded-xl border border-[#5c3a21]/15 mt-4">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#5c3a21]/50 uppercase tracking-widest mb-1.5">
                <Sliders className="w-3 h-3 text-[#5c3a21]/60" />
                <span>TED's Tuning Recommendation</span>
              </div>
              <p className="text-[11px] font-serif italic text-[#5c3a21]/70 leading-relaxed">
                "Keep the volume low, close your eyes, and listen for the sweet vibrato that mimics a cozy teddy bear heartbeat!"
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
