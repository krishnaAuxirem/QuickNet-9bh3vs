import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingSection from "@/components/features/PricingSection";
import FAQSection from "@/components/features/FAQSection";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, Shield, Headphones, RefreshCw } from "lucide-react";

const GUARANTEES = [
  { icon: Shield, title: "No Hidden Fees", desc: "What you see is what you pay. No setup costs, no surprise charges." },
  { icon: RefreshCw, title: "Cancel Anytime", desc: "No lock-in contracts. Upgrade or downgrade whenever you need." },
  { icon: Headphones, title: "24/7 Support", desc: "Every plan includes access to our world-class support team." },
];

export default function PricingPage() {
  useScrollTop();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-navy via-navy-light to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 rounded-full bg-mint blur-3xl" />
          <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-mint blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6"
          >
            <Zap className="w-4 h-4" /> Simple Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Transparent Plans,<br />
            <span className="text-mint">Zero Surprises</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-xl leading-relaxed mb-10"
          >
            Start free. Scale as you grow. All prices in INR, billed transparently.
          </motion.p>

          {/* Guarantees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {GUARANTEES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-2 px-4 py-4 rounded-2xl bg-white/8 border border-white/15">
                <Icon className="w-5 h-5 text-mint" />
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-white/50 text-xs text-center">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing + FAQ */}
      <PricingSection />
      <FAQSection />

      {/* Enterprise CTA */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-white mb-4"
          >
            Need a Custom Plan?
          </motion.h2>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
            Large team or unique requirements? Talk to our Enterprise team for custom volume pricing, dedicated support, and SLA guarantees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors"
            >
              Talk to Sales <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
