import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, AlertTriangle, Sparkles, PartyPopper, Volume2, VolumeX, Music, Music2 } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Synthesized firework explosion sound using Web Audio API
const createExplosionSound = (audioContext: AudioContext, volume: number = 0.3) => {
  const now = audioContext.currentTime;
  
  // Create noise for explosion
  const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.5, audioContext.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) {
    noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioContext.sampleRate * 0.1));
  }
  
  const noiseSource = audioContext.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  
  // Lowpass filter for boom effect
  const filter = audioContext.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1000, now);
  filter.frequency.exponentialRampToValueAtTime(100, now + 0.3);
  
  // Gain envelope
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(volume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
  
  // Add some crackle with high frequency
  const crackleBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.3, audioContext.sampleRate);
  const crackleData = crackleBuffer.getChannelData(0);
  for (let i = 0; i < crackleData.length; i++) {
    crackleData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioContext.sampleRate * 0.05)) * (Math.random() > 0.7 ? 1 : 0);
  }
  
  const crackleSource = audioContext.createBufferSource();
  crackleSource.buffer = crackleBuffer;
  
  const crackleFilter = audioContext.createBiquadFilter();
  crackleFilter.type = 'highpass';
  crackleFilter.frequency.value = 2000;
  
  const crackleGain = audioContext.createGain();
  crackleGain.gain.setValueAtTime(volume * 0.5, now);
  crackleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
  
  // Connect nodes
  noiseSource.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  crackleSource.connect(crackleFilter);
  crackleFilter.connect(crackleGain);
  crackleGain.connect(audioContext.destination);
  
  // Play
  noiseSource.start(now);
  crackleSource.start(now + 0.05);
  noiseSource.stop(now + 0.5);
  crackleSource.stop(now + 0.35);
};

// Festive background music synthesizer
class FestiveMusic {
  private audioContext: AudioContext;
  private masterGain: GainNode;
  private isPlaying: boolean = false;
  private intervalIds: NodeJS.Timeout[] = [];

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.masterGain = audioContext.createGain();
    this.masterGain.gain.value = 0.15;
    this.masterGain.connect(audioContext.destination);
  }

  // Play a bell chime
  private playBell(frequency: number, time: number, duration: number = 2) {
    const osc = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = frequency;
    osc2.type = 'sine';
    osc2.frequency.value = frequency * 2.5; // Overtone
    
    const osc2Gain = this.audioContext.createGain();
    osc2Gain.gain.value = 0.3;
    
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
    
    osc.connect(gain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(time);
    osc2.start(time);
    osc.stop(time + duration);
    osc2.stop(time + duration);
  }

  // Play ambient pad chord
  private playPad(frequencies: number[], time: number, duration: number = 4) {
    frequencies.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.15, time + 0.5);
      gain.gain.setValueAtTime(0.15, time + duration - 1);
      gain.gain.linearRampToValueAtTime(0.01, time + duration);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(time);
      osc.stop(time + duration);
    });
  }

  // Play sparkle/twinkle sound
  private playSparkle(time: number) {
    const frequencies = [1200, 1500, 1800, 2100];
    frequencies.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const startTime = time + i * 0.05;
      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    const bellNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const chords = [
      [261.63, 329.63, 392.00], // C major
      [293.66, 369.99, 440.00], // D minor  
      [349.23, 440.00, 523.25], // F major
      [392.00, 493.88, 587.33], // G major
    ];

    // Play initial pad
    const now = this.audioContext.currentTime;
    this.playPad(chords[0], now, 6);

    // Schedule bells at random intervals
    const bellInterval = setInterval(() => {
      if (!this.isPlaying) return;
      const note = bellNotes[Math.floor(Math.random() * bellNotes.length)];
      this.playBell(note, this.audioContext.currentTime, 2 + Math.random());
    }, 1500 + Math.random() * 2000);
    this.intervalIds.push(bellInterval);

    // Schedule chord changes
    let chordIndex = 0;
    const padInterval = setInterval(() => {
      if (!this.isPlaying) return;
      chordIndex = (chordIndex + 1) % chords.length;
      this.playPad(chords[chordIndex], this.audioContext.currentTime, 6);
    }, 5000);
    this.intervalIds.push(padInterval);

    // Schedule sparkles
    const sparkleInterval = setInterval(() => {
      if (!this.isPlaying) return;
      if (Math.random() > 0.5) {
        this.playSparkle(this.audioContext.currentTime);
      }
    }, 3000 + Math.random() * 2000);
    this.intervalIds.push(sparkleInterval);
  }

  stop() {
    this.isPlaying = false;
    this.intervalIds.forEach(id => clearInterval(id));
    this.intervalIds = [];
  }

  setVolume(volume: number) {
    this.masterGain.gain.value = volume;
  }
}

// Firework explosion component with multiple layers
const Firework = ({ delay, x, y }: { delay: number; x: string; y: string }) => {
  const colorSets = [
    ["hsl(45, 100%, 65%)", "hsl(40, 100%, 50%)", "hsl(50, 100%, 70%)"], // Gold
    ["hsl(0, 80%, 55%)", "hsl(350, 90%, 45%)", "hsl(10, 85%, 60%)"], // Red
    ["hsl(30, 100%, 60%)", "hsl(25, 100%, 50%)", "hsl(35, 100%, 70%)"], // Orange
    ["hsl(280, 80%, 65%)", "hsl(270, 90%, 55%)", "hsl(290, 75%, 70%)"], // Purple
    ["hsl(180, 80%, 55%)", "hsl(170, 90%, 45%)", "hsl(190, 75%, 60%)"], // Cyan
    ["hsl(320, 80%, 60%)", "hsl(330, 90%, 50%)", "hsl(310, 75%, 65%)"], // Pink
    ["hsl(120, 70%, 50%)", "hsl(130, 80%, 45%)", "hsl(110, 65%, 55%)"], // Green
  ];
  const primaryParticles = 20;
  const secondaryParticles = 16;
  const sparkParticles = 24;
  const colorSet = colorSets[Math.floor(Math.random() * colorSets.length)];
  
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {/* Primary explosion ring */}
      {Array.from({ length: primaryParticles }).map((_, i) => {
        const angle = (i / primaryParticles) * 360;
        const distance = 80 + Math.random() * 50;
        const radians = (angle * Math.PI) / 180;
        const endX = Math.cos(radians) * distance;
        const endY = Math.sin(radians) * distance;
        
        return (
          <motion.div
            key={`primary-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{ 
              background: colorSet[0],
              boxShadow: `0 0 8px ${colorSet[0]}, 0 0 16px ${colorSet[0]}, 0 0 24px ${colorSet[1]}`,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ 
              x: [0, endX * 0.3, endX],
              y: [0, endY * 0.3, endY + 20],
              opacity: [0, 1, 1, 0],
              scale: [0, 2, 1.5, 0],
            }}
            transition={{ 
              duration: 1.5,
              delay: delay,
              repeat: Infinity,
              repeatDelay: 2.5 + Math.random() * 1.5,
              ease: "easeOut"
            }}
          />
        );
      })}
      
      {/* Secondary explosion ring - smaller, different timing */}
      {Array.from({ length: secondaryParticles }).map((_, i) => {
        const angle = (i / secondaryParticles) * 360 + 11.25;
        const distance = 50 + Math.random() * 30;
        const radians = (angle * Math.PI) / 180;
        const endX = Math.cos(radians) * distance;
        const endY = Math.sin(radians) * distance;
        
        return (
          <motion.div
            key={`secondary-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              background: colorSet[1],
              boxShadow: `0 0 6px ${colorSet[1]}, 0 0 12px ${colorSet[2]}`,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ 
              x: [0, endX],
              y: [0, endY + 15],
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.8, 1, 0],
            }}
            transition={{ 
              duration: 1.3,
              delay: delay + 0.1,
              repeat: Infinity,
              repeatDelay: 2.5 + Math.random() * 1.5,
              ease: "easeOut"
            }}
          />
        );
      })}
      
      {/* Spark trails */}
      {Array.from({ length: sparkParticles }).map((_, i) => {
        const angle = (i / sparkParticles) * 360 + Math.random() * 15;
        const distance = 100 + Math.random() * 60;
        const radians = (angle * Math.PI) / 180;
        const endX = Math.cos(radians) * distance;
        const endY = Math.sin(radians) * distance;
        
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{ 
              background: colorSet[2],
              boxShadow: `0 0 4px ${colorSet[2]}, 0 0 8px white`,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ 
              x: [0, endX * 0.5, endX],
              y: [0, endY * 0.5, endY + 40],
              opacity: [0, 1, 0.6, 0],
              scale: [0, 1, 0.5, 0],
            }}
            transition={{ 
              duration: 1.8,
              delay: delay + 0.05,
              repeat: Infinity,
              repeatDelay: 2.5 + Math.random() * 1.5,
              ease: "easeOut"
            }}
          />
        );
      })}
      
      {/* Center flash - bigger and brighter */}
      <motion.div
        className="absolute w-6 h-6 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ 
          background: "radial-gradient(circle, white 0%, transparent 70%)",
          boxShadow: `0 0 30px white, 0 0 60px ${colorSet[0]}, 0 0 90px ${colorSet[1]}`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0.5, 0],
          scale: [0, 3, 1.5, 0],
        }}
        transition={{ 
          duration: 0.6,
          delay: delay,
          repeat: Infinity,
          repeatDelay: 2.5 + Math.random() * 1.5,
          ease: "easeOut"
        }}
      />
      
      {/* Glow ring */}
      <motion.div
        className="absolute w-20 h-20 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ 
          background: "transparent",
          border: `2px solid ${colorSet[0]}`,
          boxShadow: `0 0 20px ${colorSet[0]}, inset 0 0 20px ${colorSet[0]}`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 0.8, 0],
          scale: [0, 2, 3],
        }}
        transition={{ 
          duration: 1,
          delay: delay,
          repeat: Infinity,
          repeatDelay: 2.5 + Math.random() * 1.5,
          ease: "easeOut"
        }}
      />
    </div>
  );
};

// Confetti particle component
const Confetti = ({ delay, left }: { delay: number; left: string }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ 
      left, 
      top: "-10px",
      background: `hsl(${Math.random() * 60 + 30}, 80%, 60%)` // Gold to orange range
    }}
    initial={{ y: 0, opacity: 1, rotate: 0 }}
    animate={{ 
      y: [0, 600], 
      opacity: [1, 1, 0],
      rotate: [0, 360],
      x: [0, Math.random() * 100 - 50]
    }}
    transition={{ 
      duration: 4 + Math.random() * 2,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

// Floating sparkle component
const FloatingSparkle = ({ delay, x, y }: { delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute text-gold"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
    }}
    transition={{ 
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3
    }}
  >
    <Sparkles size={16} />
  </motion.div>
);

export function NewYearCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const festiveMusicRef = useRef<FestiveMusic | null>(null);

  // Initialize audio context on user interaction
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (!festiveMusicRef.current && audioContextRef.current) {
      festiveMusicRef.current = new FestiveMusic(audioContextRef.current);
    }
    return audioContextRef.current;
  }, []);

  // Toggle explosion sounds
  const toggleSound = useCallback(() => {
    if (!soundEnabled) {
      const ctx = initAudio();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      setSoundEnabled(true);
    } else {
      setSoundEnabled(false);
    }
  }, [soundEnabled, initAudio]);

  // Toggle background music
  const toggleMusic = useCallback(() => {
    const ctx = initAudio();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    if (!musicEnabled) {
      festiveMusicRef.current?.start();
      setMusicEnabled(true);
    } else {
      festiveMusicRef.current?.stop();
      setMusicEnabled(false);
    }
  }, [musicEnabled, initAudio]);

  // Play random explosion sounds
  useEffect(() => {
    if (soundEnabled && audioContextRef.current) {
      const playRandomExplosion = () => {
        if (audioContextRef.current && audioContextRef.current.state === 'running') {
          const volume = 0.1 + Math.random() * 0.15; // Random volume for variety
          createExplosionSound(audioContextRef.current, volume);
        }
      };

      // Play explosions at random intervals
      const scheduleNextExplosion = () => {
        const delay = 800 + Math.random() * 2000; // Between 0.8s and 2.8s
        soundIntervalRef.current = setTimeout(() => {
          playRandomExplosion();
          scheduleNextExplosion();
        }, delay);
      };

      // Start with an initial explosion
      playRandomExplosion();
      scheduleNextExplosion();

      return () => {
        if (soundIntervalRef.current) {
          clearTimeout(soundIntervalRef.current);
        }
      };
    }
  }, [soundEnabled]);

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (soundIntervalRef.current) {
        clearTimeout(soundIntervalRef.current);
      }
      festiveMusicRef.current?.stop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
      
      // If we're already past midnight on Jan 1st, target next year
      if (now >= newYear) {
        newYear.setFullYear(newYear.getFullYear() + 1);
      }

      const difference = newYear.getTime() - now.getTime();

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label, index }: { value: number; label: string; index: number }) => (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="relative">
        <motion.div 
          className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-wine to-wine-light rounded-lg flex items-center justify-center border border-gold/30 shadow-[0_0_30px_hsl(0_45%_30%/0.3)]"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.span 
            key={value}
            className="font-display text-3xl md:text-5xl font-bold text-cream"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </motion.div>
        <motion.div 
          className="absolute -inset-0.5 bg-gradient-to-br from-gold/20 to-transparent rounded-lg -z-10 blur-sm"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <span className="mt-3 text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );

  // Generate confetti positions
  const confettiParticles = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.3,
    left: `${Math.random() * 100}%`
  }));

  // Generate sparkle positions
  const sparkles = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 0.5,
    x: `${10 + Math.random() * 80}%`,
    y: `${10 + Math.random() * 80}%`
  }));

  // Generate firework positions - more fireworks!
  const fireworks = Array.from({ length: 10 }, (_, i) => ({
    delay: i * 0.5,
    x: `${10 + Math.random() * 80}%`,
    y: `${5 + Math.random() * 50}%`
  }));
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-midnight/30 to-background relative overflow-hidden">
      {/* Audio controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        {/* Music toggle button */}
        <motion.button
          onClick={toggleMusic}
          className={`p-3 rounded-full bg-background/80 backdrop-blur-sm border transition-colors ${
            musicEnabled ? 'border-gold/50 bg-gold/10' : 'border-border hover:border-gold/50'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={musicEnabled ? "Désactiver la musique" : "Activer la musique festive"}
        >
          {musicEnabled ? (
            <Music className="w-5 h-5 text-gold" />
          ) : (
            <Music2 className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.button>
        
        {/* Sound toggle button */}
        <motion.button
          onClick={toggleSound}
          className={`p-3 rounded-full bg-background/80 backdrop-blur-sm border transition-colors ${
            soundEnabled ? 'border-gold/50 bg-gold/10' : 'border-border hover:border-gold/50'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={soundEnabled ? "Désactiver les explosions" : "Activer le son des feux d'artifice"}
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-gold" />
          ) : (
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.button>
      </div>
      {/* Animated confetti */}
      {confettiParticles.map((particle, i) => (
        <Confetti key={i} delay={particle.delay} left={particle.left} />
      ))}

      {/* Floating sparkles */}
      {sparkles.map((sparkle, i) => (
        <FloatingSparkle key={i} delay={sparkle.delay} x={sparkle.x} y={sparkle.y} />
      ))}

      {/* Fireworks */}
      {fireworks.map((firework, i) => (
        <Firework key={i} delay={firework.delay} x={firework.x} y={firework.y} />
      ))}

      {/* Decorative elements with animation */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 bg-wine/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PartyPopper className="w-5 h-5 text-accent" />
            <p className="text-accent uppercase tracking-[0.3em] text-sm">
              Réveillon du Nouvel An
            </p>
            <PartyPopper className="w-5 h-5 text-accent" />
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Compte à Rebours <motion.span 
              className="italic text-accent inline-block"
              animate={{ 
                textShadow: [
                  "0 0 10px hsl(var(--accent))",
                  "0 0 20px hsl(var(--accent))",
                  "0 0 10px hsl(var(--accent))"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >2025</motion.span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Célébrez la nouvelle année dans un cadre d'exception. Réservez votre table pour une soirée inoubliable.
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 md:gap-6 mb-12">
          <TimeBlock value={timeLeft.days} label="Jours" index={0} />
          <TimeBlock value={timeLeft.hours} label="Heures" index={1} />
          <TimeBlock value={timeLeft.minutes} label="Minutes" index={2} />
          <TimeBlock value={timeLeft.seconds} label="Secondes" index={3} />
        </div>

        {/* WhatsApp Only Alert */}
        <motion.div 
          className="max-w-xl mx-auto mb-8 p-4 bg-destructive/10 border border-destructive/30 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 text-center justify-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
            </motion.div>
            <p className="text-foreground text-sm font-medium">
              Réservation Nouvel An <span className="text-destructive font-bold">UNIQUEMENT via WhatsApp</span> (acompte obligatoire)
            </p>
          </div>
        </motion.div>

        {/* Menu du Nouvel An */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Menu */}
          <motion.div 
            className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-display text-2xl text-accent mb-4 text-center">Menu New Year 2026</h3>
            <p className="text-center text-muted-foreground text-sm mb-6">Amuse bouche • Coupe apéritive</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-display text-lg text-accent/80 italic mb-2">Entrées</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-center">
                  <li>Burrata</li>
                  <li>Carpaccio de bœuf</li>
                  <li>Foie gras, chutney de figue</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-display text-lg text-accent/80 italic mb-2">Plats principaux</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-center">
                  <li>Filetto al pepe verde</li>
                  <li>Filetto di salmone</li>
                  <li>Ravioli al tartuffo</li>
                  <li>Scaloppina bella milanaise</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-display text-lg text-accent/80 italic mb-2">Accompagnements au choix</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-center">
                  <li>Pomme grenaille • Purée de pomme de terre</li>
                  <li>Frites • Pâtes à la crème</li>
                  <li>Légumes sautés à la plancha • Riz sauce champignons</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-display text-lg text-accent/80 italic mb-2">Desserts</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-center">
                  <li>Fondant au chocolat</li>
                  <li>Pavlova fruits rouges</li>
                  <li>Mille feuille renversé</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Services & Animation */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div 
              className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-display text-xl text-accent mb-4 text-center">Services & Tarifs</h4>
              <div className="space-y-3 text-center">
                {[
                  { time: "19h à 21h", price: "99€", bg: "bg-wine/10" },
                  { time: "21h à 23h", price: "119€", bg: "bg-wine/20" },
                  { time: "23h à 02h", price: "139€", bg: "bg-wine/30" }
                ].map((service, i) => (
                  <motion.div 
                    key={service.time}
                    className={`flex justify-between items-center px-4 py-2 ${service.bg} rounded`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-foreground">{service.time}</span>
                    <motion.span 
                      className="text-accent font-bold text-lg"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      {service.price}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-display text-xl text-accent mb-4 text-center">Animation</h4>
              <ul className="text-muted-foreground space-y-2 text-center">
                {[
                  { emoji: "🎷", text: "Saxophoniste" },
                  { emoji: "🎩", text: "Magicien" },
                  { emoji: "💃", text: "Danseuse brésilienne" }
                ].map((item, i) => (
                  <motion.li 
                    key={item.text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <motion.span
                      className="inline-block mr-2"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.5 }}
                    >
                      {item.emoji}
                    </motion.span>
                    {item.text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="flex justify-center w-full mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              boxShadow: [
                "0 0 20px hsl(var(--gold) / 0.3)",
                "0 0 40px hsl(var(--gold) / 0.5)",
                "0 0 20px hsl(var(--gold) / 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-full"
          >
            <Button variant="gold" size="xl" asChild>
              <a 
                href="https://wa.me/33753236352?text=Bonjour%2C%20je%20souhaite%20réserver%20pour%20le%20Réveillon%20du%20Nouvel%20An." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle size={20} />
                Réserver sur WhatsApp
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
