/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Compass, Heart, Coffee, Award, Sparkles } from 'lucide-react';
import { MEMORIES } from '../data';
import { Memory } from '../types';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface MemoriesTimelineProps {
  onMemorySelect: (memory: Memory) => void;
}

export default function MemoriesTimeline({ onMemorySelect }: MemoriesTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Category Icon Renderer
  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case 'cozy':
        return <Coffee className="w-5 h-5" />;
      case 'adventure':
        return <Compass className="w-5 h-5" />;
      case 'romantic':
        return <Heart className="w-5 h-5 fill-current" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  useEffect(() => {
    // GSAP ScrollTrigger Animations
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        const isEven = index % 2 === 0;
        const card = item.querySelector('.timeline-card');
        const badge = item.querySelector('.timeline-badge');
        const lineConnector = item.querySelector('.timeline-line-connector');

        // Reset starting states
        gsap.set(card, {
          opacity: 0,
          x: isEven ? -60 : 60,
          scale: 0.95
        });
        gsap.set(badge, {
          scale: 0,
          opacity: 0
        });
        if (lineConnector) {
          gsap.set(lineConnector, {
            scaleX: 0,
            transformOrigin: isEven ? 'right' : 'left'
          });
        }

        // Timeline for each scroll item
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%', // start when top of item hits 80% of viewport
            end: 'top 50%',
            scrub: 1, // smooth scroll scrubbing
            toggleActions: 'play none none reverse'
          }
        });

        tl.to(badge, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        })
        .to(card, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.2');

        if (lineConnector) {
          tl.to(lineConnector, {
            scaleX: 1,
            duration: 0.3,
            ease: 'sine.out'
          }, '-=0.4');
        }
      });
    }, containerRef);

    return () => {
      // Clean up all ScrollTriggers when component unmounts
      ctx.revert();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative max-w-5xl mx-auto px-4 py-16 md:py-24"
      id="memories-timeline-section"
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16 md:mb-24">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-100 rounded-none text-xs font-semibold uppercase tracking-wider text-rose-500 mb-4 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>An Eternal Digital Ledger</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-rose-950 tracking-tight mb-4">
          Our Unshakable Timeline
        </h2>
        <p className="max-w-md mx-auto text-sm md:text-base text-rose-900/60 font-sans">
          Because the internet never forgets, our memories are preserved in digital stone—holding you warm and safe whenever we are oceans apart.
        </p>
      </div>

      {/* Vertical center timeline spine */}
      <div className="absolute left-1/2 top-[240px] bottom-[100px] w-0.5 bg-gradient-to-b from-rose-200 via-pink-300 to-rose-200 -translate-x-1/2 hidden md:block" />

      {/* Timeline entries */}
      <div className="space-y-16 md:space-y-24 relative z-10">
        {MEMORIES.map((memory, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={memory.id}
              ref={(el) => { itemsRef.current[index] = el; }}
              className={`flex flex-col md:flex-row items-center justify-between relative ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Space filler column for desktop layout */}
              <div className="w-full md:w-[45%] hidden md:block" />

              {/* Central badge */}
              <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                <div 
                  className={`timeline-badge w-12 h-12 rounded-full bg-gradient-to-br ${memory.heartColor} text-white shadow-lg flex items-center justify-center border-4 border-white transition-transform hover:scale-110 cursor-pointer`}
                  onClick={() => onMemorySelect(memory)}
                  title="Unlock Memory"
                >
                  {renderCategoryIcon(memory.category)}
                </div>
              </div>

              {/* Horizontal line connector (desktop only) */}
              <div 
                className={`timeline-line-connector absolute top-1/2 w-[5%] h-0.5 bg-rose-200 hidden md:block z-10 ${
                  isEven ? 'right-[50%]' : 'left-[50%]'
                }`}
              />

              {/* Main memory card */}
              <div className="w-full md:w-[45%]">
                <div 
                  className="timeline-card bg-white border-2 border-rose-950 p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_#4c0519] shadow-[6px_6px_0px_0px_#4c0519] transition-all duration-500 cursor-pointer group relative overflow-hidden"
                  onClick={() => onMemorySelect(memory)}
                >
                  {/* Category icon for mobile layout */}
                  <div className="md:hidden flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold tracking-wider text-rose-500 capitalize px-2.5 py-1 bg-rose-50 rounded-full flex items-center gap-1">
                      {renderCategoryIcon(memory.category)}
                      {memory.category}
                    </span>
                    <span className="text-xs text-rose-900/60 font-sans flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {memory.date}
                    </span>
                  </div>

                  {/* Desktop Date header */}
                  <div className="hidden md:flex items-center gap-1.5 text-rose-400 font-sans text-xs font-semibold tracking-wider uppercase mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{memory.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-rose-950 leading-snug mb-3 group-hover:text-rose-600 transition-colors">
                    {memory.title}
                  </h3>

                  {/* Highlight image clip */}
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-rose-50">
                    <img
                      src={memory.imageUrl}
                      alt={memory.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-950/30 to-transparent" />
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-rose-900/75 leading-relaxed font-sans mb-4">
                    {memory.description}
                  </p>

                  {/* Card Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-rose-100/50">
                    <span className="text-xs font-display font-medium text-rose-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read full story 💖 &rarr;
                    </span>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${memory.heartColor} shadow-sm`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
