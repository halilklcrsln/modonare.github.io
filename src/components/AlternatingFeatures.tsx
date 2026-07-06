import React from 'react';
import { motion } from 'motion/react';

// 1. Mock GPS Map Card
export const MockDriveMap = () => (
  <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#0a0806] border border-[#ffd175]/25 overflow-hidden shadow-2xl p-5 flex flex-col justify-between">
    <div className="absolute inset-0 bg-radial-gradient from-[#ffd175]/5 to-transparent pointer-events-none" />
    <div className="flex justify-between items-center z-10 border-b border-[#ffd175]/10 pb-2">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-mono uppercase text-[#ffd175]/80 tracking-widest font-bold">LIVE RECORDING</span>
      </div>
      <span className="text-[9px] font-mono text-[#8e8574]">GPS-ACTIVE</span>
    </div>
    
    <div className="relative flex-1 w-full my-4 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full text-[#2c241b]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M 20 50 Q 120 40 220 180 T 380 150" strokeDasharray="4 4" opacity="0.4" />
        <path d="M 50 180 L 350 30" strokeDasharray="3 5" opacity="0.3" />
        <motion.path 
          d="M 40 160 Q 100 60 200 120 T 360 40" 
          stroke="#ffd175" 
          strokeWidth="3.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute left-[10%] bottom-[15%] w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      </div>
      <motion.div 
        className="absolute w-5 h-5 rounded-full bg-[#ffd175]/30 border border-[#ffd175] flex items-center justify-center shadow-[0_0_12px_#ffd175]"
        animate={{
          x: [-120, -50, 40, 150],
          y: [60, -25, 20, -60]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeOut" }}
      >
        <span className="text-[10px]">🚗</span>
      </motion.div>
    </div>

    <div className="grid grid-cols-3 gap-2 bg-[#14100b]/80 border border-[#ffd175]/10 rounded-xl p-2.5 z-10 text-center">
      <div>
        <span className="block text-[8px] text-[#8e8574] uppercase tracking-wider">Distance</span>
        <span className="text-[11px] font-mono font-bold text-white">42.8 km</span>
      </div>
      <div>
        <span className="block text-[8px] text-[#8e8574] uppercase tracking-wider">Avg Speed</span>
        <span className="text-[11px] font-mono font-bold text-[#ffd175]">78 km/h</span>
      </div>
      <div>
        <span className="block text-[8px] text-[#8e8574] uppercase tracking-wider">Duration</span>
        <span className="text-[11px] font-mono font-bold text-white">00:34:12</span>
      </div>
    </div>
  </div>
);

// 2. Mock Altitude Line Chart
export const MockCyclingChart = () => (
  <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#0a0806] border border-[#ffd175]/25 overflow-hidden shadow-2xl p-5 flex flex-col justify-between">
    <div className="absolute inset-0 bg-radial-gradient from-[#ffd175]/5 to-transparent pointer-events-none" />
    <div className="flex justify-between items-center z-10 border-b border-[#ffd175]/10 pb-2">
      <span className="text-[10px] font-mono uppercase text-[#ffd175]/80 tracking-widest font-bold">ELEVATION GAIN</span>
      <span className="text-[8.5px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">CLIMB ACTIVE</span>
    </div>

    <div className="relative flex-1 w-full my-4 flex items-end justify-center">
      <svg className="w-full h-full" viewBox="0 0 400 150" fill="none">
        <line x1="0" y1="30" x2="400" y2="30" stroke="#ffd175" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.15" />
        <line x1="0" y1="75" x2="400" y2="75" stroke="#ffd175" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.15" />
        <line x1="0" y1="120" x2="400" y2="120" stroke="#ffd175" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.15" />
        <path d="M 0 150 L 0 110 Q 50 130 100 85 T 200 60 T 300 130 T 400 45 L 400 150 Z" fill="url(#altitudeGrad)" opacity="0.25" />
        <path d="M 0 110 Q 50 130 100 85 T 200 60 T 300 130 T 400 45" stroke="#ffd175" strokeWidth="2.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="altitudeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd175" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="60" r="4.5" fill="#ffd175" stroke="#0a0806" strokeWidth="1.5" />
      </svg>
      <div className="absolute top-[8%] left-[44%] bg-[#120e0a]/90 border border-[#ffd175]/35 rounded px-2.5 py-1 text-left shadow-lg">
        <span className="text-[7px] font-sans font-bold text-[#ffd175] block uppercase">Current Altitude</span>
        <span className="text-[11px] font-mono font-bold text-white leading-none">1,420 m</span>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-1.5 bg-[#14100b]/80 border border-[#ffd175]/10 rounded-xl p-2 z-10 text-center">
      <div>
        <span className="block text-[7px] text-[#8e8574] uppercase">Speed</span>
        <span className="text-[10px] font-mono font-bold text-white">24.5 km/h</span>
      </div>
      <div>
        <span className="block text-[7px] text-[#8e8574] uppercase">Max Alt</span>
        <span className="text-[10px] font-mono font-bold text-white">1,820 m</span>
      </div>
      <div>
        <span className="block text-[7px] text-[#8e8574] uppercase">Slope</span>
        <span className="text-[10px] font-mono font-bold text-[#ffd175]">12%</span>
      </div>
      <div>
        <span className="block text-[7px] text-[#8e8574] uppercase">Calories</span>
        <span className="text-[10px] font-mono font-bold text-white">680 kcal</span>
      </div>
    </div>
  </div>
);

// 3. Mock Motive Dashboard HUD
export const MockMotoHUD = () => (
  <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#0a0806] border border-[#ffd175]/25 overflow-hidden shadow-2xl p-5 flex flex-col justify-between">
    <div className="absolute inset-0 bg-radial-gradient from-[#ffd175]/5 to-transparent pointer-events-none" />
    <div className="flex justify-between items-center z-10 border-b border-[#ffd175]/10 pb-2">
      <span className="text-[10px] font-mono uppercase text-[#ffd175]/80 tracking-widest font-bold">ROAD FILTERING DWELL</span>
      <span className="text-[8.5px] font-mono text-[#8e8574]">ACTIVE MOTO LOG</span>
    </div>

    <div className="flex-1 w-full my-4 flex items-center justify-around">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full rotate-[-135deg]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#1c150e" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="50" cy="50" r="40" stroke="#ffd175" strokeWidth="6" strokeLinecap="round" strokeDasharray="180 250" fill="none" />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-[20px] font-mono font-bold text-white leading-none">110</span>
          <span className="text-[7.5px] tracking-wider text-[#8e8574] uppercase mt-1">km/h</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 max-w-[124px] w-full text-left">
        <div className="bg-[#14100b] border border-[#ffd175]/10 rounded-lg p-2">
          <span className="text-[7.5px] text-[#8e8574] block uppercase leading-none mb-1">Standard Nav</span>
          <span className="text-[11px] font-bold text-red-400 font-mono">45 mins</span>
        </div>
        <div className="bg-[#1c140c] border border-emerald-500/20 rounded-lg p-2 relative overflow-hidden">
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[7.5px] text-emerald-400/80 block uppercase leading-none mb-1">MOTO ACTIVE</span>
          <span className="text-[11px] font-bold text-emerald-400 font-mono">18 mins</span>
        </div>
      </div>
    </div>

    <div className="flex justify-between items-center text-[8.5px] text-[#8e8574] border-t border-[#ffd175]/10 pt-2 font-mono">
      <span>Saved Time: <strong className="text-emerald-400">27 mins</strong></span>
      <span>Efficiency: <strong className="text-[#ffd175]">2.5x</strong></span>
    </div>
  </div>
);

// 4. Mock Compass Sea Radar
export const MockNauticalRadar = () => (
  <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#0a0806] border border-[#ffd175]/25 overflow-hidden shadow-2xl p-5 flex flex-col justify-between">
    <div className="absolute inset-0 bg-radial-gradient from-[#ffd175]/5 to-transparent pointer-events-none" />
    <div className="flex justify-between items-center z-10 border-b border-[#ffd175]/10 pb-2">
      <span className="text-[10px] font-mono uppercase text-[#ffd175]/80 tracking-widest font-bold">NAUTICAL COMPASS</span>
      <span className="text-[8.5px] font-mono text-[#8e8574]">41°01'N 28°57'E</span>
    </div>

    <div className="relative flex-1 w-full my-3 flex items-center justify-center">
      <div className="relative w-28 h-28 rounded-full border border-[#ffd175]/20 flex items-center justify-center">
        <div className="absolute inset-2 rounded-full border border-[#ffd175]/15" />
        <div className="absolute inset-6 rounded-full border border-[#ffd175]/10" />
        
        <div className="absolute h-full w-[0.5px] bg-[#ffd175]/10" />
        <div className="absolute w-full h-[0.5px] bg-[#ffd175]/10" />

        <motion.div 
          className="absolute w-1/2 h-[1px] bg-gradient-to-r from-transparent to-[#ffd175] origin-left left-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute top-[20%] right-[30%] w-2 h-2 rounded-full bg-cyan-400 border border-black animate-pulse" />
        <span className="absolute top-[8%] right-[10%] text-[6px] text-cyan-400 uppercase font-bold tracking-wider">Cove Spot</span>

        <div className="absolute bottom-[25%] left-[25%] w-2 h-2 rounded-full bg-emerald-500 border border-black animate-pulse" />
        <span className="absolute bottom-[14%] left-[10%] text-[6px] text-emerald-400 uppercase font-bold tracking-wider">Anchor Base</span>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2 bg-[#14100b]/80 border border-[#ffd175]/10 rounded-xl p-2 z-10 text-center">
      <div>
        <span className="block text-[7px] text-[#8e8574] uppercase leading-none">SOG</span>
        <span className="text-[9.5px] font-mono font-bold text-white mt-1 block">12.4 knots</span>
      </div>
      <div>
        <span className="block text-[7px] text-[#8e8574] uppercase leading-none">COG</span>
        <span className="text-[9.5px] font-mono font-bold text-white mt-1 block">185° S</span>
      </div>
      <div>
        <span className="block text-[7px] text-[#8e8574] uppercase leading-none">Depth</span>
        <span className="text-[9.5px] font-mono font-bold text-[#ffd175] mt-1 block">42 m</span>
      </div>
    </div>
  </div>
);

// 5. Apple Watch Step UI Bezel
export const MockAppleWatchStep = () => (
  <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#0a0806] border border-[#ffd175]/25 overflow-hidden shadow-2xl p-5 flex flex-col justify-between">
    <div className="absolute inset-0 bg-radial-gradient from-[#ffd175]/5 to-transparent pointer-events-none" />
    <div className="flex justify-between items-center z-10 border-b border-[#ffd175]/10 pb-2">
      <span className="text-[10px] font-mono uppercase text-[#ffd175]/80 tracking-widest font-bold">STEPS HARMONY</span>
      <span className="text-[8.5px] font-mono text-[#8e8574]">WATCH-LINKED</span>
    </div>

    <div className="relative flex-1 w-full my-2.5 flex items-center justify-center">
      <div className="relative w-28 h-32 rounded-[28px] bg-black border-[3px] border-[#221c16] shadow-[0_4px_15px_rgba(0,0,0,0.8)] p-2.5 flex flex-col justify-between items-center bg-radial-gradient from-[#ffd175]/5 to-black">
        <div className="flex justify-between w-full text-[6.5px] text-[#8e8574] font-mono border-b border-[#ffd175]/10 pb-1">
          <span>SENSITIVE GPS</span>
          <span className="text-[#ffd175] font-bold">144 BPM</span>
        </div>
        
        <div className="relative w-12 h-12 my-1.5 flex items-center justify-center">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle cx="24" cy="24" r="20" stroke="#1d150e" strokeWidth="4" fill="none" />
            <circle cx="24" cy="24" r="20" stroke="#ffd175" strokeWidth="4" strokeDasharray="100 130" fill="none" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-[9px] font-mono font-extrabold text-[#ffd175]">82%</span>
          </div>
        </div>

        <div className="text-center font-sans tracking-tight">
          <span className="block text-[10px] font-bold text-white leading-none">8,240</span>
          <span className="text-[5px] text-[#8e8574] uppercase tracking-wide">STEPS LOGGED</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-1 bg-[#14100b]/80 border border-[#ffd175]/10 rounded-lg p-1.5 z-10 text-center text-[8.5px] font-mono text-[#8e8574]">
      <span>PACE: <strong className="text-white">5'12" /km</strong></span>
      <span>CALORIE: <strong className="text-white">340 kcal</strong></span>
    </div>
  </div>
);

// 6. Backtrack Topographic Map with breadcrumbs
export const MockBacktrackMap = () => (
  <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#0a0806] border border-[#ffd175]/25 overflow-hidden shadow-2xl p-5 flex flex-col justify-between">
    <div className="absolute inset-0 bg-radial-gradient from-[#ffd175]/5 to-transparent pointer-events-none" />
    <div className="flex justify-between items-center z-10 border-b border-[#ffd175]/10 pb-2">
      <span className="text-[10px] font-mono uppercase text-[#ffd175]/80 tracking-widest font-bold">BACKTRACK RADAR</span>
      <span className="text-[8.5px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">SAFE RETURN</span>
    </div>

    <div className="relative flex-1 w-full my-4 overflow-hidden rounded-xl border border-[#ffd175]/5 flex items-center justify-center bg-[#070504]">
      <svg className="absolute inset-0 w-full h-full text-[#140e0a]" stroke="currentColor" strokeWidth="0.5" fill="none">
        <circle cx="100" cy="80" r="50" />
        <circle cx="100" cy="80" r="90" />
        <circle cx="300" cy="60" r="40" />
        <circle cx="300" cy="60" r="80" />
        <circle cx="200" cy="120" r="110" />
      </svg>
      
      <svg className="absolute inset-0 w-full h-full text-[#8e8574]" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" fill="none">
        <path d="M 60 40 L 120 70 L 150 120 L 220 90 L 320 130" />
        <motion.path 
          d="M 320 130 L 220 90 L 150 120 L 120 70 L 60 40" 
          stroke="#ffd175" 
          strokeWidth="2" 
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>

      <div className="absolute left-[13%] top-[20%] w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#120e0a] flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-white" />
      </div>
      <span className="absolute left-[6%] top-[8%] text-[6px] font-mono text-emerald-400 uppercase font-bold">Start Base</span>

      <div className="absolute right-[17%] bottom-[12%] w-3.5 h-3.5 rounded-full bg-[#ffd175] border-2 border-[#120e0a] flex items-center justify-center animate-ping" />
      <div className="absolute right-[17%] bottom-[12%] w-3.5 h-3.5 rounded-full bg-[#ffd175] border-2 border-[#120e0a] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#0a0806]" />
      </div>
    </div>

    <div className="flex justify-between items-center text-[8.5px] text-[#8e8574] border-t border-[#ffd175]/10 pt-2 font-mono">
      <span>Breadcrumbs: <strong className="text-white">Active (24)</strong></span>
      <span>Waypoint Return: <strong className="text-[#ffd175]">1.2 km</strong></span>
    </div>
  </div>
);

export interface AlternateFeature {
  id: string;
  titleKey: string;
  descKey: string;
  imageLight: string;
  imageDark: string;
}

export interface DiscoverItem {
  icon: string;
  titleKey: string;
  descKey: string;
}

export interface RoadLogTestimonial {
  textKey: string;
  stars: number;
  authorKey: string;
  avatar: string;
}

export const ROADLOG_FEATURES: AlternateFeature[] = [
  {
    id: 'drive',
    titleKey: 'feat1_title',
    descKey: 'feat1_desc',
    imageLight: '/assets/gorseller/presentation/Presentation-Light-1.png',
    imageDark: '/assets/gorseller/presentation/Presentation-Dark-1.png'
  },
  {
    id: 'traffic',
    titleKey: 'feat2_title',
    descKey: 'feat2_desc',
    imageLight: '/assets/gorseller/presentation/Presentation-2.png',
    imageDark: '/assets/gorseller/presentation/Presentation-2.png'
  },
  {
    id: 'waters',
    titleKey: 'feat3_title',
    descKey: 'feat3_desc',
    imageLight: '/assets/gorseller/presentation/Presentation-3.png',
    imageDark: '/assets/gorseller/presentation/Presentation-3.png'
  },
  {
    id: 'step',
    titleKey: 'feat4_title',
    descKey: 'feat4_desc',
    imageLight: '/assets/gorseller/presentation/Presentation-Light-4.png',
    imageDark: '/assets/gorseller/presentation/Presentation-Dark-4.png'
  },
  {
    id: 'forest',
    titleKey: 'feat5_title',
    descKey: 'feat5_desc',
    imageLight: '/assets/gorseller/presentation/Presentation-5.png',
    imageDark: '/assets/gorseller/presentation/Presentation-5.png'
  }
];

export const DISCOVER_ITEMS: DiscoverItem[] = [
  {
    icon: '🌐',
    titleKey: 'slider1_title',
    descKey: 'slider1_desc'
  },
  {
    icon: '🪐',
    titleKey: 'slider2_title',
    descKey: 'slider2_desc'
  },
  {
    icon: '✨',
    titleKey: 'slider3_title',
    descKey: 'slider3_desc'
  },
  {
    icon: '🎶',
    titleKey: 'slider4_title',
    descKey: 'slider4_desc'
  },
  {
    icon: '🎚️',
    titleKey: 'slider5_title',
    descKey: 'slider5_desc'
  },
  {
    icon: '👤',
    titleKey: 'slider6_title',
    descKey: 'slider6_desc'
  },
  {
    icon: '💡',
    titleKey: 'slider7_title',
    descKey: 'slider7_desc'
  },
  {
    icon: '☸️',
    titleKey: 'slider8_title',
    descKey: 'slider8_desc'
  },
  {
    icon: '📱',
    titleKey: 'slider9_title',
    descKey: 'slider9_desc'
  }
];

export const ROADLOG_TESTIMONIALS: RoadLogTestimonial[] = [
  {
    textKey: 'test1_text',
    stars: 5,
    authorKey: 'test1_author',
    avatar: "/assets/gorseller/profilepictures/p1.jpg"
  },
  {
    textKey: 'test2_text',
    stars: 5,
    authorKey: 'test2_author',
    avatar: "/assets/gorseller/profilepictures/p2.jpg"
  },
  {
    textKey: 'test3_text',
    stars: 5,
    authorKey: 'test3_author',
    avatar: "/assets/gorseller/profilepictures/p3.jpg"
  },
  {
    textKey: 'test4_text',
    stars: 5,
    authorKey: 'test4_author',
    avatar: "/assets/gorseller/profilepictures/p4.jpg"
  },
  {
    textKey: 'test5_text',
    stars: 5,
    authorKey: 'test5_author',
    avatar: "/assets/gorseller/profilepictures/p5.jpg"
  },
  {
    textKey: 'test6_text',
    stars: 5,
    authorKey: 'test6_author',
    avatar: "/assets/gorseller/profilepictures/p6.jpg"
  },
  {
    textKey: 'test7_text',
    stars: 5,
    authorKey: 'test7_author',
    avatar: "/assets/gorseller/profilepictures/p7.webp"
  },
  {
    textKey: 'test8_text',
    stars: 5,
    authorKey: 'test8_author',
    avatar: "/assets/gorseller/profilepictures/p8.jfif"
  },
  {
    textKey: 'test9_text',
    stars: 5,
    authorKey: 'test9_author',
    avatar: "/assets/gorseller/profilepictures/p9.jpg"
  },
  {
    textKey: 'test10_text',
    stars: 5,
    authorKey: 'test10_author',
    avatar: "/assets/gorseller/profilepictures/p10.jpg"
  },
  {
    textKey: 'test11_text',
    stars: 5,
    authorKey: 'test11_author',
    avatar: "/assets/gorseller/profilepictures/p11.jpg"
  }
];

export interface SupportedLanguage {
  code: string;
  name: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'tr', name: 'TÜRKÇE' },
  { code: 'en', name: 'ENGLISH' },
  { code: 'ar', name: 'العربية' },
  { code: 'az', name: 'AZƏRBAYCAN DİLİ' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'bg', name: 'БЪЛГАРСКИ' },
  { code: 'zh', name: '中文 (普通话)' },
  { code: 'hr', name: 'HRVATSKI' },
  { code: 'cs', name: 'ČEŠTINA' },
  { code: 'da', name: 'DANSK' },
  { code: 'nl', name: 'NEDERLANDS' },
  { code: 'fil', name: 'FILIPINO' },
  { code: 'fi', name: 'SUOMI' },
  { code: 'fr', name: 'FRANÇAIS' },
  { code: 'de', name: 'DEUTSCH' },
  { code: 'el', name: 'ΕΛΛΗΝΙΚΆ' },
  { code: 'he', name: 'עברית' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'hu', name: 'MAGYAR' },
  { code: 'id', name: 'BAHASA INDONESIA' },
  { code: 'it', name: 'ITALIANO' },
  { code: 'ja', name: '日本語' },
  { code: 'kk', name: 'ҚАЗАҚША' },
  { code: 'ko', name: '한국어' },
  { code: 'ky', name: 'КЫРГЫЗЧА' },
  { code: 'ms', name: 'BAHASA MELAYU' },
  { code: 'no', name: 'NORSK' },
  { code: 'fa', name: 'فارسی' },
  { code: 'pl', name: 'POLSKI' },
  { code: 'pt', name: 'PORTUGUÊS' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'ro', name: 'ROMÂNĂ' },
  { code: 'ru', name: 'РУССКИЙ' },
  { code: 'sr', name: 'СРПСКИ' },
  { code: 'es', name: 'ESPAÑOL' },
  { code: 'sw', name: 'KISWAHILI' },
  { code: 'sv', name: 'SVENSKA' },
  { code: 'tg', name: 'ТОҶИКӢ' },
  { code: 'th', name: 'ภาษาไทย' },
  { code: 'tk', name: 'TÜRKMEN' },
  { code: 'uk', name: 'УКРАЇНСЬКА' },
  { code: 'ur', name: 'اردو' },
  { code: 'uz', name: 'OʻZBEKCHA' },
  { code: 'vi', name: 'TIẾNG VIỆT' },
];
