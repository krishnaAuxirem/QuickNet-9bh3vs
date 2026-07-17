import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ShieldAlert, Send, Eye, CheckCircle2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

interface ReportedBug {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "investigating" | "duplicate" | "fixed";
  date: string;
}

export default function BugReportsPage() {
  const navigate = useNavigate();
  useScrollTop();
  const [bugTitle, setBugTitle] = useState("");
  const [bugSeverity, setBugSeverity] = useState("medium");
  const [bugSteps, setBugSteps] = useState("");
  const [bugEnv, setBugEnv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recentBugs: ReportedBug[] = [
    { id: "BUG-284", title: "Compression demo progress indicator freezes at 85% on Safari mobile", severity: "high", status: "fixed", date: "July 14, 2026" },
    { id: "BUG-281", title: "API key token copying triggers blank space prefix in specific runtimes", severity: "medium", status: "duplicate", date: "July 10, 2026" },
    { id: "BUG-279", title: "CLI auth logins timeout on high-latency corporate proxy configurations", severity: "critical", status: "investigating", date: "July 08, 2026" }
  ];

  const handleSubmitBug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      toast.error("Please login to report bugs!");
      navigate("/login");
      return;
    }
    if (!bugTitle || !bugSteps || !bugEnv) {
      toast.error("Please fill in all form details!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Bug report logged successfully! Thank you for contributing to QuickNet.");
      setBugTitle("");
      setBugSteps("");
      setBugEnv("");
    }, 1500);
  };

  const severityColors = {
    low: "bg-blue-50 text-blue-700 border-blue-100",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-100",
    high: "bg-orange-50 text-orange-700 border-orange-100",
    critical: "bg-red-50 text-red-700 border-red-100"
  };

  const statusIcons = {
    investigating: { text: "Investigating", color: "bg-purple-50 text-purple-700 border-purple-100", icon: RefreshCw },
    duplicate: { text: "Duplicate", color: "bg-gray-100 text-gray-500 border-gray-200", icon: Eye },
    fixed: { text: "Fixed", color: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: CheckCircle2 }
  };

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
          <span className="inline-block px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6">
            Developer Audits
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
            Report a <span className="text-mint">Bug</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Spotted an issue? Help us optimize QuickNet. Fill in the reproduction details below to log audit tickets in our system.
          </p>
        </div>
      </section>

      {/* Submission form and list */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-8 h-8 text-navy" />
                <h3 className="font-display text-2xl font-bold text-navy">Submit Bug Ticket</h3>
              </div>

              <form onSubmit={handleSubmitBug} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Short Summary *</label>
                  <input
                    type="text"
                    required
                    value={bugTitle}
                    onChange={(e) => setBugTitle(e.target.value)}
                    placeholder="e.g. Dashboard copy key button doesn't work on Firefox"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Severity *</label>
                    <select
                      value={bugSeverity}
                      onChange={(e) => setBugSeverity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy cursor-pointer"
                    >
                      <option value="low">Low (Trivial glitch)</option>
                      <option value="medium">Medium (Annoying behavior)</option>
                      <option value="high">High (Broken features)</option>
                      <option value="critical">Critical (Data loss / Outage)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Environment Details *</label>
                    <input
                      type="text"
                      required
                      value={bugEnv}
                      onChange={(e) => setBugEnv(e.target.value)}
                      placeholder="e.g. Windows 11, Chrome 126.0.4"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Steps to Reproduce *</label>
                  <textarea
                    rows={5}
                    required
                    value={bugSteps}
                    onChange={(e) => setBugSteps(e.target.value)}
                    placeholder="1. Login to Starter account&#10;2. Open compression tab&#10;3. Drag photography tiff file&#10;4. See progress wheel freeze"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy resize-none font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-navy text-white hover:bg-navy-light font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Log Bug Ticket
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* List Column (5 cols) */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-bold text-navy text-xl">Recent Bug Audits</h3>
                <p className="text-gray-400 text-xs mt-1">Status of tickets logged by developers this week.</p>
              </div>

              <div className="space-y-4">
                {recentBugs.map((bug) => {
                  const stat = statusIcons[bug.status];
                  const StatIcon = stat.icon;
                  return (
                    <div key={bug.id} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-gray-400">{bug.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${severityColors[bug.severity]}`}>
                          {bug.severity}
                        </span>
                      </div>
                      <h4 className="font-bold text-navy text-xs sm:text-sm leading-snug">{bug.title}</h4>
                      
                      <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-[10px] text-gray-400 font-semibold">
                        <span>Logged {bug.date}</span>
                        <span className={`px-2 py-0.5 rounded-full border font-bold flex items-center gap-1 ${stat.color}`}>
                          <StatIcon className="w-3 h-3" /> {stat.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
