import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, FileCheck, Globe, CheckCircle } from "lucide-react";

const FEATURES = [
  {
    icon: Lock,
    title: "AES-256 Encryption",
    desc: "Every file is encrypted with military-grade AES-256 at rest. Your data is unreadable without your unique decryption key.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Shield,
    title: "TLS 1.3 In Transit",
    desc: "All data in transit is protected by TLS 1.3, the latest and most secure transport layer standard available.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Eye,
    title: "Zero-Knowledge Policy",
    desc: "We cannot see your file contents. Our systems only process encrypted data — your privacy is guaranteed by design.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: FileCheck,
    title: "Malware Scanning",
    desc: "Every uploaded file is scanned with our real-time threat detection engine before being made available for download.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Server,
    title: "ISO 27001 Certified",
    desc: "Our infrastructure is ISO 27001 and SOC 2 Type II certified, meeting the highest global security standards.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Globe,
    title: "GDPR Compliant",
    desc: "Full compliance with GDPR, India PDPB, and CCPA. You retain full ownership and control of all your data.",
    color: "bg-cyan-50 text-cyan-600",
  },
];

const BADGES = ["ISO 27001", "SOC 2 Type II", "GDPR", "India PDPB", "CCPA", "HIPAA Ready"];

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-semibold mb-5 border border-green-200"
          >
            <Shield className="w-4 h-4" /> Security First
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold text-navy mb-4"
          >
            Your Files Are in<br />
            <span className="text-[#00FFC2]">Safe Hands</span>
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We have never had a security breach. Our 7-layer security architecture protects your most sensitive files.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-gray-100 hover:border-navy/15 hover:shadow-md transition-all bg-white card-hover"
              >
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-navy mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-navy"
        >
          <p className="text-center text-white/50 text-sm font-semibold uppercase tracking-wider mb-5">
            Certifications & Compliance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-xl bg-mint/10 border border-mint/20 text-mint text-sm font-bold inline-flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
