import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Search, Calendar, User, Clock, ArrowRight, X, Send } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "post1",
    title: "How we reduced file upload compression times by 70%",
    excerpt: "Behind the scenes of QuickNet's latest AI compression engine. Learn about our multi-threaded algorithms, adaptive buffer chunking, and memory profiling techniques.",
    content: "We are thrilled to detail the release of QuickNet's third-generation AI compression core. File compression has long been a trade-off between performance overhead and compression ratios. By redesigning our pipeline using parallelized Zstandard and customized WebP encoders, we've successfully slashed file upload times by over 70% while maintaining lossless quality.\n\nOur engine dynamically samples the first 256KB of any file to determine its type and structure. From there, it assigns a specialized worker queue to optimize processing in chunked buffers. This prevents browser thread locking, allowing high-performance transfers to scale effortlessly on multi-core platforms.",
    category: "Tech",
    date: "July 12, 2026",
    author: "Arjun Verma (CTO)",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "post2",
    title: "Why Zero-Knowledge encryption is the future of storage security",
    excerpt: "What is zero-knowledge architecture, and why does it matter? Discover how QuickNet encrypts files on the client side so that no one else can inspect them.",
    content: "With data privacy laws tightening across Europe and Asia, zero-knowledge encryption is no longer optional — it is a standard expectation. When you upload a file with zero-knowledge configurations, the file is encrypted locally in your browser/application using a unique AES key BEFORE it reaches our edge routing centers.\n\nThis means that even if a server were compromised, the storage nodes only hold unreadable blocks of data. Since the key is generated and stored locally, QuickNet staff can never decrypt, audit, or access the data. It ensures maximum privacy for finance, medical record transfers, and legal teams sharing raw documents.",
    category: "Security",
    date: "June 28, 2026",
    author: "Divya Nair (Security Architect)",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "post3",
    title: "V1.8 Platform Update: Team Shared Drive Permissions",
    excerpt: "Introducing granular shared folders, download limits, and instant Slack webhooks in QuickNet Workspace. Elevate your collaborative flows today.",
    content: "We're releasing version 1.8 of QuickNet with a focus on workspace collaboration. Many business users wanted directories they could map to team subdivisions without needing individual link transfers. The workspace drive lets you create group workspaces and add members with read-only, download-only, or full editor permissions.\n\nIn addition, you can now toggle instant notifications that ping a slack channel or webhook URL when a client downloads a shared asset. This closes the feedback loop for agency developers waiting on client reviews.",
    category: "Updates",
    date: "June 15, 2026",
    author: "Rahul Sharma (Product VP)",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "post4",
    title: "The Ultimate Guide to Remote Creative Collaboration",
    excerpt: "Sharing 50GB RAW videos doesn't have to be a workflow bottleneck. Learn how modern remote editors handle storage, compression, and high-speed feedback.",
    content: "As creative agencies transition to distributed teams, editing high-resolution video streams poses a major logistics problem. Shipping hard drives is slow; standard cloud storage leads to long download syncs.\n\nModern creators are utilizing smart compression nodes. By using QuickNet's video-specific compression levels, media agencies can reduce raw footage size by 60% without visual frame degradation. This lets editors upload timelines directly from sets, allowing remote VFX artists to pull frames and sync changes in minutes, not hours.",
    category: "Business",
    date: "May 22, 2026",
    author: "Sneha Kulkarni (Operations)",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
  }
];

export default function BlogPage() {
  const navigate = useNavigate();
  useScrollTop();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const categories = ["All", "Tech", "Security", "Business", "Updates"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      toast.error("Please login to subscribe to blog newsletters!");
      navigate("/login");
      return;
    }
    if (!newsletterEmail) return;
    toast.success("Successfully subscribed to QuickNet Blog!");
    setNewsletterEmail("");
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
          <span className="inline-block px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold mb-6">
            QuickNet Publications
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
            The QuickNet <span className="text-mint">Blog</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Insights, updates, tutorials, and security deep dives straight from our design, development, and engineering labs.
          </p>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex bg-white p-1 rounded-xl border border-gray-200 overflow-x-auto gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex-shrink-0 ${
                    selectedCategory === cat
                      ? "bg-navy text-white"
                      : "text-gray-500 hover:text-navy hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-navy placeholder-gray-400 text-sm focus:outline-none focus:border-navy transition-all"
              />
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all group"
                >
                  <div>
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-navy text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-8">
                      <div className="flex gap-4 items-center text-xs text-gray-400 mb-4 font-semibold">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                      </div>
                      <h3 className="font-display font-bold text-navy text-xl mb-3 leading-snug group-hover:text-mint transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-8 pb-8 pt-0 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400 inline-flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {post.author}
                    </span>
                    <button
                      onClick={() => setActivePost(post)}
                      className="text-sm font-bold text-navy hover:text-mint inline-flex items-center gap-1 group/btn"
                    >
                      Read Article <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-400">No blog posts found matching your criteria.</p>
            </div>
          )}

        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl p-8 md:p-12 text-center text-white space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-mint/5 rounded-full blur-2xl" />
            <h3 className="font-display text-2xl font-bold">Never Miss a Publication</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Get the latest compression updates, dev guides, and security protocols delivered directly to your sandbox inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-mint transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-all flex items-center justify-center gap-2 flex-shrink-0"
              >
                <Send className="w-4 h-4" /> Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Article reading Modal */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-gray-100 shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
                <span className="text-xs font-bold text-mint bg-navy px-3 py-1 rounded-full uppercase tracking-wider">
                  {activePost.category}
                </span>
                <button
                  onClick={() => setActivePost(null)}
                  className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-6">
                <div className="flex gap-4 items-center text-xs text-gray-400 font-semibold">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {activePost.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {activePost.readTime}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {activePost.author}</span>
                </div>

                <h2 className="font-display font-extrabold text-navy text-2xl sm:text-3xl leading-snug">
                  {activePost.title}
                </h2>

                <div className="h-64 rounded-2xl overflow-hidden">
                  <img
                    src={activePost.image}
                    alt={activePost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                  {activePost.content}
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex-shrink-0 flex justify-end">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-6 py-2.5 bg-navy text-white hover:bg-navy-light transition-colors rounded-xl font-semibold text-sm"
                >
                  Close Reader
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
