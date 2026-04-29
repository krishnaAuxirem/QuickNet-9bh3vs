import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/constants";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-5"
          >
            Customer Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold text-navy mb-4"
          >
            Loved by 50,000+<br />
            <span className="text-[#00FFC2]">Professionals</span>
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            See why companies across India and the world choose QuickNet for their critical file operations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-7 rounded-2xl bg-white border transition-all card-hover ${
                i === 2 ? "lg:col-span-1 border-navy/20 shadow-md" : "border-gray-100"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                "{t.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-mint font-bold text-sm font-display">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-8 rounded-3xl bg-navy grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: "4.9/5", label: "Average Rating", sub: "From 8,400+ reviews" },
            { value: "97%", label: "Customer Retention", sub: "Renew after year 1" },
            { value: "< 1 day", label: "Time to Value", sub: "First transfer in hours" },
            { value: "50K+", label: "Happy Customers", sub: "Across 30 countries" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-mint mb-1">{s.value}</p>
              <p className="text-white/80 text-sm font-semibold">{s.label}</p>
              <p className="text-white/30 text-xs mt-0.5">{s.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
