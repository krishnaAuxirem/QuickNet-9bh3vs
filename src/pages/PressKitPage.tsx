import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Download, Mail, Copy, Check, FileText, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

export default function PressKitPage() {
  const navigate = useNavigate();
  useScrollTop();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    { name: "Navy Dark", hex: "#1A1A40", role: "Primary Background" },
    { name: "Mint Light", hex: "#00FFC2", role: "Secondary Accents" },
    { name: "White Pure", hex: "#FFFFFF", role: "Clean text and panels" },
    { name: "Navy Muted", hex: "#2E2E6E", role: "Borders and secondary text" }
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    toast.success(`Copied hex code ${hex} to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const pressReleases = [
    { title: "QuickNet secures ₹42 Crore Series A funding to expand global CDN architecture", date: "October 14, 2024", outlet: "VenturePulse India" },
    { title: "QuickNet launches Zero-Knowledge Encrypted corporate file vaults", date: "April 08, 2025", outlet: "TechBytes Southeast Asia" },
    { title: "Fast Sharing leader QuickNet crosses 150,000 active global subscribers", date: "March 22, 2026", outlet: "Daily Startup Bengaluru" }
  ];

  const handleDownloadAsset = (name: string) => {
    if (!isAuthenticated()) {
      toast.error("Please login to download press assets!");
      navigate("/login");
      return;
    }
    toast.success(`Downloading ${name} mockup asset file!`);
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
            Press Resources
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
            QuickNet <span className="text-mint">Press Kit</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Official guidelines, brand assets, logos, color codes, and historical publications to help write reports about the QuickNet platform.
          </p>
        </div>
      </section>

      {/* Press assets download */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Visual Assets grid */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display font-bold text-navy text-2xl mb-4">Official Brand Assets</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Please use these high-resolution logos, vectors, and typography mockups when featuring QuickNet in articles or presentations.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "Logo Pack (SVG & PNG)", desc: "Light, dark, and icon-only options.", icon: ImageIcon },
                  { name: "Product Mockups", desc: "Hi-res screenshots of dashboard interfaces.", icon: ImageIcon },
                  { name: "Founder Headshots", desc: "Official executive team photos.", icon: ImageIcon },
                  { name: "Company Fact Sheet", desc: "PDF highlighting key stats & history.", icon: FileText }
                ].map((asset) => {
                  const Icon = asset.icon;
                  return (
                    <div key={asset.name} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy text-sm leading-snug">{asset.name}</h4>
                        <p className="text-gray-400 text-xs mt-1">{asset.desc}</p>
                      </div>
                      <button
                        onClick={() => handleDownloadAsset(asset.name)}
                        className="flex items-center gap-1 text-xs font-bold text-navy hover:text-mint mt-2"
                      >
                        <Download className="w-3.5 h-3.5" /> Download (.ZIP)
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brand Colors Swatches */}
            <div className="space-y-8 bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div>
                <h3 className="font-display font-bold text-navy text-2xl mb-2">Our Color Palette</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  These core hex codes define the signature look and visual character of QuickNet services.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {colors.map((color) => {
                  const isCopied = copiedHex === color.hex;
                  return (
                    <div key={color.hex} className="p-4 bg-white rounded-xl border border-gray-100 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg border border-gray-100 flex-shrink-0" style={{ backgroundColor: color.hex }} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-navy text-sm truncate">{color.name}</h4>
                        <span className="text-xs text-gray-400 block truncate">{color.role}</span>
                        <button
                          onClick={() => handleCopyHex(color.hex)}
                          className="text-[10px] font-bold text-navy hover:text-mint inline-flex items-center gap-1 mt-1 bg-gray-50 px-2 py-0.5 rounded border border-gray-100"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-mint" /> : <Copy className="w-3 h-3" />}
                          {color.hex}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Press Releases List */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-display font-bold text-navy text-2xl text-center mb-10">Recent Press Announcements</h3>
          
          <div className="space-y-4">
            {pressReleases.map((release, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex gap-3 text-xs text-gray-400 font-semibold mb-1">
                    <span>{release.date}</span>
                    <span>·</span>
                    <span className="text-navy">{release.outlet}</span>
                  </div>
                  <h4 className="font-display font-bold text-navy text-base sm:text-lg">{release.title}</h4>
                </div>
                <button
                  onClick={() => handleDownloadAsset("Press Release Document")}
                  className="px-4 py-2 border border-navy/15 text-navy hover:bg-navy hover:text-white rounded-xl text-xs font-bold transition-all flex-shrink-0"
                >
                  Read Release
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media contact section */}
      <section className="py-20 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Mail className="w-12 h-12 text-mint mx-auto mb-2 animate-bounce" />
          <h2 className="font-display text-2xl font-bold">Media & Public Relations Inquiries</h2>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Are you a writer, podcaster, or journalist looking to interview our leadership team? Get in touch at:
          </p>
          <a
            href="mailto:press@quicknet.io"
            className="text-mint font-mono font-bold text-lg hover:underline block"
          >
            press@quicknet.io
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
