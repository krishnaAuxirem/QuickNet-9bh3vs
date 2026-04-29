import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Zap, Mail, Lock, AlertCircle, Info, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useScrollTop } from "@/hooks/useScrollTop";
import { toast } from "sonner";

const DEMO_ACCOUNTS = [
  {
    label: "User Demo",
    email: "user@quicknet.com",
    password: "123456",
    role: "user",
    route: "/dashboard",
    badge: "Individual",
    color: "border-blue-200 hover:border-blue-400",
  },
  {
    label: "Admin Demo",
    email: "admin@quicknet.com",
    password: "password123",
    role: "admin",
    route: "/admin",
    badge: "Admin",
    color: "border-red-200 hover:border-red-400",
  },
  {
    label: "Business Demo",
    email: "business@quicknet.com",
    password: "123456",
    role: "business",
    route: "/business",
    badge: "Enterprise",
    color: "border-emerald-200 hover:border-emerald-400",
  },
];

export default function Login() {
  useScrollTop();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success && result.user) {
      toast.success(`Welcome back, ${result.user.name}!`);
      if (result.user.role === "admin") navigate("/admin");
      else if (result.user.role === "business") navigate("/business");
      else navigate("/dashboard");
    } else {
      setError(result.error || "Login failed. Please check your credentials.");
    }
  };

  const handleDemo = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setDemoLoading(account.label);
    const result = await login(account.email, account.password);
    setDemoLoading(null);
    if (result.success && result.user) {
      toast.success(`Logged in as ${account.label}!`);
      navigate(account.route);
    } else {
      toast.error("Demo login failed. Please try again.");
    }
  };

  const handleSocial = (provider: string) => {
    toast.info(`${provider} login coming soon! Use email or demo account.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-navy p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-mint/8 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500/8 blur-2xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(rgba(0,255,194,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,194,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-mint/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-mint" />
          </div>
          <span className="font-display font-bold text-xl text-white">
            Quick<span className="text-mint">Net</span>
          </span>
        </Link>

        <div className="relative z-10">
          <h2 className="font-display text-5xl font-bold text-white mb-6 leading-tight">
            Welcome<br />back to<br /><span className="text-mint" style={{ textShadow: "0 0 30px rgba(0,255,194,0.5)" }}>QuickNet</span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Your files are waiting. Sign in to access your dashboard and continue transferring at light speed.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          {[
            { value: "50K+", label: "Active Users" },
            { value: "10 Gbps", label: "Peak Speed" },
            { value: "99.99%", label: "Uptime" },
            { value: "AES-256", label: "Encryption" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="font-display font-bold text-mint text-xl">{s.value}</p>
              <p className="text-white/40 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md py-6"
        >
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center">
              <Zap className="w-4 h-4 text-mint" />
            </div>
            <span className="font-display font-bold text-lg text-navy">Quick<span className="text-[#00FFC2]">Net</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-navy mb-2">Sign in to QuickNet</h1>
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-navy font-semibold hover:underline">Create one free</Link>
            </p>
          </div>

          {/* Demo Credentials Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-navy/4 border border-navy/12 mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-navy flex-shrink-0" />
              <p className="text-sm font-bold text-navy">Quick Demo Access</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.label}
                  onClick={() => handleDemo(acc)}
                  disabled={demoLoading !== null}
                  className={`flex flex-col items-start p-3 rounded-xl bg-white border-2 ${acc.color} transition-all text-left disabled:opacity-60`}
                >
                  <span className="text-xs font-bold text-navy">{acc.label}</span>
                  <span className="text-xs text-gray-400 mt-0.5 truncate w-full">{acc.email}</span>
                  {demoLoading === acc.label ? (
                    <span className="w-3 h-3 border-2 border-navy/30 border-t-navy rounded-full animate-spin mt-1" />
                  ) : (
                    <span className={`text-xs mt-1 font-semibold px-1.5 py-0.5 rounded-full ${
                      acc.role === "admin" ? "bg-red-100 text-red-600" :
                      acc.role === "business" ? "bg-emerald-100 text-emerald-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>{acc.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { name: "Google", icon: "G" },
              { name: "Twitter", icon: "𝕏" },
              { name: "LinkedIn", icon: "in" },
            ].map((provider) => (
              <button
                key={provider.name}
                onClick={() => handleSocial(provider.name)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:border-navy hover:text-navy hover:shadow-sm transition-all"
              >
                <span className="font-bold">{provider.icon}</span>
                {provider.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mb-5"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-navy">Password</label>
                <button type="button" onClick={() => toast.info("Password reset email coming soon!")} className="text-xs text-navy hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded" />
              <label htmlFor="remember" className="text-sm text-gray-600 select-none">Keep me signed in for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing In...</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Protected by AES-256 encryption ·{" "}
            <Link to="/" className="text-navy hover:underline">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
