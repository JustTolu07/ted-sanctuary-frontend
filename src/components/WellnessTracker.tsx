import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CupSoda, Calendar, BedDouble, Smile, Heart, CheckSquare, Sparkles, Moon, Sun, Coffee } from 'lucide-react';

interface SelfCareItem {
  id: string;
  task: string;
  icon: string;
  checked: boolean;
}

export default function WellnessTracker() {
  // Hydration state (Watering her visual digital flower)
  const [waterCups, setWaterCups] = useState<number>(() => {
    const saved = localStorage.getItem('smadar_water');
    return saved ? parseInt(saved) : 2;
  });

  // Self-care items
  const [tasks, setTasks] = useState<SelfCareItem[]>(() => {
    const saved = localStorage.getItem('smadar_tasks');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'stretch', task: 'Stretched my legs and rolled my neck', icon: '🧘‍♀️', checked: false },
      { id: 'meal', task: 'Ate a proper, delicious, warm meal', icon: '🍲', checked: false },
      { id: 'screen', task: 'Looked away from my screens for 15 minutes', icon: '👁️', checked: false },
      { id: 'hug', task: 'Gave TED or my favorite plushie a massive squeeze', icon: '🧸', checked: false },
      { id: 'water', task: 'Drank at least 4 glasses of fresh water', icon: '🥛', checked: false },
      { id: 'smile', task: 'Stared in the mirror and remembered I am amazing', icon: '💖', checked: false }
    ];
  });

  // Sleep state
  const [sleepHours, setSleepHours] = useState<number>(() => {
    const saved = localStorage.getItem('smadar_sleep');
    return saved ? parseFloat(saved) : 7.5;
  });

  const [lastPeriodDate, setLastPeriodDate] = useState<string>(() => {
    return localStorage.getItem('smadar_period') || '2026-07-19';
  });

  // Save states to local storage
  useEffect(() => {
    localStorage.setItem('smadar_water', waterCups.toString());
  }, [waterCups]);

  useEffect(() => {
    localStorage.setItem('smadar_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('smadar_sleep', sleepHours.toString());
  }, [sleepHours]);

  useEffect(() => {
    localStorage.setItem('smadar_period', lastPeriodDate);
  }, [lastPeriodDate]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  // Calculate days until next Pajama Prep (assuming typical 28-day cycle)
  const calculateDaysUntilPeriod = () => {
    const last = new Date(lastPeriodDate);
    const next = new Date(last.getTime() + 28 * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diffTime = next.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      // Loop cycle for prototype sanity
      return (28 + (diffDays % 28)) % 28;
    }
    return diffDays;
  };

  const daysLeft = calculateDaysUntilPeriod();

  // Custom comfort recommendation based on days remaining
  const getPeriodComfortRecommendation = () => {
    if (daysLeft <= 3) {
      return "Toluwani says: It's almost cozy pajama time! TED is warming up the hot cocoa mug and placing your favorite heating pads next to your pillows. Time to start slacking off guilt-free, baby!";
    } else if (daysLeft <= 7) {
      return "Toluwani says: Cycle preparation starts now. Make sure you is buying your favorite sweet treats and telling Toluwani if you need a long sweet chat.";
    } else {
      return "Toluwani says: You is in your high-energy phase! Let's enjoy this phase and get things done!";
    }
  };

  // Water flower stage description
  const getFlowerStage = () => {
    if (waterCups <= 1) return { text: "Thirsty Seedling  🌱", desc: "Your flower is looking a bit dry. Give it a tiny drink!", scale: 0.7 };
    if (waterCups <= 3) return { text: "Sprouting Bud 🌿", desc: "A beautiful green sprout is reaching for the sun!", scale: 1.0 };
    if (waterCups <= 5) return { text: "Budding Rose 🌹", desc: "Look at that! Pink petals are starting to peak out!", scale: 1.3 };
    return { text: "Spectacular Eternal Rose 🌸✨", desc: "Completely bloomed! You is wonderfully hydrated, and Toluwani is smiling!", scale: 1.6 };
  };

  const flower = getFlowerStage();

  return (
    <section id="wellness-nook" className="py-12 md:py-20 bg-white border-t border-[#5c3a21]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 text-[10px] font-sans font-semibold text-[#5c3a21] rounded-full mb-3">
            <Smile className="w-3.5 h-3.5 text-amber-600" />
            <span>Cozy Care Cabin</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#3D2616] tracking-tight mb-2">
            Plush Wellness Nook
          </h2>
          <p className="text-xs sm:text-sm text-[#5c3a21]/70 font-sans max-w-md mx-auto">
            Your health and comfort is Toluwani's highest priority. A gentle space to look after yourself.
          </p>
        </div>

        {/* Responsive Grid System (2-Column Mobile Grid, 12-Column Desktop Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">

          {/* 1. Pajama Prep (Period tracker) - 5 Cols */}
          <div className="lg:col-span-5 bg-[#faf7f2] border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-600" />
                  <span className="font-display font-bold text-xs text-[#3D2616]">
                    Pajama Prep (Cycle)
                  </span>
                </div>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />
              </div>

              <div className="bg-white border border-[#5c3a21]/10 p-3.5 sm:p-4 rounded-xl text-center space-y-1 shadow-2xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 font-semibold">
                  Next Soft Pajama Days Expected In
                </span>
                <div className="text-3xl sm:text-4xl font-display font-bold text-[#3D2616] tracking-tight">
                  {daysLeft} <span className="text-sm font-serif italic font-normal">days</span>
                </div>
                <p className="text-[10px] text-[#5c3a21]/50 font-sans font-medium">
                  28-day cycle estimate
                </p>
              </div>

              {/* Set last date gently */}
              <div className="flex items-center justify-between bg-white/60 p-2.5 rounded-lg border border-[#5c3a21]/10 text-xs">
                <label className="text-[10px] font-mono text-[#5c3a21]/70 font-medium">
                  Last Cycle Began:
                </label>
                <input
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  className="bg-white border border-[#5c3a21]/15 text-xs text-[#3D2616] px-2 py-0.5 rounded focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Personalized Comfort prompt */}
            <div className="mt-4 pt-3 border-t border-[#5c3a21]/10 bg-rose-50/50 p-3.5 rounded-xl border border-rose-200/40 relative z-10">
              <span className="block text-[9px] font-mono text-rose-700 font-semibold mb-0.5">
                TED's Cozy Note
              </span>
              <p className="text-xs font-serif italic text-rose-950 leading-relaxed font-medium">
                "{getPeriodComfortRecommendation()}"
              </p>
            </div>
          </div>

          {/* 2. Water her Digital Flower - 7 Cols */}
          <div className="lg:col-span-7 bg-[#faf7f2] border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs hover:shadow-sm transition-all flex flex-col sm:flex-row gap-4 justify-between items-center relative overflow-hidden">
            {/* Left Log Panel */}
            <div className="space-y-3 flex-1 relative z-10 w-full">
              <div className="flex items-center gap-2">
                <CupSoda className="w-4 h-4 text-amber-600" />
                <span className="font-display font-bold text-xs text-[#3D2616]">
                  Watering Toluwani's Flower
                </span>
              </div>

              <p className="text-xs text-[#5c3a21]/70 font-serif italic leading-relaxed">
                Stay hydrated in Canadian weather! Each glass waters your digital rose.
              </p>

              <div className="flex items-center gap-3 bg-white border border-[#5c3a21]/10 p-3.5 rounded-xl shadow-2xs justify-between">
                <div>
                  <span className="block text-[9px] font-mono text-amber-700 font-semibold">
                    Hydration Level
                  </span>
                  <span className="text-2xl font-display font-bold text-[#3D2616]">
                    {waterCups} <span className="text-xs font-sans font-medium text-[#5c3a21]/70">Glasses</span>
                  </span>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => setWaterCups(prev => Math.max(0, prev - 1))}
                    className="w-8 h-8 bg-white hover:bg-amber-50 text-[#3D2616] border border-[#5c3a21]/20 rounded-lg flex items-center justify-center font-bold text-sm shadow-2xs cursor-pointer active:scale-95 transition-transform"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setWaterCups(prev => prev + 1)}
                    className="w-8 h-8 bg-[#5c3a21] hover:bg-[#3D2616] text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-2xs cursor-pointer active:scale-95 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Status banner */}
              <div className="bg-white/60 p-2.5 border border-[#5c3a21]/10 rounded-lg text-left">
                <span className="text-[9px] font-mono text-[#5c3a21]/50 block">Flower Status</span>
                <span className="text-xs font-sans font-bold text-[#3D2616]">{flower.text}</span>
                <p className="text-[11px] font-serif italic text-[#5c3a21]/70">{flower.desc}</p>
              </div>
            </div>

            {/* Right Flower Animation Panel */}
            <div className="w-36 h-40 bg-white border border-[#5c3a21]/10 rounded-2xl flex flex-col items-center justify-center relative shadow-2xs shrink-0 overflow-hidden">
              <motion.div
                animate={{
                  scale: flower.scale,
                  rotate: [0, -2, 2, 0]
                }}
                transition={{
                  scale: { type: "spring", stiffness: 100 },
                  rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                }}
                className="text-5xl z-10 relative select-none mt-2"
              >
                🌸
              </motion.div>

              <div className="w-14 h-9 bg-amber-800 rounded-b-lg rounded-t-xs border border-[#5c3a21]/30 relative z-10 mt-2 shadow-xs flex items-center justify-center">
                <span className="text-[7px] text-amber-100 font-mono tracking-widest uppercase">S & T</span>
              </div>
            </div>

          </div>

          {/* 3. Sleep Cabin - 5 Cols */}
          <div className="lg:col-span-5 bg-[#faf7f2] border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-violet-700" />
                <span className="font-display font-bold text-xs text-[#3D2616]">
                  Counting Cloud Sheep
                </span>
              </div>

              <p className="text-xs text-[#5c3a21]/70 font-serif italic leading-relaxed">
                Did you sleep warm last night, Smadar? Let TED check your energy meter.
              </p>

              <div className="bg-white border border-[#5c3a21]/10 p-3.5 rounded-xl text-center space-y-1.5 shadow-2xs">
                <span className="text-[9px] font-mono text-violet-700 font-semibold block">
                  Last Night's Sleep
                </span>
                <div className="text-2xl font-display font-bold text-[#3D2616]">
                  {sleepHours} <span className="text-xs font-serif italic font-normal">hours</span>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    onClick={() => setSleepHours(prev => Math.max(0, prev - 0.5))}
                    className="w-7 h-7 bg-white border border-[#5c3a21]/15 text-xs font-bold rounded-md hover:bg-violet-50 transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setSleepHours(prev => Math.min(24, prev + 0.5))}
                    className="w-7 h-7 bg-white border border-[#5c3a21]/15 text-xs font-bold rounded-md hover:bg-violet-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Sleep feedback */}
            <div className="mt-3 p-3 bg-violet-50/50 border border-violet-200/50 rounded-xl relative z-10">
              <span className="text-[8px] font-mono text-violet-700 font-semibold block mb-0.5">TED's Sleep Rating</span>
              <p className="text-xs font-serif italic text-violet-950 leading-relaxed font-medium">
                {sleepHours >= 8
                  ? '"Ooooh! Wonderful pillow cuddling, baby! TED is so happy you slept like a princess!"'
                  : sleepHours >= 6
                    ? '"Not too bad, but TED thinks you need a morning nap. Virtual blankets coming!"'
                    : '"Ouchie! Too little sleep! Please close your eyes early tonight, TED is worried."'}
              </p>
            </div>
          </div>

          {/* 4. Self Care Checklist - 7 Cols */}
          <div className="lg:col-span-7 bg-[#faf7f2] border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-rose-600" />
                <span className="font-display font-bold text-xs text-[#3D2616]">
                  Smadar's Daily Gentle Checklist
                </span>
              </div>

              <p className="text-xs text-[#5c3a21]/70 font-serif italic">
                Simple, cozy milestones to make sure Toluwani's princess is looking after herself.
              </p>

              {/* 2-Column Mobile Grid for Checklist Items */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center gap-2 p-2.5 sm:p-3 border rounded-xl cursor-pointer transition-all ${task.checked
                      ? 'bg-[#5c3a21] text-white border-[#5c3a21]'
                      : 'bg-white border-[#5c3a21]/10 hover:border-[#5c3a21]/20 text-[#3D2616]'
                      }`}
                  >
                    <span className="text-lg shrink-0">{task.icon}</span>
                    <span className="text-[11px] sm:text-xs font-sans font-medium leading-tight select-none line-clamp-2">
                      {task.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed status bar */}
            <div className="mt-4 pt-3 border-t border-[#5c3a21]/10 flex items-center justify-between text-[10px] font-mono text-[#5c3a21]/60 relative z-10">
              <span>Self-paced</span>
              <span className="flex items-center gap-1 font-sans font-semibold text-rose-600">
                <Sparkles className="w-3 h-3" />
                <span>Score: {tasks.filter(t => t.checked).length} / {tasks.length} Completed</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
