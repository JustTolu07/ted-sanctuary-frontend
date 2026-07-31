import { motion } from 'motion/react';
import { Heart, ArrowDown } from 'lucide-react';

interface AcrosticItem {
  letter: string;
  word: string;
  meaning: string;
  story: string;
  badge: string;
}

const ACROSTIC_ITEMS: AcrosticItem[] = [
  {
    letter: 'S',
    word: 'Sincere',
    badge: 'Miss Sincerity',
    meaning: 'An honest and trustworthy person',
    story: 'You are one of the most honest and trustworthy person I know. You say what you mean and mean what you say, and I love that about you. You are always true to yourself and to others, and that is a rare and beautiful quality in this world.'
  },
  {
    letter: 'M',
    word: 'My Anchor',
    badge: 'Our Grounding Force',
    meaning: 'My coping mechanism when life is lifeing.',
    story: 'Whenever I feel stressed, or overwhelmed, Youre the one person who i take comfort in and everything feels right again. Youre my comfort person and I love you for that'
  },
  {
    letter: 'A',
    word: 'Absolutely Adorable',
    badge: 'My pookie',
    meaning: 'So Adorable my heart melts for you every single time.',
    story: 'Your smile lights up my whole day. When I look at you and my heart melts I feel like its the first time I’m seeing you. You’re just too cuteI can’t get enough of you.'
  },
  {
    letter: 'D',
    word: 'Darling',
    badge: 'My loff',
    meaning: 'Sweetheart I love you and your name.',
    story: 'You are so cute, and everything about you makes me fall in love with you more. Your eyes, your smile, your voice, your personality, your energy—everything. I just love you so much.'
  },
  {
    letter: 'A',
    word: 'Amazing',
    badge: 'My Amazing baby',
    meaning: 'The prettiest laugh and my favorite daily happiness.',
    story: 'You are the most precious girl in the entire universe. Your crinkled-eye laugh when you are happy, your sleepy morning voice, and your cute reactions—you are my absolute baby, and I fall in love with you all over again every time we speak.'
  },
  {
    letter: 'R',
    word: 'Rare Treasure',
    badge: 'One in a Billion',
    meaning: 'A beautiful soul I will cherish for the rest of my life.',
    story: 'You are one in a billion, Smadar. I built this sanctuary for you because you deserve to be celebrated in a way that time can never fade. You are my greatest treasure, and I hold you close in my heart every single second.'
  }
];

export default function AcrosticSection() {
  return (
    <section id="acrostic-section" className="relative py-24 md:py-32 bg-[#fdfcfb] border-t-2 border-rose-950 overflow-hidden">
      {/* Decorative lines & elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-950 via-rose-500 to-rose-950 opacity-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 border border-rose-950/20 text-xs font-black uppercase tracking-[0.25em] text-rose-950 mb-6">
            <Heart className="w-3 h-3 text-rose-600 fill-current animate-pulse" />
            <span>The Smadar Definition</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-rose-950 tracking-tighter uppercase leading-[0.95] mb-6">
            WHO IS <br />
            <span className="font-serif italic font-light text-rose-600 lowercase">smadar?</span>
          </h2>
          <p className="text-sm md:text-base text-rose-900/70 font-semibold uppercase tracking-wider leading-relaxed">
            Scroll slowly to unpack the letters of your name. Let each word be a permanent reminder of who you are to me when the distance feels loud.
          </p>
          <div className="flex justify-center mt-8 animate-bounce">
            <ArrowDown className="w-5 h-5 text-rose-900/40" />
          </div>
        </div>

        {/* Acrostic Timeline / Grid Stack */}
        <div className="space-y-16 md:space-y-32">
          {ACROSTIC_ITEMS.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.letter}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Giant Letter Section */}
                <motion.div
                  className="w-full md:w-1/2 flex justify-center"
                  initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: 'spring', damping: 20, stiffness: 80 }}
                >
                  <div className="relative select-none pointer-events-none">
                    {/* Shadow Letter */}
                    <span className="absolute -top-10 -left-6 text-[180px] md:text-[320px] font-display font-black text-rose-100/50 leading-none">
                      {item.letter}
                    </span>
                    {/* Main Accent Letter */}
                    <span className="relative z-10 text-[140px] md:text-[240px] font-serif font-black text-rose-950 leading-none block transform hover:scale-105 transition-transform duration-500">
                      {item.letter}
                      <span className="text-rose-500 font-light italic">.</span>
                    </span>
                  </div>
                </motion.div>

                {/* Definition & Story Section */}
                <motion.div
                  className="w-full md:w-1/2 space-y-4 text-center md:text-left"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <div className="inline-block px-3 py-1 bg-rose-50 border border-rose-950/10 text-[10px] font-bold uppercase tracking-widest text-rose-700">
                    {item.badge}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-black text-rose-950 tracking-tight uppercase">
                    {item.letter} — {item.word}
                  </h3>
                  <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-rose-500 italic">
                    "{item.meaning}"
                  </p>
                  <div className="bg-white border-2 border-rose-950 p-6 md:p-8 shadow-[6px_6px_0px_0px_#4c0519] text-left relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-rose-50/50 pointer-events-none" />
                    <p className="text-sm md:text-base text-rose-900/80 leading-relaxed font-serif font-medium">
                      {item.story}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-rose-900/40">
                      <span>Coordinates Locked</span>
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
