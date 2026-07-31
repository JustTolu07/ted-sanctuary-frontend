import React, { useState, useEffect, useRef } from 'react';
import UploadModal from './PhotoGallery/UploadModal';
import type { CreateMemoryPayload } from '@/services/memories';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  Heart, 
  MapPin, 
  Play, 
  Pause, 
  Plus, 
  Camera, 
  Video, 
  Star, 
  Trash2, 
  X, 
  Upload, 
  Image as ImageIcon, 
  Film, 
  Maximize2, 
  Volume2, 
  VolumeX,
  Mic,
  Share2
} from 'lucide-react';
import { Memory } from '../types';

type GalleryMediaType = 'photo' | 'video' | 'audio' | 'voicenote';

interface GalleryMediaItem {
  id: string;
  type: GalleryMediaType;
  title: string;
  description: string;
  date: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  tag: string;
  isFavorite: boolean;
  location?: string;
  duration?: string;
}

const INITIAL_GALLERY_ITEMS: GalleryMediaItem[] = [];

interface OurStorySanctuaryProps {
  onSelectMemoryModal?: (memory: Memory) => void;
}

export default function OurStorySanctuary({ onSelectMemoryModal }: OurStorySanctuaryProps) {
  // Gallery Items state with localStorage persistence
  const [galleryItems, setGalleryItems] = useState<GalleryMediaItem[]>(() => {
    const saved = localStorage.getItem('smadar_gallery_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_GALLERY_ITEMS;
      }
    }
    return INITIAL_GALLERY_ITEMS;
  });

  // Filter state
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'video' | 'audio' | 'favorite'>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMediaItem | null>(null);
  const [isPlayingAudioId, setIsPlayingAudioId] = useState<string | null>(null);

  // New Memory Form State is handled by centralized UploadModal

  // Save gallery items to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem('smadar_gallery_items', JSON.stringify(galleryItems));
  }, [galleryItems]);

  // Toggle favorite status
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setGalleryItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    }));
  };

  // Delete memory
  const handleDeleteMemory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this memory from Smadar\'s gallery?')) {
      setGalleryItems(prev => prev.filter(item => item.id !== id));
      if (selectedMedia?.id === id) setSelectedMedia(null);
    }
  };

  // Upload handling will be done by UploadModal and updated into galleryItems

  // Filtered Items
  const filteredItems = galleryItems.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'favorite') return item.isFavorite;
    return item.type === activeFilter;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">

      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#2A1828] via-[#3D223B] to-[#241323] text-white rounded-[2.2rem] p-6 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden">
        <span className="absolute top-4 right-6 text-amber-200/40 text-sm">✦</span>
        <span className="absolute bottom-4 left-6 text-rose-200/40 text-xs">✧</span>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-xs font-mono font-bold text-amber-200">
              <Camera className="w-3.5 h-3.5 text-amber-300" />
              <span>Smadar's Media & Gallery Vault</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Memories, Photos & Video Gallery
            </h1>

            <p className="text-xs sm:text-sm text-purple-100/80 font-sans leading-relaxed">
              A private digital sanctuary where you can upload, store, and replay your favorite pictures and video clips anytime.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-[#3D2616] font-sans font-bold text-xs sm:text-sm rounded-full shadow-lg cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2 shrink-0 border border-white/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add Photo, Video, or Song</span>
            </button>

            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => { localStorage.removeItem('smadar_gallery_items'); setGalleryItems([]); }}
                title="Clear gallery (dev only)"
                className="px-3 py-2 bg-white/90 border border-[#5c3a21]/10 rounded-lg text-xs font-mono text-[#3D2616]"
              >
                Clear Gallery
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Filter & Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#5c3a21]/15 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Media 🌟', count: galleryItems.length },
            { id: 'photo', label: 'Photos 📸', count: galleryItems.filter(i => i.type === 'photo').length },
            { id: 'video', label: 'Videos 🎥', count: galleryItems.filter(i => i.type === 'video').length },
            { id: 'audio', label: 'Songs 🎵', count: galleryItems.filter(i => i.type === 'audio').length },
            { id: 'favorite', label: 'Favorites ⭐', count: galleryItems.filter(i => i.isFavorite).length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === tab.id
                  ? 'bg-[#5c3a21] text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#3D2616] hover:bg-amber-100/50 border border-[#5c3a21]/10'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeFilter === tab.id ? 'bg-amber-300/30 text-amber-100' : 'bg-[#5c3a21]/10 text-[#5c3a21]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-[#5c3a21]/60 px-2">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} in gallery
        </div>
      </div>

      {/* 3. Media Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#5c3a21]/20 space-y-3 p-6">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-3xl mx-auto">
            🖼️
          </div>
          <h3 className="font-serif italic font-bold text-lg text-[#3D2616]">
            No memories in this filter yet!
          </h3>
          <p className="text-xs text-[#5c3a21]/70 max-w-sm mx-auto font-sans">
            Tap the button below to upload your first photo, video, or song to Smadar's Sanctuary Gallery!
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#5c3a21] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#3D2616] cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Media</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              onClick={() => setSelectedMedia(item)}
              className="bg-white border border-[#5c3a21]/15 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative"
            >
              {/* Media Thumbnail Container */}
              <div className="relative h-52 bg-slate-900 overflow-hidden">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full">
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <video
                        src={item.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-[#3D2616] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5 text-rose-600" />
                      </div>
                    </div>
                    {item.duration && (
                      <span className="absolute bottom-2.5 right-2.5 bg-black/70 text-white font-mono text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs">
                        🎥 {item.duration}
                      </span>
                    )}
                  </div>
                ) : item.type === 'audio' ? (
                  <div className="w-full h-full bg-gradient-to-br from-violet-950 via-[#241323] to-[#1C1B30] p-6 flex flex-col justify-between text-white">
                    <div className="flex flex-col items-center justify-center gap-3 h-full text-center">
                      <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/15 flex items-center justify-center">
                        <Music className="w-8 h-8 text-rose-300" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-white text-sm line-clamp-2">{item.title}</h4>
                        <p className="text-[10px] text-white/70 mt-1">{item.description || 'Song memory'}</p>
                      </div>
                    </div>
                    {item.duration && (
                      <span className="text-[10px] font-mono text-white/70 self-start">
                        🎵 {item.duration}
                      </span>
                    )}
                  </div>
                ) : item.type === 'voicenote' ? (
                  <div className="w-full h-full bg-gradient-to-br from-[#2B2C5A] to-[#1E254B] p-6 flex flex-col justify-between text-white">
                    <div className="flex justify-between items-center">
                      <Mic className="w-6 h-6 text-rose-400 animate-pulse" />
                      <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-full">
                        {item.duration || '0:45'}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-purple-200 uppercase tracking-widest block">
                        Voice Note
                      </span>
                      <h4 className="font-serif font-bold text-white text-sm line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  </div>
                )}

                {/* Top Overlay Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 font-medium">
                    {item.tag}
                  </span>

                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-amber-500 backdrop-blur-md flex items-center justify-center transition-transform active:scale-95 shadow-2xs"
                    title={item.isFavorite ? "Remove Favorite" : "Add Favorite"}
                  >
                    <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-amber-500 text-amber-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>

              {/* Memory Details Footer */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif italic font-bold text-base text-[#3D2616] group-hover:text-rose-900 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5c3a21]/80 font-sans mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#5c3a21]/10 flex items-center justify-between text-[10px] font-mono text-[#5c3a21]/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#5c3a21]/40" />
                    {item.date}
                  </span>

                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 4. Upload / Add Memory Modal (modern bottom-sheet) */}
      <UploadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUpload={async (payload: CreateMemoryPayload) => {
          // Convert to local GalleryMediaItem and add to gallery
          const isVideo = payload.image.type.startsWith('video/');
          const isAudio = payload.image.type.startsWith('audio/');
          const newItem: GalleryMediaItem = {
            id: 'gallery-' + Date.now(),
            type: isAudio ? 'audio' : isVideo ? 'video' : 'photo',
            title: payload.title || 'Untitled',
            date: payload.date || new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            location: undefined,
            description: payload.description || '',
            mediaUrl: URL.createObjectURL(payload.image),
            thumbnailUrl: undefined,
            tag: isAudio ? 'Song 🎵' : isVideo ? 'Video Memory 🎥' : 'Polaroid Photo 📸',
            isFavorite: true,
            duration: undefined,
          };

          setGalleryItems(prev => [newItem, ...prev]);
          setIsAddModalOpen(false);
        }}
      />

      {/* 5. Fullscreen Lightbox & Media Viewer Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-3xl w-full bg-[#1E1F3B] text-white rounded-[2.2rem] overflow-hidden shadow-2xl relative border border-white/20 flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center cursor-pointer backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Media Display */}
              <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[55vh] overflow-hidden">
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.mediaUrl}
                    controls
                    autoPlay
                    className="w-full max-h-[55vh] object-contain"
                  />
                ) : selectedMedia.type === 'audio' ? (
                  <div className="p-12 text-center space-y-4 flex flex-col items-center justify-center">
                    <Music className="w-16 h-16 text-rose-400 animate-pulse mx-auto" />
                    <div className="space-y-1 text-white/80">
                      <p className="font-semibold text-lg">{selectedMedia.title}</p>
                      <p className="text-sm">{selectedMedia.description || 'A song saved for Smadar'}</p>
                    </div>
                    <audio src={selectedMedia.mediaUrl} controls autoPlay className="w-full max-w-xl" />
                  </div>
                ) : selectedMedia.type === 'voicenote' ? (
                  <div className="p-12 text-center space-y-4">
                    <Mic className="w-16 h-16 text-rose-400 animate-pulse mx-auto" />
                    <audio src={selectedMedia.mediaUrl} controls autoPlay className="mx-auto" />
                  </div>
                ) : (
                  <img
                    src={selectedMedia.mediaUrl}
                    alt={selectedMedia.title}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[55vh] object-contain"
                  />
                )}
              </div>

              {/* Details Pane */}
              <div className="p-6 space-y-4 bg-gradient-to-b from-[#1E1F3B] to-[#14142B] overflow-y-auto">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-amber-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                        {selectedMedia.tag}
                      </span>
                      {selectedMedia.location && (
                        <span className="text-[10px] font-mono text-purple-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          {selectedMedia.location}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-white">
                      {selectedMedia.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleFavorite(selectedMedia.id, e)}
                      className="p-2.5 bg-white/10 hover:bg-white/20 text-amber-400 rounded-full transition-colors cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${selectedMedia.isFavorite ? 'fill-amber-400' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => handleDeleteMemory(selectedMedia.id, e)}
                      className="p-2.5 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 rounded-full transition-colors cursor-pointer"
                      title="Delete Memory"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-purple-200 uppercase tracking-widest block">
                    Memory Love Note
                  </span>
                  <p className="text-xs sm:text-sm text-purple-100 font-sans leading-relaxed">
                    "{selectedMedia.description}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-purple-300/60 pt-1">
                  <span>Saved on {selectedMedia.date}</span>
                  <span>Toluwani ↔ Smadar Sanctuary</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
