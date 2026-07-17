import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-12">
        <div className="w-9 h-9 rounded-xl bg-mint/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-mint" />
        </div>
        <span className="font-display font-bold text-xl text-white">
          Quick<span className="text-mint">Net</span>
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-48 h-48 rounded-3xl bg-white/5 border-4 border-mint/20 mb-8 shadow-2xl flex items-center justify-center"
        style={{ boxShadow: "0 0 60px rgba(0,255,194,0.15)" }}
      >
        <div className="text-center px-4">
          <ArrowLeft className="mx-auto mb-3 w-12 h-12 text-mint" />
          <p className="text-white/70 text-sm">Page not found</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-mint text-sm font-bold uppercase tracking-widest mb-3">Error 404</p>
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-white/50 text-lg max-w-md mx-auto mb-10">
          Even our fastest CDN couldn't locate this page. It may have been moved, deleted, or perhaps it never existed.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3.5 bg-mint text-navy font-bold rounded-xl cursor-pointer"
            >
              <Home className="w-5 h-5" /> Back to Home
            </motion.div>
          </Link>
          <button onClick={() => window.history.back()}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/15 hover:bg-white/15 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" /> Go Back
            </motion.div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
