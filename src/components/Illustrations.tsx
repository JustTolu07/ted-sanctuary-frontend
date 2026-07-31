import React from 'react';

// Personalized Character Illustration of Smadar (matching reference image: mocha skin tone, sleek black bob cut, black cat-eye glasses, hoop earrings, crisp shirt & blazer)
export function SmadarAvatar({ expression = 'happy', className = "w-24 h-24" }: { expression?: 'happy' | 'calm' | 'hug' | 'sad' | 'sleepy' | 'frustrated' | 'surprised'; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 230" className="w-full h-full drop-shadow-lg">
        <defs>
          {/* Background Gradient */}
          <linearGradient id="bgAura" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E3A59" />
            <stop offset="100%" stopColor="#1E2238" />
          </linearGradient>

          {/* Skin Gradient for rich mocha skin tone with subtle magenta glow */}
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8F483D" />
            <stop offset="50%" stopColor="#7B3A31" />
            <stop offset="100%" stopColor="#672D25" />
          </linearGradient>

          {/* Lip Berry Gradient */}
          <linearGradient id="lipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D92662" />
            <stop offset="100%" stopColor="#8C133D" />
          </linearGradient>

          {/* Glasses Lens Glare */}
          <linearGradient id="lensGlare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#C084FC" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Outer Circle Background Container */}
        <circle cx="100" cy="115" r="105" fill="url(#bgAura)" />

        {/* 1. Back Hair Layer (Sleek Dark Chin Bob) */}
        <path d="M36,90 C32,145 52,165 65,158 C72,135 68,90 68,90 L132,90 C132,90 128,135 135,158 C148,165 168,145 164,90 C158,40 42,40 36,90 Z" fill="#121016" />

        {/* 2. Earrings (Silver Rings) */}
        <circle cx="50" cy="120" r="8" fill="none" stroke="#E2E8F0" strokeWidth="3" />
        <circle cx="150" cy="120" r="8" fill="none" stroke="#E2E8F0" strokeWidth="3" />

        {/* 3. Shoulders & Blazer Outfit (Suit Jacket, White Shirt Collar, Black Tie) */}
        {/* Dark Blazer Suit Jacket */}
        <path d="M25,225 C25,182 58,165 100,165 C142,165 175,182 175,225 Z" fill="#1C1E26" />
        <path d="M40,225 L65,170 L100,205 L135,170 L160,225 Z" fill="#2D303E" />

        {/* Crisp White Shirt Collar */}
        <polygon points="100,165 72,192 88,225 100,200 112,225 128,192" fill="#FFFFFF" />
        <polygon points="100,165 68,198 84,205" fill="#E2E8F0" />
        <polygon points="100,165 132,198 116,205" fill="#CBD5E1" />

        {/* Black Necktie */}
        <polygon points="95,190 105,190 108,225 92,225" fill="#111827" />
        <polygon points="93,184 107,184 105,192 95,192" fill="#1F2937" />

        {/* 4. Slender Mocha Neck */}
        <rect x="86" y="130" width="28" height="38" rx="8" fill="url(#skinGrad)" />
        {/* Neck Shadow under chin */}
        <path d="M86,138 Q100,148 114,138 L114,148 Q100,158 86,148 Z" fill="#4A1C16" opacity="0.6" />

        {/* 5. Head & Ears Shape */}
        {/* Ears */}
        <ellipse cx="56" cy="108" rx="8" ry="12" fill="#7B3A31" />
        <ellipse cx="144" cy="108" rx="8" ry="12" fill="#7B3A31" />
        
        {/* Face */}
        <path d="M58,78 C58,48 142,48 142,78 C142,118 132,138 100,138 C68,138 58,118 58,78 Z" fill="url(#skinGrad)" />

        {/* Rosy Cheeks & Nose Glow */}
        <ellipse cx="74" cy="106" rx="14" ry="10" fill="#BE385C" opacity="0.3" />
        <ellipse cx="126" cy="106" rx="14" ry="10" fill="#BE385C" opacity="0.3" />
        <circle cx="100" cy="102" r="3.5" fill="#FFA5B8" opacity="0.8" />

        {/* Nose Line */}
        <path d="M100,92 L98,103 Q100,106 103,103" stroke="#5C231B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* 6. Expressions (Eyes, Eyelashes, Eyebrows & Lips) */}

        {/* Eyebrows */}
        <path d="M68,76 Q80,70 90,75" stroke="#121016" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M110,75 Q120,70 132,76" stroke="#121016" strokeWidth="3" fill="none" strokeLinecap="round" />

        {expression === 'happy' && (
          <>
            {/* Expressive Dark Almond Eyes */}
            <ellipse cx="78" cy="88" rx="10" ry="8" fill="#FFFFFF" />
            <ellipse cx="122" cy="88" rx="10" ry="8" fill="#FFFFFF" />
            <circle cx="78" cy="88" r="6" fill="#1C100B" />
            <circle cx="122" cy="88" r="6" fill="#1C100B" />
            <circle cx="76" cy="86" r="2" fill="#FFFFFF" />
            <circle cx="120" cy="86" r="2" fill="#FFFFFF" />

            {/* Winged Eyeliner & Lashes */}
            <path d="M66,88 Q78,80 90,87 C92,84 94,82 96,85" stroke="#121016" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M110,87 Q122,80 134,88 C136,85 138,83 140,86" stroke="#121016" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Full Plump Berry Lips (Confident Sweet Smile) */}
            {/* Top Lip */}
            <path d="M84,118 Q100,113 116,118 Q100,121 84,118 Z" fill="url(#lipGrad)" />
            {/* Bottom Lip */}
            <path d="M84,118 Q100,130 116,118 Q100,122 84,118 Z" fill="url(#lipGrad)" />
            {/* Lip Shine */}
            <ellipse cx="100" cy="122" rx="4" ry="1.5" fill="#FFFFFF" opacity="0.6" />
          </>
        )}

        {expression === 'calm' && (
          <>
            {/* Relaxed Gently Closed Eyelashes */}
            <path d="M68,88 Q78,94 88,88" stroke="#121016" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M112,88 Q122,94 132,88" stroke="#121016" strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* Soft Lips */}
            <path d="M86,119 Q100,115 114,119 Q100,128 86,119 Z" fill="url(#lipGrad)" />
            <ellipse cx="100" cy="122" rx="3" ry="1" fill="#FFFFFF" opacity="0.5" />
          </>
        )}

        {expression === 'hug' && (
          <>
            {/* Big Shiny Pleading Sparkle Eyes */}
            <ellipse cx="78" cy="88" rx="11" ry="9" fill="#FFFFFF" />
            <ellipse cx="122" cy="88" rx="11" ry="9" fill="#FFFFFF" />
            <circle cx="78" cy="88" r="7" fill="#1C100B" />
            <circle cx="122" cy="88" r="7" fill="#1C100B" />
            <circle cx="75" cy="85" r="2.5" fill="#FFFFFF" />
            <circle cx="119" cy="85" r="2.5" fill="#FFFFFF" />

            {/* Lashes */}
            <path d="M65,88 Q78,80 90,87" stroke="#121016" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M110,87 Q122,80 135,88" stroke="#121016" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Cute Pouty Lips */}
            <path d="M88,118 Q100,113 112,118 Q100,129 88,118 Z" fill="url(#lipGrad)" />
            <ellipse cx="100" cy="122" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.7" />
          </>
        )}

        {expression === 'sad' && (
          <>
            {/* Sad Soft Droopy Eyes */}
            <ellipse cx="78" cy="90" rx="9" ry="7" fill="#FFFFFF" />
            <ellipse cx="122" cy="90" rx="9" ry="7" fill="#FFFFFF" />
            <circle cx="78" cy="91" r="5" fill="#1C100B" />
            <circle cx="122" cy="91" r="5" fill="#1C100B" />
            
            {/* Tear Drop */}
            <path d="M68,93 Q66,104 70,107 Q74,104 72,93 Z" fill="#38BDF8" opacity="0.8" />

            {/* Slightly Downturned Lips */}
            <path d="M86,122 Q100,117 114,122 Q100,126 86,122 Z" fill="url(#lipGrad)" />
          </>
        )}

        {expression === 'sleepy' && (
          <>
            {/* Sleepy Lids */}
            <path d="M68,90 L88,90" stroke="#121016" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M112,90 L132,90" stroke="#121016" strokeWidth="3.5" strokeLinecap="round" />

            {/* Soft Relaxed Mouth */}
            <ellipse cx="100" cy="120" rx="5" ry="4" fill="url(#lipGrad)" />
          </>
        )}

        {expression === 'frustrated' && (
          <>
            <ellipse cx="78" cy="88" rx="8" ry="7" fill="#FFFFFF" />
            <ellipse cx="122" cy="88" rx="8" ry="7" fill="#FFFFFF" />
            <circle cx="78" cy="88" r="5" fill="#1C100B" />
            <circle cx="122" cy="88" r="5" fill="#1C100B" />

            {/* Pressed Lips */}
            <path d="M86,121 L114,121" stroke="#8C133D" strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {/* 7. Stylish Black Cat-Eye Glasses with Purple Glare */}
        {/* Left Lens */}
        <path d="M58,88 C56,72 92,72 94,88 C94,103 58,103 58,88 Z" fill="url(#lensGlare)" stroke="#111827" strokeWidth="3.5" />
        {/* Right Lens */}
        <path d="M106,88 C106,72 142,72 140,88 C140,103 104,103 106,88 Z" fill="url(#lensGlare)" stroke="#111827" strokeWidth="3.5" />
        {/* Bridge */}
        <path d="M94,84 Q100,82 106,84" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Glasses Side Frames */}
        <path d="M58,82 L50,85" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
        <path d="M142,82 L150,85" stroke="#111827" strokeWidth="3" strokeLinecap="round" />

        {/* 8. Front Hair Strand & Middle Part */}
        {/* Smooth Hair Framing Face */}
        <path d="M58,55 C60,75 56,115 48,132 C42,120 40,85 46,60 Z" fill="#121016" />
        <path d="M142,55 C140,75 144,115 152,132 C158,120 160,85 154,60 Z" fill="#121016" />
        {/* Top Part & Crown Hair Shine */}
        <path d="M55,50 Q100,32 145,50 Q130,42 100,42 Q70,42 55,50 Z" fill="#1C1826" />
        {/* Middle Part Line */}
        <path d="M100,42 L100,62" stroke="#2D283E" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// TED Plush Teddy Bear Illustration
export function TedBearIllustration({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
        {/* Soft Background Aura */}
        <circle cx="100" cy="100" r="90" fill="#FEF3C7" opacity="0.7" />

        {/* Bear Ears */}
        <circle cx="55" cy="55" r="24" fill="#9A522C" />
        <circle cx="55" cy="55" r="14" fill="#E6A172" />
        <circle cx="145" cy="55" r="24" fill="#9A522C" />
        <circle cx="145" cy="55" r="14" fill="#E6A172" />

        {/* Bear Head */}
        <circle cx="100" cy="95" r="62" fill="#B26538" />

        {/* Muzzle */}
        <ellipse cx="100" cy="112" rx="28" ry="22" fill="#E6A172" />

        {/* Nose */}
        <ellipse cx="100" cy="103" rx="11" ry="8" fill="#3D2616" />

        {/* Mouth */}
        <path d="M100,111 L100,119 Q93,126 86,120 M100,119 Q107,126 114,120" stroke="#3D2616" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Eyes with Sparkles */}
        <circle cx="76" cy="85" r="7" fill="#1C1917" />
        <circle cx="124" cy="85" r="7" fill="#1C1917" />
        <circle cx="74" cy="82" r="2.5" fill="#FFFFFF" />
        <circle cx="122" cy="82" r="2.5" fill="#FFFFFF" />

        {/* Cheeks */}
        <circle cx="65" cy="102" r="8" fill="#F43F5E" opacity="0.5" />
        <circle cx="135" cy="102" r="8" fill="#F43F5E" opacity="0.5" />

        {/* Cute Bowtie */}
        <path d="M82,142 L100,149 L118,142 L114,162 L100,152 L86,162 Z" fill="#E11D48" />
        <circle cx="100" cy="149" r="5" fill="#FDA4AF" />
      </svg>
    </div>
  );
}

// Glistening Water Drop Vector Artwork (3D Liquid drop style from reference image)
export function WaterDropIllustration({ level = 65, className = "w-28 h-28" }: { level?: number; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 200" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <clipPath id="dropClip">
            <path d="M80,12 C80,12 15,100 15,135 C15,172 44,192 80,192 C116,192 145,172 145,135 C145,100 80,12 80,12 Z" />
          </clipPath>
        </defs>

        {/* Drop Outer Outline */}
        <path d="M80,12 C80,12 15,100 15,135 C15,172 44,192 80,192 C116,192 145,172 145,135 C145,100 80,12 80,12 Z" fill="url(#dropGrad)" stroke="#DBEAFE" strokeWidth="4" />

        {/* Liquid Fill Clip */}
        <g clipPath="url(#dropClip)">
          <rect x="0" y={192 - (level / 100) * 180} width="160" height="200" fill="url(#liquidGrad)" />
          {/* Animated Liquid Wave curve */}
          <path d={`M-20,${192 - (level / 100) * 180} Q20,${180 - (level / 100) * 180} 60,${192 - (level / 100) * 180} T140,${192 - (level / 100) * 180} T220,${192 - (level / 100) * 180} L220,200 L-20,200 Z`} fill="#3B82F6" opacity="0.8" />
        </g>

        {/* Drop Gloss Highlight */}
        <path d="M40,110 C32,130 35,155 48,168" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.6" />
        <circle cx="80" cy="38" r="4" fill="#FFFFFF" opacity="0.8" />
      </svg>
    </div>
  );
}

// Sleep Moon Vector Artwork (From reference image)
export function MoonIllustration({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
        {/* Soft Aura */}
        <circle cx="80" cy="80" r="70" fill="#312E81" opacity="0.4" />
        
        {/* Moon Body */}
        <path d="M95,20 C55,20 25,50 25,90 C25,130 55,150 95,150 C70,135 60,105 60,85 C60,60 75,32 95,20 Z" fill="#FDE68A" stroke="#FEF3C7" strokeWidth="2" />
        
        {/* Craters */}
        <circle cx="55" cy="80" r="7" fill="#F59E0B" opacity="0.3" />
        <circle cx="70" cy="115" r="9" fill="#F59E0B" opacity="0.3" />
        <circle cx="75" cy="50" r="5" fill="#F59E0B" opacity="0.3" />

        {/* Sleeping Face */}
        <path d="M42,82 Q48,87 54,82" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M46,95 Q52,99 58,95" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Stars */}
        <polygon points="120,40 123,48 131,48 125,53 127,61 120,56 113,61 115,53 109,48 117,48" fill="#FFFFFF" />
        <polygon points="135,90 137,95 142,95 138,98 139,103 135,100 131,103 132,98 128,95 133,95" fill="#FDE68A" />
      </svg>
    </div>
  );
}

// Golden Trophy / Reward Vector Artwork (From reference image)
export function TrophyIllustration({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
        {/* Pedestal Base */}
        <rect x="45" y="130" width="70" height="18" rx="4" fill="#78350F" />
        <rect x="55" y="118" width="50" height="14" rx="2" fill="#B45309" />

        {/* Trophy Cup */}
        <path d="M40,30 L120,30 L110,85 C105,105 55,105 50,85 Z" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="3" />
        
        {/* Cup Inner Glow */}
        <path d="M45,34 L115,34 L106,75 C100,90 60,90 54,75 Z" fill="#FBBF24" />

        {/* Handles */}
        <path d="M40,40 C15,40 15,75 48,78" stroke="#F59E0B" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M120,40 C145,40 145,75 112,78" stroke="#F59E0B" strokeWidth="8" fill="none" strokeLinecap="round" />

        {/* Star Medal Badge */}
        <circle cx="80" cy="58" r="14" fill="#FFFFFF" />
        <polygon points="80,48 83,55 90,55 85,60 87,67 80,63 73,67 75,60 70,55 77,55" fill="#D97706" />
      </svg>
    </div>
  );
}

// Individual Water Glass Icon for tracker
export function WaterCupIcon({ filled = false, onClick }: { key?: React.Key; filled?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1 cursor-pointer transition-transform active:scale-90 hover:scale-110 focus:outline-none"
    >
      <svg viewBox="0 0 60 80" className="w-8 h-10 drop-shadow-2xs">
        {/* Glass Outline */}
        <path d="M10,10 L50,10 L44,70 L16,70 Z" fill={filled ? "#3B82F6" : "rgba(255,255,255,0.15)"} stroke={filled ? "#DBEAFE" : "rgba(255,255,255,0.6)"} strokeWidth="3" rx="2" />
        {/* Liquid Highlight if filled */}
        {filled && (
          <path d="M13,25 Q30,20 47,25 L43,67 L17,67 Z" fill="#60A5FA" opacity="0.9" />
        )}
      </svg>
    </button>
  );
}
