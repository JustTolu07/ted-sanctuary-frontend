import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Music, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';

const TRACKS = [
  {
    title: "Haaland Song (Ha Ha Ha)",
    artist: "Man City Chant (English Version)",
    url: "/src/assets/music/CTID - Haaland Song (Ha Ha Ha) [Man City chant _ English Version].mp3",
    cover: "/src/assets/images/grid.jpeg"
  },
  {
    title: "Good Not Great",
    artist: "JORDY",
    url: "/src/assets/music/JORDY - Good Not Great [Official Video].mp3",
    cover: "/src/assets/images/chair.jpeg"
  },
  {
    title: "Cinderella Snapped",
    artist: "Jax",
    url: "/src/assets/music/Jax - Cinderella Snapped (Official Video).mp3",
    cover: "/src/assets/images/animate.jpeg"
  }
];

export default function FloatingMusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(currentTrack.url);
    audioRef.current = audio;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => handleNext();

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  // Handle Next
  const handleNext = () => {
    setIsPlaying(true);
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % TRACKS.length);
  };

  // Handle Prev
  const handlePrev = () => {
    setIsPlaying(true);
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + TRACKS.length) % TRACKS.length);
  };

  // Handle Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
    if (audioRef.current) {
      audioRef.current.volume = v;
      audioRef.current.muted = v === 0;
    }
  };

  // Handle Mute Toggle
  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.volume = nextMute ? 0 : volume;
  };

  // Handle Scrub
  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 left-6 z-40 font-sans">
      <AnimatePresence>
        {!isOpen ? (
          // Compact Mini Pill Trigger
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-4 py-3 bg-[#FAF6F0]/90 hover:bg-[#FAF6F0] backdrop-blur-md border border-[#5c3a21]/20 rounded-full shadow-md text-[#5c3a21] cursor-pointer hover:shadow-lg transition-all"
            title="Open Smadar's Playlist"
          >
            <div className={`w-8 h-8 rounded-full overflow-hidden border border-[#5c3a21]/10 flex items-center justify-center bg-amber-100/50 ${isPlaying ? 'animate-spin-slow' : ''}`}>
              {isPlaying ? (
                <img src={currentTrack.cover} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <Music className="w-4 h-4" />
              )}
            </div>
            <div className="text-left text-xs max-w-[120px] truncate">
              <p className="font-bold leading-tight truncate">{currentTrack.title}</p>
              <p className="opacity-75 leading-tight truncate text-[10px]">{isPlaying ? "Playing..." : "Paused"}</p>
            </div>
            <ChevronUp className="w-4 h-4 opacity-60" />
          </motion.button>
        ) : (
          // Expanded Apple Music Card
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="w-72 bg-[#FAF6F0]/95 backdrop-blur-md border border-[#5c3a21]/20 rounded-3xl p-5 shadow-xl text-[#3D2616] space-y-4"
          >
            {/* Header / Collapse Trigger */}
            <div className="flex items-center justify-between border-b border-[#5c3a21]/10 pb-2">
              <span className="text-[10px] font-bold tracking-widest text-[#8C5A3C] uppercase flex items-center gap-1.5">
                <Music className="w-3 h-3 text-rose-500" />
                <span>Smadar's Player</span>
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#5c3a21]/5 rounded-full cursor-pointer text-[#5c3a21]"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Album Cover & Track Info */}
            <div className="flex items-center gap-3">
              <div className={`w-16 h-16 rounded-2xl overflow-hidden border border-[#5c3a21]/15 shadow-sm shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <img src={currentTrack.cover} alt="Cover Art" className="w-full h-full object-cover" />
              </div>
              <div className="text-left min-w-0">
                <h4 className="font-serif italic font-bold text-sm truncate">{currentTrack.title}</h4>
                <p className="text-xs text-[#5c3a21]/70 truncate">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Scrubber / Progress Bar */}
            <div className="space-y-1">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleScrubChange}
                className="w-full h-1 bg-[#5c3a21]/15 rounded-lg appearance-none cursor-pointer accent-[#5c3a21]"
              />
              <div className="flex justify-between text-[9px] font-mono opacity-60">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-6">
              <button onClick={handlePrev} className="p-1.5 hover:bg-[#5c3a21]/5 rounded-full cursor-pointer transition-colors text-[#5c3a21]">
                <SkipBack className="w-5 h-5 fill-current" />
              </button>
              
              <button 
                onClick={togglePlay} 
                className="w-10 h-10 bg-[#5c3a21] hover:bg-[#3D2616] text-white rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <button onClick={handleNext} className="p-1.5 hover:bg-[#5c3a21]/5 rounded-full cursor-pointer transition-colors text-[#5c3a21]">
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 pt-1.5 border-t border-[#5c3a21]/5">
              <button onClick={toggleMute} className="text-[#5c3a21]/70 hover:text-[#5c3a21] cursor-pointer">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-[#5c3a21]/15 rounded-lg appearance-none cursor-pointer accent-[#5c3a21]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
