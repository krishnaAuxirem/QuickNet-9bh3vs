import { motion } from "framer-motion";
import { FEATURES } from "@/constants";
import { Zap, Archive, Shield, Users, BarChart3, Globe } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = { Zap, Archive, Shield, Users, BarChart3, Globe };

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-5"
          >
            Platform Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold text-navy mb-4"
          >
            Everything You Need to<br />
            <span className="text-[#00FFC2]">Share at Scale</span>
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From blazing-fast transfers to enterprise-grade security, QuickNet has every feature modern teams need.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] || Zap;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-7 rounded-2xl border border-gray-100 bg-white hover:border-navy/20 hover:shadow-lg transition-all duration-300 card-hover"
              >
                <div className={`w-13 h-13 w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-display font-bold text-navy text-lg mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>

                {/* Hover accent bar */}
                <div className="mt-5 h-1 w-0 group-hover:w-full bg-gradient-to-r from-navy to-[#00FFC2] rounded-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-navy to-navy-light text-white flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display font-bold text-xl mb-1">All features available on every plan</h3>
            <p className="text-white/50">Start free, scale as you grow. No feature gating on core capabilities.</p>
          </div>
          <a
            href="/register"
            className="flex-shrink-0 px-8 py-3.5 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors whitespace-nowrap"
          >
            Get Started Free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
