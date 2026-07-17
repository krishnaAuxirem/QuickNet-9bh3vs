import { motion } from "framer-motion";
import { PRICING_PLANS } from "@/constants";
import { CheckCircle, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-5"
          >
            Simple Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold text-navy mb-4"
          >
            Plans for Every Team
          </motion.h2>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            All prices in Indian Rupees. No hidden fees. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-xl bg-white border border-gray-200 shadow-sm">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${billing === "monthly" ? "bg-navy text-white shadow-sm" : "text-gray-500 hover:text-navy"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${billing === "yearly" ? "bg-navy text-white shadow-sm" : "text-gray-500 hover:text-navy"}`}
            >
              Yearly
              <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-[#00FFC2] text-navy font-bold">–20%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => {
            const price = billing === "yearly" ? Math.floor(plan.price * 0.8) : plan.price;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col transition-all ${
                  plan.highlighted
                    ? "bg-navy text-white shadow-2xl scale-105 border-0"
                    : "bg-white border border-gray-200 hover:shadow-lg hover:border-navy/20 card-hover"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-mint text-navy text-xs font-bold rounded-full whitespace-nowrap inline-flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" /> Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`font-display text-xl font-bold mb-1 ${plan.highlighted ? "text-mint" : "text-navy"}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 my-3">
                    <span className={`text-4xl font-display font-bold ${plan.highlighted ? "text-white" : "text-navy"}`}>
                      {price === 0 ? "Free" : `₹${price.toLocaleString("en-IN")}`}
                    </span>
                    {price > 0 && (
                      <span className={`text-sm ${plan.highlighted ? "text-white/50" : "text-gray-400"}`}>/mo</span>
                    )}
                  </div>
                  <p className={`text-sm ${plan.highlighted ? "text-white/50" : "text-gray-500"}`}>
                    {plan.storageGB >= 1000 ? `${plan.storageGB / 1000} TB` : `${plan.storageGB} GB`} Storage · {plan.transferGB >= 1000 ? `${plan.transferGB / 1000} TB` : `${plan.transferGB} GB`}/mo transfer
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-mint" : "text-green-500"}`} />
                      <span className={`text-sm ${plan.highlighted ? "text-white/80" : "text-gray-600"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3.5 rounded-xl font-bold text-center cursor-pointer flex items-center justify-center gap-2 transition-all ${
                      plan.highlighted
                        ? "bg-mint text-navy hover:bg-mint-light"
                        : "bg-navy text-white hover:bg-navy-light"
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    {plan.price === 0 ? "Start Free" : "Get Started"}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-6 rounded-2xl bg-white border border-gray-200"
        >
          <p className="text-gray-600 text-sm">
            Need a custom volume plan? &nbsp;
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="text-navy font-bold hover:underline"
            >
              Contact our Enterprise Sales team →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
