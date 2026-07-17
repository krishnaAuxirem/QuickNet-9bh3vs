import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Link } from "react-router-dom";
import {
  Zap, ArrowRight, Target, Heart, Globe, Users, Award, TrendingUp,
  Lock, Shield, Zap as Sparkles, Gauge,
} from "lucide-react";

const STATS = [
  { value: "2M+", label: "Files Transferred Daily", icon: TrendingUp },
  { value: "150K+", label: "Active Users", icon: Users },
  { value: "30+", label: "Countries Served", icon: Globe },
  { value: "99.99%", label: "Uptime SLA", icon: Award },
];

const VALUES = [
  {
    icon: Zap,
    title: "Speed Without Compromise",
    desc: "We believe fast file sharing is a right, not a luxury. Every architectural decision we make prioritizes performance for users across India and the globe.",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    icon: Heart,
    title: "Privacy by Design",
    desc: "Your data is yours. We build our platform with zero-knowledge principles — we can't access your files even if we wanted to.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Target,
    title: "Radical Simplicity",
    desc: "Powerful technology shouldn't require a manual. We obsess over UX so that every feature feels intuitive from day one.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Globe,
    title: "Built for India, Made for the World",
    desc: "Headquartered in Bengaluru, optimized for Indian networks first — then scaled globally with 50+ edge nodes worldwide.",
    color: "bg-green-50 text-green-600",
  },
];

const PRODUCT_FEATURES = [
  {
    icon: Gauge,
    title: "Lightning-Fast Transfers",
    desc: "Experience file transfers at speeds up to 10 Gbps with our globally distributed CDN infrastructure optimized for Indian networks.",
  },
  {
    icon: Lock,
    title: "Military-Grade Security",
    desc: "AES-256 encryption, zero-knowledge architecture, and ISO 27001 certification ensure your files are always protected.",
  },
  {
    icon: Sparkles,
    title: "Smart Compression",
    desc: "Our AI-powered compression engine reduces file sizes by up to 70% while maintaining original quality.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Share files securely with granular access controls, expiry dates, and download limits for enterprise-grade sharing.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Servers in 30+ countries with automatic routing ensure fast, reliable transfers no matter where your team is located.",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    desc: "GDPR compliant, SOC 2 Type II certified, with dedicated support for teams of all sizes.",
  },
];

const MILESTONES = [
  { year: "2021", title: "Founded", desc: "QuickNet was born in a Bengaluru garage with a mission to fix India's file sharing problem." },
  { year: "2022", title: "Seed Funding", desc: "Raised ₹8 Cr seed round. Launched beta with 500 early users across 12 cities." },
  { year: "2023", title: "Series A", desc: "Raised ₹42 Cr Series A. Expanded CDN to 30+ nodes. Crossed 50,000 active users." },
  { year: "2024", title: "Global Expansion", desc: "Launched in Southeast Asia and the Middle East. Crossed 1M files transferred per day." },
  { year: "2025", title: "Enterprise Launch", desc: "Launched Enterprise tier. Partnered with 200+ companies. ISO 27001 certified." },
  { year: "2026", title: "2M+ Daily Transfers", desc: "Now serving 150K+ users globally with 99.99% uptime and 50+ edge nodes worldwide." },
];

export default function AboutPage() {
  useScrollTop();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-navy via-navy-light to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-mint blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-mint blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            We're on a Mission to<br />
            <span className="text-mint">Redefine File Sharing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-xl leading-relaxed"
          >
            Founded in Bengaluru in 2021, QuickNet was built to solve a frustration every Indian professional knows: slow, insecure, and overpriced file sharing. We're changing that.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <p className="font-display text-4xl font-bold text-navy mb-1">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-5">
                Our Story
              </span>
              <h2 className="font-display text-4xl font-bold text-navy mb-6">
                Born Out of Frustration,<br />
                <span className="text-[#00FFC2]">Built with Purpose</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  In 2021, Arjun and Divya were both frustrated by the same problem: sending large design files and engineering docs between teams in India was painfully slow, insecure, and expensive. Existing tools weren't built for Indian network conditions.
                </p>
                <p>
                  They quit their corporate jobs and started QuickNet in a co-working space in Koramangala. The idea was simple: build the fastest, most secure file sharing tool — starting with India and expanding globally.
                </p>
                <p>
                  Three years later, QuickNet handles over 2 million file transfers per day, serves 150,000+ users across 30+ countries, and has become the go-to platform for startups, enterprises, and creative teams across South Asia.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 pl-4"
                  >
                    <div className="w-5 h-5 rounded-full bg-navy border-4 border-white shadow-sm flex-shrink-0 mt-1 relative z-10" />
                    <div className="pb-2">
                      <span className="text-xs font-bold text-mint bg-navy px-2 py-0.5 rounded-full">{m.year}</span>
                      <h4 className="font-display font-bold text-navy mt-2 mb-1">{m.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-5">
              What We Believe
            </span>
            <h2 className="font-display text-4xl font-bold text-navy mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              These aren't buzzwords — they're the principles that guide every decision we make at QuickNet.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl border border-gray-100 hover:shadow-md hover:border-navy/15 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-xl mb-3">{v.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-5">
              About QuickNet
            </span>
            <h2 className="font-display text-4xl font-bold text-navy mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              QuickNet combines cutting-edge technology with thoughtful design to make file sharing effortless, secure, and fast.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-md hover:border-navy/15 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-white mb-4"
          >
            Ready to Experience QuickNet?
          </motion.h2>
          <p className="text-white/50 text-lg mb-8">
            Join 150,000+ teams who trust QuickNet for their most important file transfers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors"
            >
              Start Free Today <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
