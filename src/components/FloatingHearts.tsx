/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { MEMORIES } from '../data';
import { Sparkle } from '../types';

interface FloatingHeartsProps {
  onHeartClick?: (memoryId: string) => void;
}

interface FloatingHeartItem {
  id: string;
  left: number; // percentage
  scale: number;
  duration: number; // seconds
  delay: number; // seconds
  memoryId: string;
  color: string;
}

export default function FloatingHearts({ onHeartClick }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<FloatingHeartItem[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Generate initial floating hearts
  useEffect(() => {
    const initialHearts: FloatingHeartItem[] = [];
    // We have 4 memories in MEMORIES. Let's assign hearts to each memory.
    for (let i = 0; i < 15; i++) {
      const memory = MEMORIES[i % MEMORIES.length];
      initialHearts.push({
        id: `heart-init-${i}-${Math.random()}`,
        left: 5 + Math.random() * 90, // 5% to 95%
        scale: 0.6 + Math.random() * 0.8, // 0.6 to 1.4
        duration: 12 + Math.random() * 12, // 12s to 24s
        delay: Math.random() * -15, // Negative delay so they start at different scroll stages immediately
        memoryId: memory.id,
        color: i % 3 === 0 ? 'text-rose-400' : i % 3 === 1 ? 'text-pink-500' : 'text-amber-400',
      });
    }
    setHearts(initialHearts);
  }, []);

  // Trigger a burst of sparkle particles when a heart is clicked
  const createSparkles = (clientX: number, clientY: number) => {
    const newSparkles: Sparkle[] = [];
    const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#a855f7', '#6366f1'];
    
    for (let i = 0; i < 16; i++) {
      newSparkles.push({
        id: Date.now() + i + Math.random(),
        x: clientX,
        y: clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 12,
      });
    }

    setSparkles((prev) => [...prev, ...newSparkles]);

    // Cleanup sparkles after 1 second
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.some((ns) => ns.id === s.id)));
    }, 1000);
  };

  const handleHeartClick = (e: React.MouseEvent, heart: FloatingHeartItem) => {
    e.stopPropagation();
    
    // Create spectacular burst
    createSparkles(e.clientX, e.clientY);
    
    // Trigger memory opening
    if (onHeartClick) onHeartClick(heart.memoryId);
    
    // Remove the clicked heart and respawn a new one after a short delay
    setHearts((prev) => prev.filter((h) => h.id !== heart.id));
    
    setTimeout(() => {
      const memory = MEMORIES[Math.floor(Math.random() * MEMORIES.length)];
      const newHeart: FloatingHeartItem = {
        id: `heart-respawn-${Date.now()}-${Math.random()}`,
        left: 5 + Math.random() * 90,
        scale: 0.6 + Math.random() * 0.8,
        duration: 12 + Math.random() * 12,
        delay: 0, // Starts immediately at the bottom
        memoryId: memory.id,
        color: Math.random() > 0.5 ? 'text-rose-400' : Math.random() > 0.3 ? 'text-pink-500' : 'text-amber-400',
      };
      setHearts((prev) => [...prev, newHeart]);
    }, 1500);
  };

  // Allow releasing extra hearts manually
  const releaseHeartBurst = (e: React.MouseEvent) => {
    createSparkles(e.clientX, e.clientY);
    
    const burstHearts: FloatingHeartItem[] = [];
    for (let i = 0; i < 6; i++) {
      const memory = MEMORIES[Math.floor(Math.random() * MEMORIES.length)];
      burstHearts.push({
        id: `heart-burst-${Date.now()}-${i}-${Math.random()}`,
        left: 20 + Math.random() * 60, // closer to center
        scale: 0.8 + Math.random() * 0.6,
        duration: 8 + Math.random() * 6, // faster drift
        delay: Math.random() * 0.5,
        memoryId: memory.id,
        color: i % 2 === 0 ? 'text-rose-500 animate-pulse' : 'text-pink-400',
      });
    }
    setHearts((prev) => [...prev, ...burstHearts]);
  };

  return (
    <>
      {/* Floating Hearts Layer */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {hearts.map((heart) => (
          <button
            key={heart.id}
            onClick={(e) => handleHeartClick(e, heart)}
            className="absolute bottom-0 floating-heart-element cursor-pointer pointer-events-auto transition-transform hover:scale-150 duration-300 group focus:outline-none"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              transform: `scale(${heart.scale})`,
            }}
            title="Click to reveal a memory!"
          >
            <div className="relative">
              {/* Outer glow aura */}
              <Heart
                className={`w-8 h-8 ${heart.color} fill-current drop-shadow-[0_0_10px_rgba(244,63,94,0.4)] transition-transform duration-300 group-hover:scale-110`}
              />
              {/* Little label hint appearing on hover */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-rose-500 text-white text-[10px] font-sans font-medium px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                Click me! 💖
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Sparkles Particle Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {sparkles.map((sparkle) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = 40 + Math.random() * 120;
          const targetX = Math.cos(angle) * distance;
          const targetY = Math.sin(angle) * distance - 20; // slight upward drift
          
          return (
            <div
              key={sparkle.id}
              className="absolute rounded-full flex items-center justify-center transition-all duration-1000 ease-out"
              style={{
                left: sparkle.x,
                top: sparkle.y,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                backgroundColor: sparkle.color,
                boxShadow: `0 0 12px ${sparkle.color}`,
                transform: `translate(${targetX}px, ${targetY}px) scale(0)`,
                opacity: 0,
              }}
            >
              {Math.random() > 0.5 ? '✨' : '💖'}
            </div>
          );
        })}
      </div>

      {/* Floating Action Button to Release Hearts */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={releaseHeartBurst}
          className="flex items-center gap-2 bg-rose-950 hover:bg-rose-900 text-white font-display font-black text-xs uppercase tracking-widest px-5 py-3 rounded-none border-2 border-rose-950 shadow-[4px_4px_0px_0px_#f43f5e] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#f43f5e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#f43f5e] transition-all duration-200"
          id="release-hearts-btn"
        >
          <Heart className="w-4 h-4 fill-current animate-bounce text-rose-400" />
          <span>Release Love</span>
        </button>
      </div>
    </>
  );
}
