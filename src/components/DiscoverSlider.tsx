import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DiscoverSliderProps {
  lang: string;
  theme: 'dark' | 'light';
  t: Record<string, string>;
}

interface DiscoverItem {
  icon: string;
  titleKey: string;
  descKey: string;
  screenComponent: (theme: 'dark' | 'light') => React.ReactNode;
}

export default function DiscoverSlider({ lang, theme, t }: DiscoverSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const discoverData: DiscoverItem[] = [
    {
      icon: '🎶',
      titleKey: 'slide1_title',
      descKey: 'slide1_desc',
      screenComponent: (th) => (
        <img 
          src={th === 'dark' ? '/assets/gorseller/App/Astro-Music-Dark.png' : '/assets/gorseller/App/Astro-Music-Light.png'} 
          alt="Astro Music" 
          className="w-full h-full object-cover object-top" 
        />
      )
    },
    {
      icon: '\u2638\uFE0F',
      titleKey: 'slide2_title',
      descKey: 'slide2_desc',
      screenComponent: (th) => (
        <img 
          src={th === 'dark' ? '/assets/gorseller/App/Birthchart-Dark.png' : '/assets/gorseller/App/Birthchart-Light.png'} 
          alt="Birth Chart" 
          className="w-full h-full object-cover object-top" 
        />
      )
    },
    {
      icon: '🎚️',
      titleKey: 'slide3_title',
      descKey: 'slide3_desc',
      screenComponent: (th) => (
        <img 
          src={th === 'dark' ? '/assets/gorseller/App/SoundLab-Dark.png' : '/assets/gorseller/App/SoundLab-Light.png'} 
          alt="Sound Lab Mixer" 
          className="w-full h-full object-cover object-top" 
        />
      )
    },
    {
      icon: '🎵',
      titleKey: 'slide4_title',
      descKey: 'slide4_desc',
      screenComponent: (th) => (
        <img 
          src={th === 'dark' ? '/assets/gorseller/App/MyMusics-Dark.png' : '/assets/gorseller/App/MyMusics-Light.png'} 
          alt="My Musics" 
          className="w-full h-full object-cover object-top" 
        />
      )
    },
    {
      icon: '👤',
      titleKey: 'slide5_title',
      descKey: 'slide5_desc',
      screenComponent: (th) => (
        <img 
          src={th === 'dark' ? '/assets/gorseller/App/Profile-Dark.png' : '/assets/gorseller/App/Profile-Light.png'} 
          alt="Cosmic Profile" 
          className="w-full h-full object-cover object-top" 
        />
      )
    },
    {
      icon: '📱',
      titleKey: 'slide6_title',
      descKey: 'slide6_desc',
      screenComponent: (th) => (
        <img 
          src={th === 'dark' ? '/assets/gorseller/App/Paywall-Dark.png' : '/assets/gorseller/App/Paywall-Light.png'} 
          alt="Premium Paywall" 
          className="w-full h-full object-cover object-top" 
        />
      )
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % discoverData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + discoverData.length) % discoverData.length);
  };

  const activeItem = discoverData[activeIndex];

  return (
    <div id="discover-slider-container" className="relative w-full py-12 px-2 md:px-6">
      <div className="max-w-[1200px] mx-auto select-none relative">
        
        {/* OVERLAPPED CENTRED BADGE AT THE TOP OF THE CONTAINER */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-950 border border-celestial-gold/35 dark:border-celestial-gold/15 shadow-[0_4px_15px_rgba(0,0,0,0.5)] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd175] animate-ping" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#ffd175]">
              {t.discoverModonare || 'Discover MODONARE'}
            </span>
          </div>
        </div>

        {/* MAIN LUXURIOUS SLIDER CARD WRAPPER */}
        <div 
          className={`w-full rounded-[2.5rem] border overflow-hidden p-8 md:p-14 transition-all duration-500 min-h-[500px] flex flex-col justify-center relative ${
            theme === 'light' 
              ? 'bg-[#ffffff] border-celestial-gold/35 shadow-[0_12px_45px_rgba(0,0,0,0.06)]' 
              : 'bg-[#0f0c08]/95 border-celestial-gold/15 shadow-[0_12px_45px_rgba(0,0,0,0.45)]'
          }`}
        >
          {/* Subtle gold accent light glow on left side for active/pro feels */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-r from-[#ffd175]/5 to-transparent pointer-events-none rounded-full blur-[100px] -translate-x-20 -translate-y-20" />

          {/* MAIN COLUMN ARRANGE (LEFT: Mock Phone, RIGHT: Copywriter text) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center w-full my-6">
            
            {/* LEFT COLUMN: Smartphone Mockup Bezel Chassis */}
            <div className="col-span-1 md:col-span-5 flex justify-center md:justify-end items-center">
              <div className="relative w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] rounded-[2.8rem] sm:rounded-[3rem] p-1.5 sm:p-2 bg-slate-950 border-[3.5px] sm:border-[4.5px] border-slate-800 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden">
                
                {/* iPhone Dynamic Island Notch Bezel */}
                <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-3.5 sm:h-4 bg-black rounded-full z-30 flex items-center justify-around px-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span className="w-4 sm:w-5 h-1 bg-slate-900 rounded-full" />
                </div>

                {/* Inner Screen Content area */}
                <div className="flex-1 w-full h-full rounded-[2.2rem] sm:rounded-[2.5rem] overflow-hidden z-10 bg-[#0a0806] border border-black/20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      {activeItem.screenComponent(theme)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Display copy text with rich typography */}
            <div className="col-span-1 md:col-span-7 flex flex-col justify-center items-start md:pr-4">
              <div className="relative max-w-[480px] w-full flex flex-col justify-center space-y-6">

                {/* Slider title */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className={`font-serif text-4xl md:text-5xl font-medium tracking-tight ${
                      theme === 'light' ? 'text-slate-900' : 'text-amber-50'
                    }`}>
                      {t[activeItem.titleKey] || activeItem.titleKey}
                    </h3>
                    
                    <p className={`text-base md:text-lg lg:text-xl font-light leading-relaxed ${
                      theme === 'light' ? 'text-slate-600' : 'text-amber-50/70'
                    }`}>
                      {t[activeItem.descKey] || activeItem.descKey}
                    </p>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>

          {/* CIRCULAR DIRECTIONAL ARROW NAVIGATION BUTTONS (LEFT / RIGHT) */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-2 md:px-5">
            
            {/* PREVIOUS ARROW BUTTON */}
            <button 
              onClick={handlePrev}
              id="discover-slider-prev-btn"
              aria-label="Previous Slide"
              className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 pointer-events-auto shadow-md scale-95 hover:scale-105 active:scale-95 border cursor-pointer ${
                theme === 'light' 
                  ? 'bg-slate-950 text-white border-slate-950 hover:bg-slate-900' 
                  : 'bg-white text-slate-950 border-white hover:bg-slate-100'
              }`}
            >
              <span className="text-md font-bold leading-none select-none">❮</span>
            </button>

            {/* NEXT ARROW BUTTON */}
            <button 
              onClick={handleNext}
              id="discover-slider-next-btn"
              aria-label="Next Slide"
              className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 pointer-events-auto shadow-md scale-95 hover:scale-105 active:scale-95 border cursor-pointer ${
                theme === 'light' 
                  ? 'bg-slate-950 text-white border-slate-950 hover:bg-slate-900' 
                  : 'bg-white text-slate-950 border-white hover:bg-slate-100'
              }`}
            >
              <span className="text-md font-bold leading-none select-none">❯</span>
            </button>

          </div>

          {/* PAGINATION DOTS INDICATORS ROW AT THE BOTTOM CENTER */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {discoverData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx 
                    ? `w-5 ${theme === 'light' ? 'bg-slate-950' : 'bg-[#ffd175] shadow-[0_0_8px_#ffd175]'}` 
                    : `w-2 ${theme === 'light' ? 'bg-slate-300 hover:bg-slate-400' : 'bg-slate-700 hover:bg-slate-600'}`
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
