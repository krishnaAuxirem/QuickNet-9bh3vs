import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/features/ContactSection";
import { useScrollTop } from "@/hooks/useScrollTop";
import { MessageSquare, Clock, Globe } from "lucide-react";

const STATS = [
  { icon: MessageSquare, value: "< 3 min", label: "Avg. Chat Response" },
  { icon: Clock, value: "24 hrs", label: "Email Response Time" },
  { icon: Globe, value: "30+", label: "Countries Supported" },
];

export default function ContactPage() {
  useScrollTop();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-navy via-navy-light to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-mint blur-3xl" />
          <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-mint blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6"
          >
            <MessageSquare className="w-4 h-4" /> Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            We're Here to<br />
            <span className="text-mint">Help You</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-xl leading-relaxed mb-12"
          >
            Whether you're a startup or an enterprise, our team is ready to answer your questions and help you get started.
          </motion.p>

          {/* Response Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/8 border border-white/15">
                <Icon className="w-5 h-5 text-mint" />
                <div className="text-left">
                  <p className="text-white font-bold text-lg leading-none">{value}</p>
                  <p className="text-white/50 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  );
}
