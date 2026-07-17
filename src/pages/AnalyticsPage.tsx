import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { MOCK_ANALYTICS } from "@/constants";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";
import { BarChart3, TrendingUp, Cpu, Eye, Cloud, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AnalyticsPage() {
  useScrollTop();
  const [activeTab, setActiveTab] = useState("transfers");

  const statCards = [
    { label: "Total files sharing bandwidth", value: "328.4 TB", change: "+14.8% vs last month", icon: Cloud },
    { label: "Average server response delay", value: "14.2 ms", change: "-8.4% improvement", icon: Zap },
    { label: "Link views tracking", value: "482.5K", change: "+32.1% this week", icon: Eye },
    { label: "Optimization effectiveness", value: "68.2%", change: "+2.1% AI enhancement", icon: Cpu }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-navy via-navy-light to-navy-dark relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-mint blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-mint blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6">
            <BarChart3 className="w-4 h-4" /> Live Insights
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
            Data-Driven <span className="text-mint">Analytics</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Gain deep visibility into your team's sharing patterns, bandwidth usage, and storage savings. Make informed workflow decisions with real-time analytics.
          </p>
        </div>
      </section>

      {/* Analytics dashboard preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Quick Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{card.label}</span>
                    <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-navy" />
                    </div>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-navy mb-1">{card.value}</h3>
                  <span className="text-emerald-600 text-xs font-semibold">{card.change}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Chart Section */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h3 className="font-display font-bold text-navy text-xl">Interactive Sharing Dynamics</h3>
                <p className="text-gray-400 text-sm mt-0.5">Toggle filters to monitor transfers and compression latency.</p>
              </div>
              <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200">
                <button
                  onClick={() => setActiveTab("transfers")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === "transfers"
                      ? "bg-navy text-white shadow-sm"
                      : "text-gray-500 hover:text-navy"
                  }`}
                >
                  Transfer Dynamics
                </button>
                <button
                  onClick={() => setActiveTab("weekly")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === "weekly"
                      ? "bg-navy text-white shadow-sm"
                      : "text-gray-500 hover:text-navy"
                  }`}
                >
                  Weekly Compression
                </button>
              </div>
            </div>

            {/* Recharts Container */}
            <div className="w-full">
              {activeTab === "transfers" ? (
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={MOCK_ANALYTICS.monthly}>
                    <defs>
                      <linearGradient id="mintGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FFC2" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#00FFC2" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                    <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 12 }} />
                    <Legend />
                    <Area type="monotone" dataKey="transfers" stroke="#1A1A40" fill="#1A1A40" strokeWidth={2.5} name="Total Transfers" />
                    <Area type="monotone" dataKey="compression" stroke="#00FFC2" fill="url(#mintGrad)" strokeWidth={2} name="Compressed Transfers" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={MOCK_ANALYTICS.weekly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                    <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 12 }} />
                    <Legend />
                    <Bar dataKey="transfers" fill="#1A1A40" radius={[4, 4, 0, 0]} name="Transfers Handled" />
                    <Bar dataKey="compression" fill="#00FFC2" radius={[4, 4, 0, 0]} name="AI Compressions" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Features overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-4">
              Premium Insights
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy">
              Analytics Built for Scale
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Unlock enterprise analytics features to track sharing behaviors and secure digital channels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-gray-100">
              <TrendingUp className="w-10 h-10 text-navy mb-6" />
              <h3 className="font-display font-bold text-navy text-lg mb-3">Download Geolocations</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Know where your downloads are coming from. Pinpoint city and country data to ensure your resources reach their destination.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-gray-100">
              <Zap className="w-10 h-10 text-navy mb-6" />
              <h3 className="font-display font-bold text-navy text-lg mb-3">Link Auditing</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Monitor download frequencies, referring sites, IP logs, and system agents for any link to detect unauthorized sharing.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-gray-100">
              <Cloud className="w-10 h-10 text-navy mb-6" />
              <h3 className="font-display font-bold text-navy text-lg mb-3">Data Auditing Reports</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Export comprehensive CSV/XLSX summaries of your monthly files and bandwidth storage limits to share with company accounting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-4">Unlock Business Analytics</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Get access to granular geotracking, file download limits, security alerts, and visual analytics dashboards.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors"
          >
            Upgrade to Pro <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
