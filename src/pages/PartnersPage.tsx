import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Handshake, ShieldAlert, Award, Send, Building, Link as LinkIcon, Mail } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

export default function PartnersPage() {
  const navigate = useNavigate();
  useScrollTop();
  const [partnerName, setPartnerName] = useState("");
  const [partnerCompany, setPartnerCompany] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerType, setPartnerType] = useState("technology");
  const [partnerMessage, setPartnerMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      toast.error("Please login to submit partnership pitches!");
      navigate("/login");
      return;
    }
    if (!partnerName || !partnerCompany || !partnerEmail || !partnerMessage) {
      toast.error("Please fill in all required fields!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Partnership request submitted! Our alliances manager will contact you.");
      setPartnerName("");
      setPartnerCompany("");
      setPartnerEmail("");
      setPartnerMessage("");
    }, 1500);
  };

  const partnerTiers = [
    {
      icon: Handshake,
      title: "Technology Integrations",
      desc: "For software providers, developer platforms, and cloud databases looking to integrate QuickNet's native file sharing capabilities directly into their application pipelines."
    },
    {
      icon: Building,
      title: "Resellers & MSPs",
      desc: "For value-added resellers, system integrations companies, and IT consultancies wanting to sell QuickNet Business and Enterprise vault subscriptions to their corporate clients."
    },
    {
      icon: Award,
      title: "Agency Alliances",
      desc: "For media agencies, video production companies, and VFX firms looking to use custom QuickNet nodes to accelerate large files delivery pipelines to their clients."
    }
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
          <span className="inline-block px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6">
            Global Networks
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
            QuickNet <span className="text-mint">Partners</span> Program
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Collaborate with QuickNet to design next-generation sharing tools. Accelerate speeds and delivery loops for clients and developer teams worldwide.
          </p>
        </div>
      </section>

      {/* Partnership tiers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-4">
              Alliances
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy">
              Collaborative Integration Opportunities
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div key={tier.title} className="p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all bg-white flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-navy" />
                    </div>
                    <h3 className="font-display font-bold text-navy text-xl leading-snug">{tier.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{tier.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Become a Partner Form */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-center mb-10">
              <h3 className="font-display font-bold text-navy text-2xl mb-2">Become a Partner</h3>
              <p className="text-gray-400 text-sm">Tell us about your organization and how you'd like to collaborate.</p>
            </div>

            <form onSubmit={handleSubmitPartner} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={partnerCompany}
                    onChange={(e) => setPartnerCompany(e.target.value)}
                    placeholder="Company name"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Partnership Type *</label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy cursor-pointer"
                  >
                    <option value="technology">Technology Integration</option>
                    <option value="reseller">Reseller / MSP Program</option>
                    <option value="agency">Agency Alliance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Collaboration Pitch *</label>
                <textarea
                  rows={4}
                  required
                  value={partnerMessage}
                  onChange={(e) => setPartnerMessage(e.target.value)}
                  placeholder="Outline your proposal, tech requirements, or resale distribution..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy resize-none"
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
                      <Send className="w-4 h-4" /> Submit Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
