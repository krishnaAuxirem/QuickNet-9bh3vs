import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Code, Terminal, Key, Copy, Check, ShieldCheck, Zap, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

export default function ApiAccessPage() {
  const navigate = useNavigate();
  useScrollTop();
  const [activeLang, setActiveLang] = useState("curl");
  const [keyLabel, setKeyLabel] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [copiedKey, setCopiedKey] = useState(false);

  const codeSnippets: Record<string, string> = {
    curl: `curl -X POST https://api.quicknet.io/v1/files \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "X-Compression-Level: high" \\
  -F "file=@/path/to/large_file.zip"`,
    node: `const QuickNet = require('@quicknet/sdk');
const qn = new QuickNet({ apiKey: 'YOUR_API_KEY' });

(async () => {
  const file = await qn.files.upload('./large_file.zip', {
    compression: 'high',
    progress: (p) => console.log(\`Upload: \${p}%\`)
  });
  console.log('Shareable Link:', file.downloadUrl);
})();`,
    python: `import quicknet

qn = quicknet.Client(api_key="YOUR_API_KEY")

file = qn.files.upload(
    file_path="./large_file.zip",
    compression_level="high"
)
print("Shareable Link:", file.download_url)`,
    go: `package main

import (
	"context"
	"fmt"
	"github.com/quicknet/quicknet-go"
)

func main() {
	client := quicknet.NewClient("YOUR_API_KEY")
	file, _ := client.Files.Upload(context.Background(), "./large_file.zip", quicknet.UploadOptions{
		Compression: "high",
	})
	fmt.Println("Shareable Link:", file.DownloadURL)
}`
  };

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      toast.error("Please login to generate sandbox API keys!");
      navigate("/login");
      return;
    }
    if (!keyLabel.trim()) {
      toast.error("Please enter a key description label!");
      return;
    }
    const randHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    const newKey = `qn_live_${randHex}`;
    setGeneratedKey(newKey);
    toast.success("API key generated successfully!");
  };

  const handleCopyKey = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setCopiedKey(true);
    toast.success("API key copied to clipboard!");
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-navy via-navy-light to-navy-dark relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-mint blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-mint blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6">
            <Terminal className="w-4 h-4" /> Developer API
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
            API <span className="text-mint">Access</span> & SDKs
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Integrate QuickNet's high-speed transfers and compression directly into your applications. Scale programmatically using our REST API or native SDKs.
          </p>
        </div>
      </section>

      {/* Code SDK Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* API info columns */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold">
                Quick Integration
              </span>
              <h2 className="font-display text-3xl font-bold text-navy">
                Up and Running in 5 Lines of Code
              </h2>
              <p className="text-gray-600 leading-relaxed">
                QuickNet provides lightweight libraries built for modern runtimes. Connect your storage pipelines, media folders, or backup cron jobs to our compression nodes effortlessly.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Zap, title: "Global CDN Routing", desc: "API uploads are automatically routed to the nearest geographic edge node." },
                  { icon: ShieldCheck, title: "Secure Authentication", desc: "API endpoints are protected using standard Bearer token security protocols." },
                  { icon: BookOpen, title: "Comprehensive SDKs", desc: "Official library packages available for Node.js, Python, Go, PHP, and Rust." }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy text-sm">{item.title}</h4>
                        <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SDK Code Snippet Panel */}
            <div className="lg:col-span-7 bg-navy rounded-3xl overflow-hidden shadow-xl border border-white/5 flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 bg-navy-dark border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                  {["curl", "node", "python", "go"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        activeLang === lang
                          ? "bg-mint text-navy"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-white/80 font-mono text-sm leading-relaxed">
                  <code>{codeSnippets[activeLang]}</code>
                </pre>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live key generator */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy via-navy-light to-navy-dark p-8 md:p-12 rounded-3xl text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-mint/5 blur-3xl" />
            
            <div className="max-w-2xl relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-mint/20 flex items-center justify-center border border-mint/30">
                  <Key className="w-5 h-5 text-mint" />
                </div>
                <h3 className="font-display text-2xl font-bold">API Key Playground</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Generate a sandbox API token to begin scripting right away. These credentials allow full access to upload files under your Starter quota.
              </p>

              <form onSubmit={handleGenerateKey} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="e.g., Development environment, Laptop sync"
                  value={keyLabel}
                  onChange={(e) => setKeyLabel(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-white/30 text-white focus:outline-none focus:border-mint transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-all flex items-center justify-center gap-2"
                >
                  Generate Token
                </button>
              </form>

              {generatedKey && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between gap-4 font-mono text-xs sm:text-sm text-mint overflow-x-auto"
                >
                  <span className="truncate">{generatedKey}</span>
                  <button
                    onClick={handleCopyKey}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-mint transition-all flex-shrink-0"
                    title="Copy API Key"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-mint" /> : <Copy className="w-4 h-4" />}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
