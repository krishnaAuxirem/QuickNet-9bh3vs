import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Scale, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";

export default function TermsPage() {
  useScrollTop();
  const [openSection, setOpenSection] = useState<number | null>(0);

  const terms = [
    {
      title: "1. Acceptance of Terms",
      content: "By creating an account, uploading files, or downloading materials hosted on QuickNet, you confirm your acceptance of these Terms of Service. If you do not agree to these rules, you may not utilize our platform or SDK integrations."
    },
    {
      title: "2. User Registration and Account Audits",
      content: "You must provide accurate, active credentials upon signup. You are solely responsible for securing your password, generating client-side zero-knowledge keys, and monitoring links created under your workspace. QuickNet accounts may not be shared, rented, or resold to unauthorized third parties."
    },
    {
      title: "3. Allowable Content and Storage Limits",
      content: "QuickNet provides digital storage resources. You may not distribute materials that breach local intellectual property laws, represent malicious scripts or phishing forms, or violate content standards listed in our Acceptable Use policy. We reserves the right to terminate links and delete data that breach these terms."
    },
    {
      title: "4. Fees, Payments, and Quotas",
      content: "Billing for Pro and Enterprise subscriptions runs on recurring monthly cycles. If your bandwidth or storage exceeds plan quotas, your links may be temporarily throttled or access prompts disabled until the billing limit is extended. Refunds are managed on a case-by-case evaluation basis."
    },
    {
      title: "5. Disclaimers and Limitations of Liability",
      content: "QuickNet services are provided on an 'as is' and 'as available' infrastructure base. While we guarantee a 99.99% network uptime for Enterprise tiers, we are not liable for files deleted due to user configuration errors, expired keys, or client-side decryption password losses."
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
            <Scale className="w-8 h-8 text-mint" />
          </motion.div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Terms of <span className="text-mint">Service</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base">Last updated: July 17, 2026</p>
        </div>
      </section>

      {/* Terms list */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            
            <div className="p-4 bg-yellow-50 border border-yellow-100 text-yellow-800 rounded-2xl flex gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-yellow-700 leading-relaxed">
                Please read these terms carefully. By using our service, you acknowledge that you are responsible for keeping your private decryption keys secure.
              </p>
            </div>

            <div className="space-y-3">
              {terms.map((sec, i) => {
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
