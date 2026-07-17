import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { MessageSquare, Twitter, Github, Users, Award, Calendar, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

export default function CommunityPage() {
  const navigate = useNavigate();
  useScrollTop();
  const [rsvpedEvent, setRsvpedEvent] = useState<string | null>(null);

  const channels = [
    { name: "Join Discord", desc: "Interact with 5,000+ developers. Get support, show off mock integration projects.", icon: MessageSquare, href: "https://discord.com", actionText: "Join Server" },
    { name: "GitHub Repository", desc: "Contribute to our open source SDKs, report issues, and request CLI improvements.", icon: Github, href: "https://github.com", actionText: "View Repos" },
    { name: "Twitter Space", desc: "Stay informed on system enhancements, compression updates, and server updates.", icon: Twitter, href: "https://twitter.com", actionText: "Follow Us" },
    { name: "Slack Channel", desc: "Collaborate directly on workflow setups, corporate plans, and custom plugins.", icon: Users, href: "https://slack.com", actionText: "Join Workspace" }
  ];

  const spotlights = [
    { name: "Aman Gupta", contribution: "Built the unofficial Python SDK wrapper library.", badge: "Developer MVP" },
    { name: "Riya Sen", contribution: "Contributed detailed setup tutorials for WordPress integrations.", badge: "Author MVP" },
    { name: "Vikram Malhotra", contribution: "Identified security bugs in CDN edge configuration.", badge: "Security MVP" }
  ];

  const handleRsvp = (eventTitle: string) => {
    if (!isAuthenticated()) {
      toast.error("Please login to RSVP for webinars!");
      navigate("/login");
      return;
    }
    setRsvpedEvent(eventTitle);
    toast.success(`RSVP confirmed for: ${eventTitle}! We'll send calendar links.`);
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6">
            Developer Networks
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
            QuickNet <span className="text-mint">Community</span> Hub
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Connect with technical professionals, share optimizations, download user SDK plugins, and participate in community events.
          </p>
        </div>
      </section>

      {/* Social Links Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {channels.map((chan) => {
              const Icon = chan.icon;
              return (
                <div key={chan.name} className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:shadow-lg transition-all flex flex-col justify-between items-start">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-navy" />
                    </div>
                    <h3 className="font-display font-bold text-navy text-xl leading-snug">{chan.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{chan.desc}</p>
                  </div>
                  <a
                    href={chan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-navy hover:text-mint mt-6 group"
                  >
                    {chan.actionText} <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Event Panel */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold">
                Webinars
              </span>
              <h2 className="font-display text-3xl font-bold text-navy leading-snug">
                Upcoming Live Community Sessions
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Join our systems architect and community leads for tutorials on building file ingestion scripts and configuring TLS tunnels.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                { title: "Building custom upload dashboards with Next.js", date: "July 24, 2026 at 18:00 IST", host: "Divya Nair (Security)" },
                { title: "Optimizing CLI scripts for server database backups", date: "August 10, 2026 at 16:30 IST", host: "Arjun Verma (CTO)" }
              ].map((ev, i) => {
                const isRsvped = rsvpedEvent === ev.title;
                return (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex gap-2 text-xs text-gray-400 font-semibold items-center">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{ev.date}</span>
                      </div>
                      <h4 className="font-display font-bold text-navy text-sm sm:text-base leading-snug">{ev.title}</h4>
                      <p className="text-gray-400 text-xs mt-0.5">Hosted by {ev.host}</p>
                    </div>
                    <button
                      onClick={() => handleRsvp(ev.title)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex-shrink-0 ${
                        isRsvped
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "border-navy text-navy hover:bg-navy hover:text-white"
                      }`}
                    >
                      {isRsvped ? "RSVP Confirmed" : "RSVP Spot"}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Contributor Spotlight */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-4">
            Contributors
          </span>
          <h2 className="font-display text-3xl font-bold text-navy mb-12">Developer spotlights</h2>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {spotlights.map((spot, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 flex flex-col justify-between items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy font-bold text-lg mb-4">
                  {spot.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-navy text-base">{spot.name}</h4>
                  <p className="text-gray-500 text-xs max-w-[200px] leading-relaxed">{spot.contribution}</p>
                </div>
                <span className="inline-block px-2.5 py-0.5 bg-mint/25 border border-mint/30 rounded-full text-navy font-bold text-[10px] uppercase mt-4">
                  {spot.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
