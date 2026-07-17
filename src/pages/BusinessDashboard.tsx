import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, BarChart3, Users, Shield, Upload,
  Send, Lock, Calendar, TrendingUp, Download, Globe,
  Plus, Search, Bell, Settings, LogOut, ArrowLeft,
} from "lucide-react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import FileUploadZone from "@/components/features/FileUploadZone";
import { useAuth } from "@/hooks/useAuth";
import { useScrollTop } from "@/hooks/useScrollTop";
import { MOCK_ANALYTICS } from "@/constants";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { toast } from "sonner";

const TABS = ["overview", "analytics", "team", "security", "upload"] as const;
type Tab = (typeof TABS)[number];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/business" },
  { icon: BarChart3, label: "Analytics", href: "/business/analytics" },
  { icon: Users, label: "Team Sharing", href: "/business/team" },
  { icon: Shield, label: "Security", href: "/business/security" },
  { icon: Upload, label: "Upload Files", href: "/business/upload" },
];

const TEAM_MEMBERS = [
  { id: "1", name: "Rahul Sharma", email: "rahul@company.com", role: "Admin", files: 42, lastActive: "2 hours ago", avatar: "R" },
  { id: "2", name: "Priya Menon", email: "priya@company.com", role: "Member", files: 28, lastActive: "1 day ago", avatar: "P" },
  { id: "3", name: "Aditya Patel", email: "aditya@company.com", role: "Member", files: 15, lastActive: "3 days ago", avatar: "A" },
  { id: "4", name: "Sneha Kumar", email: "sneha@company.com", role: "Viewer", files: 7, lastActive: "Just now", avatar: "S" },
];

const PIE_DATA = [
  { name: "Documents", value: 35, color: "#1A1A40" },
  { name: "Images", value: 28, color: "#00FFC2" },
  { name: "Videos", value: 22, color: "#6C63FF" },
  { name: "Archives", value: 15, color: "#FF6B6B" },
];

function StatCard({ label, value, sub, icon: Icon, trend }: { label: string; value: string; sub: string; icon: React.ElementType; trend?: string }) {
  return (
    <div className="bg-charcoal-light rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-mint" />
        </div>
        {trend && <span className="text-xs font-semibold text-mint bg-mint/10 px-2 py-1 rounded-full">{trend}</span>}
      </div>
      <p className="font-display text-2xl font-bold text-white">{value}</p>
      <p className="text-white/60 text-sm mt-1">{label}</p>
      <p className="text-white/30 text-xs mt-0.5">{sub}</p>
    </div>
  );
}

export default function BusinessDashboard() {
  useScrollTop();
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [shareEmails, setShareEmails] = useState("");
  const [shareFile, setShareFile] = useState("");
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("");

  const activeTab: Tab = (TABS.includes(tab as Tab) ? tab : "overview") as Tab;
  const setActiveTab = (t: Tab) => {
    if (t === "overview") navigate("/business");
    else navigate(`/business/${t}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("File shared with team members successfully!");
    setShareEmails("");
    setShareFile("");
  };

  const handleSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Security settings applied to link.");
    setPassword("");
    setExpiry("");
  };

  return (
    <div className="flex h-screen bg-charcoal overflow-hidden">
      <DashboardSidebar items={SIDEBAR_ITEMS} theme="dark" />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-charcoal-dark border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-display text-xl font-bold text-white">Business Dashboard</h1>
            <p className="text-white/40 text-sm">{user?.name} · Enterprise Plan</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-sm font-semibold hover:bg-white/15 transition-colors"
              title="Back to website"
            >
              <ArrowLeft className="w-4 h-4" /> Website
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 border border-mint/20">
              <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span className="text-mint text-sm font-semibold">Live</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* ── Overview ── */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Upload} label="Files Transferred" value="2,847" sub="This month" trend="+18%" />
                <StatCard icon={Download} label="Data Compressed" value="1.4 TB" sub="Total saved" trend="+24%" />
                <StatCard icon={Users} label="Team Members" value="12" sub="Active users" />
                <StatCard icon={Globe} label="Avg Transfer Speed" value="8.4 Gbps" sub="Peak performance" trend="+5%" />
              </div>
              <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10">
                <h3 className="font-display font-bold text-white mb-1">Transfer Speed Trends</h3>
                <p className="text-white/40 text-sm mb-6">Daily Mbps over the past week</p>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={MOCK_ANALYTICS.weekly}>
                    <defs>
                      <linearGradient id="bizGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FFC2" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#00FFC2" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#2D3436", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
                    <Area type="monotone" dataKey="speed" stroke="#00FFC2" fill="url(#bizGrad)" strokeWidth={2} name="Speed (Mbps)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10">
                  <h3 className="font-display font-bold text-white mb-6">File Type Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={PIE_DATA} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                        {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#2D3436", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10">
                  <h3 className="font-display font-bold text-white mb-6">Size Reduction by Type</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[{ name: "PDF", reduction: 68 }, { name: "IMG", reduction: 45 }, { name: "Video", reduction: 52 }, { name: "ZIP", reduction: 15 }]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} unit="%" />
                      <Tooltip contentStyle={{ background: "#2D3436", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
                      <Bar dataKey="reduction" fill="#00FFC2" radius={[4, 4, 0, 0]} name="Reduction %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Analytics ── */}
          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10">
                <h3 className="font-display font-bold text-white mb-6">Monthly Usage Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={MOCK_ANALYTICS.monthly}>
                    <defs>
                      <linearGradient id="transGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1A1A40" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#1A1A40" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FFC2" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00FFC2" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#2D3436", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
                    <Legend wrapperStyle={{ color: "rgba(255,255,255,0.6)" }} />
                    <Area type="monotone" dataKey="transfers" stroke="#6C63FF" fill="url(#transGrad)" strokeWidth={2} name="Transfers" />
                    <Area type="monotone" dataKey="compression" stroke="#00FFC2" fill="url(#compGrad)" strokeWidth={2} name="Compressions" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Avg Compression Ratio", value: "54.2%", change: "+3.1%" },
                  { label: "Peak Transfer Speed", value: "9.8 Gbps", change: "+12%" },
                  { label: "Total Bandwidth Saved", value: "2.8 TB", change: "+28%" },
                ].map((s) => (
                  <div key={s.label} className="bg-charcoal-light rounded-2xl p-5 border border-white/10 text-center">
                    <p className="font-display text-3xl font-bold text-mint">{s.value}</p>
                    <p className="text-white/60 text-sm mt-2">{s.label}</p>
                    <span className="text-mint text-xs font-semibold">{s.change} this month</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Team ── */}
          {activeTab === "team" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10">
                <h3 className="font-display font-bold text-white mb-5">
                  <Send className="w-5 h-5 inline mr-2 text-mint" />
                  Share Files with Team
                </h3>
                <form onSubmit={handleShare} className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">File Name</label>
                    <input value={shareFile} onChange={(e) => setShareFile(e.target.value)} placeholder="e.g. Q3_Report.pdf" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-mint transition-all" />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Recipient Emails (comma-separated)</label>
                    <textarea rows={3} value={shareEmails} onChange={(e) => setShareEmails(e.target.value)} placeholder="rahul@company.com, priya@company.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-mint transition-all resize-none" />
                  </div>
                  <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors">
                    <Send className="w-4 h-4" /> Share with Team
                  </button>
                </form>
              </div>
              <div className="bg-charcoal-light rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-display font-bold text-white">Team Members</h3>
                  <button onClick={() => toast.success("Invite sent!")} className="px-4 py-2 bg-mint/20 text-mint rounded-xl text-sm font-semibold hover:bg-mint/30 transition-colors">+ Invite Member</button>
                </div>
                <div className="divide-y divide-white/5">
                  {TEAM_MEMBERS.map((m) => (
                    <div key={m.id} className="flex items-center gap-4 p-4 hover:bg-white/3 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-mint/20 text-mint font-bold flex items-center justify-center flex-shrink-0">{m.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm">{m.name}</p>
                        <p className="text-white/40 text-xs">{m.email}</p>
                      </div>
                      <div className="text-center hidden sm:block">
                        <p className="text-white text-sm font-semibold">{m.files}</p>
                        <p className="text-white/30 text-xs">files</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${m.role === "Admin" ? "bg-mint/20 text-mint" : m.role === "Member" ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-white/60"}`}>{m.role}</span>
                      <p className="text-white/30 text-xs hidden md:block">{m.lastActive}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Security ── */}
          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl space-y-6">
              <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10">
                <h3 className="font-display font-bold text-white mb-5">
                  <Lock className="w-5 h-5 inline mr-2 text-mint" />
                  Link Security Settings
                </h3>
                <form onSubmit={handleSecurity} className="space-y-5">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Link Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Set a download password" className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-mint transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Link Expiry Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-mint transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Download Limit</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-mint transition-all">
                      <option value="">Unlimited</option>
                      <option value="1">1 download</option>
                      <option value="5">5 downloads</option>
                      <option value="10">10 downloads</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-3 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors">Apply Security Settings</button>
                </form>
              </div>
              <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10 space-y-4">
                <h4 className="font-semibold text-white">Security Status</h4>
                {[
                  { label: "End-to-End Encryption", status: "Active", ok: true },
                  { label: "Malware Scanning", status: "Active", ok: true },
                  { label: "2FA Authentication", status: "Recommended", ok: false },
                  { label: "Audit Logs", status: "Enabled", ok: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">{item.label}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.ok ? "bg-mint/20 text-mint" : "bg-yellow-500/20 text-yellow-400"}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Upload ── */}
          {activeTab === "upload" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <div className="bg-charcoal-light rounded-2xl p-8 border border-white/10">
                <h2 className="font-display text-xl font-bold text-white mb-2">Upload & Compress</h2>
                <p className="text-white/50 text-sm mb-6">Drag & drop files or browse. Business plan supports up to 5 GB per file.</p>
                <FileUploadZone />
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
