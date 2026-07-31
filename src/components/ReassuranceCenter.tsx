import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Heart, Sun, Moon, Compass, Sparkles, AlertCircle } from 'lucide-react';

interface MoodMessage {
  mood: string;
  tabLabel: string;
  icon: React.ReactNode;
  subtitle: string;
  title: string;
  letter: string;
  promise: string;
}

const MOODS_DATA: MoodMessage[] = [
  {
    mood: 'lonely',
    tabLabel: 'Feeling Lonely',
    icon: <AlertCircle className="w-4 h-4" />,
    subtitle: 'Read this when Canada feels cold or the distance feels loud.',
    title: 'You Are Never Alone, Smadar',
    letter: 'My baby, when you look around your room in Canada and feel the miles separating us, I want you to close your eyes for just three seconds. Listen to the rhythm of your heartbeat—that is me, breathing with you from Nigeria. Distance is not a barrier; it is just a physical map playing tricks on our eyes. I constructed this space on the internet so you always have a piece of me with you, completely untouched by oceans. I love you beyond any human scale.',
    promise: 'My promise: I will never stop building bridges to you until there are no miles left to cross.'
  },
  {
    mood: 'nigeria',
    tabLabel: 'Missing My Voice',
    icon: <Compass className="w-4 h-4" />,
    subtitle: 'When you miss the warmth of our calls and our shared home.',
    title: 'The Unchanging Coordinate of Love',
    letter: 'Whenever you miss the sounds, the vibes, or my voice holding you tight, know that my heart is permanently anchored to yours. I am wrapping you in a warm, unbreakable embrace. Every single dream of mine starts and ends with you. Let this website be your portal—our private line that coordinates our souls under the very same starry dome.',
    promise: 'My promise: Every sunset I see in Nigeria is my heart sending a warm golden hug to your Canada sunrise.'
  },
  {
    mood: 'stressed',
    tabLabel: 'Stressed & Tired',
    icon: <ShieldAlert className="w-4 h-4" />,
    subtitle: 'When study or work is heavy and you need a peaceful breath.',
    title: 'Inhale Peace, Exhale Doubt',
    letter: 'You are the most resilient, intelligent, and capable woman I have ever known. Do not let temporary stress cloud your beautiful mind, Smadar. Take a deep breath right now. Rest your head against this virtual card and let go of the pressure. You don\'t have to be perfect for me to be intensely proud of you. I adore you just as you are.',
    promise: 'My promise: I will always be the sanctuary where you can drop your armor and simply be loved.'
  },
  {
    mood: 'morning',
    tabLabel: 'Just Waking Up',
    icon: <Sun className="w-4 h-4" />,
    subtitle: 'For your early mornings in Canada when my afternoon is already busy.',
    title: 'Good Morning, My Sunshine',
    letter: 'As you open your beautiful eyes and welcome the Canadian light, know that you were my very first thought today. I send you a gentle kiss across the timezone lines. Let this brand new day bring you beautiful surprises, and carry this truth with you in every step: you are cherished, you are valued, and your baby in Nigeria is cheering you on with all his soul.',
    promise: 'My promise: To love you more today than I did yesterday, under every rising sun.'
  },
  {
    mood: 'sleeping',
    tabLabel: 'Going to Sleep',
    icon: <Moon className="w-4 h-4" />,
    subtitle: 'When you wrap yourself in blankets and get ready to dream.',
    title: 'Sleep Warm, My Angel',
    letter: 'Pull your blanket close and pretend it is my arms holding you. I am watching over you across the coordinates. Rest well, Smadar. Let your dreams be sweet and peaceful, knowing that you are the absolute center of my universe. I will be waiting for your "good morning" message when my world wakes up again.',
    promise: 'My promise: To dream of you, to protect our love, and to be your safest place to land.'
  }
];

export default function ReassuranceCenter() {
  const [activeMood, setActiveMood] = useState<string>('lonely');
  const [clickCount, setClickCount] = useState<number>(0);
  const [showSpecialNote, setShowSpecialNote] = useState<boolean>(false);

  const currentMood = MOODS_DATA.find(m => m.mood === activeMood) || MOODS_DATA[0];

  const handleWarmthClick = () => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setShowSpecialNote(true);
      }
      return next;
    });
  };

  return (
    <section id="reassurance-sanctuary" className="relative py-12 md:py-20 bg-rose-50/30 border-t border-[#5c3a21]/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100/80 border border-rose-200 text-[#3D2616] rounded-full text-[10px] font-sans font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
            <span>The Permanent Sanctuary</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-bold text-[#3D2616] tracking-tight mb-2">
            When You Forget You Are Loved
          </h2>
          <p className="max-w-md mx-auto text-xs sm:text-sm text-[#5c3a21]/70 font-sans">
            I built this space for the moments of quiet. Tap on whatever describes how you feel right now, Smadar.
          </p>
        </div>

        {/* Tab Selection (2-Column Grid on Mobile, 5-Column on Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-8 sm:mb-12">
          {MOODS_DATA.map((item) => {
            const isActive = activeMood === item.mood;
            return (
              <button
                key={item.mood}
                onClick={() => {
                  setActiveMood(item.mood);
                  setShowSpecialNote(false);
                  setClickCount(0);
                }}
                className={`flex items-center gap-2 p-2.5 sm:p-3 text-xs font-sans font-semibold rounded-2xl cursor-pointer transition-all duration-300 text-left ${
                  isActive
                    ? 'bg-[#5c3a21] text-white shadow-xs'
                    : 'bg-white text-[#3D2616] border border-[#5c3a21]/10 hover:border-[#5c3a21]/30 hover:bg-amber-50/40'
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="truncate">{item.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Main Card */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs hover:shadow-sm transition-all relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMood.mood}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 sm:space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono text-rose-600 font-semibold italic block mb-1">
                    {currentMood.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-serif italic font-bold text-[#3D2616] tracking-tight">
                    {currentMood.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#5c3a21]/90 font-serif leading-relaxed italic font-medium">
                  "{currentMood.letter}"
                </p>

                <div className="border-t border-[#5c3a21]/10 pt-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 border border-amber-200/60 text-[10px] font-semibold text-amber-800 rounded-full mb-2">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Unbreakable Oath</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans font-semibold text-[#3D2616]">
                    {currentMood.promise}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-3 flex flex-row items-center justify-between text-[10px] font-mono text-[#5c3a21]/40 border-t border-[#5c3a21]/10">
              <span>Encrypted & Permanent</span>
              <span>Nigeria ➔ Canada</span>
            </div>
          </div>

          {/* Interactive Side panel */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs text-center">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#5c3a21] text-white rounded-full flex items-center justify-center mx-auto shadow-2xs">
                <Heart className="w-4 h-4 fill-current text-rose-300" />
              </div>
              <h4 className="text-sm font-display font-black uppercase tracking-widest text-rose-950">
                Virtual Warmth Activator
              </h4>
              <p className="text-xs text-rose-900/60 font-sans leading-relaxed">
                Need an extra dose of comfort right now? Tap the button below to trigger real-time reassurance particles across your screen.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              <button
                onClick={handleWarmthClick}
                className="w-full bg-rose-950 hover:bg-rose-900 text-white font-display font-black text-[10px] uppercase tracking-widest py-4 border-2 border-rose-950 shadow-[4px_4px_0px_0px_#f43f5e] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#f43f5e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#f43f5e] transition-all"
              >
                Receive Virtual Hug
              </button>

              <AnimatePresence>
                {clickCount > 0 && !showSpecialNote && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-mono text-rose-600 font-bold uppercase tracking-widest"
                  >
                    Warmth Charge: {clickCount * 20}% Activated
                  </motion.div>
                )}

                {showSpecialNote && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 border border-rose-950 p-4 text-left space-y-2 mt-4"
                  >
                    <div className="flex items-center gap-1.5 text-rose-950 font-bold text-[10px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                      <span>Special Coordinate Lock</span>
                    </div>
                    <p className="text-[11px] font-serif leading-relaxed text-rose-900/80">
                      Smadar, my sweet baby, there is no amount of distance that can keep me from loving you. You've clicked this button multiple times because you need to feel me close. Let this message hold you tightly. You are my entire world.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
