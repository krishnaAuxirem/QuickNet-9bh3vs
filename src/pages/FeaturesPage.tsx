import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturesSection from "@/components/features/FeaturesSection";
import HowItWorksSection from "@/components/features/HowItWorksSection";
import SecuritySection from "@/components/features/SecuritySection";
import CompressionDemo from "@/components/features/CompressionDemo";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, CheckCircle } from "lucide-react";

const HIGHLIGHTS = [
  "10 Gbps Transfer Speed",
  "70% Compression Ratio",
  "AES-256 Encryption",
  "50+ Global Edge Nodes",
  "99.99% Uptime SLA",
  "Real-Time Analytics",
];

export default function FeaturesPage() {
  useScrollTop();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-navy via-navy-light to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-mint blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-mint blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6"
            >
              <Zap className="w-4 h-4" /> Platform Features
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Built for Speed,<br />
              <span className="text-mint">Designed for Scale</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-xl leading-relaxed mb-10"
            >
              Everything your team needs to transfer, compress, and secure files — all in one blazing-fast platform.
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {HIGHLIGHTS.map((h) => (
                <span key={h} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/15 text-white/80 text-sm">
                  <CheckCircle className="w-3.5 h-3.5 text-mint" /> {h}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                View Pricing
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature sections */}
      <FeaturesSection />
      <HowItWorksSection />
      <CompressionDemo />
      <SecuritySection />

      <Footer />
    </div>
  );
}
