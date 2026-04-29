import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { MOCK_ANALYTICS } from "@/constants";
import { Link } from "react-router-dom";
import { BarChart3, ArrowRight } from "lucide-react";

const STATS = [
  { label: "Files Transferred Today", value: "1.2M", change: "+18%", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Avg Compression Ratio", value: "62.4%", change: "+3.1%", color: "text-green-600", bg: "bg-green-50" },
  { label: "Peak Transfer Speed", value: "9.8 Gbps", change: "+12%", color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Active Users (Live)", value: "3,847", change: "+241", color: "text-orange-600", bg: "bg-orange-50" },
];

export default function AnalyticsPreview() {
  return (
    <section id="analytics" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-5"
            >
              <BarChart3 className="w-4 h-4" /> Real-Time Analytics
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl lg:text-5xl font-bold text-navy"
            >
              Track Every Transfer,<br />
              <span className="text-[#00FFC2]">In Real Time</span>
            </motion.h2>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy-light transition-colors flex-shrink-0"
          >
            View Full Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${stat.bg} ${stat.color} mb-3`}>
                {stat.change}
              </div>
              <p className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1.5 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <h3 className="font-display font-bold text-navy mb-1">Transfer Volume (Monthly)</h3>
            <p className="text-gray-400 text-sm mb-6">Total files transferred per month</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={MOCK_ANALYTICS.monthly}>
                <defs>
                  <linearGradient id="navyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A1A40" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1A1A40" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 }}
                />
                <Area type="monotone" dataKey="transfers" stroke="#1A1A40" fill="url(#navyGrad)" strokeWidth={2.5} name="Transfers" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <h3 className="font-display font-bold text-navy mb-1">Weekly Compression Activity</h3>
            <p className="text-gray-400 text-sm mb-6">Files compressed vs transferred this week</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MOCK_ANALYTICS.weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 }} />
                <Bar dataKey="transfers" fill="#1A1A40" radius={[4, 4, 0, 0]} name="Transfers" />
                <Bar dataKey="compression" fill="#00FFC2" radius={[4, 4, 0, 0]} name="Compressions" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
