import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from './AlternatingFeatures';

interface CelestialHeaderProps {
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  lang: string;
  setLang: (l: string) => void;
  t: any;
  isSticky?: boolean;
}

interface ModonareLogoProps {
  size?: number;
}

function ModonareLogo({ size = 80 }: ModonareLogoProps) {
  const width = size;
  const height = Math.round((size * 148) / 180);
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="10 36 180 148" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-celestial-gold filter drop-shadow-[0_0_10px_rgba(230,195,100,0.35)] hover:scale-105 transition-all duration-500 cursor-pointer"
    >
      {/* 1. Outer Headband of the Gold Headphones */}
      <path 
        d="M25 110 C25 50, 175 50, 175 110" 
        stroke="url(#goldGradient)" 
        strokeWidth="11" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Headband inner cushion detail */}
      <path 
        d="M32 105 C32 58, 168 58, 168 105" 
        stroke="url(#goldGradientDark)" 
        strokeWidth="2.5" 
        fill="none" 
        opacity="0.6"
      />

      {/* 2. Audio Headphone Ear Cups left & right with brushed metal look */}
      {/* Left cup */}
      <rect x="12" y="100" width="18" height="42" rx="9" fill="url(#goldGradient)" stroke="url(#goldGradientDark)" strokeWidth="1.5" />
      <rect x="22" y="106" width="5" height="30" rx="2.5" fill="url(#goldGradientDark)" opacity="0.5" />
      {/* Left cup connection joint */}
      <path d="M22 100 L22 92 L28 92" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" />

      {/* Right cup */}
      <rect x="170" y="100" width="18" height="42" rx="9" fill="url(#goldGradient)" stroke="url(#goldGradientDark)" strokeWidth="1.5" />
      <rect x="173" y="106" width="5" height="30" rx="2.5" fill="url(#goldGradientDark)" opacity="0.5" />
      {/* Right cup connection joint */}
      <path d="M178 100 L178 92 L172 92" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" />

      {/* 3. Concentric Astrological Celestial Zodiac Disc */}
      <circle cx="100" cy="110" r="68" stroke="url(#goldGradient)" strokeWidth="2" fill="#16130d" fillOpacity="0.45" />
      <circle cx="100" cy="110" r="64" stroke="url(#goldGradient)" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.75" />
      <circle cx="100" cy="110" r="54" stroke="url(#goldGradient)" strokeWidth="0.5" opacity="0.4" />

      {/* 4. Astrological constellation stars and lines inside the disc */}
      <g opacity="0.75" className="animate-pulse">
        {/* Constellation lines */}
        <line x1="68" y1="92" x2="85" y2="82" stroke="url(#goldGradient)" strokeWidth="0.6" opacity="0.5" />
        <line x1="85" y1="82" x2="98" y2="92" stroke="url(#goldGradient)" strokeWidth="0.6" opacity="0.5" />
        <line x1="98" y1="92" x2="115" y2="86" stroke="url(#goldGradient)" strokeWidth="0.6" opacity="0.5" />
        <line x1="115" y1="86" x2="132" y2="100" stroke="url(#goldGradient)" strokeWidth="0.6" opacity="0.5" />
        
        {/* Constellation Stars */}
        <circle cx="68" cy="92" r="2.5" fill="url(#goldGradient)" />
        <circle cx="85" cy="82" r="1.5" fill="url(#goldGradient)" />
        <circle cx="98" cy="92" r="2" fill="#fff" />
        <circle cx="115" cy="86" r="1.5" fill="url(#goldGradient)" />
        <circle cx="132" cy="100" r="3" fill="url(#goldGradient)" />
      </g>

      {/* Scattered Zodiac symbol icons */}
      <text x="94" y="70" fill="url(#goldGradient)" fontSize="11" fontFamily="serif" opacity="0.8" fontWeight="bold">♌</text>
      <text x="56" y="132" fill="url(#goldGradient)" fontSize="10" fontFamily="serif" opacity="0.75">♊</text>
      <text x="136" y="82" fill="url(#goldGradient)" fontSize="11" fontFamily="serif" opacity="0.75">♋</text>
      <text x="128" y="138" fill="url(#goldGradient)" fontSize="10" fontFamily="serif" opacity="0.8">♏</text>

      {/* Decorative stars */}
      <path d="M90 56 L91.5 59 L94.5 59 L92 61 L93 64 L90 62.5 L87 64 L88 61 L85.5 59 L88.5 59 Z" fill="url(#goldGradient)" opacity="0.65" />
      <path d="M140 115 L141 117 L143 117 L141.5 118 L142 120 L140 119 L138 120 L138.5 118 L137 117 L139 117 Z" fill="url(#goldGradient)" opacity="0.55" />

      {/* 5. Central Vertical Soundwave/Frequencies (Interactive Pulsating) */}
      <g className="text-celestial-gold">
        <line x1="72" y1="110" x2="72" y2="110" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="y1" values="98;104;98" dur="1.4s" repeatCount="indefinite" />
          <animate attributeName="y2" values="122;116;122" dur="1.4s" repeatCount="indefinite" />
        </line>
        <line x1="78" y1="110" x2="78" y2="110" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="y1" values="90;105;90" dur="1.7s" repeatCount="indefinite" />
          <animate attributeName="y2" values="130;115;130" dur="1.7s" repeatCount="indefinite" />
        </line>
        <line x1="84" y1="110" x2="84" y2="110" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="y1" values="82;100;82" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="y2" values="138;120;138" dur="1.5s" repeatCount="indefinite" />
        </line>
        <line x1="90" y1="110" x2="90" y2="110" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="y1" values="74;96;74" dur="1.9s" repeatCount="indefinite" />
          <animate attributeName="y2" values="146;124;146" dur="1.9s" repeatCount="indefinite" />
        </line>
        <line x1="96" y1="110" x2="96" y2="110" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="y1" values="64;88;64" dur="1.3s" repeatCount="indefinite" />
          <animate attributeName="y2" values="156;132;156" dur="1.3s" repeatCount="indefinite" />
        </line>
        <line x1="102" y1="110" x2="102" y2="110" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="y1" values="64;90;64" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="156;130;156" dur="1.6s" repeatCount="indefinite" />
        </line>
        <line x1="108" y1="110" x2="108" y2="110" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="y1" values="74;102;74" dur="1.4s" repeatCount="indefinite" />
          <animate attributeName="y2" values="146;118;146" dur="1.4s" repeatCount="indefinite" />
        </line>
        <line x1="114" y1="110" x2="114" y2="110" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="y1" values="82;98;82" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="138;122;138" dur="1.8s" repeatCount="indefinite" />
        </line>
        <line x1="120" y1="110" x2="120" y2="110" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="y1" values="90;103;90" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="y2" values="130;117;130" dur="1.5s" repeatCount="indefinite" />
        </line>
        <line x1="126" y1="110" x2="126" y2="110" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="y1" values="98;105;98" dur="1.3s" repeatCount="indefinite" />
          <animate attributeName="y2" values="122;115;122" dur="1.3s" repeatCount="indefinite" />
        </line>
      </g>

      <defs>
        <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="30%" stopColor="#e6c364" />
          <stop offset="70%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="goldGradientDark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function CelestialHeader({ theme, setTheme, lang, setLang, t, isSticky = false }: CelestialHeaderProps) {
  const [langOpen, setLangOpen] = useState(false);

  const currentLangName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name || lang.toUpperCase();

  return (
    <header className={`${isSticky ? 'sticky' : 'fixed'} top-0 left-0 w-full z-50 bg-opacity-85 bg-mystic-dark border-b transition-all duration-300 backdrop-blur-xl ${
      theme === 'light' 
        ? 'border-celestial-gold/35 shadow-sm' 
        : 'border-celestial-gold/15 dark:shadow-none'
    }`}>
      <div className="max-w-[1440px] mx-auto flex flex-col px-6 md:px-12 pt-1 md:pt-1.5 pb-1 md:pb-1.5">
        {/* Symmetrical 3-Column Header Layout (Logo Left, Brand Text Center, Controls Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 pb-1.5 w-full">
          
          {/* Column 1: Logo (Left-aligned on desktop, Centered on mobile) */}
          <div className="flex justify-center md:justify-start select-none pt-0 md:self-center">
            {/* Elegant Golden Astro-Acoustic Headphone Logo - Custom Image Enlarged */}
            <a href="#" className="focus:outline-none block hover:scale-[1.03] transition-all duration-300">
              <img 
                src="/assets/Modonaretransparenlogo.png" 
                alt="Modonare Logo" 
                className="h-[120px] md:h-[155px] w-auto object-contain filter drop-shadow-[0_0_12px_rgba(230,195,100,0.3)]" 
              />
            </a>
          </div>

          {/* Column 2: Brand Title Text Block (Centered) */}
          <div className="flex flex-col items-center justify-center text-center select-none pt-0.5">
            <span className="font-serif text-[24px] md:text-[28px] font-bold text-celestial-gold tracking-[0.25em] leading-none uppercase hover:opacity-90 transition-opacity">
              MODONARE
            </span>
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] uppercase text-mystic-text-muted/70 mt-2.5 leading-none">
              ASTRO-ACOUSTIC RESONANCE
            </span>
          </div>

          {/* Column 3: Symmetrical Controls (Right-aligned on desktop, Centered on mobile) */}
          <div className="flex justify-center md:justify-end items-center select-none w-full">
            {/* Inner Stack: Centered internally so language is centered under the button */}
            <div className="flex flex-col items-center justify-center gap-1.5">
            {/* Theme Control Stack: Window & Sliders perfectly aligned in center relative to each other */}
            <div className="flex flex-col items-center gap-0">
              
              {/* Stars & Moon Celestial Window (Centered over button) */}
              <div 
                className={`relative select-none block overflow-hidden rounded-t-full border border-b-0 transition-colors duration-300 shadow-[inset_0_4px_12px_rgba(0,0,0,0.73)]`}
                style={{ 
                  width: '9.5rem', 
                  height: '4.75rem',
                  borderColor: theme === 'light' ? 'rgba(202, 158, 51, 0.5)' : 'rgba(230, 195, 100, 0.25)'
                }}
              >
                
                {/* Rotating background sky wheel - elegant light sky blue and dark cosmic blue */}
                <motion.div
                  animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="absolute top-0 left-0 origin-center pointer-events-none"
                  style={{
                    width: '9.5rem',
                    height: '9.5rem',
                    background: 'conic-gradient(from 90deg, #bae6fd 0deg, #38bdf8 180deg, #030a16 180deg, #081a37 270deg, #040e20 360deg)'
                  }}
                >
                  {/* Starfield embedded only on the dark cosmic half of rotating circle */}
                  <div className="absolute inset-0">
                    {/* Left soft star styled from user image */}
                    <div className="absolute left-[2.4rem] top-[2.0rem] w-[5px] h-[5px] bg-slate-200/60 rounded-full animate-pulse opacity-80" />
                    {/* Upper right bright star styled from user image */}
                    <div className="absolute left-[6.3rem] top-[1.2rem] w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.85)]" />
                    {/* Far right small star styled from user image */}
                    <div className="absolute left-[7.5rem] top-[2.1rem] w-1 h-1 bg-white/90 rounded-full animate-pulse" />
                  </div>
                </motion.div>

                {/* Left Floating Cloud */}
                <motion.div
                  animate={{ 
                    x: [0, 4, 0],
                    opacity: theme === 'light' ? 0.9 : 0
                  }}
                  transition={{ 
                    x: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 0.8 }
                  }}
                  className="absolute left-[12%] top-[35%] pointer-events-none"
                >
                  <svg width="24" height="14" viewBox="0 0 28 16" fill="white" className="drop-shadow-sm opacity-90">
                    <path d="M17.39 5C17.06 2.18 14.67 0 11.72 0c-2.31 0-4.3 1.34-5.26 3.29C6.15 3.11 5.84 3 5.51 3 2.47 3 0 5.46 0 8.5S2.47 14 5.51 14h16.21C25.18 14 28 11.18 28 7.72c0-3.1-2.28-5.63-5.27-6.18C21.84 5.37 19.78 5 17.39 5z" />
                  </svg>
                </motion.div>

                {/* Right Floating Cloud */}
                <motion.div
                  animate={{ 
                    x: [0, -5, 0],
                    opacity: theme === 'light' ? 0.85 : 0
                  }}
                  transition={{ 
                    x: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 0.8 }
                  }}
                  className="absolute right-[12%] top-[25%] pointer-events-none"
                >
                  <svg width="28" height="16" viewBox="0 0 28 16" fill="white" className="drop-shadow-sm opacity-80">
                    <path d="M17.39 5C17.06 2.18 14.67 0 11.72 0c-2.31 0-4.3 1.34-5.26 3.29C6.15 3.11 5.84 3 5.51 3 2.47 3 0 5.46 0 8.5S2.47 14 5.51 14h16.21C25.18 14 28 11.18 28 7.72c0-3.1-2.28-5.63-5.27-6.18C21.84 5.37 19.78 5 17.39 5z" />
                  </svg>
                </motion.div>
                
                {/* Moon to Sun Transform */}
                <motion.div 
                  animate={{ 
                    rotate: theme === 'dark' ? 0 : 360
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer z-10"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <div className={`w-9 h-9 rounded-full transition-all duration-1000 relative overflow-hidden flex items-center justify-center ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-tr from-celestial-gold to-amber-200 shadow-[0_0_18px_rgba(230,195,100,0.65)]' 
                      : 'bg-gradient-to-tr from-amber-400 to-orange-500 shadow-[0_0_22px_rgba(251,191,36,0.95)]'
                  }`}>
                    <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-amber-400/35"></div>
                      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-amber-500/25"></div>
                      <div className="absolute top-3 left-4 w-1 h-1 rounded-full bg-amber-500/30"></div>
                    </div>
                    
                    {/* Clean sun disk - no inner ray lines inside the glowing sun sphere */}
                    <div className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
                      {/* Quiet pure celestial light disk */}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Slider Controller buttons - Perfectly aligned and integrated with the dome header */}
              <div className={`p-1 rounded-full flex h-10 items-center w-[11rem] relative z-10 -mt-2.5 shadow-md select-none transition-all duration-300 border ${
                theme === 'light' 
                  ? 'bg-white border-celestial-gold/50 shadow-[0_3px_10px_rgba(202,158,51,0.15)]' 
                  : 'bg-[#181512] border-celestial-gold/25'
              }`}>
                <div 
                  className={`absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] z-0 rounded-full border transition-all duration-300 shadow-sm ${
                    theme === 'light' 
                      ? 'bg-[#faf8f4] border-celestial-gold/30' 
                      : 'bg-[#38342d]/90 border-celestial-gold/15'
                  }`}
                  style={{
                    transform: theme === 'light' ? 'translateX(100%)' : 'translateX(0px)'
                  }}
                />
                
                <button 
                  onClick={() => setTheme('dark')}
                  className={`flex-1 relative z-10 flex items-center justify-center gap-2 text-[10.5px] font-button font-bold tracking-wider uppercase transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-celestial-gold' 
                      : (theme === 'light' ? 'text-mystic-text-muted/60 hover:text-mystic-text' : 'text-mystic-text-muted/40 hover:text-mystic-text/80')
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 text-current">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                  Dark
                </button>
                <button 
                  onClick={() => setTheme('light')}
                  className={`flex-1 relative z-10 flex items-center justify-center gap-2 text-[10.5px] font-button font-bold tracking-wider uppercase transition-colors duration-300 ${
                    theme === 'light' 
                      ? 'text-[#8a6a16]' 
                      : 'text-mystic-text-muted/40 hover:text-mystic-text/80'
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 text-current">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                  </svg>
                  Light
                </button>
              </div>

            </div>

            {/* Language Selector dropdown button, aligned perfectly in the right stack */}
            <div className="relative z-30">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex h-9 items-center gap-1.5 text-mystic-text-muted hover:text-celestial-gold transition-colors duration-300 py-1.5 px-4 rounded-full border bg-mystic-surface/40 hover:bg-mystic-surface/75 shadow-sm ${
                  theme === 'light' 
                    ? 'border-celestial-gold/45 shadow-[0_2px_8px_rgba(202,158,51,0.1)]' 
                    : 'border-celestial-gold/15'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-celestial-gold" />
                <span className="font-button text-[10px] tracking-widest uppercase font-semibold">
                  {currentLangName}
                </span>
                <ChevronDown className={`w-3 h-3 text-celestial-gold transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <>
                    {/* Overlay to close the dropdown on click outside */}
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-1.5 w-56 rounded-xl bg-mystic-surface-high border border-celestial-gold/20 p-1 shadow-2xl z-50 backdrop-blur-md"
                    >
                      <div className="max-h-64 overflow-y-auto custom-scrollbar pr-0.5">
                        {SUPPORTED_LANGUAGES.map((language) => (
                          <button
                            key={language.code}
                            onClick={() => { setLang(language.code); setLangOpen(false); }}
                            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left text-xs text-mystic-text hover:bg-mystic-surface-highest transition-colors font-sans"
                          >
                            <span>{language.name}</span>
                            {lang === language.code && <Check className="w-3 h-3 text-celestial-gold shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        </div>

        {/* Horizontal Navigation Link Row */}
        <div className={`h-[1px] my-1 transition-colors duration-300 ${
          theme === 'light' ? 'bg-celestial-gold/35' : 'bg-celestial-gold/15'
        }`} />
        <nav className="flex justify-center items-center py-1.5 md:py-2 gap-8 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-mystic-text-muted/80">
          <a className="hover:text-celestial-gold transition-colors block duration-200" href="#">{t.home}</a>
          <a className="hover:text-celestial-gold transition-colors block duration-200" href="#/privacy">{t.privacy}</a>
          <a className="hover:text-celestial-gold transition-colors block duration-200" href="#/terms">{t.terms}</a>
          <a className="hover:text-celestial-gold transition-colors block duration-200" href="#/support">{t.support}</a>
        </nav>
      </div>
    </header>
  );
}
