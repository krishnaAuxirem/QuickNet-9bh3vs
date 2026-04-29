import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowLeft, Download, Copy, Zap, Clock, Shield } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { toast } from "sonner";

const MOCK_TRANSFER = {
  fileName: "Project_Proposal_v3.pdf",
  originalSize: "48.6 MB",
  compressedSize: "14.2 MB",
  savings: "70.8%",
  speed: "9.4 Gbps",
  encryption: "AES-256",
};

export default function TransferPage() {
  useScrollTop();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"transferring" | "done">("transferring");
  const [timeLeft, setTimeLeft] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus("done");
          return 100;
        }
        return p + 2.5;
      });
    }, 200);
    const countdown = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Transfer link copied!");
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center p-6">
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-charcoal-light rounded-3xl border border-white/10 p-8"
      >
        {/* File Info */}
        <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-mint/20 flex items-center justify-center flex-shrink-0">
            <Download className="w-6 h-6 text-mint" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate">{MOCK_TRANSFER.fileName}</p>
            <p className="text-white/40 text-sm">ID: {id}</p>
          </div>
        </div>

        {/* Progress */}
        <AnimatePresence mode="wait">
          {status === "transferring" ? (
            <motion.div key="transferring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="text-center">
                <p className="text-white/60 text-sm mb-2">Transferring & Compressing...</p>
                <p className="font-display text-5xl font-bold text-mint">{Math.round(progress)}%</p>
              </div>

              {/* Glow Progress Bar */}
              <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #00FFC2, #00CC9B)",
                    boxShadow: "0 0 20px rgba(0,255,194,0.6), 0 0 40px rgba(0,255,194,0.3)",
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-mint font-bold text-sm">{MOCK_TRANSFER.speed}</p>
                  <p className="text-white/40 text-xs">Speed</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-white font-bold text-sm">{timeLeft}s</p>
                  <p className="text-white/40 text-xs">Est. Time</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-mint font-bold text-sm">{MOCK_TRANSFER.savings}</p>
                  <p className="text-white/40 text-xs">Savings</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Success */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-mint/20 flex items-center justify-center mx-auto mb-4"
                  style={{ boxShadow: "0 0 40px rgba(0,255,194,0.3)" }}
                >
                  <CheckCircle className="w-10 h-10 text-mint" />
                </motion.div>
                <h2 className="font-display text-2xl font-bold text-white mb-1">Transfer Complete!</h2>
                <p className="text-white/50 text-sm">Your file has been compressed and is ready</p>
              </div>

              {/* Stats */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                {[
                  { label: "Original Size", value: MOCK_TRANSFER.originalSize },
                  { label: "Compressed Size", value: MOCK_TRANSFER.compressedSize, highlight: true },
                  { label: "Space Saved", value: MOCK_TRANSFER.savings, highlight: true },
                  { label: "Encryption", value: MOCK_TRANSFER.encryption },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">{stat.label}</span>
                    <span className={`text-sm font-semibold ${stat.highlight ? "text-mint" : "text-white"}`}>{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => toast.success("Downloading compressed file...")}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors"
                >
                  <Download className="w-5 h-5" /> Download Compressed File
                </button>
                <button
                  onClick={copyLink}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-colors"
                >
                  <Copy className="w-5 h-5" /> Copy Shareable Link
                </button>
              </div>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
                <Shield className="w-3.5 h-3.5" />
                <span>AES-256 encrypted · Link expires in 30 days</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Back + Timer */}
      <div className="flex items-center gap-6 mt-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        {status === "transferring" && (
          <div className="flex items-center gap-1.5 text-white/30 text-sm">
            <Clock className="w-4 h-4" />
            <span>~{timeLeft}s remaining</span>
          </div>
        )}
      </div>
    </div>
  );
}
