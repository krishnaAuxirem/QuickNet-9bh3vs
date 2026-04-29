import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, CheckCircle } from "lucide-react";

const PERKS = [
  "Free forever starter plan",
  "No credit card required",
  "Setup in under 60 seconds",
  "Cancel anytime",
];

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-navy">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-mint/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(0,255,194,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,194,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-mint/15 border border-mint/25 mb-8"
          style={{ boxShadow: "0 0 60px rgba(0,255,194,0.2)" }}
        >
          <Zap className="w-10 h-10 text-mint" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Ready to Transfer at<br />
          <span className="text-mint" style={{ textShadow: "0 0 40px rgba(0,255,194,0.5)" }}>
            Light Speed?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/55 text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Join 50,000+ users who have already revolutionized how they share and transfer files. Start free today, upgrade when you're ready.
        </motion.p>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
        >
          {PERKS.map((perk) => (
            <div key={perk} className="flex items-center gap-2 text-white/60">
              <CheckCircle className="w-4 h-4 text-mint flex-shrink-0" />
              <span className="text-sm">{perk}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/register">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-10 py-4 bg-mint text-navy font-bold rounded-xl text-lg cursor-pointer"
              style={{ boxShadow: "0 0 40px rgba(0,255,194,0.35)" }}
            >
              <Zap className="w-5 h-5" /> Start Free — No Card Needed
            </motion.div>
          </Link>
          <Link to="/login">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-10 py-4 bg-white/10 text-white font-semibold rounded-xl text-lg border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 text-white/25 text-sm"
        >
          {[
            { value: "50K+", label: "Active Users" },
            { value: "50B+", label: "Files Shared" },
            { value: "99.99%", label: "Uptime SLA" },
            { value: "10 Gbps", label: "Peak Speed" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-white/70 font-bold text-xl font-display">{s.value}</p>
              <p className="text-white/30 text-xs">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
