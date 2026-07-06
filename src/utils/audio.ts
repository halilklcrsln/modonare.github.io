// Web Audio API Synthesizer for organic, meditative, real-time astro-acoustic wave synthesis

let audioCtx: AudioContext | null = null;

// Node references
let carrierOsc: OscillatorNode | null = null;
let harmonicOsc: OscillatorNode | null = null;
let subOsc: OscillatorNode | null = null;
let synthGain: GainNode | null = null;
let biquadFilter: BiquadFilterNode | null = null;
let lfo: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;

// Ambient nodes
const ambientGainNodes: { [key: string]: GainNode } = {};
const ambientSources: { [key: string]: any } = {};

function initContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
}

export function startAstroSynth(frequency: number, category: string) {
  try {
    initContext();
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Stop existing nodes first
    stopAstroSynth();

    // 1. Create Nodes
    carrierOsc = audioCtx.createOscillator();
    harmonicOsc = audioCtx.createOscillator();
    subOsc = audioCtx.createOscillator();
    synthGain = audioCtx.createGain();
    biquadFilter = audioCtx.createBiquadFilter();
    lfo = audioCtx.createOscillator();
    lfoGain = audioCtx.createGain();

    // 2. Configure Oscillators (Smooth Sine/Triangle waves)
    carrierOsc.type = 'sine';
    carrierOsc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    // Harmonic (usually a fifth 1.5x or octave 2x)
    harmonicOsc.type = 'triangle';
    const harmonicFreq = category === 'Sleep' ? frequency * 0.75 : frequency * 1.5;
    harmonicOsc.frequency.setValueAtTime(harmonicFreq, audioCtx.currentTime);

    // Deep Sub-bass tracking at 0.5x frequency
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(frequency * 0.5, audioCtx.currentTime);

    // 3. Configure Filter (Warm slowly sweeping low pass)
    biquadFilter.type = 'lowpass';
    biquadFilter.Q.setValueAtTime(3, audioCtx.currentTime);
    biquadFilter.frequency.setValueAtTime(500, audioCtx.currentTime);

    // Slowly sweep frequency for "breathing" effect using LFO
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // 0.12 Hz is 8 seconds per sweep
    lfoGain.gain.setValueAtTime(250, audioCtx.currentTime); // Modulation depth

    // Connections for filter sweep
    lfo.connect(lfoGain);
    lfoGain.connect(biquadFilter.frequency);

    // 4. Set gains for perfect mixing balance
    synthGain.gain.setValueAtTime(0, audioCtx.currentTime);
    // Smooth ramp-up to prevent popping
    synthGain.gain.linearRampToValueAtTime(0.24, audioCtx.currentTime + 1.5);

    // 5. Connect carrier chains
    const carrierGain = audioCtx.createGain();
    carrierGain.gain.setValueAtTime(0.35, audioCtx.currentTime);
    carrierOsc.connect(carrierGain);

    const harmonicGain = audioCtx.createGain();
    harmonicGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    harmonicOsc.connect(harmonicGain);

    const subGain = audioCtx.createGain();
    subGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    subOsc.connect(subGain);

    // Connect to Filter
    carrierGain.connect(biquadFilter);
    harmonicGain.connect(biquadFilter);
    subGain.connect(biquadFilter);

    // Filter to Master Gain and Destination
    biquadFilter.connect(synthGain);
    synthGain.connect(audioCtx.destination);

    // Start playback
    carrierOsc.start();
    harmonicOsc.start();
    subOsc.start();
    lfo.start();

  } catch (e) {
    console.warn('Audio Synthesis Error:', e);
  }
}

export function updateAstroSynthFreq(frequency: number, category: string) {
  if (!audioCtx || !carrierOsc || !harmonicOsc || !subOsc) return;
  try {
    const now = audioCtx.currentTime;
    carrierOsc.frequency.exponentialRampToValueAtTime(frequency, now + 1.2);

    const harmonicFreq = category === 'Sleep' ? frequency * 0.75 : frequency * 1.5;
    harmonicOsc.frequency.exponentialRampToValueAtTime(harmonicFreq, now + 1.2);
    subOsc.frequency.exponentialRampToValueAtTime(frequency * 0.5, now + 1.2);
  } catch (e) {
    console.warn('Frequency change transition error:', e);
  }
}

export function stopAstroSynth() {
  try {
    if (synthGain && audioCtx) {
      const now = audioCtx.currentTime;
      synthGain.gain.cancelScheduledValues(now);
      synthGain.gain.linearRampToValueAtTime(0, now + 0.5);
    }

    setTimeout(() => {
      // Disconnect and clean
      try { carOscStop(); } catch (e) {}
      try { harOscStop(); } catch (e) {}
      try { subOscStop(); } catch (e) {}
      try { lfoStop(); } catch (e) {}
    }, 600);
  } catch (e) {}
}

function carOscStop() { if (carrierOsc) { carrierOsc.stop(); carrierOsc.disconnect(); carrierOsc = null; } }
function harOscStop() { if (harmonicOsc) { harmonicOsc.stop(); harmonicOsc.disconnect(); harmonicOsc = null; } }
function subOscStop() { if (subOsc) { subOsc.stop(); subOsc.disconnect(); subOsc = null; } }
function lfoStop() { if (lfo) { lfo.stop(); lfo.disconnect(); lfo = null; } }

// ═══════════════════════════════════════════════════════════
// AMBIENT NOISE SYNTHESIS ENGINE
// ═══════════════════════════════════════════════════════════

export function setAmbientSoundActive(id: string, active: boolean, volume: number) {
  try {
    initContext();
    if (!audioCtx) return;

    if (active) {
      if (ambientSources[id]) return; // already running

      // Create Gain Node for this channel
      const channelGain = audioCtx.createGain();
      channelGain.gain.setValueAtTime(0, audioCtx.currentTime);
      channelGain.gain.linearRampToValueAtTime(volume * 0.25, audioCtx.currentTime + 1.0);
      channelGain.connect(audioCtx.destination);
      ambientGainNodes[id] = channelGain;

      if (id === 'rain') {
        // Synthesize rain using high-passed white noise
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, audioCtx.currentTime);

        const filter2 = audioCtx.createBiquadFilter();
        filter2.type = 'peaking';
        filter2.frequency.setValueAtTime(2500, audioCtx.currentTime);
        filter2.Q.setValueAtTime(2, audioCtx.currentTime);
        filter2.gain.setValueAtTime(6, audioCtx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(filter2);
        filter2.connect(channelGain);

        whiteNoise.start();
        ambientSources[id] = whiteNoise;

      } else if (id === 'ocean') {
        // Synthesize ocean waves using gain modulations of low-passed white noise
        const bufferSize = audioCtx.sampleRate * 4;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, audioCtx.currentTime);

        // Slow wave gain modulator (0.1 Hz = 10s period)
        const waveModulator = audioCtx.createGain();
        waveModulator.gain.setValueAtTime(0.4, audioCtx.currentTime);

        const waveOsc = audioCtx.createOscillator();
        waveOsc.type = 'sine';
        waveOsc.frequency.setValueAtTime(0.08, audioCtx.currentTime);

        const modifier = audioCtx.createGain();
        modifier.gain.setValueAtTime(0.3, audioCtx.currentTime);

        waveOsc.connect(modifier);
        modifier.connect(waveModulator.gain); // Modulates the loop volume

        whiteNoise.connect(filter);
        filter.connect(waveModulator);
        waveModulator.connect(channelGain);

        waveOsc.start();
        whiteNoise.start();
        ambientSources[id] = { noise: whiteNoise, osc: waveOsc };

      } else if (id === 'fire') {
        // Synthesize crackling campfire with bandpassed low-frequency noise and crackle nodes
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, audioCtx.currentTime);
        filter.Q.setValueAtTime(1, audioCtx.currentTime);

        // Crackling source (high freq pulses)
        const crackleGain = audioCtx.createGain();
        crackleGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

        const crackleOsc = audioCtx.createOscillator();
        crackleOsc.type = 'sawtooth';
        crackleOsc.frequency.setValueAtTime(6.5, audioCtx.currentTime);

        const crackleShaper = audioCtx.createWaveShaper();
        const makeDistortionCurve = () => {
          const k = 400;
          const curve = new Float32Array(44100);
          for (let i = 0; i < 44100; ++i) {
            const x = (i * 2) / 44100 - 1;
            curve[i] = ((3 + k) * x * 20 * (Math.PI / 180)) / (Math.PI + k * Math.abs(x));
          }
          return curve;
        };
        crackleShaper.curve = makeDistortionCurve();

        crackleOsc.connect(crackleShaper);
        crackleShaper.connect(crackleGain);

        whiteNoise.connect(filter);
        filter.connect(channelGain);
        crackleGain.connect(channelGain);

        crackleOsc.start();
        whiteNoise.start();
        ambientSources[id] = { noise: whiteNoise, osc: crackleOsc };

      } else if (id === 'bowl') {
        // Synthesize singing bowl using clean high-Q bell resonance frequency
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);

        const feedbackOsc = audioCtx.createOscillator();
        feedbackOsc.type = 'sine';
        feedbackOsc.frequency.setValueAtTime(0.55, audioCtx.currentTime); // LFO

        const feedbackGain = audioCtx.createGain();
        feedbackGain.gain.setValueAtTime(4, audioCtx.currentTime);

        feedbackOsc.connect(feedbackGain);
        feedbackGain.connect(osc.frequency); // pitch warble

        osc.connect(channelGain);

        osc.start();
        feedbackOsc.start();
        ambientSources[id] = { osc, fm: feedbackOsc };

      } else if (id === 'wind') {
        // Synthesize wind using fluctuating bandpass filter over noise
        const bufferSize = audioCtx.sampleRate * 3;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(10, audioCtx.currentTime);
        filter.frequency.setValueAtTime(320, audioCtx.currentTime);

        // fluctuates between 150Hz and 600Hz
        const sweepOsc = audioCtx.createOscillator();
        sweepOsc.type = 'sine';
        sweepOsc.frequency.setValueAtTime(0.15, audioCtx.currentTime);

        const sweepGain = audioCtx.createGain();
        sweepGain.gain.setValueAtTime(150, audioCtx.currentTime);

        sweepOsc.connect(sweepGain);
        sweepGain.connect(filter.frequency);

        whiteNoise.connect(filter);
        filter.connect(channelGain);

        sweepOsc.start();
        whiteNoise.start();
        ambientSources[id] = { noise: whiteNoise, osc: sweepOsc };

      } else if (id === 'cosmic') {
        // Deep sub-harmonic drone
        const osc1 = audioCtx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(73.4, audioCtx.currentTime); // D2 note

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(95, audioCtx.currentTime);

        osc1.connect(filter);
        filter.connect(channelGain);

        osc1.start();
        ambientSources[id] = osc1;
      }
    } else {
      // Deactivate and fade out
      const channelGain = ambientGainNodes[id];
      const source = ambientSources[id];

      if (channelGain && audioCtx) {
        const now = audioCtx.currentTime;
        channelGain.gain.cancelScheduledValues(now);
        channelGain.gain.linearRampToValueAtTime(0, now + 0.8);
      }

      setTimeout(() => {
        try {
          if (source) {
            if (source.noise && typeof source.noise.stop === 'function') source.noise.stop();
            if (source.osc && typeof source.osc.stop === 'function') source.osc.stop();
            if (source.fm && typeof source.fm.stop === 'function') source.fm.stop();
            if (typeof source.stop === 'function') source.stop();
          }
        } catch (e) {}

        delete ambientSources[id];
        delete ambientGainNodes[id];
      }, 900);
    }
  } catch (e) {
    console.warn('Ambient synthesis error:', e);
  }
}

export function updateAmbientVolume(id: string, volume: number) {
  const node = ambientGainNodes[id];
  if (node && audioCtx) {
    try {
      node.gain.linearRampToValueAtTime(volume * 0.25, audioCtx.currentTime + 0.1);
    } catch (e) {}
  }
}

export function stopAllAmbients() {
  Object.keys(ambientSources).forEach(id => {
    try {
      setAmbientSoundActive(id, false, 0);
    } catch (e) {}
  });
}
