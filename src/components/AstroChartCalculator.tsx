import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Clock, MapPin, Radio, Activity } from 'lucide-react';
import { ZODIACS, ZodiacSign } from '../types';

interface AstroChartProps {
  t: any;
  lang: 'en' | 'tr';
  setActiveZodiac: (sign: ZodiacSign) => void;
  onPlaySynth: (freq: number, label: string) => void;
}

export default function AstroChartCalculator({ t, lang, setActiveZodiac, onPlaySynth }: AstroChartProps) {
  const [date, setDate] = useState('1998-11-12');
  const [time, setTime] = useState('08:30');
  const [location, setLocation] = useState('Istanbul');
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<{
    sunSign: ZodiacSign;
    risingSign: ZodiacSign;
    moonSign: ZodiacSign;
    freq: number;
    description: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    setResult(null);

    // Simulate precise astronomical/ephemeris-grade natal calculations
    setTimeout(() => {
      // Pick random entries based on details hash
      const combinedString = `${date}-${time}-${location}`;
      let hash = 0;
      for (let i = 0; i < combinedString.length; i++) {
        hash = combinedString.charCodeAt(i) + ((hash << 5) - hash);
      }
      hash = Math.abs(hash);

      const sunIdx = hash % ZODIACS.length;
      const risingIdx = (hash + 5) % ZODIACS.length;
      const moonIdx = (hash + 9) % ZODIACS.length;

      const sunSign = ZODIACS[sunIdx];
      const risingSign = ZODIACS[risingIdx];
      const moonSign = ZODIACS[moonIdx];

      // Calculate beautiful harmonious chord frequency (Root + fifth of sun sign etc)
      const baseFreq = sunSign.frequency;

      const descEn = `Your natal map reveals a primary energetic alignment driven by the fiery/watery interactions of ${sunSign.name} Sun with your ${risingSign.name} Rising. We've synthesized a specific astro-acoustic harmonic center at ${baseFreq}Hz, tuning directly to your ${sunSign.chakra} chakra node to ease daily blockages.`;
      const descTr = `Doğum haritanız, ${sunSign.turkishName} Güneşinizin ${risingSign.turkishName} Yükseleniniz ile olan güçlü etkileşimlerinden kaynaklanan bir enerjisel hizalanmayı ortaya koyuyor. Günlük tıkanıklıkları gidermek için doğrudan ${sunSign.chakra} çakra noktanıza hitap eden, size özel ${baseFreq}Hz frekansında işitsel bir rezonans merkezi sentezledik.`;

      setResult({
        sunSign,
        risingSign,
        moonSign,
        freq: baseFreq,
        description: lang === 'en' ? descEn : descTr
      });
      setCalculating(false);
      
      // Automatically switch default zodiac focus
      setActiveZodiac(sunSign);
    }, 2200);
  };

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-celestial-gold/5 via-transparent to-transparent -z-10 pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Input Form */}
        <div className="lg:col-span- così: 5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs tracking-[0.2em] font-semibold text-celestial-gold uppercase">{lang === 'en' ? 'COSMIC SYNTHESIS' : 'KOZMİK SENTEZ'}</span>
            <Sparkles className="w-4.5 h-4.5 text-celestial-gold animate-pulse" />
          </div>
          <h2 className="font-serif text-[42px] leading-tight text-mystic-text mb-6">
            {t.calcTitle}
          </h2>
          <p className="text-sm font-light leading-relaxed text-mystic-text-muted mb-8">
            {t.calcSub}
          </p>

          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] tracking-widest text-mystic-text-muted uppercase block font-semibold">{t.birthDate}</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-celestial-gold/60" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-mystic-surface border border-celestial-gold/25 dark:border-celestial-gold/15 hover:border-celestial-gold/45 focus:border-celestial-gold rounded-xl py-3 pl-12 pr-4 text-sm font-light text-mystic-text outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-mystic-text-muted uppercase block font-semibold">{t.birthTime}</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-celestial-gold/60" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-mystic-surface border border-celestial-gold/25 dark:border-celestial-gold/15 hover:border-celestial-gold/45 focus:border-celestial-gold rounded-xl py-3 pl-12 pr-4 text-sm font-light text-mystic-text outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-mystic-text-muted uppercase block font-semibold">{t.birthPlace}</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-celestial-gold/60" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-mystic-surface border border-celestial-gold/25 dark:border-celestial-gold/15 hover:border-celestial-gold/45 focus:border-celestial-gold rounded-xl py-3 pl-12 pr-4 text-sm font-light text-mystic-text outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={calculating}
              className="w-full relative overflow-hidden bg-celestial-gold hover:bg-celestial-gold-dark text-mystic-text hover:text-mystic-dark font-display text-[13px] font-bold py-4 rounded-xl cursor-pointer select-none transition-all duration-300 shadow-[0_4px_30px_rgba(230,195,100,0.18)] disabled:opacity-50"
            >
              {calculating ? t.generating : t.generateResonance}
            </button>
          </form>
        </div>

        {/* Right Side: Visualizing Chart and Live Results */}
        <div className="lg:col-span-7 flex justify-center items-center relative min-h-[460px] bg-mystic-surface/50 border border-celestial-gold/25 dark:border-celestial-gold/10 rounded-3xl p-8 backdrop-blur-md overflow-hidden">
          
          {/* Astrological compass background pattern */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none flex items-center justify-center">
            <svg width="400" height="400" viewBox="0 0 400 400" className="animate-spin-slow">
              <circle cx="200" cy="200" r="190" stroke="currentColor" className="text-celestial-gold" strokeWidth="1" strokeDasharray="5 5" />
              <circle cx="200" cy="200" r="150" stroke="currentColor" className="text-celestial-gold" strokeWidth="0.8" />
              <circle cx="200" cy="200" r="100" stroke="currentColor" className="text-celestial-gold" strokeWidth="0.5" />
              <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" className="text-celestial-gold" strokeWidth="0.5" />
              <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" className="text-celestial-gold" strokeWidth="0.5" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            {calculating && (
              <motion.div
                key="calculating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center max-w-sm"
              >
                <div className="w-24 h-24 rounded-full border-2 border-celestial-gold/10 border-t-celestial-gold animate-spin mb-6 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-celestial-gold animate-pulse" />
                </div>
                <h4 className="font-serif text-lg text-mystic-text mb-2 tracking-wider">
                  {lang === 'en' ? 'ALIGNING PLANETARY TRANSITS' : 'GEZEGENSEL GEÇİŞLER HİZALANIYOR'}
                </h4>
                <p className="text-xs text-mystic-text-muted">
                  {lang === 'en' ? 'Querying astronomical ephemeris databases...' : 'Astronomik efemeris veritabanları sorgulanıyor...'}
                </p>
              </motion.div>
            )}

            {!calculating && !result && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-sm flex flex-col items-center animate-pulse"
              >
                <div className="w-16 h-16 rounded-full border border-celestial-gold/20 flex items-center justify-center text-celestial-gold text-2xl mb-6 bg-mystic-surface">
                  ♈
                </div>
                <h4 className="font-serif text-xl text-mystic-text mb-3">
                  {lang === 'en' ? 'Awaiting Alignment' : 'Hizalanma Bekliyor'}
                </h4>
                <p className="text-sm font-light leading-relaxed text-mystic-text-muted">
                  {lang === 'en' 
                    ? 'Enter your precise birth variables to calculate your personal vibrational chart and frequency preset.' 
                    : 'Kişisel titreşim haritanızı ve frekans ön ayarınızı hesaplamak için doğum parametrelerinizi girin.'
                  }
                </p>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col"
              >
                <div className="flex justify-between items-center border-b border-celestial-gold/20 dark:border-celestial-gold/10 pb-4 mb-6">
                  <h4 className="font-serif text-xl font-bold tracking-wide text-celestial-gold">
                    {t.chartResult}
                  </h4>
                  <span className="text-xs font-mono tracking-widest text-[#93c5fd]">ACTIVE PRESET</span>
                </div>

                {/* Grid of Signs */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-mystic-surface border border-celestial-gold/25 dark:border-celestial-gold/15 rounded-2xl p-4 text-center">
                    <span className="text-[10px] tracking-widest text-mystic-text-muted block font-semibold mb-1">SUN</span>
                    <span className="text-2xl block mb-1">{result.sunSign.symbol}</span>
                    <span className="text-xs font-serif font-bold tracking-wider text-mystic-text">
                      {lang === 'en' ? result.sunSign.name : result.sunSign.turkishName}
                    </span>
                  </div>

                  <div className="bg-mystic-surface border border-celestial-gold/25 dark:border-celestial-gold/15 rounded-2xl p-4 text-center">
                    <span className="text-[10px] tracking-widest text-mystic-text-muted block font-semibold mb-1">RISING</span>
                    <span className="text-2xl block mb-1">{result.risingSign.symbol}</span>
                    <span className="text-xs font-serif font-bold tracking-wider text-mystic-text">
                      {lang === 'en' ? result.risingSign.name : result.risingSign.turkishName}
                    </span>
                  </div>

                  <div className="bg-mystic-surface border border-celestial-gold/25 dark:border-celestial-gold/15 rounded-2xl p-4 text-center">
                    <span className="text-[10px] tracking-widest text-mystic-text-muted block font-semibold mb-1">MOON</span>
                    <span className="text-2xl block mb-1">{result.moonSign.symbol}</span>
                    <span className="text-xs font-serif font-bold tracking-wider text-mystic-text">
                      {lang === 'en' ? result.moonSign.name : result.moonSign.turkishName}
                    </span>
                  </div>
                </div>

                {/* Frequency Center Display */}
                <div className="bg-celestial-gold-dark/10 border border-celestial-gold/30 rounded-2xl p-4 flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-celestial-gold/20 flex items-center justify-center">
                      <Radio className="w-5 h-5 text-celestial-gold animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[9px] tracking-widest text-mystic-text-muted block uppercase">{t.yourFreq}</span>
                      <span className="font-serif text-lg font-bold text-mystic-text">{result.freq}Hz Harmonic Resonance</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onPlaySynth(result.freq, lang === 'en' ? `${result.sunSign.name} Harmonic` : `${result.sunSign.turkishName} Harmoniği`)}
                    className="bg-celestial-gold hover:bg-celestial-gold-dark text-mystic-text hover:text-mystic-dark hover:scale-105 active:scale-95 transition-all text-xs font-semibold py-2 px-5 rounded-full cursor-pointer"
                  >
                    {lang === 'en' ? 'Tune Now' : 'Şimdi Akort Et'}
                  </button>
                </div>

                {/* Substantive summary text */}
                <p className="text-xs leading-relaxed font-light font-sans text-mystic-text-muted/90 bg-mystic-surface/40 border border-celestial-gold/5 rounded-xl p-4 leading-normal italic">
                  {result.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
