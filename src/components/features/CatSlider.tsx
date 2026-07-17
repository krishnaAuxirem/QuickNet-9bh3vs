import { motion } from "framer-motion";
import { Zap, Shield, Sparkles } from "lucide-react";

const highlights = [
  {
    title: "Fast Transfer Workflows",
    desc: "Optimized upload and download paths for teams that need file sharing without delays.",
    icon: Zap,
  },
  {
    title: "Secure by Default",
    desc: "AES-256 encryption, password protection, and access expiry for every file.",
    icon: Shield,
  },
  {
    title: "Performance Insights",
    desc: "Track transfer history, speed metrics, and usage trends in one clean dashboard.",
    icon: Sparkles,
  },
];

export default function CatSlider() {
  return (
    <section className="py-20 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Transfer Experience
          </span>
          <h2 className="font-display text-4xl font-bold text-white">
            Powering Secure, Fast File Sharing
          </h2>
          <p className="text-white/40 mt-3 text-lg">A modern platform built for speed, reliability, and enterprise-ready transfer controls.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-mint/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-mint" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
