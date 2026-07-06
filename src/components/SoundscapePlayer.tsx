import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, VolumeX } from 'lucide-react';
import { TRACKS, SoundTrack, AMBIENT_SOUNDS, AmbientSound } from '../types';

interface SoundscapePlayerProps {
  t: any;
  lang: 'en' | 'tr';
  theme: 'dark' | 'light';
  isPlaying: boolean;
  onTogglePlay: () => void;
  activeTrack: SoundTrack;
  setActiveTrack: (t: SoundTrack) => void;
  ambientSounds: AmbientSound[];
  onToggleAmbient: (id: string) => void;
  onAmbientVolumeChange: (id: string, vol: number) => void;
  elapsedTime: number;
}

export default function SoundscapePlayer({
  t,
  lang,
  theme,
  isPlaying,
  onTogglePlay,
  activeTrack,
  setActiveTrack,
  ambientSounds,
  onToggleAmbient,
  onAmbientVolumeChange,
  elapsedTime
}: SoundscapePlayerProps) {

  // Handle skip forward / backward
  const handleNext = () => {
    const currentIdx = TRACKS.findIndex(track => track.id === activeTrack.id);
    const nextIdx = (currentIdx + 1) % TRACKS.length;
    setActiveTrack(TRACKS[nextIdx]);
  };

  const handlePrev = () => {
    const currentIdx = TRACKS.findIndex(track => track.id === activeTrack.id);
    const prevIdx = (currentIdx - 1 + TRACKS.length) % TRACKS.length;
    setActiveTrack(TRACKS[prevIdx]);
  };

  // Convert elapsed time to string
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 max-w-5xl mx-auto">
      
      {/* LEFT: Gorgeous Sacred Player Component */}
      <div className="lg:col-span-5 flex flex-col justify-center">
        <h3 className="font-serif text-2xl text-mystic-text mb-6 font-semibold flex items-center gap-2">
          <Music className="w-5 h-5 text-celestial-gold" />
          {t.interactivePlayer}
        </h3>

        <div className="relative w-full rounded-3xl p-8 flex flex-col items-center overflow-hidden transition-all duration-500 shadow-2xl border bg-mystic-surface border-celestial-gold/25 dark:border-celestial-gold/15">
          {/* Pulsating backglow in play mode */}
          <div className={`absolute inset-0 bg-gradient-to-b from-celestial-gold/5 via-transparent to-transparent transition-opacity duration-1000 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`} />

          <h4 className="font-serif text-2xl text-mystic-text font-bold mb-1 tracking-wide">
            {activeTrack.name}
          </h4>
          <p className="font-bold text-[10px] tracking-widest text-mystic-text-muted uppercase mb-8">
            {activeTrack.chakra}
          </p>

          {/* Sacred geometry circular dynamic visualizer */}
          <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
            
            {/* Pulsing ripples */}
            {isPlaying && (
              <>
                <div className="absolute w-44 h-44 rounded-full border border-celestial-gold/20 animate-ripple" />
                <div className="absolute w-44 h-44 rounded-full border border-[#c8bfff]/15 animate-ripple [animation-delay:1.5s]" />
                <div className="absolute w-44 h-44 rounded-full border border-[#b9c4ff]/10 animate-ripple [animation-delay:3.0s]" />
              </>
            )}

            {/* Main revolving core */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 16, repeat: Infinity, ease: 'linear' } : { duration: 1 }}
              className={`w-32 h-32 rounded-full border border-celestial-gold/30 flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(230,195,100,0.1)]`}
              style={{
                background: 'radial-gradient(circle, rgba(230,195,100,0.15) 0%, transparent 80%)'
              }}
            >
              <div className="w-24 h-24 rounded-full border border-celestial-gold/15 border-dashed flex items-center justify-center animate-spin-slow">
                <span className="text-3xl animate-pulse">🌌</span>
              </div>
            </motion.div>
          </div>

          {/* Time & seek bar */}
          <div className="w-full mb-8 flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] tracking-wider text-mystic-text-muted">
              <span>{formatTime(elapsedTime)}</span>
              <span className="font-bold font-sans">∞ {lang === 'en' ? 'Continuous Resonance' : 'Sonsuz Rezonans'}</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1 bg-mystic-surface-high rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-celestial-gold" 
                animate={{ width: isPlaying ? '100%' : '15%' }}
                transition={isPlaying ? { duration: 180, ease: 'linear', repeat: Infinity } : { duration: 0.5 }}
              />
            </div>
          </div>

          {/* Play/skip controls */}
          <div className="flex items-center gap-8 justify-center select-none z-10">
            <button 
              onClick={handlePrev}
              className="text-mystic-text-muted hover:text-celestial-gold transition-colors duration-200 cursor-pointer"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            
            <button 
              onClick={onTogglePlay}
              className="w-16 h-16 rounded-full bg-celestial-gold text-mystic-dark flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(230,195,100,0.35)] cursor-pointer"
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-mystic-dark" /> : <Play className="w-7 h-7 fill-mystic-dark" />}
            </button>
            
            <button 
              onClick={handleNext}
              className="text-mystic-text-muted hover:text-celestial-gold transition-colors duration-200 cursor-pointer"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Advanced Ambient SoundLabs Mixer */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        <div className="flex flex-col mb-4">
          <span className="text-xs font-semibold tracking-widest text-celestial-gold uppercase">{t.soundLab}</span>
          <h3 className="font-serif text-[32px] text-mystic-text font-bold mb-3">
            {t.ambientMixerTitle}
          </h3>
          <p className="text-sm font-light text-mystic-text-muted leading-relaxed font-sans">
            {t.ambientMixerDesc}
          </p>
        </div>

        {/* Ambient Grid Controller List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-sans">
          {ambientSounds.map((sound) => (
            <div 
              key={sound.id}
              className={`flex flex-col gap-3 rounded-2xl p-4 transition-all duration-300 border ${
                sound.active 
                  ? 'bg-celestial-gold/5 border-celestial-gold/45 shadow-[0_0_15px_rgba(230,195,100,0.05)]'
                  : 'bg-mystic-surface border-celestial-gold/25 dark:border-celestial-gold/5 hover:border-celestial-gold/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div onClick={() => onToggleAmbient(sound.id)} className="flex items-center gap-3 cursor-pointer select-none">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-all ${
                    sound.active 
                      ? 'bg-celestial-gold/20 border-celestial-gold text-celestial-gold' 
                      : 'bg-mystic-surface-high border-celestial-gold/20 dark:border-celestial-gold/10'
                  }`}>
                    {sound.icon}
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold text-mystic-text font-sans">{lang === 'en' ? sound.labelEn : sound.labelTr}</h5>
                    <span className="text-[9px] text-mystic-text-muted uppercase tracking-wider">
                      {sound.active ? 'ACTIVE' : 'MUTED'}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => onToggleAmbient(sound.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    sound.active ? 'bg-celestial-gold text-mystic-dark' : 'bg-mystic-surface-high text-mystic-text-muted/60 hover:text-mystic-text'
                  }`}
                >
                  {sound.active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Smooth slider mechanism */}
              <div className="flex items-center gap-2 mt-1">
                <VolumeX className="w-3.5 h-3.5 text-mystic-text-muted/50" />
                <input 
                  type="range"
                  min="0"
                  max="1.0"
                  step="0.05"
                  value={sound.volume}
                  disabled={!sound.active}
                  onChange={(e) => onAmbientVolumeChange(sound.id, parseFloat(e.target.value))}
                  className="flex-1 accent-celestial-gold h-1 bg-mystic-surface-high cursor-pointer rounded-lg disabled:opacity-20 transition-opacity"
                />
                <Volume2 className="w-3.5 h-3.5 text-mystic-text-muted/50" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
