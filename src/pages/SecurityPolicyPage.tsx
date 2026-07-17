import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ShieldCheck, Mail, Send, Award, Key, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

export default function SecurityPolicyPage() {
  const navigate = useNavigate();
  useScrollTop();
  const [reportTitle, setReportTitle] = useState("");
  const [reportDesc, setReportDesc] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: QuickNet Security PGP Key

mQINBFT2zZ0BEADcvbVspW9e6K48eZ8x/wOaW+D/nF6tWd5Q5rN/1bWp01F4...
-----END PGP PUBLIC KEY BLOCK-----`;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(pgpKey);
    setCopiedKey(true);
    toast.success("Security PGP key copied to clipboard!");
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      toast.error("Please login to submit security reports!");
      navigate("/login");
      return;
    }
    if (!reportTitle || !reportDesc || !reporterEmail) {
      toast.error("Please fill in all report fields!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Security vulnerability report logged! Our response window is 12 hours.");
      setReportTitle("");
      setReportDesc("");
      setReporterEmail("");
    }, 1500);
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
            Security <span className="text-mint">Policy</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base">Vulnerability Disclosure Program</p>
        </div>
      </section>

      {/* Security Policies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Guidelines & PGP block (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="font-display font-bold text-navy text-2xl">Reporting Guidelines</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  QuickNet is committed to protecting data privacy. We encourage security researchers to audit our edge endpoints, dashboard layouts, and API libraries. We practice coordinates disclosure:
                </p>
                <ul className="list-disc list-inside text-gray-500 text-sm space-y-1">
                  <li>Please report any bugs anonymously to our security desk.</li>
                  <li>Allow us 24-48 hours to investigate and implement hotfixes before publishing details.</li>
                  <li>Avoid DDoS scans or invasive data leaks on live client links.</li>
                </ul>
              </div>

              {/* PGP Block */}
              <div className="bg-navy p-6 rounded-3xl text-white space-y-4 shadow-md border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-mint flex items-center gap-1.5">
                    <Key className="w-4 h-4" /> PGP Encryption Key
                  </span>
                  <button
                    onClick={handleCopyKey}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-mint transition-colors"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-mint" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <pre className="font-mono text-xs text-white/50 bg-white/5 p-4 rounded-xl overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {pgpKey}
                </pre>
              </div>

            </div>

            {/* Reporting Form (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-bold text-navy text-lg">Disclosure Desk</h3>
                <p className="text-gray-400 text-xs mt-1">Submit technical security reviews or bug reports here.</p>
              </div>

              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Vulnerability Title *</label>
                  <input
                    type="text"
                    required
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="e.g. CSRF token bypass in workspace share form"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={reporterEmail}
                    onChange={(e) => setReporterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Reproduction Details & Description *</label>
                  <textarea
                    rows={5}
                    required
                    value={reportDesc}
                    onChange={(e) => setBugDesc?.(e.target.value) || setReportDesc(e.target.value)}
                    placeholder="Outline severity, affected URL routes, HTTP headers, and steps to reproduce..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy resize-none font-mono"
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
                      <Send className="w-4 h-4" /> Submit Security Ticket
                    </>
                  )}
                </button>
              </form>

              <div className="pt-4 border-t border-gray-100 flex items-start gap-2.5 text-gray-400 text-[10px]">
                <Mail className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Encrypted reports may also be dispatched directly to: <a href="mailto:security@quicknet.io" className="text-navy font-bold hover:underline">security@quicknet.io</a>
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
