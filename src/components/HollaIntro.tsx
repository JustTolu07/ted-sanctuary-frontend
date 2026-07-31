import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HollaIntroProps {
  onComplete: () => void;
}

export const HollaIntro: React.FC<HollaIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const letters = ['H', 'o', 'l', 'l', 'a'];

  useEffect(() => {
    letterRefs.current = letterRefs.current.slice(0, letters.length);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) {
            onComplete();
          }
        },
      });

      // Initial letter setup
      gsap.set(letterRefs.current, {
        opacity: 0,
        filter: 'blur(16px)',
        y: 24,
        scale: 0.92,
      });

      // 1. Smooth letter fade-in with blur, upward motion, and scale
      tl.to(letterRefs.current, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        scale: 1,
        duration: 1.3,
        stagger: 0.16,
        ease: 'power3.out',
      });

      // 2. Let "Holla" breathe on screen for ~2 seconds with a soft scale breathing effect
      tl.to(wordRef.current, {
        scale: 1.03,
        duration: 2.0,
        ease: 'sine.inOut',
      }, '+=0.2');

      // 3. Cinematic transition: scale down and float upward gently while fading out
      tl.to(containerRef.current, {
        opacity: 0,
        y: -36,
        scale: 0.97,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '+=0.3');

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const handleSkip = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => onComplete(),
      });
    } else {
      onComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDF9F5] text-[#4A2E1B] select-none overflow-hidden"
    >
      {/* Soft ambient background warmth */}
      <div className="absolute inset-0 bg-radial from-amber-50/60 via-[#FDF9F5] to-[#FAF5EF] pointer-events-none" />

      {/* Main Centered Typographic Intro */}
      <div
        ref={wordRef}
        className="relative z-10 flex items-center justify-center font-apple-hello italic text-8xl sm:text-9xl md:text-[11rem] lg:text-[13rem] tracking-tight font-normal text-[#4A2E1B] leading-none"
        style={{ fontFeatureSettings: '"swsh" 1, "italic" 1' }}
      >
        {letters.map((char, index) => (
          <span
            key={index}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            className="inline-block transform origin-bottom transition-all duration-300 hover:text-amber-800"
          >
            {char}
          </span>
        ))}
      </div>

      {/* Discreet bottom subtle control */}
      <button
        onClick={handleSkip}
        type="button"
        className="absolute bottom-8 right-8 text-[10px] font-mono uppercase tracking-[0.25em] text-[#5c3a21]/30 hover:text-[#5c3a21] transition-colors cursor-pointer z-20"
      >
        Skip intro &rarr;
      </button>
    </div>
  );
};
