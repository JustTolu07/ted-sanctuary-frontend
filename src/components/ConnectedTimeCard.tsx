import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RefreshCw, Sun, Moon, CloudSun, Sunset } from 'lucide-react';

interface CityTimeData {
  timeString: string;
  dateString: string;
  hour24: number;
  minute: number;
  periodLabel: string;
  periodTag: 'morning' | 'afternoon' | 'evening' | 'night';
}

function getCityTimeInfo(timeZone: string): CityTimeData {
  const now = new Date();

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const hourFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    hour12: false,
  });

  const minuteFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    minute: 'numeric',
  });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const timeString = timeFormatter.format(now);
  const hour24 = parseInt(hourFormatter.format(now), 10) || 0;
  const minute = parseInt(minuteFormatter.format(now), 10) || 0;
  const dateString = dateFormatter.format(now);

  let periodLabel = 'Day';
  let periodTag: 'morning' | 'afternoon' | 'evening' | 'night' = 'morning';

  if (hour24 >= 5 && hour24 < 12) {
    periodLabel = 'Morning';
    periodTag = 'morning';
  } else if (hour24 >= 12 && hour24 < 17) {
    periodLabel = 'Afternoon';
    periodTag = 'afternoon';
  } else if (hour24 >= 17 && hour24 < 21) {
    periodLabel = 'Evening';
    periodTag = 'evening';
  } else {
    periodLabel = 'Night';
    periodTag = 'night';
  }

  return {
    timeString,
    dateString,
    hour24,
    minute,
    periodLabel,
    periodTag
  };
}

function getTimeDifferenceHours(tz1: string, tz2: string): number {
  const now = new Date();
  
  const getOffsetInMinutes = (timeZone: string) => {
    const str = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
    }).format(now);
    
    const match = str.match(/GMT([+-]\d+)(?::(\d+))?/);
    if (!match) return 0;
    const hours = parseInt(match[1], 10);
    const mins = match[2] ? parseInt(match[2], 10) : 0;
    return hours * 60 + (hours >= 0 ? mins : -mins);
  };

  const offset1 = getOffsetInMinutes(tz1);
  const offset2 = getOffsetInMinutes(tz2);
  const diffMinutes = Math.abs(offset1 - offset2);
  return Math.round(diffMinutes / 60);
}

export const ConnectedTimeCard: React.FC = () => {
  const [abujaTime, setAbujaTime] = useState<CityTimeData>(() => getCityTimeInfo('Africa/Lagos'));
  const [montrealTime, setMontrealTime] = useState<CityTimeData>(() => getCityTimeInfo('America/Toronto'));
  const [hoursDiff, setHoursDiff] = useState<number>(() => getTimeDifferenceHours('Africa/Lagos', 'America/Toronto'));
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAbujaTime(getCityTimeInfo('Africa/Lagos'));
      setMontrealTime(getCityTimeInfo('America/Toronto'));
      setHoursDiff(getTimeDifferenceHours('Africa/Lagos', 'America/Toronto'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getDynamicMicrocopy = (): string => {
    const mHour = montrealTime.hour24;
    const aHour = abujaTime.hour24;

    const dynamicQuotes: string[] = [];

    if (mHour >= 22 || mHour < 5) {
      dynamicQuotes.push("Getting late over in Montreal. Rest well, my love.");
    } else if (mHour >= 5 && mHour < 11) {
      dynamicQuotes.push("Good morning, beautiful. I hope today gives you lots of reasons to smile.");
    }

    if ((mHour >= 7 && mHour <= 20) && (aHour >= 7 && aHour <= 20)) {
      dynamicQuotes.push("We're living the same day together.");
    }

    const mAsleep = mHour >= 22 || mHour < 6;
    const aAsleep = aHour >= 22 || aHour < 6;
    if (mAsleep !== aAsleep) {
      dynamicQuotes.push("While one of us dreams, the other is cheering them on.");
    }

    const standardQuotes = [
      "Different clocks. Same us.",
      "If you're reading this, I'm thinking about you.",
      "Another day we're sharing together.",
      "Hope your day is treating you gently.",
      "Distance is just a number when two hearts belong together."
    ];

    const pool = Array.from(new Set([...dynamicQuotes, ...standardQuotes]));
    return pool[quoteIndex % pool.length];
  };

  const handleNextQuote = () => {
    setIsRotating(true);
    setQuoteIndex(prev => prev + 1);
    setTimeout(() => setIsRotating(false), 500);
  };

  const getPeriodIcon = (periodTag: 'morning' | 'afternoon' | 'evening' | 'night') => {
    switch (periodTag) {
      case 'morning':
        return <Sun className="w-3.5 h-3.5 text-amber-500" />;
      case 'afternoon':
        return <CloudSun className="w-3.5 h-3.5 text-amber-600" />;
      case 'evening':
        return <Sunset className="w-3.5 h-3.5 text-rose-500" />;
      case 'night':
        return <Moon className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white/95 backdrop-blur-md border border-[#5c3a21]/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
    >
      {/* Soft warm backdrop accent glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-50/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#5c3a21]/5 mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#5c3a21]/80">
            Together, Right Now
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-50/80 border border-amber-200/50 rounded-full text-[11px] font-sans font-semibold text-amber-900 flex items-center gap-1.5">
            <span>🤎 Together</span>
          </span>
        </div>
      </div>

      {/* Main Grid for Cities (Mobile 2-Column Grid, Desktop 11-Col Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-11 items-center gap-2.5 sm:gap-4 relative z-10">
        
        {/* Abuja City */}
        <div className="col-span-1 md:col-span-5 bg-[#FAF7F2] border border-[#5c3a21]/10 rounded-2xl p-3 sm:p-4.5 space-y-1.5 sm:space-y-2 relative group transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl">🇳🇬</span>
              <span className="font-display font-bold text-xs sm:text-sm text-[#3D2616]">
                Abuja
              </span>
            </div>
            <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-white border border-[#5c3a21]/10 text-[10px] sm:text-[11px] font-medium text-[#5c3a21]/70">
              {getPeriodIcon(abujaTime.periodTag)}
              <span className="hidden xs:inline">{abujaTime.periodLabel}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-0.5 sm:pt-1">
            <span className="font-mono font-bold text-lg sm:text-2xl md:text-4xl text-[#3D2616] tracking-tight">
              {abujaTime.timeString}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#5c3a21]/50">
              {abujaTime.dateString}
            </span>
          </div>
        </div>

        {/* Center Heart & Emotional Connection (Desktop middle column, subtle badge on mobile) */}
        <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center py-0">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-9 h-9 rounded-full bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-500 shadow-xs"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          </motion.div>
          <span className="mt-1.5 text-[10px] font-mono font-medium text-[#5c3a21]/50 text-center whitespace-nowrap">
            {hoursDiff}h diff
          </span>
        </div>

        {/* Montreal City */}
        <div className="col-span-1 md:col-span-5 bg-[#FAF7F2] border border-[#5c3a21]/10 rounded-2xl p-3 sm:p-4.5 space-y-1.5 sm:space-y-2 relative group transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl">🇨🇦</span>
              <span className="font-display font-bold text-xs sm:text-sm text-[#3D2616]">
                Montreal
              </span>
            </div>
            <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-white border border-[#5c3a21]/10 text-[10px] sm:text-[11px] font-medium text-[#5c3a21]/70">
              {getPeriodIcon(montrealTime.periodTag)}
              <span className="hidden xs:inline">{montrealTime.periodLabel}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-0.5 sm:pt-1">
            <span className="font-mono font-bold text-lg sm:text-2xl md:text-4xl text-[#3D2616] tracking-tight">
              {montrealTime.timeString}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#5c3a21]/50">
              {montrealTime.dateString}
            </span>
          </div>
        </div>

      </div>

      {/* Dynamic Warm Thought Strip */}
      <div className="mt-5 pt-4 border-t border-[#5c3a21]/5 flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex + getDynamicMicrocopy()}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.3 }}
              className="text-xs md:text-sm font-serif italic text-[#3D2616]/80 font-medium truncate"
            >
              "{getDynamicMicrocopy()}"
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={handleNextQuote}
          title="Cycle thought"
          className="p-1.5 rounded-full bg-[#FAF7F2] hover:bg-amber-100/60 text-[#5c3a21]/50 hover:text-[#5c3a21] transition-all shrink-0 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
};
