import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQS } from "@/constants";

export default function FAQSection() {
  const [open, setOpen] = useState<string | null>("faq1");

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-5"
          >
            Frequently Asked Questions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold text-navy mb-4"
          >
            Got Questions?
          </motion.h2>
          <p className="text-gray-500 text-lg">Everything you need to know about QuickNet.</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-2xl border transition-all ${
                open === faq.id
                  ? "bg-navy border-navy/20 shadow-lg"
                  : "bg-white border-gray-200 hover:border-navy/20 hover:shadow-sm"
              }`}
            >
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-semibold text-base pr-4 ${open === faq.id ? "text-mint" : "text-navy"}`}>
                  {faq.question}
                </span>
                {open === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-mint flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {open === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-white/65 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-8 rounded-3xl bg-navy border border-navy-light"
        >
          <h3 className="font-display font-bold text-white text-xl mb-2">Still have questions?</h3>
          <p className="text-white/50 text-sm mb-5">Our support team is available 24/7 to help you get started.</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
