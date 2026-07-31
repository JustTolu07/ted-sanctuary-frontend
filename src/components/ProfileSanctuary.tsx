import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Lock, Shield, Sparkles, User, Settings, Check, RefreshCw, LogOut } from 'lucide-react';

interface ProfileSanctuaryProps {
  onLogout: () => void;
}

export default function ProfileSanctuary({ onLogout }: ProfileSanctuaryProps) {
  const [usePersonalLanguage, setUsePersonalLanguage] = useState<boolean>(() => {
    const saved = localStorage.getItem('smadar_ted_lang');
    return saved !== 'false';
  });

  const [anniversaryDate, setAnniversaryDate] = useState<string>(() => {
    const saved = localStorage.getItem('smadar_anniversary');
    return saved || '2024-02-14';
  });

  const [passcode, setPasscode] = useState<string>(() => {
    const saved = localStorage.getItem('smadar_passcode');
    return saved || '0717';
  });

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('smadar_ted_lang', usePersonalLanguage ? 'true' : 'false');
  }, [usePersonalLanguage]);

  useEffect(() => {
    localStorage.setItem('smadar_anniversary', anniversaryDate);
  }, [anniversaryDate]);

  useEffect(() => {
    localStorage.setItem('smadar_passcode', passcode);
  }, [passcode]);

  // Calculate days together
  const calculateDaysTogether = () => {
    const start = new Date(anniversaryDate);
    const today = new Date();
    const diff = today.getTime() - start.getTime();
    return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 text-[#5c3a21] rounded-full text-[10px] font-sans font-semibold">
          <Settings className="w-3.5 h-3.5 text-amber-700" />
          <span>Personal Sanctuary Settings</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#3D2616]">
          Profile & TED Preferences
        </h2>
        <p className="text-xs sm:text-sm text-[#5c3a21]/70 font-sans leading-relaxed">
          Customize TED's care dialect, anniversary dates, and security passcode.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-[#5c3a21]/10 rounded-3xl p-6 shadow-xs space-y-6">
        {/* Couple Banner */}
        <div className="flex items-center justify-between bg-[#FAF7F2] p-5 rounded-2xl border border-[#5c3a21]/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#5c3a21] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-xs">
              💖
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#3D2616]">
                Smadar & Toluwani
              </h3>
              <p className="text-xs font-serif italic text-[#5c3a21]/70">
                Abuja, Nigeria ↔ Montreal, Canada
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-[#5c3a21]/60 block font-semibold">
              Together For
            </span>
            <span className="text-xl font-display font-bold text-rose-600">
              {calculateDaysTogether()} <span className="text-xs font-serif italic font-normal">days</span>
            </span>
          </div>
        </div>

        {/* TED Personality Settings */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-sm text-[#3D2616] border-b border-[#5c3a21]/10 pb-2">
            🧸 TED AI Personality Dialect
          </h4>

          {/* Toggle personal language */}
          <div className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-2xl border border-[#5c3a21]/10">
            <div className="space-y-0.5">
              <span className="font-sans font-bold text-xs text-[#3D2616] block">
                Use Personal Affectionate Language
              </span>
              <p className="text-[11px] font-serif italic text-[#5c3a21]/70">
                TED speaks using "How is you?", "Sowie.", "Come here 🧸", and "Let's take today one step at a time."
              </p>
            </div>

            <button
              onClick={() => setUsePersonalLanguage(prev => !prev)}
              className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer relative ${
                usePersonalLanguage ? 'bg-[#5c3a21]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  usePersonalLanguage ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Relationship Anniversary */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-sm text-[#3D2616] border-b border-[#5c3a21]/10 pb-2">
            🗓️ Special Anniversary Date
          </h4>

          <div className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-2xl border border-[#5c3a21]/10">
            <span className="font-sans font-semibold text-xs text-[#3D2616]">
              Anniversary Date:
            </span>
            <input
              type="date"
              value={anniversaryDate}
              onChange={(e) => setAnniversaryDate(e.target.value)}
              className="bg-white border border-[#5c3a21]/15 text-xs text-[#3D2616] px-3 py-1.5 rounded-xl font-mono focus:outline-none"
            />
          </div>
        </div>

        {/* Passcode Protection */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-sm text-[#3D2616] border-b border-[#5c3a21]/10 pb-2">
            🔒 Passcode Lock
          </h4>

          <div className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-2xl border border-[#5c3a21]/10">
            <span className="font-sans font-semibold text-xs text-[#3D2616]">
              4-Digit Sanctuary Pin:
            </span>
            <input
              type="text"
              maxLength={4}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="bg-white border border-[#5c3a21]/15 text-xs font-mono font-bold text-[#3D2616] px-3 py-1.5 rounded-xl text-center w-20 focus:outline-none tracking-widest"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between">
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200 text-xs font-sans font-semibold rounded-full flex items-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Sanctuary</span>
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#5c3a21] hover:bg-[#3D2616] text-white text-xs font-sans font-bold rounded-full shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved Preferences!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
