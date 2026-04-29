import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, X, File, Loader2 } from "lucide-react";
import { useFileStore } from "@/hooks/useFileStore";
import { formatBytes } from "@/lib/utils";
import { toast } from "sonner";

export default function FileUploadZone() {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compression, setCompression] = useState<"high" | "medium" | "low">("medium");
  const fileRef = useRef<HTMLInputElement>(null);
  const { uploading, uploadProgress, uploadFile } = useFileStore();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const result = await uploadFile(selectedFile, compression);
    toast.success(`"${result.name}" uploaded and compressed successfully!`);
    setSelectedFile(null);
  };

  const compressionOptions = [
    { value: "high", label: "High", desc: "~70% smaller", color: "text-green-600", bg: "bg-green-50 border-green-200" },
    { value: "medium", label: "Medium", desc: "~45% smaller", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
    { value: "low", label: "Low", desc: "~25% smaller", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  ] as const;

  return (
    <div className="space-y-5">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileRef.current?.click()}
        className={`upload-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
          dragOver ? "border-navy bg-navy/8 scale-[1.01]" : ""
        } ${selectedFile ? "cursor-default" : ""}`}
      >
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />

        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center">
                  <File className="w-6 h-6 text-navy" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-navy text-sm">{selectedFile.name}</p>
                  <p className="text-gray-500 text-xs">{formatBytes(selectedFile.size)}</p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                className="w-8 h-8 rounded-full bg-red-100 text-red-500 hover:bg-red-200 flex items-center justify-center flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
                className="w-16 h-16 rounded-2xl bg-navy/10 flex items-center justify-center mx-auto mb-4"
              >
                <Upload className="w-8 h-8 text-navy" />
              </motion.div>
              <p className="font-semibold text-navy mb-1">Drag & drop your files here</p>
              <p className="text-gray-500 text-sm">or <span className="text-navy underline">browse to upload</span></p>
              <p className="text-gray-400 text-xs mt-2">All file types supported • Max 50 GB</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compression Level */}
      <div>
        <p className="text-sm font-semibold text-navy mb-3">Compression Level</p>
        <div className="grid grid-cols-3 gap-3">
          {compressionOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCompression(opt.value)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                compression === opt.value
                  ? opt.bg + " border-current " + opt.color
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <p className={`font-bold text-sm ${compression === opt.value ? opt.color : "text-gray-700"}`}>
                {opt.label}
              </p>
              <p className={`text-xs ${compression === opt.value ? opt.color : "text-gray-400"}`}>
                {opt.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      {uploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Compressing & uploading...
            </span>
            <span className="font-semibold text-navy">{Math.round(uploadProgress)}%</span>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-navy to-[#00FFC2] rounded-full progress-glow"
              style={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="w-full py-3.5 bg-navy text-white rounded-xl font-bold hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {uploading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
        ) : (
          <><Upload className="w-5 h-5" /> Upload & Compress</>
        )}
      </button>

      {!selectedFile && !uploading && (
        <p className="text-center text-xs text-gray-400">
          <CheckCircle className="w-3 h-3 inline mr-1 text-green-500" />
          Files are encrypted immediately upon upload
        </p>
      )}
    </div>
  );
}
