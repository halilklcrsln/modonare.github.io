import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Heart, Moon, Sun, Volume2, Globe, Music, 
  Download, ShieldCheck, Check, Radio, Play, Pause, List, Eye, MessageCircle, Headphones, User, Waves
} from 'lucide-react';
import { ZODIACS, TRACKS, AMBIENT_SOUNDS, TESTIMONIALS, TRANSLATIONS, ZodiacSign, SoundTrack, AmbientSound } from './types';
import { startAstroSynth, updateAstroSynthFreq, stopAstroSynth, setAmbientSoundActive, updateAmbientVolume, stopAllAmbients } from './utils/audio';
import { INTRO_TRANSLATIONS } from './utils/introTranslations';
import CelestialHeader from './components/CelestialHeader';
import AstroChartCalculator from './components/AstroChartCalculator';
import SoundscapePlayer from './components/SoundscapePlayer';
import SymmetricalRosette from './components/SymmetricalRosette';
import { ROADLOG_FEATURES, DISCOVER_ITEMS, ROADLOG_TESTIMONIALS } from './components/AlternatingFeatures';
import DiscoverSlider from './components/DiscoverSlider';
import LegalPage from './components/LegalPage';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentView, setCurrentView] = useState<'main' | 'privacy' | 'terms' | 'support'>('main');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/privacy') {
        setCurrentView('privacy');
        window.scrollTo(0, 0);
      } else if (path === '/terms') {
        setCurrentView('terms');
        window.scrollTo(0, 0);
      } else if (path === '/support') {
        setCurrentView('support');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('main');
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  const [lang, setLang] = useState<string>('en'); // default to turkish since user prompt is Turkish
  const [activeZodiac, setActiveZodiac] = useState<ZodiacSign>(ZODIACS[7]); // Default to Scorpio ♏
  const [activeTrack, setActiveTrack] = useState<SoundTrack>(TRACKS[0]); // Default to Obsidian Focus
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [ambientSounds, setAmbientSounds] = useState<AmbientSound[]>(AMBIENT_SOUNDS);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States to track custom hero phone mockup background image load errors (falling back to custom polished SVG/CSS design)
  const [heroImg1Error, setHeroImg1Error] = useState(false);
  const [heroImg2Error, setHeroImg2Error] = useState(false);
  const [heroImg3Error, setHeroImg3Error] = useState(false);

  // Center phone mockup specific states (Virgo and Libra defaults matching the user mockup)
  const [selectedSun, setSelectedSun] = useState<ZodiacSign>(ZODIACS[5]); // Virgo ♍
  const [selectedRising, setSelectedRising] = useState<ZodiacSign>(ZODIACS[6]); // Libra ♎
  const [activeSignTab, setActiveSignTab] = useState<'SUN' | 'RISING'>('SUN');
  const [activeMode, setActiveMode] = useState<'Relax' | 'Focus' | 'Motivation'>('Focus');
  const [isSunDropdownOpen, setIsSunDropdownOpen] = useState(false);
  const [isRisingDropdownOpen, setIsRisingDropdownOpen] = useState(false);
  const [phoneArtError, setPhoneArtError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load translations
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  const introT = INTRO_TRANSLATIONS[lang] || INTRO_TRANSLATIONS['en'];

  // Apply dark/light theme classes on change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    // Reset image load error states on theme toggle to attempt loading the new theme's assets
    setHeroImg1Error(false);
    setHeroImg2Error(false);
    setHeroImg3Error(false);
  }, [theme]);

  // Whenever the phone's selected Sun/Rising or active mode changes, sync it with the page's current active tracks/zodiacs
  useEffect(() => {
    const activeSign = activeSignTab === 'SUN' ? selectedSun : selectedRising;
    setActiveZodiac(activeSign);
    
    // Do not overwrite custom natal frequency chart playback if that is current!
    if (activeTrack && activeTrack.id === 'custom-reson') return;

    const matchingTrack = TRACKS.find(t => t.category === activeMode);
    if (matchingTrack) {
      // Create a calibrated track copy reflecting the current selected Zodiac frequency
      const calibrated: SoundTrack = {
        ...matchingTrack,
        frequency: activeSign.frequency,
        chakra: activeSign.chakra + ` • ${activeSign.frequency}Hz`
      };
      setActiveTrack(calibrated);
    }
  }, [selectedSun, selectedRising, activeSignTab, activeMode]);

  // Audio playback controller effect coordinating both true audio files and Web Audio physical synthesizer fallbacks
  useEffect(() => {
    const activeSign = activeSignTab === 'SUN' ? selectedSun : selectedRising;
    
    if (isPlaying) {
      // Create local HTML5 Audio element lazily if needed
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.loop = true;
      }

      const specificPath = `./assets/music_${activeSign.id}_${activeMode.toLowerCase()}.mp3`;
      const genericPath = `./assets/music_${activeMode.toLowerCase()}.mp3`;

      audioRef.current.pause();
      audioRef.current.src = specificPath;
      audioRef.current.load();

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Playback succeeded! Stop synthesizer so they don't overlay
          stopAstroSynth();
        }).catch(() => {
          // If specific path failed, try generic path fallback
          if (audioRef.current) {
            audioRef.current.src = genericPath;
            audioRef.current.load();
            audioRef.current.play().then(() => {
              stopAstroSynth();
            }).catch(() => {
              // File not loaded, fall back to our beautiful real-time Web Audio Synthesizer!
              let syntheticFreq = activeSign.frequency;
              if (activeMode === 'Relax') {
                syntheticFreq = syntheticFreq * 0.75; // Lower minor tone
              } else if (activeMode === 'Motivation') {
                syntheticFreq = syntheticFreq * 1.5; // Energizing harmonic fifth
              }
              startAstroSynth(syntheticFreq, activeMode);
            });
          }
        });
      }
    } else {
      // Pause/Stop
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopAstroSynth();
    }
  }, [isPlaying, selectedSun, selectedRising, activeSignTab, activeMode]);

  // Handle Play/Pause toggle
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle play category click
  const handleCategoryClick = (category: 'Relax' | 'Focus' | 'Motivation' | 'Sleep') => {
    if (category === 'Sleep') {
      const matchingTrack = TRACKS.find(t => t.category === 'Sleep');
      if (matchingTrack) setActiveTrack(matchingTrack);
      return;
    }
    setActiveMode(category);
  };

  // Directly play a custom frequency (e.g. from the AstroChartCalculator)
  const handlePlayCustomFreq = (freq: number, label: string) => {
    // Stop preceding
    stopAstroSynth();
    if (audioRef.current) {
      audioRef.current.pause();
    }
    // Simulate playing this frequency
    startAstroSynth(freq, 'Focus');
    setIsPlaying(true);

    // Create temporary track
    const tempTrack: SoundTrack = {
      id: 'custom-reson',
      name: label,
      frequency: freq,
      chakra: `Stellar Node • ${freq}Hz`,
      category: 'Focus',
      englishDesc: 'Harmonically aligned target frequency based on natal astronomical values.',
      turkishDesc: 'Doğum haritası astronomik katsayılarına göre hizalanmış hedef frekans.',
      colorPreset: '#e6c364'
    };
    setActiveTrack(tempTrack);
  };

  // Handle track changing
  useEffect(() => {
    if (isPlaying) {
      updateAstroSynthFreq(activeTrack.frequency, activeTrack.category);
    }
  }, [activeTrack, isPlaying]);

  // Elapsed timer loop
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Ambient sound activation toggle
  const handleToggleAmbient = (id: string) => {
    const nextList = ambientSounds.map((sound) => {
      if (sound.id === id) {
        const nextActive = !sound.active;
        // Call browser Web Audio node
        setAmbientSoundActive(id, nextActive, sound.volume);
        return { ...sound, active: nextActive };
      }
      return sound;
    });
    setAmbientSounds(nextList);
  };

  // Ambient sound volume slider
  const handleAmbientVolumeChange = (id: string, vol: number) => {
    const nextList = ambientSounds.map((sound) => {
      if (sound.id === id) {
        updateAmbientVolume(id, vol);
        return { ...sound, volume: vol };
      }
      return sound;
    });
    setAmbientSounds(nextList);
  };

  // HTML5 Starfield Canvas Rendering Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Array<{ x: number; y: number; r: number; op: number; speed: number; phase: number }> = [];

    const initStars = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 110 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.2,
        op: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.35 + 0.05,
        phase: Math.random() * Math.PI * 2
      }));
    };

    let animationId: number;
    const drawStars = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const opacity = s.op * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        // Star color shifts gracefully with theme
        ctx.fillStyle = theme === 'dark' ? `rgba(255, 245, 210, ${opacity})` : `rgba(30, 25, 10, ${opacity * 0.75})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame((timestamp) => drawStars(timestamp / 650));
    };

    window.addEventListener('resize', initStars);
    initStars();
    drawStars(0);

    return () => {
      window.removeEventListener('resize', initStars);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  // Clean audio context on unmount
  useEffect(() => {
    return () => {
      stopAstroSynth();
      stopAllAmbients();
    };
  }, []);

  // Format elapsed track timer helper (e.g. 05:14)
  const formatElapsed = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Switch sound category/mode backwards inside phone layout
  const cycleModeBack = () => {
    const modes: ('Relax' | 'Focus' | 'Motivation')[] = ['Relax', 'Focus', 'Motivation'];
    const idx = modes.indexOf(activeMode);
    const prev = (idx - 1 + modes.length) % modes.length;
    setActiveMode(modes[prev]);
    setPhoneArtError(false);
  };

  // Switch sound category/mode forwards inside phone layout
  const cycleModeForward = () => {
    const modes: ('Relax' | 'Focus' | 'Motivation')[] = ['Relax', 'Focus', 'Motivation'];
    const idx = modes.indexOf(activeMode);
    const next = (idx + 1) % modes.length;
    setActiveMode(modes[next]);
    setPhoneArtError(false);
  };
  
  // Distribute testimonials statically for 3 staggered rows (11 total)
  const staticRow1 = [ROADLOG_TESTIMONIALS[0], ROADLOG_TESTIMONIALS[1], ROADLOG_TESTIMONIALS[2], ROADLOG_TESTIMONIALS[3]];
  const staticRow2 = [ROADLOG_TESTIMONIALS[4], ROADLOG_TESTIMONIALS[5], ROADLOG_TESTIMONIALS[6]];
  const staticRow3 = [ROADLOG_TESTIMONIALS[7], ROADLOG_TESTIMONIALS[8], ROADLOG_TESTIMONIALS[9], ROADLOG_TESTIMONIALS[10]];

  const renderStaticRow = (reviews: typeof ROADLOG_TESTIMONIALS, rowIdx: number) => {
    // Keep a very clean, structured layout centered on desktop, scrollable on mobile
    return (
      <div className="w-full overflow-x-auto custom-scrollbar md:overflow-x-visible py-3 px-6 flex justify-center shrink-0">
        <div className="flex items-center gap-6 md:gap-8 justify-center shrink-0 flex-nowrap md:flex-wrap">
          {reviews.map((review, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-[#15120e] border-[3px] border-black dark:border-celestial-gold/40 shadow-[0_8px_35px_rgba(0,0,0,0.1)] py-5 px-5 md:py-6 md:px-7 rounded-[24px] md:rounded-[30px] flex items-center gap-4 md:gap-5 w-[335px] md:w-[420px] shrink-0 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_45px_rgba(0,0,0,0.15)] pointer-events-auto min-h-[125px] md:min-h-[155px]"
            >
              {/* Avatar Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#eae8e3] dark:bg-[#2a241b] border-2 border-black dark:border-celestial-gold/40 flex items-center justify-center shrink-0 select-none overflow-hidden">
                {review.avatar.startsWith('/') ? (
                  <img 
                    src={review.avatar} 
                    alt={review.author} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="text-2xl">{review.avatar}</span>
                )}
              </div>
              {/* Comment Details */}
              <div className="flex-1 min-w-0 flex flex-col justify-between text-left self-stretch py-0.5">
                <p className="text-[11.5px] md:text-[13.5px] font-sans font-medium leading-relaxed text-black dark:text-[#eae6de] line-clamp-3 pr-1">
                  {t[review.textKey] || review.textKey}
                </p>
                {/* Author & Stars Row */}
                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-black/5 dark:border-celestial-gold/10">
                  <span className="text-[9.5px] md:text-[10.5px] font-sans font-semibold text-mystic-text-muted dark:text-[#a09685] truncate max-w-[150px] md:max-w-[200px]">
                    {t[review.authorKey] || review.authorKey}
                  </span>
                  <div className="flex gap-0.5 text-black dark:text-[#ffd175] shrink-0">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <span key={i} className="text-[11px] md:text-[12px]">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`${currentView === 'main' ? 'scroll-container' : 'scroll-container-no-snap'} bg-mystic-dark text-mystic-text transition-colors duration-500 relative`}>
      {/* Absolute fixed Background Starfield */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />

      {/* FIXED CELESTIAL HEADER FOR LEGAL PAGES */}
      {currentView !== 'main' && (
        <CelestialHeader 
          theme={theme} 
          setTheme={setTheme} 
          lang={lang} 
          setLang={setLang} 
          t={t} 
          isSticky={false} 
        />
      )}

      <main className="relative z-10 font-serif">
        {currentView !== 'main' ? (
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-[330px] sm:pt-[290px] md:pt-[240px] pb-32">
            <LegalPage type={currentView} lang={lang} />
          </div>
        ) : (
          <>
            {/* STICKY HEADER WRAPPER (Sticks header up to Discover Modonare) */}
            <div className="relative w-full">
              <CelestialHeader 
                theme={theme} 
                setTheme={setTheme} 
                lang={lang} 
                setLang={setLang} 
                t={t} 
                isSticky={true} 
              />
              
              <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-[88px] md:pt-[96px] lg:pt-[104px]">
        
        {/* HERO SECTION */}
        <section id="hero" className="relative snap-section py-8">
          
          {/* Subtle Halo Ambient Blur background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-celestial-outline bg-gradient-to-b from-celestial-gold/4 to-transparent -z-10 pointer-events-none filter blur-xl animate-pulse" />
          
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-items-center z-10 py-6">
            
            {/* COLUMN 1: FANNED THREE MINIATURE SMARTPHONE MOCKUPS (70% scale of center phone) */}
            <div className="col-span-1 lg:col-span-3 lg:flex flex-col items-center justify-center w-full max-w-[340px] h-[480px] relative hidden select-none pt-2">
              
              {/* Stack Relative Wrapper */}
              <div className="relative w-[210px] h-[370px] flex items-center justify-center">

                {/* PHONE 1: BACK MOST SCREEN (Tilted Left: rotate-[-16deg]) */}
                <div 
                  className="absolute w-[190px] h-[375px] rounded-[36px] border-[4.5px] border-celestial-gold-dark/25 dark:border-[#221c15] bg-white dark:bg-[#14120e] p-2.5 shadow-2xl transition-all duration-500 z-10 origin-bottom flex flex-col justify-between overflow-hidden"
                  style={{ transform: 'rotate(-16deg) translateX(-38px) translateY(-15px) scale(0.92)' }}
                >
                  {/* Notch / Dynamic Island replica */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-2 bg-celestial-gold-dark/30 dark:bg-[#221c15] rounded-full z-30" />
                  
                  {/* Custom Asset Image with Fallback */}
                  {!heroImg1Error ? (
                    <img 
                      src={theme === 'dark' ? './assets/gorseller/App/Onboarding-Dark-1.png' : './assets/gorseller/App/Onboarding-Light-1.png'} 
                      alt="Soundscape Flow" 
                      className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
                      onError={() => setHeroImg1Error(true)}
                    />
                  ) : null}

                  {/* Built-in fallback design */}
                  <div className="flex flex-col h-full justify-between pt-2.5 text-left font-sans text-[7.5px] relative z-10">
                    <div className="h-6 bg-celestial-gold/5 dark:bg-celestial-gold/10 border border-celestial-gold/15 rounded-lg p-1.5 flex items-center justify-between">
                      <span className="font-extrabold text-celestial-gold uppercase tracking-wider text-[5.5px]">Aetheric Flow</span>
                      <Sparkles className="w-1.5 h-1.5 text-celestial-gold animate-bounce" />
                    </div>

                    <div className="bg-[#fdfcf9] dark:bg-[#0f0e0b] border border-celestial-gold/15 rounded-xl p-2 flex flex-col items-center justify-center gap-1 my-auto py-3.5 shadow-sm">
                      <div className="w-8 h-8 rounded-full border border-dashed border-celestial-gold/45 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                        >
                          <Globe className="w-4 h-4 text-celestial-gold/80" />
                        </motion.div>
                      </div>
                      <span className="font-serif font-black text-[9px] text-mystic-text tracking-wide uppercase mt-1">RESONATE</span>
                      <span className="text-[6.2px] text-mystic-text-muted/65 text-center leading-normal">Chakra alpha wave synchronization.</span>
                    </div>

                    <div className="border-t border-celestial-gold/10 pt-1.5 flex justify-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-celestial-gold/15 border border-celestial-gold/20" />
                      <div className="w-3 h-3 rounded-full bg-[#c8bfff]/10 border border-[#c8bfff]/20" />
                      <div className="w-3 h-3 rounded-full bg-mystic-text-muted/10 border border-mystic-text-muted/20" />
                    </div>
                  </div>
                </div>

                {/* PHONE 2: MIDDLE SCREEN (Slightly Left-Tilted: rotate-[-5deg]) */}
                <div 
                  className="absolute w-[190px] h-[375px] rounded-[36px] border-[4.5px] border-celestial-gold-dark/25 dark:border-[#221c15] bg-white dark:bg-[#14120e] p-2.5 shadow-2xl transition-all duration-500 z-20 origin-bottom flex flex-col justify-between overflow-hidden"
                  style={{ transform: 'rotate(-5deg) translateX(-10px) translateY(-5px) scale(0.96)' }}
                >
                  {/* Notch / Dynamic Island replica */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-2 bg-celestial-gold-dark/30 dark:bg-[#221c15] rounded-full z-30" />

                  {/* Custom Asset Image with Fallback */}
                  {!heroImg2Error ? (
                    <img 
                      src={theme === 'dark' ? './assets/gorseller/App/Onboarding-Dark-2.png' : './assets/gorseller/App/Onboarding-Light-2.png'} 
                      alt="Astrological Natal Chart" 
                      className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
                      onError={() => setHeroImg2Error(true)}
                    />
                  ) : null}

                  {/* Built-in fallback design */}
                  <div className="flex flex-col h-full justify-between pt-2.5 text-left font-sans text-[7.5px] relative z-10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-serif font-bold text-[8.5px] text-celestial-gold uppercase">Scorpio ♏</span>
                      <span className="text-[6px] text-mystic-text-muted/50 font-bold uppercase">Chart</span>
                    </div>

                    <div className="border border-celestial-gold/15 bg-celestial-gold/[0.01] rounded-xl flex items-center justify-center p-2 h-20 my-auto relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center opacity-40">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-celestial-gold/50">
                          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 2.5" />
                          <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth="0.4" />
                          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
                          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
                          <circle cx="50" cy="50" r="2" fill="currentColor" />
                        </svg>
                      </div>
                      <motion.div 
                        className="w-12 h-12 rounded-full border border-transparent border-t-celestial-gold/40"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                      />
                    </div>

                    <div className="bg-[#fcfaf7] dark:bg-[#1a1714] border border-celestial-gold/15 rounded-lg p-1.5 flex flex-col gap-0.5">
                      <span className="font-extrabold text-[7px] text-celestial-gold italic">Astro House Trines</span>
                      <p className="text-[5.5px] text-mystic-text-muted/70 leading-normal">Deep vibrational resonance improves focus.</p>
                    </div>
                  </div>
                </div>

                {/* PHONE 3: FRONT MOST SCREEN (Right-Tilted focal phone: rotate-[7deg]) */}
                <div 
                  className="absolute w-[190px] h-[375px] rounded-[36px] border-[4.5px] border-celestial-gold-dark/30 dark:border-[#221c15] bg-[#fdfbf7] dark:bg-[#161410] p-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.65)] transition-all duration-500 z-30 origin-bottom flex flex-col justify-between overflow-hidden"
                  style={{ transform: 'rotate(7deg) translateX(19px) translateY(12px) scale(0.99)' }}
                >
                  {/* Notch / Dynamic Island replica */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-2 bg-celestial-gold-dark/30 dark:bg-[#221c15] rounded-full z-30" />

                  {/* Custom Asset Image with Fallback */}
                  {!heroImg3Error ? (
                    <img 
                      src={theme === 'dark' ? './assets/gorseller/App/Onboarding-Dark-3.png' : './assets/gorseller/App/Onboarding-Light-3.png'} 
                      alt="Astral Meditation Track List" 
                      className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
                      onError={() => setHeroImg3Error(true)}
                    />
                  ) : null}

                  {/* Built-in fallback design */}
                  <div className="flex flex-col h-full justify-between pt-2.5 text-left font-sans text-[7.5px] relative z-10">
                    <div className="flex flex-col mb-1">
                      <span className="text-[5.5px] font-extrabold tracking-[0.1em] text-celestial-gold uppercase block leading-none">Chakra Lab</span>
                      <h6 className="font-serif text-[10px] font-bold text-mystic-text leading-tight uppercase mt-0.5">OBSIDIAN</h6>
                    </div>

                    {/* Faux Waveform */}
                    <div className="bg-[#fadcb5]/10 border border-celestial-gold/20 rounded-xl p-2.5 flex items-end justify-center gap-0.5 h-14 mb-2 select-none">
                      <div className="w-[1.2px] bg-celestial-gold rounded-full h-[55%] animate-pulse" style={{ animationDuration: '0.9s' }} />
                      <div className="w-[1.2px] bg-[#c8bfff] rounded-full h-[85%] animate-pulse" style={{ animationDuration: '1.2s', animationDelay: '0.1s' }} />
                      <div className="w-[1.2px] bg-[#b9c4ff] rounded-full h-[40%] animate-pulse" style={{ animationDuration: '0.8s', animationDelay: '0.3s' }} />
                      <div className="w-[1.2px] bg-celestial-gold rounded-full h-[70%] animate-pulse" style={{ animationDuration: '1.1s', animationDelay: '0.2s' }} />
                      <div className="w-[1.2px] bg-[#c8bfff] rounded-full h-[45%] animate-pulse" style={{ animationDuration: '0.7s', animationDelay: '0.4s' }} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="bg-[#f2efe9] dark:bg-[#1d1a16] border border-celestial-gold/10 rounded-lg p-1.5 flex items-center justify-between">
                        <span className="text-[6.5px] text-mystic-text font-semibold">1. Root Alignment</span>
                        <Play className="w-[5px] h-[5px] text-celestial-gold fill-current" />
                      </div>
                      <div className="bg-[#f2efe9] dark:bg-[#1d1a16] border border-celestial-gold/10 rounded-lg p-1.5 flex items-center justify-between">
                        <span className="text-[6.5px] text-mystic-text font-semibold">2. Solar plexus focus</span>
                        <Play className="w-[5px] h-[5px] text-[#c8bfff] fill-current" />
                      </div>
                    </div>

                    {/* Play button */}
                    <div className="flex justify-center items-center mt-2 pt-1 border-t border-celestial-gold/10">
                      <div className="w-4 h-4 bg-celestial-gold rounded-full flex items-center justify-center">
                        <Play className="w-1.5 h-1.5 text-mystic-dark fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* COLUMN 2: CENTER ACTIVE SMARTPHONE MOCKUP */}
            <div className="col-span-1 lg:col-span-4 flex justify-center w-full z-10" id="center-mockup">
              
              {/* iPhone smartphone physical body frame */}
              <div className="relative mx-auto rounded-[48px] border-[7px] border-celestial-gold-dark/35 dark:border-[#2a231b] bg-[#0c0906] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] sm:w-[285px] w-full max-w-[290px] h-[580px] flex flex-col justify-between overflow-hidden select-none transition-all duration-300 relative border-opacity-95">
                
                {/* Physical Notch/Camera Island */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#1b1510] rounded-full z-45 flex items-center justify-center shadow-inner" />
                
                {/* Pixel-perfect background screenshot matching MyMusics screen (Aligned to the top) */}
                <img 
                  src={theme === 'dark' ? './assets/gorseller/App/MyMusics-Dark.png' : './assets/gorseller/App/MyMusics-Light.png'} 
                  alt="My Musics Screen Mockup" 
                  className="absolute inset-0 w-full h-full object-cover object-top z-0 pointer-events-none"
                />

              </div>

            </div>

            {/* COLUMN 3: RIGHT STELLAR DESCRIPTION ROW */}
            <div className="col-span-1 lg:col-span-5 flex flex-col justify-center items-start lg:pl-6 text-left w-full select-none">
              
              <span className="text-[10px] font-sans tracking-[0.25em] font-extrabold text-celestial-gold uppercase block mb-3.5 leading-none">
                ― {introT.introSub}
              </span>
              
              {/* Dynamic responsive Typography matching the visual style perfectly */}
              <div className="flex items-center gap-4 md:gap-6 mb-6">
                <h1 className="font-serif text-[48px] md:text-[62px] leading-[1.05] text-mystic-text font-normal shrink-0 tracking-tight flex flex-col">
                  <span>{introT.introTitlePart1}</span>
                  <span>{introT.introTitlePart2}</span>
                  <span className="text-celestial-gold italic font-medium font-serif">{introT.introTitlePart3}</span>
                </h1>
                <div className="shrink-0 flex items-center justify-center ml-4 md:ml-10">
                  <img 
                    src={theme === 'dark' ? './assets/gorseller/App/appicon-dark.png' : './assets/gorseller/App/appicon-light.png'} 
                    alt="MODONARE App Icon" 
                    className="w-[72px] h-[72px] md:w-[96px] md:h-[96px] rounded-2xl md:rounded-[22px] shadow-2xl border border-celestial-gold/25 object-cover filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105"
                  />
                </div>
              </div>
              
              <p className="text-sm md:text-[14.5px] font-light text-mystic-text-muted max-w-md mb-8 leading-relaxed font-sans">
                {introT.introDesc}
              </p>
              
              {/* AVAILABLE ON Badge row */}
              <span className="text-[9px] font-sans tracking-[0.2em] font-extrabold text-mystic-text-muted/40 dark:text-[#7c7261] mb-3 block uppercase leading-none">
                {introT.availableOn}
              </span>

              <div className="flex flex-wrap gap-5 font-sans text-white items-center">
                
                {/* 1. App Store Link Badge - UPDATE href="..." WITH YOUR APPLE APP STORE LIVE URL */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="transition-transform duration-300 hover:scale-105 active:scale-95 block shrink-0"
                >
                  <img 
                    src="./assets/gorseller/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on the App Store" 
                    className="h-[60px] w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                  />
                </a>

                {/* 2. Google Play Link Badge - UPDATE href="..." WITH YOUR GOOGLE PLAY STORE LIVE URL */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="transition-transform duration-300 hover:scale-105 active:scale-95 block shrink-0"
                >
                  <img 
                    src="./assets/gorseller/Download_on_the_Play-Store_Badge.svg" 
                    alt="Get it on Google Play" 
                    className="h-[60px] w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                  />
                </a>

              </div>

            </div>

          </div>

        </section>

        {/* ALTERNATING FEATURE SECTIONS */}
        <div id="features">
          {ROADLOG_FEATURES.map((feat, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <section 
                key={feat.id} 
                className="snap-section py-12 w-full flex items-center justify-center"
              >
                <div className={`w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}>
                  {/* Text Content */}
                  <div className={`col-span-1 lg:col-span-6 space-y-6 ${!isEven ? 'lg:order-last' : ''}`}>

                    <h2 className="font-serif text-3xl md:text-4xl font-medium text-mystic-text mb-6" style={{ lineHeight: '1.2' }}>
                        {t[feat.titleKey] || feat.titleKey}
                    </h2>
                      <p className="text-mystic-text-muted leading-relaxed mb-8" style={{ fontSize: '1.05rem' }}>
                        {t[feat.descKey] || feat.descKey}
                    </p>
                  </div>

                  {/* Visual Mock Card with motion */}
                  <div className="col-span-1 lg:col-span-6 flex justify-center w-full">
                    <motion.div 
                      className="w-full max-w-xl"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                    >
                      <img 
                        src={theme === 'dark' ? feat.imageDark : feat.imageLight} 
                        alt={t[feat.titleKey] || feat.titleKey} 
                        className="w-full h-auto rounded-3xl border border-celestial-gold/25 shadow-2xl object-cover aspect-[16/9]"
                      />
                    </motion.div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

          </div> {/* Close the max-w-[1440px]... container */}
        </div> {/* Close the relative w-full sticky header wrapper */}

            {/* NON-STICKY DISCOVER SECTION */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-32">
              <section id="discover" className="snap-section py-24 border-t border-celestial-gold/35 dark:border-celestial-gold/15 bg-mystic-surface/25 scroll-mt-24">
                <DiscoverSlider lang={lang} theme={theme} t={t} />
              </section>
            </div>
          </>
        )}
      </main>

      {currentView === 'main' ? (
        <div className="snap-footer border-t border-celestial-gold/25 dark:border-celestial-gold/10 bg-mystic-surface/10 relative z-10 w-full">
          {/* TESTIMONIALS STATIC STAGGERED SECTION */}
          <section id="testimonials" className="py-32 md:py-36 w-full overflow-hidden flex flex-col gap-10 md:gap-12 border-b border-celestial-gold/15 dark:border-celestial-gold/5">
            {renderStaticRow(staticRow1, 0)}
            {renderStaticRow(staticRow2, 1)}
            {renderStaticRow(staticRow3, 2)}
          </section>

          {/* FOOTER */}
          <footer className="bg-mystic-surface py-4 md:py-5 transition-colors duration-500">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center gap-4 text-center">
              
              <a href="#" className="hover:scale-[1.03] transition-all duration-300 block">
                <img 
                  src="./assets/Modonaretransparenlogo.png" 
                  alt="Modonare Logo" 
                  className="h-[46px] w-auto object-contain filter drop-shadow-[0_0_12px_rgba(230,195,100,0.25)]" 
                />
              </a>
              
              <nav className="flex flex-wrap justify-center gap-5 font-sans font-semibold text-[10.5px] tracking-wide text-mystic-text-muted/80">
                <a className="hover:text-celestial-gold transition-colors block duration-200" href="/" onClick={(e) => navigate('/', e)}>Features</a>
                <a className="hover:text-celestial-gold transition-colors block duration-200" href="/" onClick={(e) => navigate('/', e)}>Reviews</a>
                <a className="hover:text-celestial-gold transition-colors block duration-200" href="/privacy" onClick={(e) => navigate('/privacy', e)}>Privacy & Policy</a>
                <a className="hover:text-celestial-gold transition-colors block duration-200" href="/terms" onClick={(e) => navigate('/terms', e)}>Terms of Service</a>
                <a className="hover:text-celestial-gold transition-colors block duration-200" href="/support" onClick={(e) => navigate('/support', e)}>{t.support}</a>
              </nav>
              
              <div className="font-sans text-[9.5px] text-mystic-text-muted/40 tracking-wider">
                &copy; 2026 MODONARE. {t.allRightsReserved} &middot; Designed for cosmic seekers.
              </div>

              <div className="font-sans text-[8px] text-mystic-text-muted/30 tracking-wide max-w-2xl mx-auto leading-relaxed border-t border-celestial-gold/10 pt-2.5 mt-0.5">
                Apple, the Apple logo, iPhone, and Apple Watch are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc.
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <footer className="border-t border-celestial-gold/25 dark:border-celestial-gold/10 bg-mystic-surface py-4 md:py-5 transition-colors duration-500 w-full">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center gap-4 text-center">
            
            <a href="#" className="hover:scale-[1.03] transition-all duration-300 block">
              <img 
                src="./assets/Modonaretransparenlogo.png" 
                alt="Modonare Logo" 
                className="h-[46px] w-auto object-contain filter drop-shadow-[0_0_12px_rgba(230,195,100,0.25)]" 
              />
            </a>
            
            <nav className="flex flex-wrap justify-center gap-5 font-sans font-semibold text-[10.5px] tracking-wide text-mystic-text-muted/80">
              <a className="hover:text-celestial-gold transition-colors block duration-200" href="/" onClick={(e) => navigate('/', e)}>Features</a>
              <a className="hover:text-celestial-gold transition-colors block duration-200" href="/" onClick={(e) => navigate('/', e)}>Reviews</a>
              <a className="hover:text-celestial-gold transition-colors block duration-200" href="/privacy" onClick={(e) => navigate('/privacy', e)}>Privacy & Policy</a>
              <a className="hover:text-celestial-gold transition-colors block duration-200" href="/terms" onClick={(e) => navigate('/terms', e)}>Terms of Service</a>
              <a className="hover:text-celestial-gold transition-colors block duration-200" href="/support" onClick={(e) => navigate('/support', e)}>{t.support}</a>
            </nav>
            
            <div className="font-sans text-[9.5px] text-mystic-text-muted/40 tracking-wider">
              &copy; 2026 MODONARE. {t.allRightsReserved} &middot; Designed for cosmic seekers.
            </div>

            <div className="font-sans text-[8px] text-mystic-text-muted/30 tracking-wide max-w-2xl mx-auto leading-relaxed border-t border-celestial-gold/10 pt-2.5 mt-0.5">
              Apple, the Apple logo, iPhone, and Apple Watch are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
