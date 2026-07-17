import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ShieldCheck, ChevronDown, ChevronUp, FileText } from "lucide-react";

export default function PrivacyPage() {
  useScrollTop();
  const [openSection, setOpenSection] = useState<number | null>(0);

  const policySections = [
    {
      title: "1. Information We Collect",
      content: "When you use QuickNet, we collect specific parameters necessary to route and execute file transfers. This includes your account name, email address, password hashes, and active subscription details. For anonymous users, we temporarily collect network diagnostics (e.g. IP addresses and file sizes) to ensure bandwidth constraints are respected during transit."
    },
    {
      title: "2. How We Use Data",
      content: "Your data is used strictly to power file transfers, compute compression metrics, and manage link expiry configurations. We never sell, lease, or distribute your email addresses or upload telemetry data to third-party advertising panels. Audit logs are kept purely for security debugging and rate-limiting diagnostics."
    },
    {
      title: "3. Cookie Tracking",
      content: "We use essential cookies to maintain browser login sessions, persist dashboard preferences, and test user loading layouts. You can manage optional cookies from our Cookie Preference Center or via browser overrides."
    },
    {
      title: "4. Data Storage and Erasure",
      content: "All files uploaded on QuickNet are stored in encrypted partitions. When a link expires or you choose to delete a file, the resource is immediately expunged from primary storage disks and marked for immediate overwrite on secondary backups within 72 hours. Zero residuals are kept on edge routing points."
    },
    {
      title: "5. Your Legal Rights (GDPR & CCPA)",
      content: "Depending on your jurisdiction, you have the right to request access to your metadata, demand complete erasure of your credentials, and download complete reports of your telemetry history. Contact our privacy compliance officer to execute data exports."
    }
  ];

  const toggleSection = (idx: number) => {
    setOpenSection(openSection === idx ? null : idx);
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-mint/20 flex items-center justify-center mx-auto mb-6 border border-mint/30"
          >
            <ShieldCheck className="w-8 h-8 text-mint" />
          </motion.div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Privacy <span className="text-mint">Policy</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base">Last updated: July 17, 2026</p>
        </div>
      </section>

      {/* Policy Accordion */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-6 text-navy border-b border-gray-100 pb-4">
              <FileText className="w-5 h-5" />
              <h3 className="font-display font-bold text-xl">QuickNet Privacy Framework</h3>
            </div>

            <div className="space-y-3">
              {policySections.map((sec, i) => {
                const isOpen = openSection === i;
                return (
                  <div key={i} className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => toggleSection(i)}
                      className="w-full text-left p-5 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-display font-bold text-navy text-sm sm:text-base">{sec.title}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-white">
                        {sec.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
