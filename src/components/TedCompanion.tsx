import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Maximize2, X, Plus, Mic, Heart, Lightbulb, BookOpen, Music, ChevronLeft, Volume2, MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ted';
  text: string;
  timestamp: Date;
}

interface TedCompanionProps {
  isFloatingModal?: boolean;
  onCloseFloatingModal?: () => void;
  onExpandFullScreen?: () => void;
}

const ACTION_CHIPS = [
  { 
    id: 'hug', 
    icon: '🧸', 
    label: "Send a warm hug", 
    prompt: "TED, I really need a big warm bear hug right now!" 
  },
  { 
    id: 'ideas', 
    icon: '💡', 
    label: "Give me care ideas", 
    prompt: "TED, give me 3 cute self-care ideas for Smadar today." 
  },
  { 
    id: 'story', 
    icon: '📖', 
    label: "Tell our love story", 
    prompt: "TED, tell me a quick sweet story about Toluwani and Smadar." 
  },
  { 
    id: 'lofi', 
    icon: '🎶', 
    label: "Play calm lofi", 
    prompt: "TED, recommend a calming lofi track for Canada hours." 
  }
];

export default function TedCompanion({
  isFloatingModal = false,
  onCloseFloatingModal,
  onExpandFullScreen
}: TedCompanionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'orb' | 'chat'>('orb');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgCounter = useRef(0);
  const eyeBlinkDelayLeft = useRef(Math.random() * 2 + 1);
  const eyeBlinkDelayRight = useRef(Math.random() * 2 + 1);

  // Auto-scroll to latest message
  useEffect(() => {
    if (viewMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, viewMode]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Switch to chat view mode if on orb view
    if (viewMode === 'orb') {
      setViewMode('chat');
    }

    const userMsg: ChatMessage = {
      id: `msg-${++msgCounter.current}`,
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ted/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('Could not connect to TED');
      }

      const data = await response.json();
      
      const tedMsg: ChatMessage = {
        id: `msg-${++msgCounter.current}`,
        sender: 'ted',
        text: data.response || "Oh! *scratches fuzzy head* TED got a little tangled in the clouds. Sowie about that! Can you try saying that again, my sweet baby?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, tedMsg]);
    } catch (error) {
      console.error("Error chatting with TED:", error);
      const fallbackReplies = [
        "Oh! *wiggles plush ears* The digital clouds are a bit noisy, but TED is right here! Remember that Toluwani loves you so vewy much, and TED is sending you a giant plush cuddle! *hugs you close*",
        "Hmpf! *puffs out plush chest* Connection got a tiny bit sleepy, but TED's love is 100% active! Drink some warm water and let TED snuggle your worries away!",
        "Oceans cannot stop our love! *gives huge teddy bear hug* How is you feeling now, my pretty Smadar?"
      ];
      const randomFallback = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      
      const errorMsg: ChatMessage = {
        id: `msg-${++msgCounter.current}`,
        sender: 'ted',
        text: randomFallback,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-gradient-to-b from-[#1E1F3B] via-[#252242] to-[#14142B] text-white rounded-[2.5rem] relative overflow-hidden flex flex-col w-full mx-auto border border-indigo-500/20 shadow-2xl transition-all ${
      isFloatingModal 
        ? 'p-4 sm:p-5 h-[520px] sm:h-[580px] max-w-md' 
        : 'p-6 sm:p-8 h-[600px] sm:h-[680px] max-w-2xl'
    }`}>

      {/* Top Header Controls (Matching layout reference!) */}
      <div className="flex items-center justify-between z-20 pb-2">
        <div className="flex items-center gap-2">
          {viewMode === 'chat' ? (
            <button
              onClick={() => setViewMode('orb')}
              className="w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              title="Back to TED AI Orb"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-rose-300 font-bold text-xs">
              🧸
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono font-medium text-purple-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>TED AI Live</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onExpandFullScreen && (
            <button
              onClick={onExpandFullScreen}
              className="p-2 text-purple-200/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Full Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}

          {onCloseFloatingModal && (
            <button
              onClick={onCloseFloatingModal}
              className="p-2 text-purple-200/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col justify-between relative z-10 py-2 overflow-hidden">
        
        {viewMode === 'orb' ? (
          /* ORB VIEW MODE (Matching the screenshot layout!) */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col justify-between items-center text-center py-2"
          >
            {/* Header Title */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Hello, Smadar!
              </h2>
              <p className="text-xs sm:text-sm font-sans text-purple-200/80 font-medium">
                How can I help you today?
              </p>
            </div>

            {/* Glowing Interactive AI Orb / Blob */}
            <div className="relative my-4 flex flex-col items-center justify-center">
              {/* Outer Glowing Aura */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-44 h-44 sm:w-52 sm:h-52 bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-400 rounded-full blur-3xl pointer-events-none"
              />

              {/* Breathing Orb Core */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.03, 1]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-[#9333EA] via-[#C084FC] to-[#818CF8] shadow-[0_0_50px_rgba(192,132,252,0.6)] flex items-center justify-center border-2 border-white/30 cursor-pointer group"
                onClick={() => setViewMode('chat')}
              >
                {/* Glowing Eyes Inside Orb */}
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      scaleY: [1, 0.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: eyeBlinkDelayLeft.current
                    }}
                    className="w-3 h-8 sm:w-3.5 sm:h-9 bg-white rounded-full shadow-[0_0_12px_#FFFFFF]"
                  />
                  <motion.div
                    animate={{
                      scaleY: [1, 0.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: eyeBlinkDelayRight.current
                    }}
                    className="w-3 h-8 sm:w-3.5 sm:h-9 bg-white rounded-full shadow-[0_0_12px_#FFFFFF]"
                  />
                </div>

                {/* Soft Sparkle Accents */}
                <div className="absolute -top-1 -right-1 text-amber-200 text-sm animate-pulse">✦</div>
                <div className="absolute bottom-2 -left-2 text-rose-200 text-xs animate-pulse">✧</div>
              </motion.div>

              {/* Pulsing Floor Shadow */}
              <motion.div
                animate={{
                  scaleX: [1, 0.8, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-3 bg-black/40 rounded-full blur-sm mt-6"
              />
            </div>

            {/* 2x2 Action Chip Buttons Grid (Matching screenshot!) */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-md pt-2">
              {ACTION_CHIPS.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => handleSendMessage(chip.prompt)}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/15 text-left text-xs font-sans font-medium text-white transition-all cursor-pointer hover:scale-[1.02] active:scale-95 flex items-center gap-2.5 shadow-sm"
                >
                  <span className="text-base">{chip.icon}</span>
                  <span className="line-clamp-1">{chip.label}</span>
                </button>
              ))}
            </div>

          </motion.div>
        ) : (
          /* CHAT STREAM VIEW MODE */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex-1 flex flex-col justify-between overflow-hidden"
          >
            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto py-2 space-y-3 custom-scrollbar pr-1">
              {messages.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <span className="text-3xl">🧸</span>
                  <p className="text-xs text-purple-200 font-sans">
                    Ask TED anything, or pick a prompt below!
                  </p>
                </div>
              ) : (
                messages.map((m) => {
                  const isTed = m.sender === 'ted';
                  return (
                    <div
                      key={m.id}
                      className={`flex ${isTed ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 text-xs sm:text-sm leading-relaxed rounded-2xl ${
                          isTed
                            ? 'bg-white/15 text-white backdrop-blur-md border border-white/15 font-serif italic'
                            : 'bg-purple-600 text-white font-sans font-medium shadow-md'
                        }`}
                      >
                        <p>{m.text}</p>
                        <span className="block text-[9px] font-mono mt-1 text-right text-purple-200/60">
                          {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/15 backdrop-blur-md border border-white/15 rounded-2xl p-3 flex items-center gap-2 text-xs font-serif italic text-purple-200">
                    <span>TED is thinking...</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-purple-200 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-purple-200 rounded-full animate-bounce delay-150" />
                      <span className="w-1.5 h-1.5 bg-purple-200 rounded-full animate-bounce delay-300" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Bar in Chat Mode */}
            <div className="py-2 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar border-t border-white/10">
              {ACTION_CHIPS.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => handleSendMessage(chip.prompt)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-[11px] font-sans font-medium text-purple-100 rounded-full transition-all cursor-pointer shrink-0 border border-white/10"
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* INPUT PILL BAR AT BOTTOM (Matching the reference screenshot!) */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="pt-2 z-20"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 pl-3 rounded-full flex items-center justify-between gap-2 shadow-lg">
          
          {/* Plus Button */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'orb' ? 'chat' : 'orb')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Toggle View"
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Input Text Box */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={() => {
              if (viewMode === 'orb') setViewMode('chat');
            }}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-purple-200/60 focus:outline-none font-sans px-1"
          />

          {/* Send / Mic Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            {inputText.trim() ? (
              <Send className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>

    </div>
  );
}
