import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "@/constants";
import { Upload, Sliders, Share2, BarChart2 } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = { Upload, Sliders, Share2, BarChart2 };

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-5"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold text-navy mb-4"
          >
            How QuickNet Works
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From upload to download — your files are compressed, encrypted, and delivered in seconds.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-navy/20 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = ICON_MAP[step.icon] || Upload;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative text-center"
                >
                  {/* Step number */}
                  <div className="relative z-10 inline-flex flex-col items-center">
                    <div className="relative mb-5">
                      <div className="w-20 h-20 rounded-2xl bg-navy flex items-center justify-center shadow-lg">
                        <Icon className="w-9 h-9 text-mint" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-mint text-navy font-bold text-sm flex items-center justify-center shadow-md">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-navy text-lg mb-3">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[200px] mx-auto">{step.description}</p>
                  </div>

                  {/* Arrow connector (mobile) */}
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-6 text-navy/30 text-2xl">↓</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-2xl bg-white border border-gray-200 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {[
            { value: "< 10s", label: "Average upload time" },
            { value: "70%", label: "Space reduction" },
            { value: "1-click", label: "Share via link" },
            { value: "Real-time", label: "Analytics updates" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-bold text-navy">{s.value}</p>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
