import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Smile,
  Calendar,
  BookOpen,
  Camera,
  Image as ImageIcon,
  User,
  Lock,
  Unlock,
  X,
  Check,
  Settings,
  Layers,
  MessageCircle,
  Clock
} from 'lucide-react';

import { Memory } from './types';
import FloatingHearts from './components/FloatingHearts';
import MemoryModal from './components/MemoryModal';
import TedCompanion from './components/TedCompanion';
import HomeExperience from './components/HomeExperience';
import CareSanctuary from './components/CareSanctuary';
import { SmadarAvatar } from './components/Illustrations';
import OurStorySanctuary from './components/OurStorySanctuary';
import ProfileSanctuary from './components/ProfileSanctuary';
import CinematicLanding from './components/CinematicLanding';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import SecretEntrance from './components/SecretEntrance';

export default function App() {
  const [showHollaIntro, setShowHollaIntro] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('smadar_is_logged_in');
    return saved === 'true';
  });

  type TabId = 'home' | 'care' | 'story' | 'profile';
  const NAV_TABS: { id: TabId; label: string; icon: typeof Smile; emoji: string }[] = [
    { id: 'home', label: 'Home', icon: Smile, emoji: '🏠' },
    { id: 'care', label: 'Care', icon: Heart, emoji: '❤️' },
    { id: 'story', label: 'Gallery', icon: Camera, emoji: '📸' }
  ];

  // Primary Navigation Tabs: 'home' | 'care' | 'story' | 'profile'
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isTedWidgetOpen, setIsTedWidgetOpen] = useState<boolean>(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    localStorage.setItem('smadar_is_logged_in', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#5c3a21] font-sans selection:bg-rose-200 selection:text-[#5c3a21] overflow-x-hidden relative pb-20 md:pb-12">

      {/* Landing first, then login if needed, then sanctuary */}
      {showHollaIntro ? (
        <CinematicLanding onComplete={() => setShowHollaIntro(false)} />
      ) : !isLoggedIn ? (
        <SecretEntrance onUnlock={() => { setIsLoggedIn(true); }} />
      ) : (
        <>
          {/* Floating Ambient Hearts on Interaction */}
          <FloatingHearts />

          {/* Floating Apple Music Player */}
          <FloatingMusicPlayer />

          {/* Primary Header Bar */}
          <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#5c3a21]/10 px-4 py-3">
            <div className="max-w-6xl mx-auto flex items-center justify-between">

              {/* Logo & Personal Branding */}
              <button
                onClick={() => setActiveTab('home')}
                className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
              >
                <div className="w-9 h-9 bg-[#5c3a21] text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-2xs group-hover:scale-105 transition-transform">
                  🧸
                </div>
                <div>
                  <h1 className="font-serif italic font-bold text-base text-[#3D2616] leading-none">
                    Smadar Hub
                  </h1>
                  <span className="text-[10px] font-mono text-[#5c3a21]/60 leading-tight block pt-0.5">
                    Built with love by Tolu
                  </span>
                </div>
              </button>

              {/* Desktop Navigation Pill - 3 Primary Tabs */}
              <nav className="hidden md:flex items-center gap-1 bg-white border border-[#5c3a21]/15 rounded-full p-1 shadow-2xs">
                {NAV_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${isActive
                        ? 'bg-[#5c3a21] text-white shadow-2xs'
                        : 'text-[#5c3a21]/70 hover:text-[#5c3a21] hover:bg-amber-50/50'
                        }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-300' : 'text-[#5c3a21]'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Header Action & Top-Right Profile Avatar */}
              <div className="flex items-center gap-2 sm:gap-2.5">



                {/* Top Right Profile Avatar Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('profile')}
                  className={`relative flex items-center gap-2 p-1 sm:pl-1.5 sm:pr-2.5 rounded-full border transition-all cursor-pointer ${activeTab === 'profile'
                    ? 'bg-[#5c3a21] text-white border-[#5c3a21] ring-2 ring-amber-400/60 shadow-xs'
                    : 'bg-white hover:bg-amber-50/80 text-[#3D2616] border-[#5c3a21]/20 shadow-2xs'
                    }`}
                  title="Smadar's Profile & Hub Settings"
                >
                  <div className="relative shrink-0">
                    <SmadarAvatar expression="happy" className="w-8 h-8" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full" title="Online & Connected"></span>
                  </div>

                  <div className="hidden sm:flex flex-col text-left leading-none">
                    <span className="text-[11px] font-display font-bold">Smadar</span>
                    <span className={`text-[9px] font-mono ${activeTab === 'profile' ? 'text-amber-200' : 'text-[#5c3a21]/60'}`}>
                      Profile 🌸
                    </span>
                  </div>
                </motion.button>
              </div>

            </div>
          </header>

          {/* Main Sanctuary Dashboard Views */}
          <main className="max-w-6xl mx-auto px-4 md:px-6 pt-6 pb-24 md:pb-12">
            <AnimatePresence mode="wait">

              {/* 1. HOME EXPERIENCE */}
              {activeTab === 'home' && (
                <motion.div
                  key="home-experience-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <HomeExperience
                    onOpenTedChat={() => setIsTedWidgetOpen(true)}
                    onNavigateToStory={() => setActiveTab('story')}
                    onNavigateToCare={() => setActiveTab('care')}
                  />
                </motion.div>
              )}

              {/* 2. CARE SANCTUARY (Period Tracker, Cycle Calendar, Mood History) */}
              {activeTab === 'care' && (
                <motion.div
                  key="care-sanctuary-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CareSanctuary />
                </motion.div>
              )}

              {/* 3. OUR STORY SANCTUARY (Single Timeline Scrapbook: Photos, Videos, Voice Notes, Dates, Dreams) */}
              {activeTab === 'story' && (
                <motion.div
                  key="story-sanctuary-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <OurStorySanctuary
                    onSelectMemoryModal={(m) => setSelectedMemory(m)}
                  />
                </motion.div>
              )}

              {/* 4. PROFILE SANCTUARY */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile-sanctuary-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProfileSanctuary
                    onLogout={handleLogout}
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </main>

          {/* Floating TED AI Bear Widget (Lives Throughout the Whole App) */}
          <motion.button
            onClick={() => setIsTedWidgetOpen(prev => !prev)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 bg-[#5c3a21] hover:bg-[#3D2616] text-white p-3 rounded-full shadow-lg border-2 border-amber-300 flex items-center gap-2 cursor-pointer group transition-all"
            title="Open TED AI Bear Companion"
          >
            <div className="w-8 h-8 bg-[#B45309] rounded-full flex items-center justify-center font-bold text-lg shrink-0">
              🧸
            </div>
            <div className="hidden sm:flex flex-col text-left pr-1.5">
              <span className="text-[10px] font-sans font-bold leading-none text-amber-200">TED Bear AI</span>
              <span className="text-[9px] font-sans text-white/80 leading-tight">Always With You</span>
            </div>
          </motion.button>

          {/* Floating TED AI Popover Drawer */}
          <AnimatePresence>
            {isTedWidgetOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed bottom-24 md:bottom-20 right-2 md:right-6 z-50 w-[94vw] md:w-[420px] max-w-md shadow-2xl rounded-3xl"
              >
                <TedCompanion
                  isFloatingModal={true}
                  onCloseFloatingModal={() => setIsTedWidgetOpen(false)}
                  onExpandFullScreen={() => {
                    setIsTedWidgetOpen(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded Memory Modal */}
          {selectedMemory && (
            <MemoryModal
              memory={selectedMemory}
              onClose={() => setSelectedMemory(null)}
            />
          )}

          {/* Mobile Bottom Navigation Bar - 3 Primary Tabs */}
          <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#5c3a21]/15 pb-safe shadow-lg">
            <div className="flex justify-around items-center py-2 px-3">
              {NAV_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex flex-col items-center justify-center flex-1 py-1 px-1 text-center focus:outline-none cursor-pointer"
                  >
                    <div className={`p-2 rounded-xl transition-all duration-300 relative ${isActive ? 'bg-[#5c3a21] text-white scale-105 shadow-2xs' : 'text-[#5c3a21]/60 hover:text-[#5c3a21]'
                      }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-sans mt-0.5 font-bold tracking-tight ${isActive ? 'text-[#3D2616]' : 'text-[#5c3a21]/60'
                      }`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </>
      )}

    </div>
  );
}
