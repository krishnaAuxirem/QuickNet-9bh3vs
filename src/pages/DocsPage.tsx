import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Terminal, BookOpen, Key, Link as LinkIcon, Shield, Server, FileText, ChevronRight } from "lucide-react";

interface DocTopic {
  id: string;
  title: string;
  icon: any;
  content: React.ReactNode;
}

export default function DocsPage() {
  useScrollTop();
  const [selectedTopic, setSelectedTopic] = useState("intro");

  const topics: DocTopic[] = [
    {
      id: "intro",
      title: "Introduction",
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-bold text-navy">Welcome to QuickNet Docs</h2>
          <p className="text-gray-600 leading-relaxed">
            QuickNet is an ultra-fast file transfer, storage, and compression platform optimized for speed, reliability, and security. We leverage a globally distributed CDN with 50+ edge nodes to route and sync file streams directly across networks.
          </p>
          <div className="p-4 bg-navy/5 border border-navy/10 rounded-2xl">
            <h4 className="font-bold text-navy text-sm mb-1">Key Advantages:</h4>
            <ul className="list-disc list-inside text-gray-600 text-xs sm:text-sm space-y-1">
              <li>Smart adaptive multi-algorithm compression (up to 70% saved).</li>
              <li>AES-256 at-rest and TLS 1.3 in-transit security.</li>
              <li>Zero-knowledge local decryption keys configuration options.</li>
              <li>Comprehensive API bindings and CLI scripting modules.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "quickstart",
      title: "Quick Start Guide",
      icon: Terminal,
      content: (
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-bold text-navy">Get Started in 3 Steps</h2>
          <p className="text-gray-600 leading-relaxed">
            Learn how to register your project workspace, perform your first manual upload, and distribute a shareable secure key.
          </p>
          <ol className="space-y-4 list-decimal list-inside text-gray-600 text-sm">
            <li>
              <span className="font-bold text-navy">Create your Account:</span> Sign up for a free Starter plan at our <a href="/register" className="text-mint hover:underline">registration page</a>.
            </li>
            <li>
              <span className="font-bold text-navy">Drop your first file:</span> Head to your User Dashboard and drag a file (up to 100MB on the free plan) to the upload zone.
            </li>
            <li>
              <span className="font-bold text-navy">Configure parameters:</span> Set custom expiration limits, password encryption keys, or compression ratios, and copy your link.
            </li>
          </ol>
        </div>
      )
    },
    {
      id: "api",
      title: "API Integration",
      icon: Key,
      content: (
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-bold text-navy">REST API Uploads</h2>
          <p className="text-gray-600 leading-relaxed">
            Our REST API allows programmatic file transfers over HTTP multipart formats. Authenticate requests using a Bearer token.
          </p>
          <div className="space-y-2">
            <h4 className="font-bold text-navy text-sm">Endpoint Example:</h4>
            <pre className="bg-navy text-white/80 p-4 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
              {`POST /v1/files HTTP/1.1
Host: api.quicknet.io
Authorization: Bearer qn_live_abc123...
Content-Type: multipart/form-data

file=@/path/to/backup.zip
compression=high`}
            </pre>
          </div>
        </div>
      )
    },
    {
      id: "cli",
      title: "CLI Command Reference",
      icon: FileText,
      content: (
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-bold text-navy">QuickNet Command Line</h2>
          <p className="text-gray-600 leading-relaxed">
            Integrate file transfers into automated backup shell tasks, deployment scripts, or terminal workflows using our official CLI tool.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-navy text-sm mb-1">Install CLI:</h4>
              <pre className="bg-gray-100 text-gray-700 p-3 rounded-lg font-mono text-xs sm:text-sm">
                npm install -g @quicknet/cli
              </pre>
            </div>
            <div>
              <h4 className="font-bold text-navy text-sm mb-1">Authenticate CLI:</h4>
              <pre className="bg-gray-100 text-gray-700 p-3 rounded-lg font-mono text-xs sm:text-sm">
                quicknet auth login --key qn_live_abc123...
              </pre>
            </div>
            <div>
              <h4 className="font-bold text-navy text-sm mb-1">Upload File:</h4>
              <pre className="bg-gray-100 text-gray-700 p-3 rounded-lg font-mono text-xs sm:text-sm">
                quicknet upload ./my_document.pdf --compress high --expire 7d
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "security",
      title: "Encryption Schemes",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-bold text-navy">Cryptography Standard</h2>
          <p className="text-gray-600 leading-relaxed">
            All files stored on QuickNet partitions are protected using symmetric AES-256 algorithms. During the upload handshake, files are packaged via Galois/Counter Mode (GCM) for data authenticity checks.
          </p>
          <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl">
            <h4 className="font-bold text-emerald-950 text-sm mb-1">Zero-Knowledge Key Note:</h4>
            <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">
              When configuring a custom link password, the cryptographic secret key is never sent to our backend. Decryption happens purely on client-side memory spaces during retrieval.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 lg:pt-24 border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-navy">Documentation Portal</h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Explore guides, API routes, configurations, and SDK specifications.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Docs Left Navigation Panel */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-4 space-y-1.5 flex-shrink-0">
            {topics.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    selectedTopic === t.id
                      ? "bg-navy text-white shadow-sm"
                      : "text-gray-500 hover:text-navy hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{t.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50 flex-shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Main Reading Panel */}
          <div className="lg:col-span-9 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm min-h-[450px]">
            {currentTopic.content}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
