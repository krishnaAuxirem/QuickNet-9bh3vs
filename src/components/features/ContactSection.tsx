import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Headphones } from "lucide-react";
import { toast } from "sonner";

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email Support",
    value: "support@quicknet.io",
    sub: "Reply within 24 hours",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Phone,
    title: "Phone Support",
    value: "+91 80 4567 8900",
    sub: "Mon–Fri, 9 AM–6 PM IST",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    value: "quicknet.io/chat",
    sub: "Average response: 3 minutes",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Headphones,
    title: "Enterprise Support",
    value: "enterprise@quicknet.io",
    sub: "Dedicated account manager",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-5"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold text-navy mb-4"
          >
            We're Here to Help
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Questions about QuickNet? Our team of experts is ready to help you get the most out of the fastest file sharing platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact Methods + Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {CONTACT_METHODS.map(({ icon: Icon, title, value, sub, color }) => (
                <div key={title} className="p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-sm transition-all">
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-semibold text-navy text-sm mb-0.5">{title}</p>
                  <p className="text-navy text-sm font-medium break-all">{value}</p>
                  <p className="text-gray-400 text-xs mt-1">{sub}</p>
                </div>
              ))}
            </div>

            {/* Office info */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-white">
              <h3 className="font-display font-bold text-navy mb-4">Our Office</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#00FFC2] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-navy font-medium text-sm">QuickNet Technologies Pvt. Ltd.</p>
                    <p className="text-gray-500 text-sm">4th Floor, Tower B, Manyata Tech Park,<br />Nagawara, Bengaluru – 560045</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#00FFC2] flex-shrink-0" />
                  <p className="text-gray-500 text-sm">Monday – Friday: 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>

            {/* SLA Banner */}
            <div className="p-5 rounded-2xl bg-navy text-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-mint/15 flex items-center justify-center flex-shrink-0">
                <Headphones className="w-6 h-6 text-mint" />
              </div>
              <div>
                <p className="font-bold text-sm mb-0.5">Enterprise SLA Support</p>
                <p className="text-white/50 text-xs">Dedicated account managers for enterprise clients. 1-hour response guaranteed.</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/8 outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="rahul@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/8 outline-none text-sm transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Subject *</label>
                <select
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy outline-none text-sm transition-all bg-white"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="billing">Billing & Pricing</option>
                  <option value="technical">Technical Support</option>
                  <option value="enterprise">Enterprise Sales</option>
                  <option value="security">Security Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Message *</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/8 outline-none text-sm transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><Send className="w-5 h-5" /> Send Message</>
                )}
              </button>
              <p className="text-center text-xs text-gray-400">
                We typically respond within 24 hours on business days.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
