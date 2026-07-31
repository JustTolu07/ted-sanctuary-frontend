import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  Coffee,
  Music,
  Play,
  Pause,
  ArrowRight,
  Check,
  Droplet,
  Moon as MoonIcon,
  Trophy,
  Calendar,
  RefreshCw,
  MessageCircle,
  BookOpen,
  Volume2,
  VolumeX,
  Sun,
  Smile
} from 'lucide-react';
import { ConnectedTimeCard } from './ConnectedTimeCard';
import { TedHeroGreeting } from './TedHeroGreeting';
import FeelingSanctuaryModal, { MoodResponse } from './FeelingSanctuaryModal';
import { SmadarAvatar, WaterDropIllustration, MoonIllustration, TrophyIllustration, WaterCupIcon, TedBearIllustration } from './Illustrations';

interface HomeExperienceProps {
  onOpenTedChat: () => void;
  onNavigateToStory: () => void;
  onNavigateToCare: () => void;
}

const MOOD_RESPONSES: Record<string, MoodResponse> = {
  happy: {
    moodId: 'happy',
    emoji: '😊',
    label: 'Happy',
    tedLetter: "I see that gorgeous smile all the way from Nigeria, Smadar! Your happiness makes my whole world light up. Toluwani and TED are doing a happy bear dance for you right now!",
    songTitle: "Golden Hour Sunshine",
    songArtist: "Warm Lofi Cafe & Acoustic Guitar",
    ambientType: "☀️ Bright Warm Sunshine",
    comfortAction: "Send Toluwani a Happy Hug 💖",
    bgGradient: "from-amber-50/90 via-orange-50/50 to-amber-50/90"
  },
  calm: {
    moodId: 'calm',
    emoji: '😌',
    label: 'Calm',
    tedLetter: "Ahhh... peaceful quiet hours in Canada. I love when your mind is relaxed and unbothered, Smadar. Sip your warm beverage and know that Toluwani loves you softly.",
    songTitle: "Quiet Mountain Rain",
    songArtist: "Soft Piano Lullaby for Smadar",
    ambientType: "🌿 Peaceful Soft Breeze",
    comfortAction: "Sip Warm Chamomile Tea 🍵",
    bgGradient: "from-emerald-50/80 via-teal-50/40 to-emerald-50/80"
  },
  hug: {
    moodId: 'hug',
    emoji: '🥺',
    label: 'Need a Hug',
    tedLetter: "Come here! Open your arms right now and squeeze TED as hard as you can! Toluwani is sending an infinite, tight, warm hug across the oceans straight to Montreal.",
    songTitle: "Acoustic Warm Hug",
    songArtist: "Toluwani's Personal Guitar Melodies",
    ambientType: "🧸 Deep Bear Hug Blanket",
    comfortAction: "Receive Infinite Plush Hugs 🤗",
    bgGradient: "from-rose-50/90 via-pink-50/60 to-rose-50/90"
  },
  sad: {
    moodId: 'sad',
    emoji: '😔',
    label: 'Sad',
    tedLetter: "Sowie, my baby. It's okay if today feels heavy or hard. You don't have to be strong all the time. Put your head down on your pillow and let TED sit right next to you.",
    songTitle: "Soft Lofi Raindrops on Window",
    songArtist: "Gentle Cello & Piano",
    ambientType: "🌧️ Gentle Cozy Rainfall",
    comfortAction: "Light a Warm Candle 🕯️",
    bgGradient: "from-indigo-50/80 via-slate-50/60 to-indigo-50/80"
  },
  tired: {
    moodId: 'tired',
    emoji: '😴',
    label: 'Tired',
    tedLetter: "Your heavy eyelids need rest, Smadar. Unclench your jaw, drop your shoulders, and pull your duvet up to your chin. TED is guarding your dreams, baby.",
    songTitle: "Midnight Cloud Lullaby",
    songArtist: "Sleeping Beats & Soft Waves",
    ambientType: "🌙 Soft Moonlight Lullaby",
    comfortAction: "Tuck Under Fluffy Blanket 🛌",
    bgGradient: "from-violet-50/80 via-purple-50/40 to-violet-50/80"
  },
  frustrated: {
    moodId: 'frustrated',
    emoji: '😤',
    label: 'Frustrated',
    tedLetter: "Take a deep breath in... 1, 2, 3... and let it out softly. Whatever annoyed or stressed you today in Canada does NOT deserve your peace, Smadar. Toluwani is in your corner forever.",
    songTitle: "Deep Calm Breathing Melodies",
    songArtist: "Meditation Chimes & Ocean Waves",
    ambientType: "🌊 Soothing Ocean Tide",
    comfortAction: "Take 3 Deep Calm Breaths 💨",
    bgGradient: "from-stone-50/90 via-amber-50/40 to-stone-50/90"
  }
};

export default function HomeExperience({ onOpenTedChat, onNavigateToStory, onNavigateToCare }: HomeExperienceProps) {
  // Mood Selection State
  const [selectedMood, setSelectedMood] = useState<string>(() => {
    return localStorage.getItem('smadar_current_mood') || 'happy';
  });

  // Water Tracker State (cups logged out of 10)
  const [waterCups, setWaterCups] = useState<number>(() => {
    const saved = localStorage.getItem('smadar_water_cups');
    return saved ? parseInt(saved) : 6;
  });

  // Sleep Tracker State
  const [sleepHours, setSleepHours] = useState<number>(() => {
    const saved = localStorage.getItem('smadar_sleep_hours');
    return saved ? parseFloat(saved) : 8.2;
  });

  // Selfcare Completed Checklist State
  const [selfcareCompleted, setSelfcareCompleted] = useState<boolean>(() => {
    return localStorage.getItem('smadar_selfcare_done') === 'true';
  });

  // Carousel Active Slide State
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // Modals & Drawers State
  const [activeModalMood, setActiveModalMood] = useState<MoodResponse | null>(null);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState<boolean>(false);
  const [isSelfcareModalOpen, setIsSelfcareModalOpen] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Dynamic Greeting based on time
  const [greeting, setGreeting] = useState<string>("Good morning");
  const [currentDateStr, setCurrentDateStr] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 5 && hours < 12) setGreeting("Good morning");
    else if (hours >= 12 && hours < 17) setGreeting("Good afternoon");
    else if (hours >= 17 && hours < 22) setGreeting("Good evening");
    else setGreeting("Good night");

    const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    setCurrentDateStr(now.toLocaleDateString('en-US', dateOptions));
  }, []);

  useEffect(() => {
    localStorage.setItem('smadar_current_mood', selectedMood);
  }, [selectedMood]);

  useEffect(() => {
    localStorage.setItem('smadar_water_cups', waterCups.toString());
  }, [waterCups]);

  useEffect(() => {
    localStorage.setItem('smadar_sleep_hours', sleepHours.toString());
  }, [sleepHours]);

  useEffect(() => {
    localStorage.setItem('smadar_selfcare_done', selfcareCompleted.toString());
  }, [selfcareCompleted]);

  const activeResponse = MOOD_RESPONSES[selectedMood] || MOOD_RESPONSES.happy;

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleWaterCupClick = (index: number) => {
    if (index < waterCups) {
      setWaterCups(index);
    } else {
      setWaterCups(index + 1);
    }
  };

  // Toggle Web Audio Relaxing Raindrops Synthesizer
  const toggleRainAudio = () => {
    if (isPlayingAudio) {
      if ((window as any)._rainAudioCtx) {
        (window as any)._rainAudioCtx.suspend();
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        let ctx = (window as any)._rainAudioCtx;
        if (!ctx) {
          ctx = new AudioCtx();
          (window as any)._rainAudioCtx = ctx;

          // Generate 5s pink noise for rain sound
          const bufferSize = ctx.sampleRate * 5;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = buffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.1;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = buffer;
          whiteNoise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 900;

          const gainNode = ctx.createGain();
          gainNode.gain.value = 0.12;

          whiteNoise.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);

          whiteNoise.start();
        } else {
          ctx.resume();
        }
        setIsPlayingAudio(true);
      } catch (err) {
        console.log('Audio playback error:', err);
        setIsPlayingAudio(true);
      }
    }
  };

  // Carousel Content Slides
  const carouselSlides = [
    {
      id: 0,
      title: "What can you be grateful for today?",
      buttonLabel: "Meditation & Calm",
      action: onOpenTedChat,
      accentBg: "from-[#2A1828] via-[#3D223B] to-[#241323]",
      badge: "✨ Daily Mindful Practice",
      illustration: (
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-200/30 via-rose-300/20 to-purple-400/30 flex items-center justify-center border border-white/20 shadow-inner">
            <span className="text-3xl sm:text-4xl">🪬</span>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "How is your heart feeling, baby?",
      buttonLabel: "Check Mood Hub",
      action: () => setActiveModalMood(activeResponse),
      accentBg: "from-[#3D2616] via-[#5C3A21] to-[#2B180C]",
      badge: "💖 Smadar's Heart Check-in",
      illustration: (
        <SmadarAvatar expression={selectedMood as any} className="w-20 h-20 sm:w-24 sm:h-24" />
      )
    },
    {
      id: 2,
      title: "Connected across 8,800+ km",
      buttonLabel: "Open Media Gallery 📸",
      action: onNavigateToStory,
      accentBg: "from-[#1A2639] via-[#2D3A52] to-[#162030]",
      badge: "🌍 Canada ↔ Nigeria",
      illustration: (
        <TedBearIllustration className="w-20 h-20 sm:w-24 sm:h-24" />
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-16 px-1 sm:px-0">

      {/* 1. Header Section (Matching reference screenshot format!) */}
      <div className="flex items-center justify-between pt-2 px-2">
        <div className="space-y-0.5">
          <span className="text-xs font-mono font-medium text-[#5c3a21]/80 block">
            {currentDateStr || "27 Jul"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-[#3D2616] flex items-center gap-2">
            <span>{greeting}, Smadar</span>
            <span className="text-amber-500 text-lg">✨</span>
          </h1>
        </div>

        <button
          onClick={onOpenTedChat}
          className="p-2 bg-amber-100/80 hover:bg-amber-200/80 text-[#3D2616] rounded-full transition-colors cursor-pointer border border-amber-200/60 shadow-2xs"
          title="Open TED Chat"
        >
          <Sparkles className="w-5 h-5 text-amber-800" />
        </button>
      </div>

      {/* 2. Featured Main Hero Banner (Matching exact layout from Reference Screenshot!) */}
      <div className="space-y-3">
        <div className={`bg-gradient-to-r ${carouselSlides[activeSlide].accentBg} text-white rounded-[2rem] p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all duration-500 border border-white/10`}>
          {/* Subtle Ambient Star Decor */}
          <span className="absolute top-4 right-6 text-xs text-amber-200/40 font-mono">✦</span>
          <span className="absolute bottom-4 left-6 text-xs text-rose-200/40 font-mono">✧</span>

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-8 sm:col-span-8 space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-200/90 uppercase block">
                {carouselSlides[activeSlide].badge}
              </span>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug tracking-tight">
                {carouselSlides[activeSlide].title}
              </h2>

              <div>
                <button
                  onClick={carouselSlides[activeSlide].action}
                  className="px-5 py-2.5 bg-white text-[#3D2616] hover:bg-amber-50 font-sans font-bold text-xs sm:text-sm rounded-full shadow-md cursor-pointer transition-transform active:scale-95 inline-flex items-center gap-2"
                >
                  <span>{carouselSlides[activeSlide].buttonLabel}</span>
                </button>
              </div>
            </div>

            <div className="col-span-4 sm:col-span-4 flex justify-end">
              {carouselSlides[activeSlide].illustration}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots (Matching screenshot reference!) */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {carouselSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              className={`transition-all duration-300 cursor-pointer ${activeSlide === idx
                  ? 'w-8 h-2 bg-[#3D2616] rounded-full'
                  : 'w-2 h-2 bg-[#3D2616]/30 hover:bg-[#3D2616]/60 rounded-full'
                }`}
            />
          ))}
        </div>
      </div>

      {/* 3. "Recommendations" Section Header (Matching Screenshot Layout!) */}
      <div className="pt-2">
        <h3 className="text-sm font-sans font-bold text-[#3D2616]/80 uppercase tracking-wider px-2">
          Recommendations
        </h3>
      </div>

      {/* 4. Recommendations 4-Card Grid (Exact Reference Screenshot Layout!) */}
      <div className="grid grid-cols-2 gap-3.5">

        {/* CARD 1: Sound Card (Left Side Vertical High-Impact Card) */}
        <div className="col-span-1 bg-gradient-to-b from-[#1E3A8A] via-[#1E293B] to-[#0F172A] text-white rounded-[1.8rem] p-5 shadow-md flex flex-col justify-between relative overflow-hidden min-h-[220px] border border-blue-400/20">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-blue-300 uppercase tracking-widest block">
              Sound
            </span>
            <h4 className="text-base font-serif font-bold text-white leading-tight">
              Relaxing raindrops
            </h4>
            <p className="text-[11px] font-sans text-blue-200/80 leading-snug mt-1">
              Soothing raindrops serenade in a tranquil melody for Smadar.
            </p>
          </div>

          <div className="flex items-end justify-between pt-4">
            <span className="text-[10px] font-mono text-blue-300 font-medium">
              5 minutes
            </span>

            {/* Play Button */}
            <button
              onClick={toggleRainAudio}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform active:scale-95 shadow-md ${isPlayingAudio
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-white text-[#1E3A8A] hover:bg-blue-50'
                }`}
              title={isPlayingAudio ? "Pause Raindrops" : "Play Raindrops"}
            >
              {isPlayingAudio ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Stacked Cards (Card 2 & Card 4) */}
        <div className="col-span-1 space-y-3.5">

          {/* CARD 2: TED AI Companion (Top Right Card) */}
          <div
            onClick={onOpenTedChat}
            className="bg-[#2B2C5A] text-white rounded-[1.8rem] p-4 sm:p-5 shadow-md flex flex-col justify-between cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all border border-indigo-400/20 min-h-[105px] group"
          >
            <div className="w-7 h-7 rounded-xl bg-indigo-400/20 flex items-center justify-center text-sm mb-1 group-hover:scale-110 transition-transform">
              🧸
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-white leading-tight">
                TED AI Companion
              </h4>
              <p className="text-[10px] font-sans text-indigo-200/70 mt-0.5">
                Always here for you
              </p>
            </div>
          </div>

          {/* CARD 4: Selfcare & Daily Article (Bottom Right Card) */}
          <div
            onClick={() => setIsSelfcareModalOpen(true)}
            className="bg-[#2D2238] text-white rounded-[1.8rem] p-4 sm:p-5 shadow-md flex flex-col justify-between cursor-pointer hover:ring-2 hover:ring-purple-300 transition-all border border-purple-400/20 min-h-[105px] group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-purple-300 uppercase tracking-widest block">
                Article
              </span>
              <span className="text-xs">🏆</span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="shrink-0">
                <TrophyIllustration className="w-10 h-10 group-hover:scale-105 transition-transform" />
              </div>
              <p className="text-[11px] font-serif font-bold text-purple-100 leading-tight">
                Reasons I love myself ✨
              </p>
            </div>
          </div>

        </div>

        {/* CARD 3: Daily Love Quote Card (Full Width / Bottom Left Card) */}
        <div className="col-span-2 bg-[#222438] text-white rounded-[1.8rem] p-5 shadow-md flex flex-col justify-between border border-slate-700/50">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Daily Love Quote
          </span>

          <blockquote className="text-sm sm:text-base font-serif italic text-amber-100/90 leading-snug">
            "I don't need to wait to rest, I deserve it now."
          </blockquote>

          <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400 font-mono">
            <span>— Toluwani & TED</span>
            <span>Montreal, Canada</span>
          </div>
        </div>

      </div>

      {/* 5. Smadar's Interactive Wellness & Mood Trackers */}
      <div className="pt-4 space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-sans font-bold text-[#3D2616]/80 uppercase tracking-wider">
            Smadar's Daily Hub Trackers
          </h3>
          <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
            Connected 🌸
          </span>
        </div>

        {/* Main Mood Tracker Card */}
        <div className="bg-[#F8A2A2] text-[#3D2616] rounded-[2.2rem] p-6 shadow-md relative overflow-hidden space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-rose-950 uppercase tracking-widest block">
                Mood Tracker
              </span>
              <h2 className="text-xl font-serif font-black text-white drop-shadow-xs">
                How are you feeling today?
              </h2>
            </div>

            <span className="px-3 py-1 bg-white text-[#881337] font-serif font-bold text-xs rounded-full shadow-xs capitalize">
              {selectedMood}
            </span>
          </div>

          <div className="flex items-center justify-center my-1">
            <SmadarAvatar expression={selectedMood as any} className="w-32 h-32 drop-shadow-md" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'happy', label: 'Happy 😊' },
              { id: 'calm', label: 'Calm 😌' },
              { id: 'hug', label: 'Need Hug 🥺' },
              { id: 'sad', label: 'Sad 😔' },
              { id: 'tired', label: 'Tired 😴' },
              { id: 'frustrated', label: 'Stressed 😤' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => handleMoodSelect(m.id)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedMood === m.id
                    ? 'bg-[#881337] text-white shadow-md scale-105 ring-2 ring-white/50'
                    : 'bg-white/80 hover:bg-white text-[#881337]'
                  }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveModalMood(activeResponse)}
            className="w-full py-3 bg-[#881337] hover:bg-[#6b0f2b] text-white font-sans font-bold text-xs rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current text-rose-300" />
            <span>Confirm & Open TED's Embrace 🌸</span>
          </button>
        </div>

        {/* 2x2 Grid of Trackers */}
        <div className="grid grid-cols-2 gap-3.5">

          {/* Sleep Tracker */}
          <div className="bg-[#2B2C5A] text-white rounded-[1.8rem] p-4 shadow-md flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[9px] font-mono font-bold text-purple-200 uppercase tracking-widest block">
                Sleep Tracker
              </span>
              <h3 className="text-sm font-serif font-bold text-white mt-0.5">
                Slept well?
              </h3>
            </div>

            <div className="flex items-center justify-center py-1">
              <MoonIllustration className="w-16 h-16" />
            </div>

            <div className="bg-white/10 p-2 rounded-xl text-center">
              <span className="text-base font-serif font-bold text-amber-200">{sleepHours} hrs</span>
              <p className="text-[9px] text-purple-200 font-sans">Rest protected 🌙</p>
            </div>
          </div>

          {/* Water Tracker */}
          <div
            onClick={() => setIsWaterModalOpen(true)}
            className="bg-[#1E254B] text-white rounded-[1.8rem] p-4 shadow-md flex flex-col justify-between space-y-2 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all group"
          >
            <div>
              <span className="text-[9px] font-mono font-bold text-blue-200 uppercase tracking-widest block">
                Water Tracker
              </span>
              <h3 className="text-sm font-serif font-bold text-white mt-0.5">
                Hydration 💧
              </h3>
            </div>

            <div className="flex items-center justify-center py-1 group-hover:scale-105 transition-transform">
              <WaterDropIllustration level={(waterCups / 10) * 100} className="w-16 h-16" />
            </div>

            <div className="bg-white/10 p-2 rounded-xl text-center">
              <span className="text-base font-serif font-bold text-blue-300">{waterCups}/10 Cups</span>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-blue-400 h-full rounded-full"
                  style={{ width: `${(waterCups / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cycle & Period Tracker Quick Card */}
          <div
            onClick={onNavigateToCare}
            className="col-span-2 bg-[#D87070] text-white rounded-[1.8rem] p-4 sm:p-5 shadow-md flex items-center justify-between cursor-pointer hover:ring-2 hover:ring-rose-200 transition-all"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-rose-100 uppercase tracking-widest block">
                Period & Care Hub
              </span>
              <h3 className="text-base font-serif font-bold text-white">
                Cycle Hub (Day 3)
              </h3>
              <p className="text-xs text-rose-100/90 font-sans">
                Track symptoms, warm tea tips & comforting hugs
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-white text-[#881337] flex items-center justify-center shrink-0 shadow-md">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

        </div>

      </div>

      {/* 6. Connected Nigeria to Canada Time Card */}
      <ConnectedTimeCard />

      {/* -------------------- INTERACTIVE MODALS -------------------- */}

      {/* 1. Water Tracker Modal */}
      <AnimatePresence>
        {isWaterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="max-w-md w-full bg-[#1E254B] text-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6 relative border border-blue-400/30"
            >
              <button
                onClick={() => setIsWaterModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
                  Water Tracker
                </span>
                <h2 className="text-2xl font-serif font-black text-white">
                  Let's get started! 💧
                </h2>
                <p className="text-xs text-blue-200">
                  Tap the cups below to log your daily water intake.
                </p>
              </div>

              <div className="flex justify-center my-2">
                <WaterDropIllustration level={(waterCups / 10) * 100} className="w-32 h-32" />
              </div>

              <div className="space-y-3 bg-white/5 p-4 rounded-3xl border border-white/10">
                <div className="text-center text-xs font-mono text-blue-200 font-bold">
                  Tap to drink water (250ml per cup):
                </div>

                <div className="grid grid-cols-5 gap-2 justify-items-center">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <WaterCupIcon
                      key={idx}
                      filled={idx < waterCups}
                      onClick={() => handleWaterCupClick(idx)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="text-left">
                  <span className="text-2xl font-serif font-bold text-white">{waterCups}/10</span>
                  <span className="text-[10px] text-blue-200 block">250 ml cups</span>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-blue-300">2.5L</span>
                  <span className="text-[10px] text-blue-200 block">Your daily goal</span>
                </div>
              </div>

              <button
                onClick={() => setIsWaterModalOpen(false)}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer"
              >
                Save Hydration Progress
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Selfcare Challenges Modal */}
      <AnimatePresence>
        {isSelfcareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="max-w-md w-full bg-[#8C5248] text-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6 relative border border-amber-300/30"
            >
              <button
                onClick={() => setIsSelfcareModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-amber-200 uppercase tracking-widest">
                  Daily Affirmations & Trophy
                </span>
                <h2 className="text-2xl font-serif font-black text-white">
                  I love myself! 🏆
                </h2>
              </div>

              <div className="flex justify-center my-2">
                <TrophyIllustration className="w-28 h-28" />
              </div>

              <div className="space-y-3 bg-black/20 p-4 rounded-2xl border border-white/10 text-xs text-amber-100 font-sans leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">✨</span>
                  <span>"I am worthy of soft love, peace, and rest today."</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">✨</span>
                  <span>"Distance in kilometers cannot diminish Toluwani's love for me."</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">✨</span>
                  <span>"My mind is calm, my body is healthy, and my heart is safe."</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelfcareCompleted(true);
                  setIsSelfcareModalOpen(false);
                }}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-[#3D2616] font-bold text-xs rounded-2xl shadow-md cursor-pointer"
              >
                Claim Trophy & Complete Challenge 💖
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Interactive Feeling Sanctuary Modal */}
      <AnimatePresence>
        {activeModalMood && (
          <FeelingSanctuaryModal
            mood={activeModalMood}
            onClose={() => setActiveModalMood(null)}
            onOpenTedChat={onOpenTedChat}
            onNavigateToCare={onNavigateToCare}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
