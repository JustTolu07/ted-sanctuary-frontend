import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import AcrosticSection from './AcrosticSection';

gsap.registerPlugin(ScrollTrigger);

interface CinematicLandingProps {
  onComplete: () => void;
}

export default function CinematicLanding({ onComplete }: CinematicLandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Section refs for navigation
  const sec1Ref = useRef<HTMLDivElement>(null);
  const sec2Ref = useRef<HTMLDivElement>(null);
  const sec3Ref = useRef<HTMLDivElement>(null);
  const sec4Ref = useRef<HTMLDivElement>(null);

  // Animation refs
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const introWordRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const letterParagraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const letterHeadingRef = useRef<HTMLHeadingElement>(null);
  const tedWaveArmRef = useRef<SVGGElement>(null);
  const tedBodyRef = useRef<SVGGElement>(null);

  // States
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  const letters = ['H', 'o', 'l', 'l', 'a'];

  // Lock/Unlock body scrolling based on isScrollLocked state
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isScrollLocked]);

  // Blinking loop (blinks every 4-5 seconds)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Arm waving animation
  const handleTedWave = () => {
    if (isWaving) return;
    setIsWaving(true);

    const tl = gsap.timeline({
      onComplete: () => setIsWaving(false)
    });

    tl.to(tedWaveArmRef.current, {
      rotate: 30,
      transformOrigin: 'bottom right',
      duration: 0.35,
      ease: 'power1.out'
    })
      .to(tedWaveArmRef.current, {
        rotate: 10,
        transformOrigin: 'bottom right',
        duration: 0.25,
        repeat: 3,
        yoyo: true,
        ease: 'sine.inOut'
      })
      .to(tedWaveArmRef.current, {
        rotate: 0,
        transformOrigin: 'bottom right',
        duration: 0.3,
        ease: 'power1.inOut'
      });
  };

  // Wave automatically after a short while to greet her
  useEffect(() => {
    if (!isScrollLocked) {
      const timer = setTimeout(() => {
        handleTedWave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScrollLocked]);

  useEffect(() => {
    // Initial setup
    lettersRef.current = lettersRef.current.slice(0, letters.length);
    gsap.set(lettersRef.current, {
      opacity: 0,
      filter: 'blur(12px)',
      y: 30,
      scale: 0.9
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Animate Section 1 "Holla" letters
      tl.to(lettersRef.current, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.18,
        ease: 'power3.out'
      })
        // 2. Let word breathe
        .to(introWordRef.current, {
          scale: 1.02,
          duration: 1.8,
          ease: 'sine.inOut'
        })
        // 3. Magical transition to Section 2
        .to(introWordRef.current, {
          y: -40,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 1.2,
          ease: 'power3.inOut',
          onComplete: () => {
            setIntroCompleted(true);
            setIsScrollLocked(false);

            // Animate Section 2 entrance
            gsap.fromTo(heroTextRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
            );
            gsap.fromTo(heroImageRef.current,
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out', delay: 0.2 }
            );
          }
        });

      // 4. Breathing animation loop for TED in Section 4
      gsap.to(tedBodyRef.current, {
        scaleY: 1.018,
        scaleX: 0.985,
        transformOrigin: 'bottom center',
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ScrollTrigger for Section 3 The Letter (runs when scroll locking is disabled)
  useEffect(() => {
    if (isScrollLocked) return;

    const ctx = gsap.context(() => {
      // Fade in the letter heading
      gsap.fromTo(letterHeadingRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: letterHeadingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Scroll reveal paragraphs one by one
      letterParagraphsRef.current.forEach((p) => {
        if (!p) return;
        gsap.fromTo(p,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Reveal Section 4
      gsap.fromTo('.meet-ted-container',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.meet-ted-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isScrollLocked]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExit = () => {
    // Elegant slide-out transition
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: 'power3.inOut',
      onComplete: () => {
        onComplete();
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FDF9F5] text-[#4A2E1B] select-none font-sans scroll-smooth relative w-full"
    >
      {/* Background soft lighting texture */}
      <div className="absolute inset-0 bg-radial from-amber-50/40 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* ---------------------------------- */}
      {/* SECTION 1 — CINEMATIC INTRO */}
      {/* ---------------------------------- */}
      {!introCompleted && (
        <div
          ref={sec1Ref}
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#FDF9F5] z-50"
        >
          <div
            ref={introWordRef}
            className="flex items-center justify-center font-apple-hello italic text-8xl sm:text-9xl md:text-[11rem] lg:text-[13rem] tracking-tight text-[#4A2E1B] leading-none"
            style={{ fontFeatureSettings: '"swsh" 1, "italic" 1' }}
          >
            {letters.map((char, index) => (
              <span
                key={index}
                ref={(el) => {
                  lettersRef.current[index] = el;
                }}
                className="inline-block transform origin-bottom"
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------- */}
      {/* SECTION 2 — HERO */}
      {/* ---------------------------------- */}
      <div
        ref={sec2Ref}
        className="min-h-screen w-full flex flex-col justify-center items-center px-6 py-12 md:py-24 relative"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* Typography Column */}
          <div
            ref={heroTextRef}
            className="md:col-span-7 text-left space-y-6 md:space-y-8 order-2 md:order-1"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-100/50 border border-amber-200/50 text-[#8C5A3C] rounded-full text-[10px] font-sans font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
                <span>EXCLUSIVELY FOR YOU</span>
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif italic font-normal text-[#3D2616] tracking-tight leading-[1.05]">
                Happy Birthday, <br className="hidden sm:inline" />Smadar.
              </h1>
            </div>

            <div className="space-y-4 max-w-lg">
              <p className="text-lg md:text-xl font-serif text-[#5c3a21]/90 leading-relaxed italic font-medium">
                Today isn't simply about celebrating another year.
              </p>
              <p className="text-sm md:text-base font-sans text-[#5c3a21]/70 leading-relaxed font-medium">
                It's about celebrating the beautiful, warm, and radiant soul that makes this world brighter every single day.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => scrollToSection(sec3Ref)}
                className="group px-8 py-4.5 bg-[#5c3a21] hover:bg-[#3D2616] text-white font-sans font-semibold text-xs rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Open Your Gift</span>
                <Heart className="w-3.5 h-3.5 text-rose-300 fill-current group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Portrait Illustration Column */}
          <div
            ref={heroImageRef}
            className="md:col-span-5 flex justify-center order-1 md:order-2"
          >
            <div className="relative w-72 h-72 sm:w-85 sm:h-85 md:w-96 md:h-96">
              {/* Soft visual glowing backdrop */}
              <div className="absolute inset-4 bg-radial from-amber-100/80 via-transparent to-transparent blur-2xl rounded-full" />

              {/* Detailed SVG Illustration of TED Sitting */}
              <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 filter drop-shadow-md">
                {/* Bear Ears */}
                <circle cx="50" cy="50" r="22" fill="#9A522C" />
                <circle cx="50" cy="50" r="13" fill="#E6A172" />
                <circle cx="150" cy="50" r="22" fill="#9A522C" />
                <circle cx="150" cy="50" r="13" fill="#E6A172" />

                {/* Bear Body */}
                <ellipse cx="100" cy="148" rx="48" ry="42" fill="#B26538" />
                {/* Tummy Oval */}
                <ellipse cx="100" cy="148" rx="30" ry="26" fill="#E6A172" />

                {/* Bear Head */}
                <circle cx="100" cy="92" r="54" fill="#B26538" />

                {/* Muzzle */}
                <ellipse cx="100" cy="108" rx="24" ry="18" fill="#E6A172" />

                {/* Nose */}
                <ellipse cx="100" cy="100" rx="9" ry="6.5" fill="#3D2616" />

                {/* Mouth */}
                <path d="M100,106 L100,113 Q94,119 88,114 M100,113 Q106,119 112,114" stroke="#3D2616" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Eyes */}
                <circle cx="79" cy="82" r="6" fill="#1C1917" />
                <circle cx="121" cy="82" r="6" fill="#1C1917" />
                <circle cx="77" cy="80" r="2" fill="#FFFFFF" />
                <circle cx="119" cy="80" r="2" fill="#FFFFFF" />

                {/* Blush Cheeks */}
                <circle cx="68" cy="98" r="6.5" fill="#F43F5E" opacity="0.4" />
                <circle cx="132" cy="98" r="6.5" fill="#F43F5E" opacity="0.4" />

                {/* Bowtie */}
                <path d="M85,134 L100,140 L115,134 L112,148 L100,142 L88,148 Z" fill="#E11D48" />
                <circle cx="100" cy="140" r="4" fill="#FDA4AF" />

                {/* Sitting Paws */}
                {/* Left Paw */}
                <circle cx="62" cy="165" r="16" fill="#9A522C" />
                <circle cx="62" cy="165" r="10" fill="#E6A172" />
                {/* Right Paw */}
                <circle cx="138" cy="165" r="16" fill="#9A522C" />
                <circle cx="138" cy="165" r="10" fill="#E6A172" />
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 flex flex-col items-center gap-1.5 animate-bounce">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5c3a21]/50">Scroll to unfold</span>
          <ChevronDown className="w-4 h-4 text-[#5c3a21]/40" />
        </div>
      </div>

      {/* ---------------------------------- */}
      {/* SECTION 3 — THE LETTER */}
      {/* ---------------------------------- */}
      <div
        ref={sec3Ref}
        className="min-h-screen w-full flex items-center justify-center px-6 py-20 md:py-32 bg-[#FDF9F5] border-t border-[#5c3a21]/5"
      >
        <div className="max-w-2xl w-full text-left space-y-12">
          {/* Decorative stamp line */}
          <div className="flex items-center gap-4">
            <div className="h-[1px] bg-[#5c3a21]/15 flex-1" />
            <div className="w-8 h-8 rounded-full border border-dashed border-[#5c3a21]/20 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
            </div>
            <div className="h-[1px] bg-[#5c3a21]/15 flex-1" />
          </div>

          <h2
            ref={letterHeadingRef}
            className="font-serif italic font-normal text-3xl sm:text-4xl text-[#3D2616] tracking-tight leading-tight"
          >
            A Permanent Promise.
          </h2>

          <div className="font-serif italic text-base sm:text-lg text-[#3D2616]/90 leading-[1.8] space-y-8">
            <p ref={(el) => { letterParagraphsRef.current[0] = el; }}>
              "They say the internet never forgets.
            </p>
            <p ref={(el) => { letterParagraphsRef.current[1] = el; }}>
              So I wanted to leave something here that time could never take away.
            </p>
            <p ref={(el) => { letterParagraphsRef.current[2] = el; }}>
              A little place that reminds you, every single day, how beautiful you are.
              How loved you are. How appreciated you are. How special you are.
            </p>
            <p ref={(el) => { letterParagraphsRef.current[3] = el; }}>
              This isn't just a birthday website.
            </p>
            <p ref={(el) => { letterParagraphsRef.current[4] = el; }}>
              It's your own little corner of the internet.
              A place where you'll always be welcomed.
              A place where you'll always be cared for.
            </p>
            <p ref={(el) => { letterParagraphsRef.current[5] = el; }}>
              A place where you'll always be reminded that someone believes the world became better the day you were born.
            </p>
            <p ref={(el) => { letterParagraphsRef.current[6] = el; }} className="font-bold text-[#3D2616]">
              Welcome home."
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="h-[1px] bg-[#5c3a21]/15 flex-1" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5c3a21]/45">Written with devotion</span>
            <div className="h-[1px] bg-[#5c3a21]/15 flex-1" />
          </div>
        </div>
      </div>

      {/* ---------------------------------- */}
      {/* SECTION 3.5 — THE SMADAR DEFINITION */}
      {/* ---------------------------------- */}
      <AcrosticSection />

      {/* ---------------------------------- */}
      {/* SECTION 4 — MEET TED */}
      {/* ---------------------------------- */}
      <div
        ref={sec4Ref}
        className="min-h-screen w-full flex items-center justify-center px-6 py-20 md:py-32 bg-[#FAF5EF] border-t border-[#5c3a21]/5"
      >
        <div className="meet-ted-container max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Interactive Teddy Column */}
          <div className="md:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-pointer group"
              onMouseEnter={handleTedWave}
              onClick={handleTedWave}
              title="Hover to wave!"
            >
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-radial from-amber-100/50 via-transparent to-transparent blur-xl rounded-full" />

              {/* Interactive Waving TED SVG */}
              <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 filter drop-shadow-md">
                {/* Bear Ears */}
                <circle cx="55" cy="55" r="23" fill="#9A522C" />
                <circle cx="55" cy="55" r="14" fill="#E6A172" />
                <circle cx="145" cy="55" r="23" fill="#9A522C" />
                <circle cx="145" cy="55" r="14" fill="#E6A172" />

                {/* Animated Breathing Body & Head */}
                <g ref={tedBodyRef}>
                  {/* Bear Body */}
                  <ellipse cx="100" cy="150" rx="46" ry="38" fill="#B26538" />
                  <ellipse cx="100" cy="150" rx="28" ry="24" fill="#E6A172" />

                  {/* Left Arm (Relaxed) */}
                  <ellipse cx="50" cy="144" rx="14" ry="22" fill="#B26538" transform="rotate(-15 50 144)" />

                  {/* Bear Head */}
                  <circle cx="100" cy="95" r="54" fill="#B26538" />

                  {/* Muzzle */}
                  <ellipse cx="100" cy="112" rx="24" ry="18" fill="#E6A172" />

                  {/* Nose */}
                  <ellipse cx="100" cy="103" rx="9" ry="6.5" fill="#3D2616" />

                  {/* Mouth */}
                  <path d="M100,109 L100,117 Q94,124 88,118 M100,117 Q106,124 112,118" stroke="#3D2616" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Blinking Eyes */}
                  <circle cx="76" cy="85" r="6.5" fill="#1C1917" />
                  <circle cx="124" cy="85" r="6.5" fill="#1C1917" />

                  {/* Pupil Blinking Overlay */}
                  <ellipse cx="76" cy="85" rx="6.5" ry={isBlinking ? 1 : 6.5} fill="#B26538" />
                  <ellipse cx="124" cy="85" rx="6.5" ry={isBlinking ? 1 : 6.5} fill="#B26538" />

                  {/* Eye Highlights */}
                  {!isBlinking && (
                    <>
                      <circle cx="74" cy="83" r="2" fill="#FFFFFF" />
                      <circle cx="122" cy="83" r="2" fill="#FFFFFF" />
                    </>
                  )}

                  {/* Cheeks */}
                  <circle cx="65" cy="102" r="6.5" fill="#F43F5E" opacity="0.4" />
                  <circle cx="135" cy="102" r="6.5" fill="#F43F5E" opacity="0.4" />

                  {/* Bowtie */}
                  <path d="M85,138 L100,144 L115,138 L112,152 L100,146 L88,152 Z" fill="#E11D48" />
                  <circle cx="100" cy="144" r="4" fill="#FDA4AF" />
                </g>

                {/* Animated Waving Right Arm */}
                <g ref={tedWaveArmRef}>
                  <ellipse cx="150" cy="140" rx="14" ry="22" fill="#B26538" transform="rotate(15 150 140)" />
                  {/* Soft Paw Pad detail */}
                  <circle cx="150" cy="130" r="6" fill="#E6A172" />
                </g>
              </svg>
            </div>

            <span className="text-[10px] font-mono text-[#5c3a21]/50 tracking-wider">
              {isWaving ? "Wiggle wiggle! 👋" : "Hover or tap TED to wave"}
            </span>
          </div>

          {/* TED Monologue Column */}
          <div className="md:col-span-7 text-left space-y-6 md:space-y-8">
            <h3 className="text-3xl font-serif italic text-[#3D2616] tracking-tight">
              Meet TED.
            </h3>

            <div className="font-serif italic text-base sm:text-lg text-[#5c3a21]/85 leading-relaxed space-y-4">
              <p>
                "Holla Smadar. I'm TED.
              </p>
              <p>
                Someone who loves you very much built me with one simple purpose...
                To remind you that you're never without love.
              </p>
              <p>
                I'll celebrate your happiest days. Sit quietly with you on difficult ones. Keep our memories safe. And make sure you never forget how incredible you are."
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleExit}
                className="px-8 py-4.5 bg-[#4A2E1B] hover:bg-[#3D2616] text-white font-sans font-semibold text-xs rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-95 flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Let's Go Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
