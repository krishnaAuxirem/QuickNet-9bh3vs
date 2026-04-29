import { useScrollTop } from "@/hooks/useScrollTop";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/features/HeroSlider";
import HowItWorksSection from "@/components/features/HowItWorksSection";
import FeaturesSection from "@/components/features/FeaturesSection";
import SecuritySection from "@/components/features/SecuritySection";
import PricingSection from "@/components/features/PricingSection";
import TestimonialsSection from "@/components/features/TestimonialsSection";
import AnalyticsPreview from "@/components/features/AnalyticsPreview";
import FAQSection from "@/components/features/FAQSection";
import ContactSection from "@/components/features/ContactSection";
import CompressionDemo from "@/components/features/CompressionDemo";
import TransferAnimation from "@/components/features/TransferAnimation";
import FinalCTA from "@/components/features/FinalCTA";
import CatSlider from "@/components/features/CatSlider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Shield, Globe, Users } from "lucide-react";

function AboutSection() {
  const stats = [
    { icon: Zap, value: "10 Gbps", label: "Peak Transfer Speed", color: "bg-yellow-50 text-yellow-600" },
    { icon: Shield, value: "Zero", label: "Data Breaches Ever", color: "bg-green-50 text-green-600" },
    { icon: Globe, value: "30+", label: "Countries Served", color: "bg-blue-50 text-blue-600" },
    { icon: Users, value: "50B+", label: "Files Transferred", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-navy/10 text-navy text-sm font-semibold mb-6">
              About QuickNet
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy mb-6">
              Built by Engineers,<br />
              <span className="text-[#00FFC2]">For Everyone</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              QuickNet was born out of frustration with slow, bloated file sharing tools. We set out to build something that just works — instantly, securely, and at speeds that feel like the future.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Founded in 2023 and headquartered in Bengaluru, we now serve 50,000+ users across 30 countries, helping them share and compress over 50 billion files every month.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white font-bold rounded-xl hover:bg-navy-light transition-colors"
              >
                <Zap className="w-5 h-5" /> Join QuickNet Today
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-navy text-navy font-semibold rounded-xl hover:bg-navy hover:text-white transition-all"
              >
                Explore Features
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center card-hover"
                >
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="font-display text-3xl font-bold text-navy">{stat.value}</p>
                  <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const trustedBy = ["TechVentures India", "PixelForge Studios", "InnovateSoft", "GlobalFreight Co.", "MediaBlast Agency", "StartupHub Delhi"];
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <p className="text-gray-400 text-sm font-medium">Trusted by 50,000+ professionals at top companies</p>
      </div>
      <div className="flex gap-12 items-center animate-[slide_20s_linear_infinite] whitespace-nowrap" style={{ animationName: "ticker" }}>
        {[...trustedBy, ...trustedBy].map((name, i) => (
          <span key={i} className="text-gray-300 font-bold text-lg font-display flex-shrink-0">{name}</span>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  useScrollTop();

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* 1. Hero Slider with Cat Mascot */}
      <HeroSlider />
      {/* Trust bar */}
      <TrustBar />
      {/* 2. How It Works */}
      <HowItWorksSection />
      {/* 3. Features */}
      <FeaturesSection />
      {/* 4. Compression Demo */}
      <CompressionDemo />
      {/* 5. High-Speed Transfer Animation */}
      <TransferAnimation />
      {/* 6. Security */}
      <SecuritySection />
      {/* 7. Cat Mascot Slider */}
      <CatSlider />
      {/* 8. Analytics Preview */}
      <AnalyticsPreview />
      {/* 9. About */}
      <AboutSection />
      {/* 10. Testimonials */}
      <TestimonialsSection />
      {/* 11. Pricing */}
      <PricingSection />
      {/* 12. FAQ */}
      <FAQSection />
      {/* 13. Contact */}
      <ContactSection />
      {/* Final CTA */}
      <FinalCTA />
      <Footer />
    </div>
  );
}
