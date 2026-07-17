import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Sparkles, ThumbsUp, PlusCircle, Search, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface FeatureRequest {
  id: string;
  title: string;
  desc: string;
  votes: number;
  category: string;
  status: "planned" | "in-progress" | "completed";
}

export default function FeatureRequestsPage() {
  useScrollTop();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [upvotedItems, setUpvotedItems] = useState<string[]>([]);
  const [reqTitle, setReqTitle] = useState("");
  const [reqDesc, setReqDesc] = useState("");
  const [reqCat, setReqCat] = useState("Integrations");
  const [showAddForm, setShowAddForm] = useState(false);

  const [features, setFeatures] = useState<FeatureRequest[]>([
    { id: "feat1", title: "Official VS Code Extension", desc: "Allows developers to upload files and generate compression keys directly from VS Code text workspace folders.", votes: 242, category: "Integrations", status: "in-progress" },
    { id: "feat2", title: "Custom Webhook endpoints on download completions", desc: "Pings user configured third-party webhook endpoints whenever clients download resources.", votes: 180, category: "Core", status: "completed" },
    { id: "feat3", title: "Selective compression overrides for image formats", desc: "Set custom ZSTD vs Brotli levels based on exact file extensions (.raw, .webp, .png).", votes: 94, category: "Performance", status: "planned" }
  ]);

  const handleUpvote = (id: string) => {
    if (upvotedItems.includes(id)) {
      // Downvote / Undo
      setUpvotedItems(upvotedItems.filter((i) => i !== id));
      setFeatures(features.map((f) => (f.id === id ? { ...f, votes: f.votes - 1 } : f)));
      toast.info("Upvote removed");
    } else {
      // Upvote
      setUpvotedItems([...upvotedItems, id]);
      setFeatures(features.map((f) => (f.id === id ? { ...f, votes: f.votes + 1 } : f)));
      toast.success("Feature request upvoted!");
    }
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle || !reqDesc) {
      toast.error("Please fill in the feature title and description!");
      return;
    }
    const newRequest: FeatureRequest = {
      id: `feat-${Date.now()}`,
      title: reqTitle,
      desc: reqDesc,
      votes: 1,
      category: reqCat,
      status: "planned"
    };
    setFeatures([newRequest, ...features]);
    setUpvotedItems([...upvotedItems, newRequest.id]);
    setReqTitle("");
    setReqDesc("");
    setShowAddForm(false);
    toast.success("Feature request submitted to board!");
  };

  const categories = ["All", "Integrations", "Core", "Performance", "UI"];

  const filteredFeatures = features.filter((feat) => {
    const matchesSearch = feat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          feat.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCat === "All" || feat.category === selectedCat;
    return matchesSearch && matchesCategory;
  });

  const statusBadges = {
    planned: "bg-blue-50 text-blue-700 border-blue-100",
    "in-progress": "bg-yellow-50 text-yellow-700 border-yellow-100",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-100"
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
          <span className="inline-block px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6">
            Product Roadmaps
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
            Feature <span className="text-mint">Requests</span> Board
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Suggest new ideas, vote on features planned by our team, and help guide the development of the QuickNet platform.
          </p>
        </div>
      </section>

      {/* Requests board container */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left requests feed (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-navy focus:bg-white transition-all"
                  />
                </div>

                <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCat(cat)}
                      className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition-all ${
                        selectedCat === cat
                          ? "bg-navy border-navy text-white shadow-sm"
                          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed list */}
              <div className="space-y-4">
                {filteredFeatures.map((feat) => {
                  const hasUpvoted = upvotedItems.includes(feat.id);
                  return (
                    <div key={feat.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-5 hover:shadow-md transition-all">
                      
                      {/* Upvote controller */}
                      <button
                        onClick={() => handleUpvote(feat.id)}
                        className={`w-14 p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all flex-shrink-0 ${
                          hasUpvoted
                            ? "bg-mint/20 border-mint text-navy font-bold"
                            : "border-gray-200 bg-gray-50/50 hover:bg-gray-100 text-gray-400 hover:text-navy"
                        }`}
                      >
                        <ThumbsUp className={`w-4.5 h-4.5 ${hasUpvoted ? "fill-navy text-navy" : ""}`} />
                        <span className="text-xs">{feat.votes}</span>
                      </button>

                      {/* Request Details */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-[10px] font-bold text-navy bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider">
                            {feat.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${statusBadges[feat.status]}`}>
                            {feat.status.replace("-", " ")}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-navy text-base sm:text-lg leading-snug">{feat.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Form Card (4 cols) */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-mint" />
                <h3 className="font-display font-bold text-navy text-xl">Submit Feature Request</h3>
              </div>

              <form onSubmit={handleCreateRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Feature Title *</label>
                  <input
                    type="text"
                    required
                    value={reqTitle}
                    onChange={(e) => setReqTitle(e.target.value)}
                    placeholder="Brief name of idea"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Target Category *</label>
                  <select
                    value={reqCat}
                    onChange={(e) => setReqCat(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy cursor-pointer"
                  >
                    <option value="Integrations">Integrations & Plugins</option>
                    <option value="Core">Core Engine / Sharing</option>
                    <option value="Performance">Upload & Compression Speed</option>
                    <option value="UI">Dashboard & User Interface</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Detailed Pitch *</label>
                  <textarea
                    rows={4}
                    required
                    value={reqDesc}
                    onChange={(e) => setReqDesc(e.target.value)}
                    placeholder="Outline what problem this solves and how it should work..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-navy text-white hover:bg-navy-light font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> Submit Suggestion
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
