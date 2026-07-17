import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, Zap, CheckCircle, ArrowRight, FileText, Archive, Film, Image } from "lucide-react";

const FILE_TYPES = [
  { name: "Project_Report.pdf", size: 48600000, icon: FileText, color: "text-red-500" },
  { name: "Team_Photos.zip", size: 209715200, icon: Archive, color: "text-orange-500" },
  { name: "Demo_Video.mp4", size: 524288000, icon: Film, color: "text-blue-500" },
  { name: "Design_Assets.psd", size: 104857600, icon: Image, color: "text-purple-500" },
];

const LEVELS = [
  { value: "high", label: "High", ratio: 0.30, saving: "70%", desc: "Maximum compression", color: "border-green-500 bg-green-50 text-green-700" },
  { value: "medium", label: "Medium", ratio: 0.55, saving: "45%", desc: "Balanced quality", color: "border-blue-500 bg-blue-50 text-blue-700" },
  { value: "low", label: "Low", ratio: 0.75, saving: "25%", desc: "Fast processing", color: "border-orange-500 bg-orange-50 text-orange-700" },
] as const;

function formatBytes(bytes: number) {
  if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(1) + " GB";
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
  return (bytes / 1024).toFixed(0) + " KB";
}

export default function CompressionDemo() {
  const [selected, setSelected] = useState(0);
  const [level, setLevel] = useState<"high" | "medium" | "low">("high");
  const [compressing, setCompressing] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const file = FILE_TYPES[selected];
  const lvl = LEVELS.find((l) => l.value === level)!;
  const compressed = Math.floor(file.size * lvl.ratio);

  const handleCompress = () => {
    setDone(false);
    setCompressing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setCompressing(false);
          setDone(true);
          return 100;
        }
        return p + 4;
      });
    }, 80);
  };

  return (
    <section id="compression" className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-5"
          >
            Live Compression Demo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            See the Magic <span className="text-mint">Happen</span>
          </motion.h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Select a file type and compression level below to see exactly how much space you can save.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* File Selector */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-4">1. Select File Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {FILE_TYPES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <button
                      key={f.name}
                      onClick={() => { setSelected(i); setDone(false); setProgress(0); }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selected === i
                          ? "border-mint bg-mint/10"
                          : "border-white/10 hover:border-white/25 bg-white/3"
                      }`}
                    >
                      <span className="text-2xl block mb-2">
                        <Icon className={`${f.color} w-8 h-8`} />
                      </span>
                      <p className={`text-xs font-bold truncate ${selected === i ? "text-mint" : "text-white/60"}`}>{f.name}</p>
                      <p className="text-white/30 text-xs mt-0.5">{formatBytes(f.size)}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compression Level */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-4">
                <Sliders className="w-4 h-4 inline mr-2" />2. Choose Compression Level
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {LEVELS.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => { setLevel(l.value); setDone(false); setProgress(0); }}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      level === l.value ? l.color + " border-current" : "border-white/10 bg-white/3"
                    }`}
                  >
                    <p className={`font-bold text-sm ${level === l.value ? "" : "text-white/60"}`}>{l.label}</p>
                    <p className={`text-xs font-bold mt-1 ${level === l.value ? "" : "text-white/30"}`}>{l.saving} saved</p>
                    <p className={`text-xs mt-0.5 ${level === l.value ? "" : "text-white/20"}`}>{l.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Compress Button */}
            <button
              onClick={handleCompress}
              disabled={compressing}
              className="w-full py-4 bg-mint text-navy font-bold rounded-xl text-lg hover:bg-mint-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {compressing ? (
                <><span className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" /> Compressing...</>
              ) : (
                <><Zap className="w-5 h-5" /> Compress Now</>
              )}
            </button>
          </motion.div>

          {/* Result Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8"
          >
            <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider">Compression Result</h3>

            {/* Size Visual */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Original Size</span>
                  <span className="text-white font-bold">{formatBytes(file.size)}</span>
                </div>
                <div className="h-10 bg-white/10 rounded-xl overflow-hidden">
                  <div className="h-full w-full bg-white/20 rounded-xl flex items-center px-4 gap-2">
                    {(() => {
                      const FileIcon = file.icon;
                      return <FileIcon className="w-4 h-4 text-white/60" />;
                    })()}
                    <span className="text-white/60 text-xs">{file.name}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-mint">
                <div className="flex-1 h-px bg-mint/30" />
                <ArrowRight className="w-5 h-5" />
                <span className="text-sm font-bold">{lvl.saving} reduction</span>
                <div className="flex-1 h-px bg-mint/30" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-mint text-sm font-semibold">Compressed Size</span>
                  <span className="text-mint font-bold text-xl">{formatBytes(compressed)}</span>
                </div>
                <div className="h-10 bg-mint/10 border border-mint/20 rounded-xl overflow-hidden">
                  <motion.div
                    className="h-full rounded-xl"
                    style={{
                      background: "linear-gradient(90deg, rgba(0,255,194,0.3), rgba(0,255,194,0.15))",
                      boxShadow: done ? "0 0 20px rgba(0,255,194,0.3)" : "none",
                    }}
                    animate={{ width: done ? `${lvl.ratio * 100}%` : "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {(compressing || done) && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">{compressing ? "Processing..." : "Complete!"}</span>
                  <span className="text-mint font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #00FFC2, #00CC9B)",
                      boxShadow: "0 0 15px rgba(0,255,194,0.6)",
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            )}

            {/* Done State */}
            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-5 rounded-2xl bg-mint/10 border border-mint/20 space-y-3"
                >
                  <div className="flex items-center gap-2 text-mint font-bold">
                    <CheckCircle className="w-5 h-5" />
                    Compression Complete!
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Saved", value: formatBytes(file.size - compressed) },
                      { label: "Ratio", value: lvl.saving },
                      { label: "Algorithm", value: level === "high" ? "zstd" : level === "medium" ? "brotli" : "lz4" },
                      { label: "Time", value: level === "high" ? "2.4s" : level === "medium" ? "1.1s" : "0.4s" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-mint font-bold text-lg">{s.value}</p>
                        <p className="text-white/40 text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!compressing && !done && (
              <p className="text-white/25 text-center text-sm">Select options and click Compress Now to see results</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
