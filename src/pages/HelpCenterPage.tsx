import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Search, BookOpen, User, CreditCard, ShieldAlert, Settings, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HelpArticle {
  title: string;
  category: string;
  excerpt: string;
}

const ARTICLES: HelpArticle[] = [
  { title: "How to set passwords on shared links", category: "security", excerpt: "Learn how to secure download directories with customized user access passwords." },
  { title: "Upgrading from Starter to Pro/Enterprise", category: "billing", excerpt: "A guide on moving accounts to premium storage plans with more monthly bandwidth." },
  { title: "Configuring API keys in local development environment", category: "setup", excerpt: "Generate development keys and connect command line shell tools with QuickNet." },
  { title: "Custom domains setup guidelines", category: "branding", excerpt: "How to route shared links using company specific subdomains." },
  { title: "Managing active and expired links", category: "account", excerpt: "Deactivate, extend, or monitor links from your user dashboard." },
  { title: "GDPR rights: Deleting all user stored resources", category: "security", excerpt: "Learn how to trigger zero-knowledge server deletion protocols." }
];

export default function HelpCenterPage() {
  useScrollTop();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const categories = [
    { id: "setup", label: "Getting Started", icon: BookOpen },
    { id: "account", label: "Account Control", icon: User },
    { id: "billing", label: "Pricing & Billing", icon: CreditCard },
    { id: "security", label: "Security & GDPR", icon: ShieldAlert },
    { id: "branding", label: "Team Customization", icon: Settings }
  ];

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCat === "all" || article.category === selectedCat;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-navy via-navy-light to-navy-dark relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-mint blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-mint blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="inline-block px-4 py-2 rounded-full bg-mint/15 text-mint text-sm font-semibold">
            Support Portal
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold">
            How Can We <span className="text-mint">Help</span> You?
          </h1>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search help articles (e.g., passwords, API keys)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-navy placeholder-gray-400 text-base border-0 focus:outline-none focus:ring-2 focus:ring-mint shadow-lg transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <button
              onClick={() => setSelectedCat("all")}
              className={`p-6 rounded-2xl border text-center transition-all ${
                selectedCat === "all"
                  ? "border-navy bg-navy text-white"
                  : "border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              <HelpCircle className="w-8 h-8 mx-auto mb-3" />
              <span className="font-bold text-sm block">All Topics</span>
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`p-6 rounded-2xl border text-center transition-all ${
                    selectedCat === cat.id
                      ? "border-navy bg-navy text-white shadow-md"
                      : "border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-3" />
                  <span className="font-bold text-sm block leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filtered Articles list */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-display font-bold text-navy text-xl mb-6">
            {selectedCat === "all" ? "Frequently Read Guides" : "Topic Specific Guides"}
          </h3>

          <div className="space-y-4">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-mint bg-navy px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                        {art.category}
                      </span>
                      <h4 className="font-display font-bold text-navy text-lg group-hover:text-mint transition-colors">
                        {art.title}
                      </h4>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{art.excerpt}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-navy transition-colors flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl border border-gray-100">
                <p className="text-gray-400">No help guides found matching your search term.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still need help CTA */}
      <section className="py-20 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="font-display text-3xl font-bold">Still Need Support?</h2>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Our support desk is operational 24/7/365 to handle account credentials, billing errors, or technical developer questions.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors"
            >
              Contact Support
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:bg-white/10 rounded-xl font-bold transition-colors"
            >
              Read Developers Docs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
