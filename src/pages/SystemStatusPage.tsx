import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { CheckCircle, AlertTriangle, ArrowRight, Activity, Clock, Server, CloudLightning, Shield } from "lucide-react";
import { toast } from "sonner";

export default function SystemStatusPage() {
  useScrollTop();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed to QuickNet incident notifications!");
    setEmail("");
  };

  const systems = [
    { name: "Global CDN Nodes", status: "Operational", uptime: "100%", latency: "8 ms", icon: Server },
    { name: "File Upload Gateway", status: "Operational", uptime: "99.99%", latency: "24 ms", icon: Activity },
    { name: "Public Web Dashboard", status: "Operational", uptime: "99.98%", latency: "14 ms", icon: Clock },
    { name: "Developer REST API", status: "Operational", uptime: "99.99%", latency: "18 ms", icon: CloudLightning },
    { name: "Zero-Knowledge Encryption Nodes", status: "Operational", uptime: "100%", latency: "3 ms", icon: Shield }
  ];

  const historicalIncidents = [
    { date: "June 24, 2026", title: "Scheduled System Maintenance", desc: "Successfully upgraded database storage clustering. Occurred between 02:00 and 03:30 IST. Zero user disruption noticed." },
    { date: "May 11, 2026", title: "CDN Latency Spikes (Resolved)", desc: "Minor routing congestion resolved in East Asia nodes. Edge DNS routing fixed. Latency returned to average 8ms after 20 minutes." },
    { date: "April 02, 2026", title: "API Gateway Optimization", desc: "Upgraded core load balancers. General speed and request processing limits boosted by 15%." }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero / Pulse Banner */}
      <section className="pt-32 pb-16 bg-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-mint blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-mint blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-5 py-2.5 rounded-full text-emerald-400 font-semibold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            All Systems Operational
          </div>
          <h1 className="font-display text-4xl lg:text-6xl font-bold">
            System <span className="text-mint">Status</span> Dashboard
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Live status reports, latency checks, and incident logs representing all QuickNet node regions.
          </p>
        </div>
      </section>

      {/* Latency and Services Dashboard */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="font-display font-bold text-navy text-xl">Service Metrics (Live)</h3>
              <span className="text-xs text-gray-400 font-bold">UPDATED 10 SECONDS AGO</span>
            </div>

            <div className="space-y-4">
              {systems.map((sys) => {
                const Icon = sys.icon;
                return (
                  <div key={sys.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy text-sm leading-snug">{sys.name}</h4>
                        <div className="flex gap-3 text-xs text-gray-400 font-semibold">
                          <span>Uptime: {sys.uptime}</span>
                          <span>·</span>
                          <span>Latency: {sys.latency}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-xs font-bold self-start sm:self-center">
                      <CheckCircle className="w-3.5 h-3.5" /> Operational
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Historical Incidents */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-display font-bold text-navy text-2xl text-center mb-10">Past Incident Log</h3>

          <div className="relative border-l-2 border-gray-100 pl-6 space-y-8">
            {historicalIncidents.map((inc, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-navy border-4 border-white shadow-sm" />
                <div>
                  <span className="text-xs font-semibold text-gray-400">{inc.date}</span>
                  <h4 className="font-display font-bold text-navy text-lg mt-1 mb-2">{inc.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{inc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe to status updates */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl p-8 md:p-12 text-center text-white space-y-6">
            <h3 className="font-display text-2xl font-bold">Subscribe to Service Status</h3>
            <p className="text-white/60 text-sm max-w-sm mx-auto">
              Get direct alerts sent to your inbox regarding scheduled server downtime, maintenance work, or outage details.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-mint transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-all flex items-center justify-center gap-2 flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
