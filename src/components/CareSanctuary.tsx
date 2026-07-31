import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SmadarAvatar } from './Illustrations';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Edit3, 
  BookOpen, 
  BarChart3, 
  Heart, 
  Sparkles, 
  Flame, 
  Coffee, 
  Music, 
  X, 
  Check, 
  Smile, 
  Plus,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  crampLevel: string;
  note: string;
  tedResponse: string;
}

export default function CareSanctuary() {
  // Period start date state (stored in localStorage)
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(() => {
    return localStorage.getItem('smadar_period') || '2026-07-25';
  });

  const [cycleLength, setCycleLength] = useState<number>(() => {
    const saved = localStorage.getItem('smadar_cycle_len');
    return saved ? parseInt(saved) : 28;
  });

  const [periodDuration, setPeriodDuration] = useState<number>(() => {
    const saved = localStorage.getItem('smadar_period_dur');
    return saved ? parseInt(saved) : 5;
  });

  // Selected date in horizontal calendar
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Cramp / Flow Severity State
  const [crampLevel, setCrampLevel] = useState<'none' | 'mild' | 'ouchie'>(() => {
    return (localStorage.getItem('smadar_cramp') as any) || 'mild';
  });

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState<boolean>(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState<boolean>(false);
  const [activeComfortModal, setActiveComfortModal] = useState<'hug' | 'tea' | 'music' | 'heatpad' | null>(null);

  // Heating pad & tea states
  const [heatingTemp, setHeatingTemp] = useState<number>(42);
  const [marshmallows, setMarshmallows] = useState<number>(3);
  const [comfortDelivered, setComfortDelivered] = useState<boolean>(false);

  // Journal Entries
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('smadar_journal_entries');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        date: 'July 25, 2026',
        mood: 'Cozy & Needy 🥺',
        crampLevel: 'Mild Cramp 🩹',
        note: 'Felt a little slow this morning. Craving hot tea and TED cuddles.',
        tedResponse: 'Toluwani is wrapping a blanket around your shoulders and bringing extra marshmallows! Rest easy, my princess.'
      },
      {
        id: '2',
        date: 'July 26, 2026',
        mood: 'Peaceful 😌',
        crampLevel: 'No Cramp ✨',
        note: 'Slept really well last night. Heard rain outside and smiled.',
        tedResponse: 'Rainy days with Smadar are my absolute favorite. I love you endlessly.'
      }
    ];
  });

  const [newJournalNote, setNewJournalNote] = useState<string>('');
  const [newJournalMood, setNewJournalMood] = useState<string>('Cozy & Needy 🥺');

  useEffect(() => {
    localStorage.setItem('smadar_period', lastPeriodDate);
  }, [lastPeriodDate]);

  useEffect(() => {
    localStorage.setItem('smadar_cycle_len', cycleLength.toString());
  }, [cycleLength]);

  useEffect(() => {
    localStorage.setItem('smadar_period_dur', periodDuration.toString());
  }, [periodDuration]);

  useEffect(() => {
    localStorage.setItem('smadar_cramp', crampLevel);
  }, [crampLevel]);

  useEffect(() => {
    localStorage.setItem('smadar_journal_entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Calculate current cycle metrics
  const calculateCycleMetrics = () => {
    const lastDate = new Date(lastPeriodDate);
    const today = selectedDate || new Date();
    
    // Difference in days from last period start
    const diffTime = today.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Day in cycle (1 to cycleLength)
    const currentDay = ((diffDays % cycleLength) + cycleLength) % cycleLength + 1;
    
    // Phase calculation
    let phaseName = 'Menstrual';
    let phaseColor = '#C85252'; // Terracotta Red
    let nextPhaseText = `Your ovulation window is expected to start in ${Math.max(1, 14 - currentDay)} days.`;
    let phaseDescription = 'Flow days. Time to rest, stay warm, and let Toluwani pamper you.';

    if (currentDay <= periodDuration) {
      phaseName = 'Menstrual';
      phaseColor = '#BD4040';
      nextPhaseText = `Ovulation window is expected in ${14 - currentDay} days.`;
      phaseDescription = 'Active flow phase. Be gentle with your body and sip hot herbal tea.';
    } else if (currentDay < 14) {
      phaseName = 'Pre-ovulation';
      phaseColor = '#EAA845'; // Warm Gold
      nextPhaseText = `Fertile peak in ${14 - currentDay} days. Energy is rising!`;
      phaseDescription = 'Follicular phase. Estrogen is building, bringing fresh creativity and glow.';
    } else if (currentDay >= 14 && currentDay <= 17) {
      phaseName = 'Ovulation';
      phaseColor = '#4B88BD'; // Soft Blue
      nextPhaseText = `Luteal phase starts in ${18 - currentDay} days.`;
      phaseDescription = 'Peak fertile window! Peak vitality, warmth, and high mood.';
    } else if (currentDay > 17 && currentDay <= 21) {
      phaseName = 'Fertile Period';
      phaseColor = '#52A06E'; // Gentle Green
      nextPhaseText = `Cycle renewal coming in ${cycleLength - currentDay} days.`;
      phaseDescription = 'Post-ovulation window. Gentle balance and blooming vitality.';
    } else {
      phaseName = 'Luteal Phase';
      phaseColor = '#8C6BB1'; // Soft Lavender
      nextPhaseText = `Next period expected in ${cycleLength - currentDay + 1} days.`;
      phaseDescription = 'Cozy prep phase. Gather blankets, warm mugs, and gentle evening walks.';
    }

    return {
      currentDay,
      phaseName,
      phaseColor,
      nextPhaseText,
      phaseDescription,
      daysUntilNext: Math.max(1, cycleLength - currentDay + 1)
    };
  };

  const metrics = calculateCycleMetrics();

  // Format date helper
  const formatDateDisplay = (d: Date) => {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Generate 7-day horizontal calendar strip centered around selectedDate
  const generateWeekDays = () => {
    const days = [];
    const curr = new Date(selectedDate);
    // Start 3 days before selectedDate
    for (let i = -3; i <= 3; i++) {
      const d = new Date(curr);
      d.setDate(curr.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = generateWeekDays();

  // Add a new journal entry
  const handleAddJournalEntry = () => {
    if (!newJournalNote.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      mood: newJournalMood,
      crampLevel: crampLevel === 'none' ? 'No Cramps ✨' : crampLevel === 'mild' ? 'Mild Cramp 🩹' : 'Tummy Ouchie 🩺',
      note: newJournalNote,
      tedResponse: 'TED felt your heart note! Toluwani is sending a big tight hug and holding your hand all day.'
    };

    setJournalEntries([newEntry, ...journalEntries]);
    setNewJournalNote('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9EBE6] via-[#FDF5F2] to-[#FAF2EE] text-[#3D2616] p-3 sm:p-6 md:p-8 font-sans transition-all">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* 1. Header Greeting Banner */}
        <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-[#D9A391]/20 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <SmadarAvatar expression="happy" className="w-12 h-12" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif italic font-bold text-[#3D2616]">
                Hey, Smadar 🌸
              </h2>
              <p className="text-xs text-[#8A5A4A] font-medium">
                {new Date().getHours() < 12 ? 'Good Morning, Princess' : new Date().getHours() < 17 ? 'Good Afternoon, Sweetheart' : 'Good Evening, Baby'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-3.5 py-1.5 bg-white hover:bg-rose-50 text-[#C85252] border border-[#C85252]/20 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Cycle</span>
            </button>
          </div>
        </div>

        {/* 2. Primary Circular Radial Cycle Gauge Card */}
        <div className="relative bg-white/80 backdrop-blur-md border border-[#D9A391]/30 rounded-[2.5rem] p-6 sm:p-8 text-center shadow-xl overflow-hidden flex flex-col items-center">
          
          {/* Subtle background radial aura */}
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/40 via-transparent to-amber-50/30 pointer-events-none" />

          {/* SVG Circular Dial */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              
              {/* Outer Ring Background Track */}
              <circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="#F2DDD5"
                strokeWidth="14"
              />

              {/* Arc 1: Menstrual Phase Segment (0% - 18%) */}
              <circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="#C85252"
                strokeWidth="14"
                strokeDasharray="515"
                strokeDashoffset="420"
                strokeLinecap="round"
              />

              {/* Arc 2: Pre-ovulation Follicular Segment (18% - 46%) */}
              <circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="#EAA845"
                strokeWidth="14"
                strokeDasharray="515"
                strokeDashoffset="310"
                strokeLinecap="round"
              />

              {/* Arc 3: Fertile / Ovulation Segment (46% - 60%) */}
              <circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="#52A06E"
                strokeWidth="14"
                strokeDasharray="515"
                strokeDashoffset="240"
                strokeLinecap="round"
              />

              {/* Arc 4: Ovulation Window Segment (60% - 75%) */}
              <circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="#4B88BD"
                strokeWidth="14"
                strokeDasharray="515"
                strokeDashoffset="180"
                strokeLinecap="round"
              />

              {/* Inner Fine Meter Tick Ring */}
              <circle
                cx="100"
                cy="100"
                r="68"
                fill="none"
                stroke="#E2C4B8"
                strokeWidth="1.5"
                strokeDasharray="3 4"
              />
            </svg>

            {/* Pointer / Marker Pin */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute top-1 z-10 bg-[#9A2D2D] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border-2 border-white shadow-md flex items-center gap-1"
            >
              <span>PERIOD</span>
              <span className="bg-white/20 px-1 rounded">{formatDateDisplay(selectedDate)}</span>
            </motion.div>

            {/* Inner White Center Card */}
            <div className="absolute inset-8 sm:inset-10 bg-white rounded-full border border-[#D9A391]/30 shadow-inner flex flex-col items-center justify-center p-4 text-center z-10">
              <span className="text-xs font-mono font-bold tracking-wider text-[#C85252] uppercase">
                {metrics.phaseName}
              </span>

              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#3D2616] tracking-tight my-0.5">
                Day {metrics.currentDay}
              </h1>

              <p className="text-[10px] sm:text-xs text-[#8A5A4A] leading-tight max-w-[140px] font-sans">
                {metrics.nextPhaseText}
              </p>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="mt-2 px-3 py-0.5 bg-[#FAF2EE] hover:bg-rose-100/60 text-[#8A5A4A] border border-[#D9A391]/30 rounded-full text-[10px] font-bold cursor-pointer transition-all active:scale-95"
              >
                Edit
              </button>
            </div>
          </div>

          {/* 3. Phase Legend Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 pt-2 border-t border-[#D9A391]/20 w-full">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-[#D9A391]/30 rounded-full text-xs font-medium text-[#3D2616] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C85252]"></span>
              <span>Period</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-[#D9A391]/30 rounded-full text-xs font-medium text-[#3D2616] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EAA845]"></span>
              <span>Pre-ovulation</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-[#D9A391]/30 rounded-full text-xs font-medium text-[#3D2616] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4B88BD]"></span>
              <span>Ovulation</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-[#D9A391]/30 rounded-full text-xs font-medium text-[#3D2616] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#52A06E]"></span>
              <span>Fertile Period</span>
            </div>
          </div>

        </div>

        {/* 4. Horizontal Weekly Calendar Strip */}
        <div className="space-y-2">
          {/* Calendar Header Month & Navigation */}
          <div className="flex items-center justify-between px-2">
            <button
              onClick={() => {
                const prev = new Date(selectedDate);
                prev.setDate(prev.getDate() - 7);
                setSelectedDate(prev);
              }}
              className="p-1.5 bg-white/80 hover:bg-white text-[#8A5A4A] rounded-full border border-[#D9A391]/30 cursor-pointer shadow-2xs transition-transform active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 text-xs font-bold text-[#3D2616] font-mono">
              <CalendarIcon className="w-3.5 h-3.5 text-[#C85252]" />
              <span>
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>

            <button
              onClick={() => {
                const next = new Date(selectedDate);
                next.setDate(next.getDate() + 7);
                setSelectedDate(next);
              }}
              className="p-1.5 bg-white/80 hover:bg-white text-[#8A5A4A] rounded-full border border-[#D9A391]/30 cursor-pointer shadow-2xs transition-transform active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 7 Days Strip */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {weekDays.map((d, idx) => {
              const isSelected = d.toDateString() === selectedDate.toDateString();
              const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
              const dateNum = d.getDate();

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(d)}
                  className={`py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#C85252] font-bold shadow-md ring-2 ring-[#C85252]/40 scale-105'
                      : 'bg-white/50 hover:bg-white/80 text-[#8A5A4A] border border-[#D9A391]/20'
                  }`}
                >
                  <span className="text-[10px] font-medium uppercase tracking-wider">
                    {dayName}
                  </span>
                  <span className="text-sm sm:text-base font-serif font-bold mt-0.5">
                    {dateNum}
                  </span>

                  {/* Active Indicator Dot */}
                  {isSelected && (
                    <span className="w-1.5 h-1.5 bg-[#C85252] rounded-full mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Bottom Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Card 1: My Journal */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => setIsJournalModalOpen(true)}
            className="bg-white/90 border border-[#D9A391]/30 rounded-3xl p-5 shadow-xs flex items-center justify-between cursor-pointer group hover:shadow-md transition-all relative overflow-hidden"
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-[#8A5A4A] uppercase tracking-wider block">
                Smadar's Notes
              </span>
              <h3 className="text-base font-serif font-bold text-[#3D2616] mt-0.5">
                My Journal 📖
              </h3>
              <p className="text-xs text-[#8A5A4A]/80 mt-1">
                {journalEntries.length} entries • Log feelings & cramps
              </p>
            </div>

            <div className="w-12 h-12 bg-[#BD4040] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Card 2: Cycle Analysis */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => setIsAnalysisModalOpen(true)}
            className="bg-white/90 border border-[#D9A391]/30 rounded-3xl p-5 shadow-xs flex items-center justify-between cursor-pointer group hover:shadow-md transition-all relative overflow-hidden"
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-[#8A5A4A] uppercase tracking-wider block">
                Health Insights
              </span>
              <h3 className="text-base font-serif font-bold text-[#3D2616] mt-0.5">
                Cycle Analysis 📊
              </h3>
              <p className="text-xs text-[#8A5A4A]/80 mt-1">
                28-day regular pattern • Ovulation breakdown
              </p>
            </div>

            <div className="w-12 h-12 bg-[#C85252] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
          </motion.div>

        </div>

        {/* 6. TED's Tummy & Cramp Comfort Quick Kit */}
        <div className="bg-gradient-to-r from-rose-100/70 via-amber-50/80 to-rose-100/70 border border-[#D9A391]/30 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#C85252]" />
              <h3 className="text-sm font-serif font-bold text-[#3D2616]">
                TED's Tummy Comfort Kit 🩹
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#8A5A4A] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#D9A391]/20">
              Cramp severity: {crampLevel}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setActiveComfortModal('heatpad')}
              className="p-3 bg-white hover:bg-rose-50 text-[#3D2616] border border-[#D9A391]/30 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
            >
              <Flame className="w-4 h-4 text-[#C85252]" />
              <span>42°C Heat Pad</span>
            </button>

            <button
              onClick={() => setActiveComfortModal('tea')}
              className="p-3 bg-white hover:bg-amber-50 text-[#3D2616] border border-[#D9A391]/30 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
            >
              <Coffee className="w-4 h-4 text-amber-700" />
              <span>Hot Cocoa</span>
            </button>

            <button
              onClick={() => setActiveComfortModal('hug')}
              className="p-3 bg-white hover:bg-rose-50 text-[#3D2616] border border-[#D9A391]/30 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <span>Bear Hug</span>
            </button>

            <button
              onClick={() => setActiveComfortModal('music')}
              className="p-3 bg-white hover:bg-emerald-50 text-[#3D2616] border border-[#D9A391]/30 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
            >
              <Music className="w-4 h-4 text-emerald-600" />
              <span>Rainy Lofi</span>
            </button>
          </div>
        </div>

      </div>

      {/* -------------------- MODALS -------------------- */}

      {/* 1. Edit Cycle Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="max-w-md w-full bg-white border border-[#D9A391]/30 rounded-3xl p-6 shadow-2xl space-y-5 relative"
            >
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-stone-100 text-[#8A5A4A] rounded-full flex items-center justify-center hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1">
                <h3 className="font-serif italic font-bold text-xl text-[#3D2616]">
                  Edit Period & Cycle Dates 🗓️
                </h3>
                <p className="text-xs text-[#8A5A4A]">
                  Adjust your cycle details so TED can track your fertility windows accurately.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#3D2616] mb-1">
                    Last Period Start Date:
                  </label>
                  <input
                    type="date"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    className="w-full bg-[#FAF2EE] border border-[#D9A391]/40 rounded-xl p-3 text-xs text-[#3D2616] font-mono cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C85252]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold text-[#3D2616] mb-1">
                    <span>Average Cycle Length:</span>
                    <span className="text-[#C85252]">{cycleLength} Days</span>
                  </div>
                  <input
                    type="range"
                    min={21}
                    max={35}
                    value={cycleLength}
                    onChange={(e) => setCycleLength(Number(e.target.value))}
                    className="w-full accent-[#C85252] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold text-[#3D2616] mb-1">
                    <span>Period Flow Duration:</span>
                    <span className="text-[#C85252]">{periodDuration} Days</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={8}
                    value={periodDuration}
                    onChange={(e) => setPeriodDuration(Number(e.target.value))}
                    className="w-full accent-[#C85252] cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-full py-3 bg-[#C85252] hover:bg-[#A83D3D] text-white text-xs font-bold rounded-2xl shadow-xs cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Cycle Details</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. My Journal Modal */}
      <AnimatePresence>
        {isJournalModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="max-w-lg w-full bg-white border border-[#D9A391]/30 rounded-3xl p-6 shadow-2xl space-y-5 relative max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setIsJournalModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-stone-100 text-[#8A5A4A] rounded-full flex items-center justify-center hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1">
                <h3 className="font-serif italic font-bold text-xl text-[#3D2616]">
                  Smadar's Private Journal 📖
                </h3>
                <p className="text-xs text-[#8A5A4A]">
                  Log thoughts, cramps, or feelings. TED responds to every entry with love.
                </p>
              </div>

              {/* Add Entry Form */}
              <div className="bg-[#FAF2EE] p-4 rounded-2xl space-y-3 border border-[#D9A391]/30">
                <div className="flex gap-2">
                  <select
                    value={newJournalMood}
                    onChange={(e) => setNewJournalMood(e.target.value)}
                    className="bg-white border border-[#D9A391]/40 rounded-xl p-2 text-xs font-bold text-[#3D2616] cursor-pointer"
                  >
                    <option value="Cozy & Needy 🥺">Cozy & Needy 🥺</option>
                    <option value="Peaceful & Glowing 😌">Peaceful & Glowing 😌</option>
                    <option value="Sleepy & Heavy 😴">Sleepy & Heavy 😴</option>
                    <option value="Need Extra Hugs 🤗">Need Extra Hugs 🤗</option>
                  </select>
                </div>

                <textarea
                  value={newJournalNote}
                  onChange={(e) => setNewJournalNote(e.target.value)}
                  placeholder="How is your body feeling today, princess?..."
                  className="w-full bg-white border border-[#D9A391]/40 rounded-xl p-3 text-xs text-[#3D2616] h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#C85252]"
                />

                <button
                  onClick={handleAddJournalEntry}
                  className="w-full py-2 bg-[#C85252] hover:bg-[#A83D3D] text-white text-xs font-bold rounded-xl shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Journal Entry</span>
                </button>
              </div>

              {/* Saved Entries List */}
              <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {journalEntries.map((entry) => (
                  <div key={entry.id} className="bg-white border border-[#D9A391]/20 p-4 rounded-2xl space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#8A5A4A]">
                      <span className="font-bold text-[#3D2616]">{entry.date}</span>
                      <span className="bg-rose-50 text-[#C85252] px-2 py-0.5 rounded-full border border-rose-200">
                        {entry.mood}
                      </span>
                    </div>
                    <p className="text-xs text-[#3D2616] font-sans">
                      "{entry.note}"
                    </p>
                    <div className="bg-[#FAF2EE] border-l-2 border-[#C85252] p-2.5 rounded-r-xl text-xs font-serif italic text-[#8A5A4A]">
                      🧸 TED: {entry.tedResponse}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Cycle Analysis Modal */}
      <AnimatePresence>
        {isAnalysisModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="max-w-md w-full bg-white border border-[#D9A391]/30 rounded-3xl p-6 shadow-2xl space-y-5 relative"
            >
              <button
                onClick={() => setIsAnalysisModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-stone-100 text-[#8A5A4A] rounded-full flex items-center justify-center hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1">
                <h3 className="font-serif italic font-bold text-xl text-[#3D2616]">
                  Cycle Analysis Breakdown 📊
                </h3>
                <p className="text-xs text-[#8A5A4A]">
                  Understanding your body's natural rhythms and energy windows.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-[#FAF2EE] p-3.5 rounded-2xl border border-[#D9A391]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#8A5A4A] font-bold block">Current Cycle Day</span>
                    <span className="text-base font-serif font-bold text-[#3D2616]">Day {metrics.currentDay} of {cycleLength}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-[#C85252] text-white text-xs font-mono font-bold rounded-full">
                    {metrics.phaseName}
                  </span>
                </div>

                <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200 text-xs space-y-1.5">
                  <span className="font-mono font-bold text-[#C85252] block uppercase text-[10px]">
                    💡 Phase Health Insight
                  </span>
                  <p className="text-[#3D2616] font-sans leading-relaxed">
                    {metrics.phaseDescription}
                  </p>
                </div>

                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 text-xs space-y-1.5">
                  <span className="font-mono font-bold text-amber-800 block uppercase text-[10px]">
                    🧸 Toluwani's Care Plan
                  </span>
                  <p className="text-[#3D2616] font-serif italic leading-relaxed">
                    "I have your hot water bottle ready and soft lofi queued up. Take all the time you need today, my love."
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAnalysisModalOpen(false)}
                className="w-full py-3 bg-[#3D2616] hover:bg-black text-white text-xs font-bold rounded-2xl cursor-pointer"
              >
                Close Analysis
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Comfort Kit Interactive Controls Modal */}
      <AnimatePresence>
        {activeComfortModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="max-w-md w-full bg-white border border-[#D9A391]/30 rounded-3xl p-6 shadow-2xl space-y-5 relative"
            >
              <button
                onClick={() => {
                  setActiveComfortModal(null);
                  setComfortDelivered(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 bg-stone-100 text-[#8A5A4A] rounded-full flex items-center justify-center hover:bg-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-rose-100 text-[#C85252] rounded-2xl flex items-center justify-center font-bold text-3xl mx-auto shadow-xs">
                  {activeComfortModal === 'hug' && '🤗'}
                  {activeComfortModal === 'tea' && '☕'}
                  {activeComfortModal === 'music' && '🎶'}
                  {activeComfortModal === 'heatpad' && '🩹'}
                </div>
                <h3 className="font-serif italic font-bold text-xl text-[#3D2616]">
                  {activeComfortModal === 'hug' && "TED's Infinite Bear Hug"}
                  {activeComfortModal === 'tea' && "Marshmallow Hot Cocoa Brewer"}
                  {activeComfortModal === 'music' && "Calming Rainy Lofi"}
                  {activeComfortModal === 'heatpad' && "Virtual Heating Pad"}
                </h3>
              </div>

              {activeComfortModal === 'heatpad' && (
                <div className="space-y-4 bg-rose-50/80 border border-rose-200 p-4 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-rose-900">
                    <span>Heating Temperature:</span>
                    <span className="bg-rose-200/80 px-2.5 py-0.5 rounded-full">{heatingTemp}°C Warm Heat</span>
                  </div>
                  <input
                    type="range"
                    min={38}
                    max={46}
                    value={heatingTemp}
                    onChange={(e) => setHeatingTemp(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <p className="text-xs font-serif italic text-rose-800 text-center">
                    "Place this warm thermal hug over your tummy, baby. Breathe gently and let the cramp ease."
                  </p>
                </div>
              )}

              {activeComfortModal === 'tea' && (
                <div className="space-y-4 bg-amber-50/80 border border-amber-200 p-4 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-900">
                    <span>Extra Marshmallows:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setMarshmallows(Math.max(1, marshmallows - 1))}
                        className="w-6 h-6 bg-white border border-amber-300 rounded-md flex items-center justify-center font-bold text-amber-900 cursor-pointer"
                      >
                        -
                      </button>
                      <span>{marshmallows} 🍡</span>
                      <button
                        onClick={() => setMarshmallows(marshmallows + 1)}
                        className="w-6 h-6 bg-white border border-amber-300 rounded-md flex items-center justify-center font-bold text-amber-900 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-serif italic text-amber-800 text-center">
                    "Steaming hot chocolate with {marshmallows} fluffy marshmallows prepared just for Smadar!"
                  </p>
                </div>
              )}

              {activeComfortModal === 'hug' && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-2">
                  <p className="text-xs font-serif italic text-rose-900 leading-relaxed">
                    "Toluwani is holding your waist, resting his head on your shoulder, and whispering 'You is loved forever, Smadar'."
                  </p>
                </div>
              )}

              {activeComfortModal === 'music' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <p className="text-xs font-serif italic text-emerald-900 leading-relaxed">
                    "Soft rain falling on bamboo leaves mixed with gentle acoustic guitar chords tuned for your ears."
                  </p>
                </div>
              )}

              <button
                onClick={() => setComfortDelivered(true)}
                className="w-full py-3 bg-[#C85252] hover:bg-[#A83D3D] text-white text-xs font-bold rounded-2xl shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <Heart className="w-4 h-4 fill-current text-rose-200" />
                <span>{comfortDelivered ? "Warmth Applied! Hug Sent to Toluwani 💖" : "Activate Virtual Comfort"}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
