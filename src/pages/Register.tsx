import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Zap, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useScrollTop } from "@/hooks/useScrollTop";
import { toast } from "sonner";

export default function Register() {
  useScrollTop();
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordChecks = [
    { label: "At least 8 characters", valid: form.password.length >= 8 },
    { label: "Contains a number", valid: /\d/.test(form.password) },
    { label: "Passwords match", valid: form.password === form.confirm && form.confirm.length > 0 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    setLoading(false);

    if (result.success) {
      toast.success("Account created! Please sign in to continue.");
      navigate("/login");
    } else {
      setError(result.error || "Registration failed.");
    }
  };

  const handleSocial = (provider: string) => {
    toast.info(`${provider} registration coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-navy p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-mint/10 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-mint/5 blur-2xl" />
        </div>
        <div className="relative">
          <Link to="/" className="flex items-center gap-2 mb-16">
            <div className="w-9 h-9 rounded-xl bg-mint/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-mint" />
            </div>
            <span className="font-display font-bold text-xl text-white">
              Quick<span className="text-mint">Net</span>
            </span>
          </Link>
          <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
            Join 50,000+<br />users sharing<br />at light speed
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Start for free. No credit card required. Transfer your first file in under 60 seconds.
          </p>
        </div>
        <div className="relative space-y-4">
          {[
            "2 GB Free Storage Forever",
            "Zero Setup Required",
            "Share with Anyone, Anywhere",
          ].map((text) => (
            <p key={text} className="text-white/70 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-mint flex-shrink-0" />
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center">
              <Zap className="w-4 h-4 text-mint" />
            </div>
            <span className="font-display font-bold text-lg text-navy">Quick<span className="text-[#00FFC2]">Net</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-navy mb-2">Create your account</h1>
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-navy font-semibold hover:underline">Sign in</Link>
            </p>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {["Google", "Twitter", "LinkedIn"].map((provider) => (
              <button
                key={provider}
                onClick={() => handleSocial(provider)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-navy hover:text-navy transition-all"
              >
                {provider}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">or register with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

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
            {[
              { key: "name", label: "Full Name", placeholder: "Your full name", icon: User, type: "text" },
              { key: "email", label: "Email Address", placeholder: "you@example.com", icon: Mail, type: "email" },
            ].map(({ key, label, placeholder, icon: Icon, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-navy mb-2">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none text-sm transition-all"
                  />
                </div>
              </div>
            ))}

            {[
              { key: "password", label: "Password", placeholder: "Create a strong password" },
              { key: "confirm", label: "Confirm Password", placeholder: "Repeat your password" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-navy mb-2">{label}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    required
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none text-sm transition-all"
                  />
                  {key === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Password Strength */}
            {form.password && (
              <div className="space-y-2">
                {passwordChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${check.valid ? "text-green-500" : "text-gray-300"}`} />
                    <span className={`text-xs ${check.valid ? "text-green-600" : "text-gray-400"}`}>{check.label}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy-light transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            By creating an account, you agree to our{" "}
            <Link to="/" className="text-navy hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link to="/" className="text-navy hover:underline">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
