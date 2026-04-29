import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import cat1 from "@/assets/cat1.jpg";
import cat2 from "@/assets/cat2.jpg";
import cat3 from "@/assets/cat3.jpg";
import cat4 from "@/assets/cat4.jpg";

const cats = [
  {
    img: cat1,
    name: "DataCat 3000",
    role: "Chief Upload Officer",
    quote: "Your files upload in meow-seconds!",
    speed: "9.2 Gbps",
  },
  {
    img: cat2,
    name: "CompressPurr",
    role: "Compression Specialist",
    quote: "I compress files better than I compress hairballs.",
    speed: "70% reduction",
  },
  {
    img: cat3,
    name: "CipherWhiskers",
    role: "Security Guardian",
    quote: "Not a single byte escapes my watchful eyes.",
    speed: "AES-256",
  },
  {
    img: cat4,
    name: "TurboTabby",
    role: "Speed Daemon",
    quote: "I transfer files at the speed of pounce.",
    speed: "10 Gbps",
  },
];

export default function CatSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % cats.length), 3500);
    return () => clearInterval(t);
  }, []);

  const cat = cats[current];

  return (
    <section className="py-20 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-4">
            🐱 Meet Our Team
          </span>
          <h2 className="font-display text-4xl font-bold text-white">
            Powered by the Fastest <span className="text-mint">Felines</span> in Tech
          </h2>
          <p className="text-white/40 mt-3 text-lg">Our mascots oversee every transfer. They take speed very seriously.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Cat Card */}
          <div className="relative w-full lg:w-auto lg:flex-shrink-0">
            <div className="absolute inset-0 rounded-3xl bg-mint/20 blur-3xl scale-110 pointer-events-none" />
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6 w-full max-w-sm mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-5">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg">{cat.name}</h3>
                      <p className="text-mint text-xs font-semibold">{cat.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 bg-mint/10 border border-mint/20 px-2.5 py-1 rounded-full">
                        <Zap className="w-3 h-3 text-mint" />
                        <span className="text-mint text-xs font-bold">{cat.speed}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm mt-3 italic">"{cat.quote}"</p>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex gap-2 justify-center mt-5">
                {cats.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all ${i === current ? "w-6 h-2 bg-mint" : "w-2 h-2 bg-white/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              {[
                { title: "Paw-Powered CDN", desc: "50+ edge nodes, each guarded by a vigilant feline ensuring maximum uptime and speed." },
                { title: "Furball Compression", desc: "Our cats compress your data so efficiently, even hairballs come out smaller than expected." },
                { title: "9 Lives Uptime Guarantee", desc: "With 99.99% uptime, our cats work all 9 lives to keep your files accessible 24/7." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center flex-shrink-0 text-lg">
                    🐾
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {cats.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setCurrent(i)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                    i === current ? "border-mint text-mint bg-mint/10" : "border-white/15 text-white/50 hover:border-white/30"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
