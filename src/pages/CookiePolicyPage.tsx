import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ShieldCheck, Eye, ToggleLeft, ToggleRight, Check } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

export default function CookiePolicyPage() {
  const navigate = useNavigate();
  useScrollTop();
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);

  const handleToggleAnalytics = () => {
    const nextVal = !analyticsCookies;
    setAnalyticsCookies(nextVal);
    toast.success(`Analytics cookies ${nextVal ? "enabled" : "disabled"}.`);
  };

  const handleToggleMarketing = () => {
    const nextVal = !marketingCookies;
    setMarketingCookies(nextVal);
    toast.success(`Marketing cookies ${nextVal ? "enabled" : "disabled"}.`);
  };

  const handleSavePreferences = () => {
    if (!isAuthenticated()) {
      toast.error("Please login to save preferences!");
      navigate("/login");
      return;
    }
    toast.success("Cookie preferences saved successfully!");
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
            <Eye className="w-8 h-8 text-mint" />
          </motion.div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Cookie <span className="text-mint">Policy</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base">Last updated: July 17, 2026</p>
        </div>
      </section>

      {/* Preferences sand-box */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            
            {/* Policy explanations */}
            <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-bold text-navy text-xl mb-3">What are cookies?</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Cookies are small strings of text stored on your browser when you visit websites. QuickNet uses cookies to remember credentials, analyze upload latency, and check billing subscription sessions.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-bold text-navy text-sm mb-3">Cookies We Use:</h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-navy block mb-1">Strictly Necessary Cookies:</span>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Essential to navigate pages, load dashboard views, and execute browser uploads. These cannot be disabled.
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-navy block mb-1">Analytical Performance Cookies:</span>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Helps us count page visits, monitor edge node request delays, and track file compression rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive manager */}
            <div className="md:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-bold text-navy text-lg">Manage Preferences</h3>
                <p className="text-gray-400 text-xs mt-1">Configure active cookies below.</p>
              </div>

              <div className="space-y-4">
                {/* Necessary */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-navy block">Strictly Necessary</span>
                    <span className="text-[10px] text-gray-400 font-semibold block">Always On</span>
                  </div>
                  <span className="w-8 h-8 rounded-lg bg-mint/20 border border-mint/30 flex items-center justify-center text-navy font-bold">
                    <Check className="w-4 h-4 text-navy" />
                  </span>
                </div>

                {/* Analytics toggle */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-navy block">Analytics Cookies</span>
                    <span className="text-[10px] text-gray-400 font-semibold block">{analyticsCookies ? "Active" : "Inactive"}</span>
                  </div>
                  <button onClick={handleToggleAnalytics} className="text-navy hover:text-mint transition-colors">
                    {analyticsCookies ? <ToggleRight className="w-9 h-9 text-navy" /> : <ToggleLeft className="w-9 h-9 text-gray-300" />}
                  </button>
                </div>

                {/* Marketing toggle */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-navy block">Marketing Cookies</span>
                    <span className="text-[10px] text-gray-400 font-semibold block">{marketingCookies ? "Active" : "Inactive"}</span>
                  </div>
                  <button onClick={handleToggleMarketing} className="text-navy hover:text-mint transition-colors">
                    {marketingCookies ? <ToggleRight className="w-9 h-9 text-navy" /> : <ToggleLeft className="w-9 h-9 text-gray-300" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSavePreferences}
                className="w-full py-3 bg-navy text-white hover:bg-navy-light font-bold rounded-xl text-xs sm:text-sm transition-all"
              >
                Save Preferences
              </button>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
