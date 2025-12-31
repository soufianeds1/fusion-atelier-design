import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, AlertTriangle, Sparkles, PartyPopper } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-midnight/30 to-background relative overflow-hidden">
      {/* Animated confetti */}
      {confettiParticles.map((particle, i) => (
        <Confetti key={i} delay={particle.delay} left={particle.left} />
      ))}

      {/* Floating sparkles */}
      {sparkles.map((sparkle, i) => (
        <FloatingSparkle key={i} delay={sparkle.delay} x={sparkle.x} y={sparkle.y} />
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
