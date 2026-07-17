import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero1.jpg";
import hero2 from "@/assets/hero2.jpg";
import hero3 from "@/assets/hero3.jpg";
import hero4 from "@/assets/hero4.jpg";

const slides = [
  {
    id: 1,
    image: hero1,
    badge: "10 Gbps Transfer Speed",
    headline: "Share Files at",
    highlight: "Lightning Speed",
    subtext: "The fastest file sharing platform in India. Upload, compress, and transfer with zero friction.",
    stats: [
      { value: "10 Gbps", label: "Peak Speed" },
      { value: "50K+", label: "Users" },
      { value: "99.99%", label: "Uptime" },
    ],
  },
  {
    id: 2,
    image: hero2,
    badge: "Up to 70% Size Reduction",
    headline: "Compress Without",
    highlight: "Compromising Quality",
    subtext: "AI-powered compression that reduces file sizes up to 70% while maintaining perfect clarity.",
    stats: [
      { value: "70%", label: "Compression" },
      { value: "50B+", label: "Files" },
      { value: "AES-256", label: "Security" },
    ],
  },
  {
    id: 3,
    image: hero3,
    badge: "AES-256 Encryption",
    headline: "Enterprise-Grade",
    highlight: "Security Built-In",
    subtext: "Military-grade encryption, password protection, and expiry controls for complete peace of mind.",
    stats: [
      { value: "Zero", label: "Breaches" },
      { value: "ISO 27001", label: "Certified" },
      { value: "TLS 1.3", label: "Protocol" },
    ],
  },
  {
    id: 4,
    image: hero4,
    badge: "Team Collaboration",
    headline: "Built for",
    highlight: "Modern Teams",
    subtext: "Share with your entire team instantly. Real-time analytics and collaboration tools included.",
    stats: [
      { value: "30+", label: "Countries" },
      { value: "12", label: "Team Roles" },
      { value: "24/7", label: "Support" },
    ],
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 5500);
    return () => clearInterval(timer);
  }, [goNext]);

  const slideVariants = {
    enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative h-screen min-h-[680px] overflow-hidden bg-navy-dark">
      {/* Background Slides */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/97 via-navy/80 to-navy/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,194,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,194,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 border border-mint/25 text-mint text-sm font-semibold mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                  {slides[current].badge}
                </motion.div>

                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-5">
                  {slides[current].headline}
                  <br />
                  <span className="text-mint" style={{ textShadow: "0 0 30px rgba(0,255,194,0.5)" }}>
                    {slides[current].highlight}
                  </span>
                </h1>

                <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
                  {slides[current].subtext}
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Link to="/register">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-8 py-4 bg-mint text-navy font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-mint/30 transition-all cursor-pointer"
                    >
                      <Zap className="w-5 h-5" /> Start Free Today
                    </motion.div>
                  </Link>
                  <a href="#how-it-works">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl text-lg border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      See How It Works <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </a>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-8">
                  {slides[current].stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-bold text-mint font-display">{stat.value}</p>
                      <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* Vertical Navigation (right edge) */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 items-center">
        <button
          onClick={goPrev}
          className="w-10 h-10 rounded-full bg-white/8 hover:bg-mint/20 text-white border border-white/15 flex items-center justify-center transition-all"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <div className="flex flex-col gap-2 items-center py-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-2 h-8 bg-mint" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          className="w-10 h-10 rounded-full bg-white/8 hover:bg-mint/20 text-white border border-white/15 flex items-center justify-center transition-all"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-white/40 text-sm">
        <span className="text-mint font-bold">{String(current + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
