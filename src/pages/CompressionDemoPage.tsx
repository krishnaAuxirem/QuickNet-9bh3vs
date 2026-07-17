import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Sliders, UploadCloud, CheckCircle, Image as ImageIcon, Video, FileText, Code, ShieldAlert, Sparkles, Gauge } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function CompressionDemoPage() {
  useScrollTop();

  const [fileType, setFileType] = useState("image");
  const [compressionRatio, setCompressionRatio] = useState([50]); // 50%
  const [isUploading, setIsUploading] = useState(false);
  const [isCompressed, setIsCompressed] = useState(false);
  const [mockFileName, setMockFileName] = useState("");
  const [mockFileSize, setMockFileSize] = useState(0);

  const fileTypeDefaults: Record<string, { name: string; size: number }> = {
    image: { name: "photography_portfolio_raw.tiff", size: 45.2 },
    video: { name: "marketing_hero_4k.mp4", size: 850.0 },
    pdf: { name: "annual_financial_report.pdf", size: 28.4 },
    code: { name: "node_modules_backup.tar.gz", size: 180.5 }
  };

  const handleSimulateDrop = (type: string) => {
    setIsUploading(true);
    setIsCompressed(false);
    const details = fileTypeDefaults[type];
    setMockFileName(details.name);
    setMockFileSize(details.size);

    setTimeout(() => {
      setIsUploading(false);
      setIsCompressed(true);
      toast.success("File compressed successfully via QuickNet AI!");
    }, 1500);
  };

  const originalSize = mockFileSize || fileTypeDefaults[fileType].size;
  const ratioDecimal = (100 - compressionRatio[0]) / 100;
  const compressedSize = parseFloat((originalSize * ratioDecimal).toFixed(2));
  const spaceSaved = originalSize - compressedSize;
  const percentSaved = compressionRatio[0];

  // Speeds: assume 100 Mbps (12.5 MB/s) upload speed
  const originalUploadTime = Math.ceil(originalSize / 12.5);
  const compressedUploadTime = Math.ceil(compressedSize / 12.5);

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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6">
            Interactive Playground
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
            Smart <span className="text-mint">Compression</span> Demo
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Experience our multi-algorithm compression engine. See in real-time how much bandwidth, storage, and transfer time you can save without losing original fidelity.
          </p>
        </div>
      </section>

      {/* Interactive simulator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Control Panel (left 5 columns) */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
              <div>
                <h3 className="font-display font-bold text-navy text-xl mb-4 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-mint" /> 1. Select Template File
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "image", label: "Raw Image", icon: ImageIcon },
                    { id: "video", label: "4K Video", icon: Video },
                    { id: "pdf", label: "PDF Document", icon: FileText },
                    { id: "code", label: "Code Archive", icon: Code }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setFileType(item.id);
                          setIsCompressed(false);
                          setMockFileName("");
                          setMockFileSize(0);
                        }}
                        className={`flex items-center gap-2.5 p-3.5 rounded-xl border text-sm font-medium transition-all ${
                          fileType === item.id && !mockFileName
                            ? "border-navy bg-navy text-white"
                            : "border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-mint" /> 2. Compression Ratio
                  </h3>
                  <span className="text-sm font-bold text-navy bg-mint/20 px-2.5 py-1 rounded-lg">
                    {percentSaved}% Saved
                  </span>
                </div>
                <div className="px-2 py-4">
                  <Slider
                    value={compressionRatio}
                    onValueChange={setCompressionRatio}
                    max={85}
                    min={15}
                    step={5}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-3 font-semibold">
                    <span>Low Lossless (15%)</span>
                    <span>Balanced (50%)</span>
                    <span>High Saving (85%)</span>
                  </div>
                </div>
              </div>

              {/* Upload Drop Zone Simulation */}
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-mint transition-colors">
                <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h4 className="font-bold text-navy text-sm mb-1">Simulate Custom Upload</h4>
                <p className="text-gray-400 text-xs mb-4">Upload your custom files and test QuickNet performance.</p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleSimulateDrop("image")}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-xs font-semibold rounded-lg hover:bg-gray-100 text-gray-600"
                  >
                    Image (45MB)
                  </button>
                  <button
                    onClick={() => handleSimulateDrop("video")}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-xs font-semibold rounded-lg hover:bg-gray-100 text-gray-600"
                  >
                    Video (850MB)
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Output Panel (right 7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Output statistics */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-display font-bold text-navy text-xl mb-6 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-mint" /> Real-time Performance Metrics
                </h3>

                <div className="grid sm:grid-cols-3 gap-6 mb-8 text-center">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs text-gray-400 font-bold block mb-1">ORIGINAL SIZE</span>
                    <span className="font-display text-2xl font-extrabold text-navy">{originalSize} MB</span>
                  </div>
                  <div className="p-4 bg-mint/10 rounded-2xl border border-mint/20">
                    <span className="text-xs text-mint/80 font-bold block mb-1">COMPRESSED</span>
                    <span className="font-display text-2xl font-extrabold text-navy">{compressedSize} MB</span>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-700">
                    <span className="text-xs text-emerald-600 font-bold block mb-1">SPACE SAVED</span>
                    <span className="font-display text-2xl font-extrabold">{spaceSaved.toFixed(1)} MB</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Upload Time Progress Comparison */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold text-gray-500 mb-2">
                      <span>Original Upload (100 Mbps connection)</span>
                      <span className="text-navy">{originalUploadTime}s</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-gray-400 h-full rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-semibold text-emerald-600 mb-2">
                      <span>Compressed Upload Time</span>
                      <span className="font-bold">{compressedUploadTime}s ({Math.max(1, Math.round(originalUploadTime / Math.max(1, compressedUploadTime)))}x faster)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-mint h-full rounded-full transition-all duration-300" style={{ width: `${percentSaved}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Simulation Screen */}
              <div className="bg-navy text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center min-h-[220px]">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-mint/5 blur-2xl" />
                
                <AnimatePresence mode="wait">
                  {isUploading && (
                    <motion.div
                      key="uploading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center space-y-4"
                    >
                      <div className="w-12 h-12 border-4 border-mint/20 border-t-mint rounded-full animate-spin mx-auto" />
                      <p className="font-display font-semibold">Uploading & Compressing: {mockFileName}</p>
                      <p className="text-xs text-white/40">Analyzing details with QuickNet AI algorithms...</p>
                    </motion.div>
                  )}

                  {!isUploading && isCompressed && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center space-y-4"
                    >
                      <CheckCircle className="w-14 h-14 text-mint mx-auto" />
                      <div>
                        <h4 className="font-display text-xl font-bold">Successfully Optimized!</h4>
                        <p className="text-sm text-white/60 mt-1">File: {mockFileName || fileTypeDefaults[fileType].name}</p>
                      </div>
                      <div className="inline-flex gap-4 justify-center text-xs mt-2 bg-white/5 p-3 rounded-xl border border-white/10">
                        <div>
                          <span className="text-white/40 block">Final Size</span>
                          <span className="font-bold text-mint">{compressedSize} MB</span>
                        </div>
                        <div className="border-l border-white/10" />
                        <div>
                          <span className="text-white/40 block">Saved Status</span>
                          <span className="font-bold text-mint">{percentSaved}% Smaller</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {!isUploading && !isCompressed && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center space-y-3"
                    >
                      <h4 className="font-display text-lg font-bold">Interactive Sandbox Ready</h4>
                      <p className="text-sm text-white/55 max-w-md mx-auto">
                        Toggle file types on the left panel or adjust the slider to see how QuickNet reduces size instantly.
                      </p>
                      <div className="flex justify-center gap-2 pt-2">
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/50">Lossless Brotli</span>
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/50">Custom ZSTD</span>
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/50">Smart WebP/WebM</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Quality Info Callout */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShieldAlert className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
          <h3 className="font-display font-bold text-navy text-2xl mb-3">No Visual Degradation Promise</h3>
          <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
            For media formats, our algorithms intelligently compress high-frequency details that the human eye cannot perceive. Images remain sharp, videos maintain crisp framerates, and PDFs keep vector-perfect text scaling.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
