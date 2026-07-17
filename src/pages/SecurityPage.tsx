import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ShieldCheck, Lock, Server, Key, EyeOff, Shield, Award, CheckCircle } from "lucide-react";

export default function SecurityPage() {
  useScrollTop();

  const securityFeatures = [
    {
      icon: Lock,
      title: "AES-256 Encryption at Rest",
      desc: "All files stored on QuickNet servers are encrypted using Advanced Encryption Standard (AES) with a 256-bit key length. This is the same standard used by banks and government agencies to secure classified information."
    },
    {
      icon: Key,
      title: "Zero-Knowledge Architecture",
      desc: "We prioritize user privacy. In Pro and Enterprise plans, our zero-knowledge key management ensures that you hold the decryption keys. QuickNet operators cannot inspect, read, or modify the contents of your shared files."
    },
    {
      icon: Shield,
      title: "TLS 1.3 Transit Protection",
      desc: "All file transfers are protected in transit using TLS 1.3 protocol. This prevents interception, eavesdropping, and tampering while your files are uploaded to our nodes and downloaded by recipients."
    },
    {
      icon: EyeOff,
      title: "Granular Access Controls",
      desc: "You have complete control over who accesses your data. Set custom passwords on your files, specify link expiration durations (from 1 hour to 30 days), and restrict download limits to block unauthorized views."
    },
    {
      icon: Server,
      title: "Distributed Edge Defense",
      desc: "QuickNet leverages a globally distributed network of secure CDN edge nodes. Each edge point has built-in DDoS protection, IP firewalls, and rate-limiting, preventing malicious traffic from reaching your links."
    },
    {
      icon: ShieldCheck,
      title: "Secure Infrastructure Hosting",
      desc: "Our primary servers and storage units are housed in tier-4, highly secured data centers equipped with 24/7/365 CCTV monitoring, biometric access gates, and physical fail-safes."
    }
  ];

  const compliances = [
    { name: "ISO/IEC 27001", status: "Certified", desc: "Internationally recognized standard for establishing, implementing, maintaining, and continually improving information security." },
    { name: "GDPR Compliant", status: "Compliant", desc: "Full adherence to European Union's General Data Protection Regulation requirements regarding user consent and data erasure rights." },
    { name: "SOC 2 Type II", status: "Audited", desc: "Independent auditing confirming our organizational controls meet standards for security, availability, and confidentiality." },
    { name: "HIPAA Ready", status: "Compliant", desc: "Configurable settings that allow healthcare companies to share records securely under Health Insurance Portability and Accountability Act guidelines." }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-navy via-navy-light to-navy-dark relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-mint blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-mint blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-mint/20 flex items-center justify-center mx-auto mb-6 border border-mint/30"
          >
            <ShieldCheck className="w-8 h-8 text-mint" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Enterprise-Grade <span className="text-mint">Security</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            QuickNet was built from the ground up to protect your most sensitive data. We implement industry-leading encryption and security practices to keep your files secure at every stage.
          </motion.p>
        </div>
      </section>

      {/* Security Architecture */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-4">
              Core Safeguards
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy">
              Comprehensive Threat Protection
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Our holistic approach to storage and sharing keeps your files secure from transit interceptors to physical node intrusions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-navy/10 transition-all bg-white"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-xl mb-3">{feat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-4">
                Regulatory Standards
              </span>
              <h2 className="font-display text-3xl font-bold text-navy mb-6">
                Compliances and Certifications
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are dedicated to compliance guidelines and standards globally. We continuously update and test our frameworks to offer maximum regulatory compliance for digital organizations.
              </p>
              <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <Award className="w-10 h-10 text-mint" />
                <div>
                  <h4 className="font-semibold text-navy text-sm">Certified SOC 2 Audited</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Assessed by independent security panels</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {compliances.map((comp) => (
                <div key={comp.name} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display font-bold text-navy text-lg">{comp.name}</span>
                      <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> {comp.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{comp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security FAQ / Contact CTA */}
      <section className="py-20 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-4">Have Security Questions?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Our specialized cybersecurity compliance officers are ready to answer custom audits, HIPAA inquiries, or client vulnerability assessments.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors"
          >
            Reach Our Security Team
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
