import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles, MapPin, Compass, Plus, Heart, Trash2 } from 'lucide-react';

interface Dream {
  id: string;
  title: string;
  coordinates: string;
  description: string;
  category: 'travel' | 'cozy' | 'adventure' | 'home';
  completed: boolean;
}

export default function SharedDreams() {
  const [dreams, setDreams] = useState<Dream[]>(() => {
    const saved = localStorage.getItem('smadar_dreams');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'snow-walk',
        title: 'Walking in the Canadian Snow',
        coordinates: 'Montreal or Toronto, Canada',
        description: 'Toluwani wearing a giant fluffy coat, holding Smadar\'s frozen hands inside his warm wool pockets, laughing as the snowflakes land on her nose.',
        category: 'adventure',
        completed: false
      },
      {
        id: 'fusion-kitchen',
        title: 'The Great Fusion Cooking Night',
        coordinates: 'Our Shared Kitchen',
        description: 'Blending Toluwani\'s spicy Nigerian recipes with Smadar\'s comfort favorites. Expect lots of messy flour on cheeks and experimental spices!',
        category: 'cozy',
        completed: false
      },
      {
        id: 'first-coffee',
        title: 'Our First Infinite Morning Coffee',
        coordinates: 'Same Kitchen Table, No Screens',
        description: 'Pouring coffee from the same pot, sitting next to each other on a real couch, with no video calls or timezone calculations. Just endless warm quietness.',
        category: 'home',
        completed: false
      },
      {
        id: 'beach-flight',
        title: 'Sunset Island Stroll',
        coordinates: 'Warm Coastline Beach',
        description: 'Recreating our digital Atlantic beach dates in real-life on soft sand, letting the actual waves touch our toes under a violet-pink horizon.',
        category: 'travel',
        completed: false
      },
      {
        id: 'plush-shrine',
        title: 'Building TED\'s Physical Throne',
        coordinates: 'Our Living Room Mantle',
        description: 'Buying a real giant plush teddy bear to represent TED, placing him right on our mantle so he can watch over our home in person!',
        category: 'home',
        completed: false
      }
    ];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCoord, setNewCoord] = useState('');
  const [newCat, setNewCat] = useState<'travel' | 'cozy' | 'adventure' | 'home'>('cozy');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem('smadar_dreams', JSON.stringify(dreams));
  }, [dreams]);

  const handleAddDream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const dream: Dream = {
      id: Math.random().toString(),
      title: newTitle,
      coordinates: newCoord || 'A cozy spot under the sky',
      description: newDesc || 'A beautiful plan for our future...',
      category: newCat,
      completed: false
    };

    setDreams(prev => [dream, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setNewCoord('');
    setIsAdding(false);
  };

  const toggleCompleted = (id: string) => {
    setDreams(prev => prev.map(d => d.id === id ? { ...d, completed: !d.completed } : d));
  };

  const deleteDream = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDreams(prev => prev.filter(d => d.id !== id));
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'travel': return '✈️';
      case 'cozy': return '☕';
      case 'adventure': return '🏔️';
      case 'home': return '🏠';
      default: return '✨';
    }
  };

  return (
    <section id="shared-dreams" className="py-20 md:py-28 bg-[#faf6f2] border-t-2 border-[#5c3a21]/15 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 text-[10px] font-sans font-semibold text-[#5c3a21] rounded-full mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Future Coordinates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#3D2616] tracking-tight mb-2">
            Our Shared Dreams Canvas
          </h2>
          <p className="text-xs sm:text-sm text-[#5c3a21]/70 font-sans max-w-md mx-auto">
            Every plan we make together is a star we navigate by. Pin your own dreams to our board.
          </p>
        </div>

        {/* Action button to show form */}
        <div className="flex justify-center mb-8">
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="bg-[#5c3a21] hover:bg-[#3D2616] text-white px-6 py-3 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-2xs hover:shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Pin a New Shared Dream</span>
            </button>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAddDream}
              className="w-full max-w-xl bg-white border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs space-y-3.5 text-left relative"
            >
              <h3 className="font-serif italic font-bold text-base text-[#3D2616] mb-1">
                Drafting a Future Memory
              </h3>
              
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-[#5c3a21]/60 font-medium block">
                  Dream Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Buying our first record player"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#5c3a21]/15 text-xs text-[#3D2616] focus:outline-none focus:border-[#5c3a21]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#5c3a21]/60 font-medium block">
                    Location / Coordinate
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cozy living room floor"
                    value={newCoord}
                    onChange={(e) => setNewCoord(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5c3a21]/15 text-xs text-[#3D2616] focus:outline-none focus:border-[#5c3a21]/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#5c3a21]/60 font-medium block">
                    Dream Category
                  </label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#5c3a21]/15 text-xs font-medium focus:outline-none bg-white text-[#3D2616]"
                  >
                    <option value="cozy">☕ Cozy Comfort</option>
                    <option value="travel">✈️ Travel Lands</option>
                    <option value="adventure">🏔️ Great Adventure</option>
                    <option value="home">🏠 Our Home Space</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-[#5c3a21]/60 font-medium block">
                  Describe the Dream
                </label>
                <textarea
                  placeholder="Describe what we will hear, see, feel, and laugh about..."
                  value={newDesc}
                  rows={2}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#5c3a21]/15 text-xs text-[#3D2616] focus:outline-none focus:border-[#5c3a21]/40 resize-none"
                />
              </div>

              <div className="flex gap-2.5 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-[#5c3a21] hover:bg-[#3D2616] text-white py-2.5 rounded-xl font-sans font-semibold text-xs cursor-pointer transition-all"
                >
                  Pin to Corkboard
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-5 bg-white hover:bg-stone-50 text-[#5c3a21] border border-[#5c3a21]/20 rounded-xl font-sans font-semibold text-xs cursor-pointer transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </div>

        {/* 2-Column Mobile Grid Corkboard Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          <AnimatePresence>
            {dreams.map((dream) => (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -3 }}
                onClick={() => toggleCompleted(dream.id)}
                className={`bg-white border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xs hover:shadow-sm relative cursor-pointer group select-none flex flex-col justify-between transition-all ${
                  dream.completed 
                    ? 'opacity-60 grayscale bg-stone-50 line-through decoration-[#5c3a21]/40' 
                    : ''
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl">{getCategoryIcon(dream.category)}</span>
                    <button
                      onClick={(e) => deleteDream(dream.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-[#5c3a21]/40 hover:text-rose-600 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-serif italic font-bold text-xs sm:text-base text-[#3D2616] leading-tight mb-1">
                      {dream.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-[#5c3a21]/70 font-sans line-clamp-3 leading-relaxed">
                      {dream.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#5c3a21]/10 flex items-center justify-between text-[9px] sm:text-[10px] text-[#5c3a21]/60 font-mono">
                  <span className="truncate max-w-[100px] sm:max-w-[140px]">{dream.coordinates}</span>
                  <span className="shrink-0 text-amber-700 font-sans font-semibold">
                    {dream.completed ? '✓ Fulfilled' : 'Pin Locked'}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
