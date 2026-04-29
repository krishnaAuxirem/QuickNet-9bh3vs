import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Upload, FileText, Bell, User, LayoutDashboard, Download,
  Trash2, Search, Filter, TrendingUp, HardDrive, Link2, Activity,
  CheckCircle, AlertTriangle, Info,
} from "lucide-react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import FileUploadZone from "@/components/features/FileUploadZone";
import { useAuth } from "@/hooks/useAuth";
import { useFileStore } from "@/hooks/useFileStore";
import { useScrollTop } from "@/hooks/useScrollTop";
import { formatBytes, formatDate, getCompressionRatio, formatMB } from "@/lib/utils";
import { toast } from "sonner";
import type { FileRecord } from "@/types";

const TABS = ["overview", "upload", "history", "notifications", "profile"] as const;
type Tab = (typeof TABS)[number];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Upload, label: "Upload Files", href: "/dashboard/upload" },
  { icon: FileText, label: "File History", href: "/dashboard/history" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications", badge: 3 },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

const MOCK_NOTIFICATIONS = [
  { id: "n1", type: "success" as const, message: 'File "Project_Proposal.pdf" has been downloaded 5 times today', timestamp: "2024-06-15T10:00:00Z", read: false },
  { id: "n2", type: "info" as const, message: "Your storage is at 65% capacity — consider upgrading to Pro for 100 GB", timestamp: "2024-06-14T08:30:00Z", read: false },
  { id: "n3", type: "success" as const, message: "Team_Photos_Collection.zip transfer completed successfully!", timestamp: "2024-06-13T16:20:00Z", read: false },
  { id: "n4", type: "warning" as const, message: 'Share link for "Annual_Report.docx" expires in 2 days', timestamp: "2024-06-12T12:00:00Z", read: true },
  { id: "n5", type: "info" as const, message: "QuickNet maintenance scheduled: June 20, 2 AM–4 AM IST", timestamp: "2024-06-11T09:00:00Z", read: true },
];

const TIMELINE = [
  { action: "Uploaded & compressed", file: "Q3_Financial_Report.xlsx", time: "2 hours ago", icon: Upload, color: "text-blue-500", bg: "bg-blue-50" },
  { action: "Shared via secure link", file: "Product_Demo.mp4", time: "Yesterday", icon: Link2, color: "text-green-500", bg: "bg-green-50" },
  { action: "Downloaded by recipient", file: "Team_Handbook.pdf", time: "2 days ago", icon: Download, color: "text-purple-500", bg: "bg-purple-50" },
  { action: "Link expired", file: "Old_Contract_2023.pdf", time: "5 days ago", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50" },
];

function StatCard({ icon: Icon, label, value, sub, color, bg }: { icon: React.ElementType; label: string; value: string; sub: string; color: string; bg: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <p className="font-display text-2xl font-bold text-navy">{value}</p>
      <p className="text-navy/70 font-medium text-sm mt-1">{label}</p>
      <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
    </motion.div>
  );
}

function FileRow({ file, onDelete }: { file: FileRecord; onDelete: (id: string) => void }) {
  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(`${window.location.origin}/transfer/${file.id}`);
    toast.success("Download link copied to clipboard!");
  }, [file.id]);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors group">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-navy/50" />
          </div>
          <div>
            <p className="text-sm font-medium text-navy truncate max-w-[180px]">{file.name}</p>
            <p className="text-xs text-gray-400">{formatDate(file.uploadedAt)}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-sm text-gray-600 font-mono">{formatBytes(file.originalSize)}</td>
      <td className="py-4 px-4 text-sm text-green-600 font-mono font-semibold">{formatBytes(file.compressedSize)}</td>
      <td className="py-4 px-4">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
          -{getCompressionRatio(file.originalSize, file.compressedSize)}
        </span>
      </td>
      <td className="py-4 px-4">
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${file.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
          {file.status}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={copyLink} title="Copy Link" className="p-1.5 rounded-lg hover:bg-navy/8 text-gray-400 hover:text-navy transition-colors">
            <Link2 className="w-4 h-4" />
          </button>
          <a href="#" onClick={(e) => { e.preventDefault(); toast.success("Downloading file..."); }} title="Download" className="p-1.5 rounded-lg hover:bg-green-100 text-gray-400 hover:text-green-600 transition-colors">
            <Download className="w-4 h-4" />
          </a>
          <button onClick={() => { onDelete(file.id); }} title="Delete" className="p-1.5 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

const NOTIF_ICON: Record<string, React.ElementType> = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
};
const NOTIF_COLOR: Record<string, string> = {
  success: "text-green-500",
  info: "text-blue-500",
  warning: "text-orange-500",
};

export default function UserDashboard() {
  useScrollTop();
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { files, deleteFile } = useFileStore();
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const activeTab: Tab = (TABS.includes(tab as Tab) ? tab : "overview") as Tab;
  const setActiveTab = (t: Tab) => {
    if (t === "overview") navigate("/dashboard");
    else navigate(`/dashboard/${t}`);
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [tab]);

  const filteredFiles = files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
  const totalOriginal = files.reduce((sum, f) => sum + f.originalSize, 0);
  const totalCompressed = files.reduce((sum, f) => sum + f.compressedSize, 0);
  const savedBytes = totalOriginal - totalCompressed;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleDelete = (id: string) => {
    deleteFile(id);
    toast.success("File deleted successfully.");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  };

  const FILE_HEADERS = ["File Name", "Original Size", "Compressed", "Savings", "Status", "Actions"];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DashboardSidebar items={SIDEBAR_ITEMS} theme="light" />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-display text-xl font-bold text-navy">
              Welcome back, {user?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-sm text-gray-500">Here's your file activity overview</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
              user?.plan === "pro" ? "bg-blue-100 text-blue-700" :
              user?.plan === "enterprise" ? "bg-purple-100 text-purple-700" :
              "bg-gray-100 text-gray-600"
            }`}>
              {user?.plan?.toUpperCase()} Plan
            </span>
            <Link
              to="/dashboard/upload"
              className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-navy-light transition-colors"
            >
              <Upload className="w-4 h-4" /> Upload File
            </Link>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Tab Nav */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit flex-wrap">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all relative ${
                  activeTab === t ? "bg-white text-navy shadow-sm font-semibold" : "text-gray-500 hover:text-navy"
                }`}
              >
                {t}
                {t === "notifications" && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Overview ── */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={FileText} label="Total Files" value={String(files.length)} sub="All time uploads" color="text-blue-500" bg="bg-blue-50" />
                <StatCard icon={HardDrive} label="Space Saved" value={formatBytes(savedBytes)} sub="Through compression" color="text-green-500" bg="bg-green-50" />
                <StatCard icon={Download} label="Downloads" value="142" sub="Past 30 days" color="text-purple-500" bg="bg-purple-50" />
                <StatCard icon={TrendingUp} label="Storage Used" value={formatMB(user?.storageUsed || 0)} sub={`of ${formatMB(user?.storageLimit || 1024)}`} color="text-orange-500" bg="bg-orange-50" />
              </div>

              {/* Storage Bar */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-navy">Storage Usage</h3>
                  <span className="text-sm text-gray-500">{formatMB(user?.storageUsed || 0)} / {formatMB(user?.storageLimit || 1024)}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((user?.storageUsed || 0) / (user?.storageLimit || 1024)) * 100}%` }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-navy to-[#00FFC2] rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">{(((user?.storageUsed || 0) / (user?.storageLimit || 1024)) * 100).toFixed(0)}% used · {formatMB((user?.storageLimit || 1024) - (user?.storageUsed || 0))} available</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Files */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-display font-bold text-navy">Recent Files</h3>
                    <Link to="/dashboard/history" className="text-sm text-navy hover:underline font-medium">View All →</Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>{FILE_HEADERS.map((h) => <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase py-3 px-4">{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {files.slice(0, 4).map((file) => <FileRow key={file.id} file={file} onDelete={handleDelete} />)}
                      </tbody>
                    </table>
                    {files.length === 0 && (
                      <div className="py-12 text-center text-gray-400">
                        <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No files yet — <Link to="/dashboard/upload" className="text-navy underline">upload your first file</Link></p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display font-bold text-navy">Activity</h3>
                    <Activity className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {TIMELINE.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-navy">{item.action}</p>
                            <p className="text-xs text-gray-400 truncate">{item.file}</p>
                            <p className="text-xs text-gray-300 mt-0.5">{item.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Upload ── */}
          {activeTab === "upload" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-navy mb-1">Upload & Compress</h2>
                <p className="text-gray-500 text-sm mb-6">Drag & drop your files or browse. Files are compressed and encrypted immediately upon upload.</p>
                <FileUploadZone />
              </div>
            </motion.div>
          )}

          {/* ── History ── */}
          {activeTab === "history" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search files by name..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none text-sm"
                    />
                  </div>
                  <button
                    onClick={() => toast.info("Filter panel coming soon!")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-navy hover:text-navy text-sm transition-all"
                  >
                    <Filter className="w-4 h-4" /> Filter
                  </button>
                </div>
                <p className="px-5 py-3 bg-gray-50 text-xs text-gray-500 border-b border-gray-100">{filteredFiles.length} files found</p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>{FILE_HEADERS.map((h) => <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase py-3 px-4">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {filteredFiles.map((file) => <FileRow key={file.id} file={file} onDelete={handleDelete} />)}
                    </tbody>
                  </table>
                  {filteredFiles.length === 0 && (
                    <div className="py-12 text-center text-gray-400">
                      <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No files match your search</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Notifications ── */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-navy">Notifications</h2>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-sm text-navy hover:underline font-medium">
                    Mark all as read
                  </button>
                )}
              </div>
              {notifications.map((n) => {
                const Icon = NOTIF_ICON[n.type] || Info;
                return (
                  <div
                    key={n.id}
                    className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                      !n.read ? "bg-white border-navy/15 shadow-sm" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${NOTIF_COLOR[n.type]}`} />
                    <div className="flex-1">
                      <p className={`text-sm ${!n.read ? "font-medium text-navy" : "text-gray-500"}`}>{n.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(n.timestamp)}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-navy flex-shrink-0 mt-2" />}
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ── Profile ── */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-18 h-18 w-16 h-16 rounded-2xl bg-navy flex items-center justify-center font-bold text-white text-2xl font-display flex-shrink-0">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-navy text-xl">{user?.name}</h3>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                      user?.plan === "pro" ? "bg-blue-100 text-blue-700" :
                      user?.plan === "enterprise" ? "bg-purple-100 text-purple-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {user?.plan?.toUpperCase()} Plan
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4">
                  {[
                    { label: "Full Name", value: user?.name || "", key: "name" },
                    { label: "Email Address", value: user?.email || "", key: "email" },
                    { label: "Phone Number", value: user?.phone || "+91 98765 43210", key: "phone" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold text-navy mb-2">{field.label}</label>
                      <input
                        type={field.key === "email" ? "email" : "text"}
                        defaultValue={field.value}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/8 outline-none text-sm transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={() => toast.success("Profile updated successfully!")}
                    className="w-full py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy-light transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => toast.info("Password reset email sent!")}
                    className="w-full py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:border-navy hover:text-navy transition-all text-sm"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
