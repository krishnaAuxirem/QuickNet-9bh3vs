import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ShieldCheck, Mail, Send, Award, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

export default function GdprPage() {
  useScrollTop();
  const [email, setEmail] = useState("");
  const [reqType, setReqType] = useState("export");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGdprRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        reqType === "export"
          ? "Data export request queued! You'll receive a secure link in 24 hours."
          : "Account deletion protocol initialized. Verification email sent."
      );
      setEmail("");
    }, 1500);
  };

  const gdprRights = [
    { title: "Right of Access & Portability", desc: "You have the right to request a complete CSV transcript of your account profile metadata, active links, and transfer logs.", icon: Download },
    { title: "Right of Erasure (To Be Forgotten)", desc: "Request complete erasure of your credentials, profile logs, subscription histories, and stored data resources from our servers.", icon: Trash2 },
    { title: "Right to Restrict Processing", desc: "Object to analytical data profiling or telemetry computations on your uploaded files at any time via cookie toggles.", icon: ShieldCheck }
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6">
            Global Compliance
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            GDPR <span className="text-mint">Compliance</span> & Data Rights
          </h1>
          <p className="text-white/60 text-sm sm:text-base">QuickNet Data Protection Framework</p>
        </div>
      </section>

      {/* GDPR checklist & request panel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Rights Checklist (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-display font-bold text-navy text-2xl mb-2">Your Privacy Under GDPR</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  The General Data Protection Regulation guarantees European citizens specific controls over how companies compile metadata. QuickNet extends these safety protocols to all users globally.
                </p>
              </div>

              <div className="space-y-4">
                {gdprRights.map((right) => {
                  const Icon = right.icon;
                  return (
                    <div key={right.title} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy text-sm leading-snug">{right.title}</h4>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{right.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Request center form (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-bold text-navy text-lg">Privacy Request Center</h3>
                <p className="text-gray-400 text-xs mt-1">Submit requests regarding data portability or erasure.</p>
              </div>

              <form onSubmit={handleGdprRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Request Type *</label>
                  <select
                    value={reqType}
                    onChange={(e) => setReqType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy cursor-pointer"
                  >
                    <option value="export">Export My Data (.CSV)</option>
                    <option value="delete">Permanently Delete Account & Files</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Your Account Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      <Send className="w-4 h-4" /> Submit GDPR Request
                    </>
                  )}
                </button>
              </form>

              <div className="pt-4 border-t border-gray-100 flex items-start gap-2.5 text-gray-400 text-[10px]">
                <Award className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  For formal legal queries or direct Data Protection Officer communication, please write to: <a href="mailto:dpo@quicknet.io" className="text-navy font-bold hover:underline">dpo@quicknet.io</a>
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
