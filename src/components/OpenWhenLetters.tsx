import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, X, Heart, ShieldAlert, Sparkles } from 'lucide-react';

interface LetterItem {
  id: string;
  trigger: string;
  emoji: string;
  color: string;
  borderColor: string;
  content: string;
  preview: string;
  signature: string;
}

const OPEN_WHEN_LETTERS: LetterItem[] = [
  {
    id: 'sad',
    trigger: "Open when you're sad",
    emoji: "🥺",
    color: "bg-rose-50/90",
    borderColor: "border-rose-300",
    preview: "To my precious baby, when the light feels a bit dim...",
    signature: "Your protector, Toluwani",
    content: `My sweet Smadar,\n\nIt breaks my heart to know that you are feeling sad. If I could, I would drop everything and catch the next flight to Canada just to wrap my arms around you and kiss away every single tear.\n\nBut since I cannot hold you physically right now, I need you to close your eyes and feel this letter. Close them. Imagine my chest against yours, my chin resting on your head, and my hand gently stroking your beautiful hair. Hear my voice telling you: "You are my entire world."\n\nThis sadness is just a temporary cloud passing through your gorgeous sky. You is a bright, beautiful sun, Smadar. You are resilient, deeply loved, and incredibly valuable. TED is standing by your desk right now, wiggling his ears, waiting to make you smile. Smile for me, baby. I love you so much.`
  },
  {
    id: 'miss',
    trigger: "Open when you miss me",
    emoji: "💓",
    color: "bg-pink-50/90",
    borderColor: "border-pink-300",
    preview: "For the moments when the timezone feels too heavy...",
    signature: "Your favorite boy, Toluwani",
    content: `My beautiful Smadar,\n\nI miss you, too. Vewy, vewy much. Sometimes, the physical silence is loud, and looking at our video chat screen just isn't enough. I know.\n\nBut please listen to me: the distance between Nigeria and Canada is only physical. It is a limitation of maps and coordinates, not of hearts. Our souls have a direct, uninterrupted pipeline. When you walk around your room, when you sip your coffee, my thoughts are holding yours.\n\nThis sanctuary is our shared home. Every pixel was placed here to carry my warmth. We are writing a love story so deep and brave that when we finally close the gap forever, every single day of waiting will feel like a tiny speck in our infinite future together. I am counting down the hours.`
  },
  {
    id: 'cold',
    trigger: "Open when Canada is cold",
    emoji: "❄️",
    color: "bg-sky-50/90",
    borderColor: "border-sky-300",
    preview: "When the snow falls outside and you need a warm hug...",
    signature: "Your warm golden sun",
    content: `Brrr! My baby Smadar,\n\nI know that Canadian winter can feel freezing and grey, especially compared to the sunny days we talk about in Nigeria. So I wanted this letter to act as your ultimate thermal blanket.\n\nWrap yourself in this thought: my love for you is a constant, raging bonfire. It is completely unaffected by snowstorms, sub-zero wind chills, or grey clouds. Let my appreciation heat up your heart. Make yourself a massive cup of hot chocolate, wrap yourself in your fluffiest blankets, and let TED sit on your lap.\n\nI am sending you the warmest solar rays of Nigeria, packed inside this message. One day soon, we will walk in the snow together, and I will be the one holding your cold hands in my warm pockets.`
  },
  {
    id: 'stressed',
    trigger: "Open when you're stressed",
    emoji: "📚",
    color: "bg-amber-50/90",
    borderColor: "border-amber-300",
    preview: "When exams, work, or expectations pile up...",
    signature: "Your biggest fan, Tolu",
    content: `My brilliant Smadar,\n\nBreathe in. Breathe out. Slow down, baby.\n\nYou is pushing so hard, studying, working, and striving to do your best. I am so incredibly proud of your work ethic, your intelligence, and your dedication. You are brilliant.\n\nBut remember: you are not a machine. You is a human being, and my sweet little star. Your grade point average or productivity does not define your worth. I loved you before this work, and I will love you long after. Take a 15-minute break. Drink a massive glass of water. Eat a little snack. Walk away from the screen.\n\nYou have already won. You have succeeded in the most important thing: being a beautiful, kind soul. Now rest. TED and I have everything under control.`
  },
  {
    id: 'rough',
    trigger: "Open when we have a rough day",
    emoji: "🩹",
    color: "bg-violet-50/90",
    borderColor: "border-violet-300",
    preview: "For the moments when we get tangled in misunderstandings...",
    signature: "Your boy who always returns",
    content: `My sweet Smadar,\n\nSometimes, the distance makes us tired. Sometimes, miscommunications happen, words get tangled, and we feel a little disconnected. It's okay. It happens to even the strongest loves.\n\nIf we are having a rough day or are in a disagreement right now, I want you to read this carefully: I am not going anywhere. My love for you is not fragile. It is not conditional on us having a perfect, sunny day. I love you even when we are struggling.\n\nSowie for my part in the misunderstanding. I want to understand you, support you, and hold you close. Let's drop our shields. Let's take a deep breath. I adore you. Let's talk it out when you are ready, okay?`
  },
  {
    id: 'hug',
    trigger: "Open when you need a plush hug",
    emoji: "🧸",
    color: "bg-orange-50/90",
    borderColor: "border-orange-300",
    preview: "A physical cuddle voucher delivered in pixels...",
    signature: "TED & Toluwani, co-signed",
    content: `Smadar baby!\n\nThis is an official, non-refundable plush cuddle voucher co-signed by TED and Toluwani.\n\nHow to activate:\n1. Hug your favorite plushie or pillow tightly against your chest.\n2. Squeeze it with all your might.\n3. Take a long, slow breath.\n4. Read this sentence: "You is the sweetest, prettiest, most adorable girl on the face of the Earth, and you are surrounded by an unbreakable wall of safety and adoration."\n\n*TED wiggles his ears and squeezes your arms virtual-style* There! Did you feel that? That is the love transfer completing. Keep that warmth with you all day long!`
  }
];

export default function OpenWhenLetters() {
  const [selectedLetter, setSelectedLetter] = useState<LetterItem | null>(null);

  return (
    <section id="open-when-letters" className="py-12 md:py-20 bg-[#faf6f2] border-t border-[#5c3a21]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 border border-pink-200/60 text-[10px] font-sans font-semibold text-rose-800 rounded-full mb-3">
            <Mail className="w-3.5 h-3.5 text-rose-500" />
            <span>The Envelope Safe</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#3D2616] tracking-tight mb-2">
            "Open When" Envelopes
          </h2>
          <p className="text-xs sm:text-sm text-[#5c3a21]/70 font-sans max-w-md mx-auto">
            Letters stored in the safe, ready to comfort Smadar at the exact moment she needs them. Tap to open.
          </p>
        </div>

        {/* Envelope Grid - 2-Column Mobile Grid, 3-Column Desktop Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {OPEN_WHEN_LETTERS.map((letter) => (
            <motion.div
              key={letter.id}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => setSelectedLetter(letter)}
              className="bg-white border border-[#5c3a21]/10 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xs hover:shadow-sm cursor-pointer transition-all relative overflow-hidden group flex flex-col justify-between h-52 sm:h-60"
            >
              {/* Envelope Flap graphic simulation */}
              <div className="absolute top-0 inset-x-0 h-2 bg-[#5c3a21]/10 rounded-b-md group-hover:bg-[#5c3a21]/20 transition-colors" />

              <div className="pt-1">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-2xl sm:text-3xl">{letter.emoji}</span>
                  <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100 shrink-0">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-current group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-xs sm:text-sm text-[#3D2616] tracking-tight mb-1 line-clamp-2">
                  {letter.trigger}
                </h3>
                
                <p className="text-[11px] sm:text-xs text-[#5c3a21]/60 font-serif italic line-clamp-2">
                  {letter.preview}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#5c3a21]/5 pt-2.5 mt-2">
                <span className="text-[9px] font-mono text-amber-800/80 font-medium truncate">
                  Toluwani Wax
                </span>
                <span className="flex items-center gap-1 text-[10px] text-rose-600 font-sans font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <span className="hidden xs:inline">Open</span>
                  <MailOpen className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Overlay / Letter Reader */}
        <AnimatePresence>
          {selectedLetter && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
              {/* Animated Letter Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`w-full max-w-xl rounded-3xl border border-[#5c3a21]/15 p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col max-h-[85vh] ${selectedLetter.color}`}
              >
                {/* Vintage stamp graphic */}
                <div className="absolute top-5 right-5 w-14 h-18 border border-dashed border-[#5c3a21]/20 p-1 flex flex-col items-center justify-center select-none rotate-3">
                  <Heart className="w-5 h-5 text-rose-500 fill-current mb-0.5" />
                  <span className="text-[7px] font-mono text-[#5c3a21]/50 leading-none">NIG ➔ CAN</span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="absolute top-5 left-5 p-2 bg-white/90 border border-[#5c3a21]/15 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-[#5c3a21]" />
                </button>

                {/* Content Stream */}
                <div className="flex-1 overflow-y-auto mt-12 pr-1 custom-scrollbar space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedLetter.emoji}</span>
                    <h4 className="font-display font-bold text-lg text-[#3D2616]">
                      {selectedLetter.trigger}
                    </h4>
                  </div>

                  <div className="border-t border-[#5c3a21]/10 pt-3">
                    {/* The letter body */}
                    <div className="font-serif text-sm sm:text-base italic text-[#3D2616] leading-relaxed whitespace-pre-line space-y-3">
                      {selectedLetter.content}
                    </div>
                  </div>

                  {/* Cursive Signature */}
                  <div className="pt-6 border-t border-[#5c3a21]/10 flex flex-col items-end">
                    <span className="text-[10px] text-[#5c3a21]/50 font-sans uppercase tracking-widest mb-1">
                      Written with devotion by
                    </span>
                    <span className="font-serif text-lg sm:text-xl italic font-bold text-[#3D2616]">
                      {selectedLetter.signature}
                    </span>
                  </div>
                </div>

                {/* Interactive Footer */}
                <div className="mt-4 pt-3 border-t border-[#5c3a21]/10 flex justify-between items-center text-[10px] font-mono text-[#5c3a21]/50">
                  <span>Envelope: {selectedLetter.id}</span>
                  <span className="flex items-center gap-1 text-rose-600 font-sans font-medium">
                    <Sparkles className="w-3 h-3" />
                    <span>Always stitched in love</span>
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
