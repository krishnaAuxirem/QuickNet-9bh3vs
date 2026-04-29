import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, Settings, BarChart3,
  Trash2, Edit, Plus, Search, Eye, TrendingUp, HardDrive,
  Shield, CheckCircle, XCircle, Save,
} from "lucide-react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useScrollTop } from "@/hooks/useScrollTop";
import { getAllUsers, deleteUser } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { MOCK_ANALYTICS } from "@/constants";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { toast } from "sonner";
import type { BlogPost } from "@/types";

const TABS = ["overview", "users", "analytics", "blog", "policy"] as const;
type Tab = (typeof TABS)[number];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Control Center", href: "/admin" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart3, label: "System Analytics", href: "/admin/analytics" },
  { icon: FileText, label: "Blog Management", href: "/admin/blog" },
  { icon: Shield, label: "Policy Manager", href: "/admin/policy" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const INITIAL_BLOGS: BlogPost[] = [
  { id: "b1", title: "QuickNet Achieves 10 Gbps Transfer Speed", content: "We are thrilled to announce...", excerpt: "Breaking the 10 Gbps barrier with our new distributed CDN infrastructure.", author: "Admin User", publishedAt: "2024-06-10T10:00:00Z", status: "published", tags: ["announcement", "speed", "technology"] },
  { id: "b2", title: "How AI Compression Reduces Files by 70%", content: "Our proprietary multi-algorithm AI compression engine...", excerpt: "A deep dive into the technology that makes our compression magic happen.", author: "Admin User", publishedAt: "2024-06-05T08:00:00Z", status: "published", tags: ["technical", "AI", "compression"] },
  { id: "b3", title: "Enterprise Security: Our Promise to You", content: "Security is not an afterthought at QuickNet...", excerpt: "Understanding the 7 layers of security protecting your files.", author: "Admin User", publishedAt: "2024-05-28T12:00:00Z", status: "draft", tags: ["security", "enterprise"] },
];

const POLICY_RULES = [
  { id: "p1", label: "Max File Size per User (Free)", value: "100 MB", type: "size" },
  { id: "p2", label: "Max File Size per User (Pro)", value: "5 GB", type: "size" },
  { id: "p3", label: "Storage Limit (Free Plan)", value: "2 GB", type: "storage" },
  { id: "p4", label: "Storage Limit (Pro Plan)", value: "100 GB", type: "storage" },
  { id: "p5", label: "Link Expiry Default", value: "30 days", type: "expiry" },
  { id: "p6", label: "Max Active Links (Free)", value: "3 links", type: "links" },
];

export default function AdminDashboard() {
  useScrollTop();
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();

  const activeTab: Tab = (TABS.includes(tab as Tab) ? tab : "overview") as Tab;
  const setActiveTab = (t: Tab) => {
    if (t === "overview") navigate("/admin");
    else navigate(`/admin/${t}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  const [users, setUsers] = useState(getAllUsers);
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({ title: "", excerpt: "", content: "", tags: "" });
  const [showBlogForm, setShowBlogForm] = useState(false);

  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
    setUsers(getAllUsers());
    toast.success("User deleted successfully.");
  };

  const handleSaveBlog = () => {
    if (editingBlog) {
      setBlogs((prev) => prev.map((b) => b.id === editingBlog.id ? { ...editingBlog, title: blogForm.title, excerpt: blogForm.excerpt, content: blogForm.content } : b));
      toast.success("Blog post updated!");
    } else {
      const newBlog: BlogPost = {
        id: `b${Date.now()}`,
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        author: "Admin User",
        publishedAt: new Date().toISOString(),
        status: "draft",
        tags: blogForm.tags.split(",").map((t) => t.trim()),
      };
      setBlogs((prev) => [newBlog, ...prev]);
      toast.success("Blog post created!");
    }
    setShowBlogForm(false);
    setEditingBlog(null);
    setBlogForm({ title: "", excerpt: "", content: "", tags: "" });
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm({ title: blog.title, excerpt: blog.excerpt, content: blog.content, tags: blog.tags.join(", ") });
    setShowBlogForm(true);
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    toast.success("Blog post deleted.");
  };

  const toggleBlogStatus = (id: string) => {
    setBlogs((prev) => prev.map((b) => b.id === id ? { ...b, status: b.status === "published" ? "draft" : "published" } : b));
    toast.success("Blog status updated.");
  };

  return (
    <div className="flex h-screen bg-charcoal overflow-hidden">
      <DashboardSidebar items={SIDEBAR_ITEMS} theme="dark" />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-charcoal-dark border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-display text-xl font-bold text-white">Admin Control Center</h1>
            <p className="text-white/40 text-sm">Full system access · QuickNet Platform</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 border border-mint/20">
            <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span className="text-mint text-xs font-semibold">All Systems Operational</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit border border-white/10 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === t ? "bg-mint text-navy font-bold" : "text-white/60 hover:text-white"}`}
              >
                {t === "blog" ? "Blog CMS" : t === "policy" ? "Policies" : t}
              </button>
            ))}
          </div>

          {/* ── Overview ── */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Users, label: "Total Users", value: String(users.length), trend: "+3 today", color: "text-blue-400" },
                  { icon: HardDrive, label: "Total Storage Used", value: "48.2 TB", trend: "+1.2 TB today", color: "text-green-400" },
                  { icon: TrendingUp, label: "Files Transferred", value: "12.8M", trend: "+42K today", color: "text-mint" },
                  { icon: Shield, label: "Security Alerts", value: "0", trend: "All clear", color: "text-yellow-400" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-charcoal-light rounded-2xl p-5 border border-white/10">
                      <Icon className={`w-6 h-6 ${s.color} mb-4`} />
                      <p className="font-display text-2xl font-bold text-white">{s.value}</p>
                      <p className="text-white/60 text-sm mt-1">{s.label}</p>
                      <p className="text-mint text-xs mt-0.5">{s.trend}</p>
                    </div>
                  );
                })}
              </div>
              <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10">
                <h3 className="font-display font-bold text-white mb-6">System-Wide Transfer Volume</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={MOCK_ANALYTICS.monthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#2D3436", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
                    <Line type="monotone" dataKey="transfers" stroke="#00FFC2" strokeWidth={2.5} dot={{ fill: "#00FFC2", r: 4 }} name="Transfers" />
                    <Line type="monotone" dataKey="speed" stroke="#6C63FF" strokeWidth={2} dot={false} name="Avg Speed" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ── Users ── */}
          {activeTab === "users" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-charcoal-light rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-5 border-b border-white/10 flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-mint" />
                  </div>
                  <button onClick={() => toast.info("Add user form coming soon!")} className="flex items-center gap-2 px-4 py-2.5 bg-mint text-navy rounded-xl text-sm font-bold hover:bg-mint-light transition-colors">
                    <Plus className="w-4 h-4" /> Add User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        {["User", "Role", "Plan", "Storage Used", "Joined", "Actions"].map((h) => (
                          <th key={h} className="text-left text-xs font-semibold text-white/40 uppercase py-3 px-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/3 transition-colors group">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-mint/20 text-mint font-bold text-sm flex items-center justify-center">{u.name.charAt(0)}</div>
                              <div>
                                <p className="text-white text-sm font-medium">{u.name}</p>
                                <p className="text-white/40 text-xs">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${u.role === "admin" ? "bg-mint/20 text-mint" : u.role === "business" ? "bg-purple-500/20 text-purple-400" : "bg-white/10 text-white/60"}`}>{u.role}</span>
                          </td>
                          <td className="py-4 px-4"><span className="text-white/60 text-sm capitalize">{u.plan}</span></td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-white/80 text-sm">{u.storageUsed} MB</p>
                              <div className="w-20 h-1 bg-white/10 rounded-full mt-1">
                                <div className="h-full bg-mint rounded-full" style={{ width: `${Math.min((u.storageUsed / u.storageLimit) * 100, 100)}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4"><span className="text-white/40 text-xs">{formatDate(u.joinedAt)}</span></td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => toast.info("Edit user panel!")} className="p-1.5 rounded-lg bg-white/5 hover:bg-mint/20 text-white/50 hover:text-mint transition-colors"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => toast.info("User details!")} className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-500/20 text-white/50 hover:text-blue-400 transition-colors"><Eye className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteUser(u.id)} className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Analytics ── */}
          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10">
                  <h3 className="font-display font-bold text-white mb-6">Weekly System Load</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={MOCK_ANALYTICS.weekly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "#2D3436", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
                      <Bar dataKey="transfers" fill="#00FFC2" radius={[4, 4, 0, 0]} name="Transfers" />
                      <Bar dataKey="compression" fill="#6C63FF" radius={[4, 4, 0, 0]} name="Compressions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10">
                  <h3 className="font-display font-bold text-white mb-6">Monthly Growth</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={MOCK_ANALYTICS.monthly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                      <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "#2D3436", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
                      <Line type="monotone" dataKey="transfers" stroke="#00FFC2" strokeWidth={2} name="Transfers" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: "Server Uptime", value: "99.99%" }, { label: "Avg Response Time", value: "12ms" }, { label: "CDN Cache Hit Rate", value: "98.4%" }].map((s) => (
                  <div key={s.label} className="bg-charcoal-light rounded-2xl p-5 border border-white/10 text-center">
                    <p className="font-display text-3xl font-bold text-mint">{s.value}</p>
                    <p className="text-white/50 text-sm mt-2">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Blog ── */}
          {activeTab === "blog" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              {showBlogForm ? (
                <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-white">{editingBlog ? "Edit Blog Post" : "New Blog Post"}</h3>
                    <button onClick={() => { setShowBlogForm(false); setEditingBlog(null); }} className="text-white/40 hover:text-white text-sm">Cancel</button>
                  </div>
                  {[
                    { key: "title", label: "Title", placeholder: "Blog post title..." },
                    { key: "excerpt", label: "Excerpt", placeholder: "Short description..." },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-white/60 text-sm block mb-2">{f.label}</label>
                      <input value={blogForm[f.key as keyof typeof blogForm]} onChange={(e) => setBlogForm({ ...blogForm, [f.key]: e.target.value })} placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-mint" />
                    </div>
                  ))}
                  <div>
                    <label className="text-white/60 text-sm block mb-2">Content</label>
                    <textarea rows={6} value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} placeholder="Blog post content..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-mint resize-none" />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm block mb-2">Tags (comma-separated)</label>
                    <input value={blogForm.tags} onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })} placeholder="technology, announcement" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-mint" />
                  </div>
                  <button onClick={handleSaveBlog} className="flex items-center gap-2 px-6 py-3 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors">
                    <Save className="w-4 h-4" /> {editingBlog ? "Update Post" : "Create Post"}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-white">Blog Posts ({blogs.length})</h3>
                    <button onClick={() => { setShowBlogForm(true); setEditingBlog(null); setBlogForm({ title: "", excerpt: "", content: "", tags: "" }); }} className="flex items-center gap-2 px-4 py-2 bg-mint text-navy font-bold rounded-xl text-sm hover:bg-mint-light transition-colors">
                      <Plus className="w-4 h-4" /> New Post
                    </button>
                  </div>
                  <div className="space-y-3">
                    {blogs.map((blog) => (
                      <div key={blog.id} className="bg-charcoal-light rounded-2xl p-5 border border-white/10 flex items-start gap-4 group">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-white font-semibold text-sm">{blog.title}</h4>
                            <span onClick={() => toggleBlogStatus(blog.id)} className={`text-xs px-2 py-0.5 rounded-full font-semibold cursor-pointer ${blog.status === "published" ? "bg-mint/20 text-mint" : "bg-white/10 text-white/50"}`}>{blog.status}</span>
                          </div>
                          <p className="text-white/40 text-xs mb-2">{blog.excerpt}</p>
                          <div className="flex items-center gap-3 text-white/30 text-xs flex-wrap">
                            <span>{blog.author}</span><span>·</span><span>{formatDate(blog.publishedAt)}</span>
                            {blog.tags.map((t) => <span key={t} className="bg-white/10 px-2 py-0.5 rounded-full">{t}</span>)}
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditBlog(blog)} className="p-2 rounded-lg bg-white/5 hover:bg-mint/20 text-white/50 hover:text-mint transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ── Policy ── */}
          {activeTab === "policy" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-5">
              <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10">
                <h3 className="font-display font-bold text-white mb-5">
                  <Shield className="w-5 h-5 inline mr-2 text-mint" />Platform Policy Rules
                </h3>
                <div className="space-y-4">
                  {POLICY_RULES.map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <p className="text-white/80 text-sm font-medium">{rule.label}</p>
                        <p className="text-white/30 text-xs mt-0.5">Policy type: {rule.type}</p>
                      </div>
                      <input defaultValue={rule.value} className="w-28 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-mint text-sm font-semibold text-center focus:outline-none focus:border-mint" />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button onClick={() => toast.success("All policy rules saved successfully!")} className="flex items-center gap-2 px-6 py-3 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors">
                    <Save className="w-4 h-4" /> Save All Policies
                  </button>
                </div>
              </div>
              <div className="bg-charcoal-light rounded-2xl p-6 border border-white/10 space-y-4">
                <h4 className="font-semibold text-white">System Toggles</h4>
                {[
                  { label: "Enable Free Plan Registrations", enabled: true },
                  { label: "Allow Unverified Email Sharing", enabled: false },
                  { label: "Enforce Malware Scanning", enabled: true },
                  { label: "Automatic Link Expiry", enabled: true },
                  { label: "Rate Limiting for Free Users", enabled: true },
                ].map((toggle) => (
                  <div key={toggle.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/3 transition-colors">
                    <span className="text-white/70 text-sm">{toggle.label}</span>
                    <button onClick={() => toast.info("Toggle updated!")} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${toggle.enabled ? "bg-mint/20 text-mint hover:bg-mint/30" : "bg-white/10 text-white/40 hover:bg-white/15"}`}>
                      {toggle.enabled ? <><CheckCircle className="w-3.5 h-3.5" /> Enabled</> : <><XCircle className="w-3.5 h-3.5" /> Disabled</>}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
