import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ShieldAlert, AlertOctagon, HelpCircle, Send, Check } from "lucide-react";
import { toast } from "sonner";

export default function AcceptableUsePage() {
  useScrollTop();
  const [abuseLink, setAbuseLink] = useState("");
  const [abuseEmail, setAbuseEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReportAbuse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!abuseLink || !abuseEmail) {
      toast.error("Please fill in the required fields!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Abuse report received. Link flagged for compliance verification.");
      setAbuseLink("");
      setAbuseEmail("");
    }, 1500);
  };

  const prohibitedContent = [
    { title: "Malware & Phishing Scams", desc: "No distributing trojans, computer viruses, keystroke loggers, web spoof forms, or resources designed to compromise browser user credentials." },
    { title: "Copyright & Intellectual Property Infringement", desc: "You may not upload, share, or store materials that breach third-party copyright, design rights, software licenses, or patent parameters." },
    { title: "Harassment & Hate Speech", desc: "We restrict file storage representing intimidation, discrimination, online harassment campaigns, or hate speech targeting group identities." },
    { title: "Unlawful Data Distribution", desc: "Prohibits sharing personal identifying information (PII) compiled without legal permission, credit card databases, or stolen corporate credentials." }
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-mint/20 flex items-center justify-center mx-auto mb-6 border border-mint/30"
          >
            <AlertOctagon className="w-8 h-8 text-mint" />
          </motion.div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Acceptable <span className="text-mint">Use</span> Policy
          </h1>
          <p className="text-white/60 text-sm sm:text-base">Platform Sharing Constraints</p>
        </div>
      </section>

      {/* Constraints list and Abuse Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Policy Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-display font-bold text-navy text-2xl mb-2">Prohibited Content & Actions</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  QuickNet is built for secure, legitimate file exchange. To keep our global network clean and safe, the following activities and materials are strictly prohibited:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {prohibitedContent.map((item, idx) => (
                  <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
                    <span className="inline-block p-1 bg-red-50 rounded-lg text-red-600">
                      <ShieldAlert className="w-5 h-5" />
                    </span>
                    <h4 className="font-bold text-navy text-sm leading-snug">{item.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Abuse report card (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-bold text-navy text-lg">Report abuse</h3>
                <p className="text-gray-400 text-xs mt-1">Spotted a malicious link hosted on our domain? Report it below.</p>
              </div>

              <form onSubmit={handleReportAbuse} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Flagged QuickNet Link *</label>
                  <input
                    type="url"
                    required
                    value={abuseLink}
                    onChange={(e) => setAbuseLink(e.target.value)}
                    placeholder="https://quicknet.io/transfer/abcd123"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Your Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={abuseEmail}
                    onChange={(e) => setAbuseEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-navy text-white hover:bg-navy-light font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Flag Content
                    </>
                  )}
                </button>
              </form>

              <div className="pt-4 border-t border-gray-100 flex items-start gap-2.5 text-gray-400 text-[10px]">
                <HelpCircle className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Our compliance panel reviews flagged contents within 4 hours. Violation links are immediately suspended, and offending IP subnets are restricted.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
