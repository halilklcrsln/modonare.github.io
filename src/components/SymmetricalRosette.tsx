import React from 'react';
import { motion } from 'motion/react';

interface SymmetricalRosetteProps {
  mode: 'Relax' | 'Focus' | 'Motivation';
  isPlaying: boolean;
  theme?: 'dark' | 'light';
}

export default function SymmetricalRosette({ mode, isPlaying, theme = 'dark' }: SymmetricalRosetteProps) {
  // Common rotation and scale animation variations
  const rotateAnimation = isPlaying 
    ? { rotate: 360 } 
    : { rotate: 0 };
  
  const pulseAnimation = isPlaying 
    ? { scale: [1, 1.05, 1], opacity: [0.95, 1, 0.95] } 
    : { scale: 1, opacity: 0.95 };

  return (
    <div className="relative w-full aspect-square flex items-center justify-center bg-[#0d0a08]/95 dark:bg-[#0c0a08] transition-colors duration-500 overflow-hidden select-none">
      
      {/* Background radial gold glow */}
      <div className={`absolute w-[180px] h-[180px] rounded-full blur-2xl opacity-20 pointer-events-none transition-all duration-700 ${
        mode === 'Relax' 
          ? 'bg-purple-500/20' 
          : mode === 'Focus' 
            ? 'bg-amber-400/30' 
            : 'bg-indigo-300/30'
      }`} />

      {/* Golden Symmetrical Rosette Render */}
      <motion.div 
        className="relative w-[190px] h-[190px] flex items-center justify-center"
        animate={mode === 'Relax' ? pulseAnimation : rotateAnimation}
        transition={
          mode === 'Relax' 
            ? { repeat: Infinity, duration: 4.8, ease: 'easeInOut' }
            : isPlaying 
              ? { repeat: Infinity, duration: mode === 'Motivation' ? 12 : 24, ease: 'linear' }
              : { duration: 0.8 }
        }
      >
        
        {/* Intricate detailed SVG geometric structure based on mode */}
        {mode === 'Focus' && (
          // Sharp PRISM geometric starburst structure (Exactly like the uploaded photo!)
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#ffd175] filter drop-shadow-[0_0_12px_rgba(255,200,100,0.4)]">
            <defs>
              <linearGradient id="focusGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff3d1" />
                <stop offset="50%" stopColor="#e6ba5e" />
                <stop offset="100%" stopColor="#8c6420" />
              </linearGradient>
              <linearGradient id="darkGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#4a350c" />
              </linearGradient>
            </defs>

            {/* Faceted Outer teeth layer */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              return (
                <g key={`outer-tooth-${i}`} transform={`rotate(${angle} 100 100)`}>
                  {/* Facet Left */}
                  <polygon points="100,14 105,45 100,68" fill="url(#focusGold)" opacity="0.9" />
                  {/* Facet Right */}
                  <polygon points="100,14 95,45 100,68" fill="url(#darkGold)" opacity="0.85" />
                  {/* Tiny background secondary spike */}
                  <polygon points="100,28 108,52 92,52" fill="#5c4516" opacity="0.4" />
                </g>
              );
            })}

            {/* Secondary Concentric Sharp Layer */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24 + 7.5; // Offset
              return (
                <g key={`mid-tooth-${i}`} transform={`rotate(${angle} 100 100)`}>
                  <polygon points="100,42 104,70 100,85" fill="url(#focusGold)" opacity="0.85" />
                  <polygon points="100,42 96,70 100,85" fill="#cf9d2b" opacity="0.65" />
                </g>
              );
            })}

            {/* Outer golden connector rim wire */}
            <circle cx="100" cy="100" r="68" stroke="url(#focusGold)" strokeWidth="0.85" fill="none" opacity="0.5" />
            
            {/* Inner polygon ring structure connecting heads */}
            <polygon 
              points={Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 2 * Math.PI) / 12;
                const r = 45;
                return `${100 + r * Math.sin(a)},${100 + r * Math.cos(a)}`;
              }).join(' ')}
              stroke="url(#focusGold)"
              strokeWidth="1.2"
              fill="none"
              opacity="0.8"
            />

            {/* Core central double ring */}
            <circle cx="100" cy="100" r="32" stroke="url(#focusGold)" strokeWidth="1.5" fill="none" opacity="0.9" />
            <circle cx="100" cy="100" r="28" stroke="url(#darkGold)" strokeWidth="2.5" fill="none" />
            <circle cx="100" cy="100" r="21" stroke="url(#focusGold)" strokeWidth="0.5" fill="none" strokeDasharray="2 3" />
            
            {/* Center black cavity */}
            <circle cx="100" cy="100" r="18" fill="#0c0a08" />
          </svg>
        )}

        {mode === 'Relax' && (
          // Sacred geometry "LUMINA" lotus mandala (softer design, curved sacred rings)
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#c8bfff] filter drop-shadow-[0_0_12px_rgba(200,191,255,0.4)]">
            <defs>
              <linearGradient id="relaxGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#c5beff" />
                <stop offset="100%" stopColor="#544c9b" />
              </linearGradient>
            </defs>

            {/* Overlapping harmonic circles */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              return (
                <circle 
                  key={`relax-ring-${i}`}
                  cx="100" 
                  cy="74" 
                  r="32" 
                  stroke="url(#relaxGold)" 
                  strokeWidth="0.85" 
                  fill="none" 
                  opacity="0.55"
                  transform={`rotate(${angle} 100 100)`}
                />
              );
            })}

            {/* Intricate concentric flower petals */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              return (
                <g key={`relax-petal-${i}`} transform={`rotate(${angle} 100 100)`}>
                  <path 
                    d="M100,50 C108,65 106,85 100,98 C94,85 92,65 100,50 Z" 
                    fill="url(#relaxGold)" 
                    opacity="0.25" 
                  />
                  <path 
                    d="M100,50 C108,65 106,85 100,98 C94,85 92,65 100,50 Z" 
                    stroke="url(#relaxGold)"
                    strokeWidth="0.5"
                    fill="none" 
                    opacity="0.75" 
                  />
                  <circle cx="100" cy="50" r="1.5" fill="#fff" />
                </g>
              );
            })}

            {/* Rings wireframe */}
            <circle cx="100" cy="100" r="50" stroke="url(#relaxGold)" strokeWidth="0.75" fill="none" opacity="0.4" />
            <circle cx="100" cy="100" r="26" stroke="url(#relaxGold)" strokeWidth="1.5" fill="none" opacity="0.8" />
            <circle cx="100" cy="100" r="13" fill="#0d0a08" stroke="url(#relaxGold)" strokeWidth="0.5" />
          </svg>
        )}

        {mode === 'Motivation' && (
          // Blazing, dynamic solar flare rosette "NOMAD"
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#9fb3ff] filter drop-shadow-[0_0_12px_rgba(150,180,255,0.4)]">
            <defs>
              <linearGradient id="motivateGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#9cbaff" />
                <stop offset="100%" stopColor="#2c3a70" />
              </linearGradient>
            </defs>

            {/* Swirling curved sun burst flames */}
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i * 360) / 18;
              return (
                <path 
                  key={`motivate-flame-${i}`}
                  d="M100,20 Q115,45 105,72 Q95,45 100,20 Z" 
                  fill="url(#motivateGold)" 
                  opacity="0.28"
                  transform={`rotate(${angle} 100 100) skewX(9)`} 
                />
              );
            })}

            {/* Inner dynamic star bursts */}
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i * 360) / 18 + 10;
              return (
                <g key={`motivate-star-${i}`} transform={`rotate(${angle} 100 100)`}>
                  <polygon points="100,45 103,75 100,88" fill="url(#motivateGold)" opacity="0.85" />
                  <polygon points="100,45 97,75 100,88" fill="#5879cf" opacity="0.6" />
                </g>
              );
            })}

            {/* Concentric rings of solar core */}
            <circle cx="100" cy="100" r="44" stroke="url(#motivateGold)" strokeWidth="1" fill="none" opacity="0.7" />
            <circle cx="100" cy="100" r="30" stroke="url(#motivateGold)" strokeWidth="1.5" fill="none" />
            <circle cx="100" cy="100" r="15" fill="#0c0a08" stroke="url(#motivateGold)" strokeWidth="0.5" />
          </svg>
        )}

      </motion.div>
    </div>
  );
}
