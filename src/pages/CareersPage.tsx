import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Briefcase, Globe, Heart, BookOpen, Coffee, ChevronDown, ChevronUp, Send, X } from "lucide-react";
import { toast } from "sonner";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  description: string;
  requirements: string[];
}

const JOBS: JobOpening[] = [
  {
    id: "job1",
    title: "Senior Backend Engineer (Rust / Go)",
    department: "Engineering",
    location: "Bengaluru, India (Hybrid)",
    experience: "5+ years",
    description: "We are looking for a Senior Systems Engineer to optimize our globally distributed file storage and retrieval pipeline. You will design ultra-low latency protocols, parallel compression workers, and secure edge endpoints.",
    requirements: [
      "Extensive experience with Go or Rust systems programming.",
      "Solid understanding of concurrency, socket programming, and memory layouts.",
      "Experience scaling multi-region cloud services (AWS/GCP) and CDN edge architectures.",
      "Strong fundamentals in cryptography (AES, TLS, public key structures)."
    ]
  },
  {
    id: "job2",
    title: "Senior React UI Developer",
    department: "Engineering",
    location: "Remote (India)",
    experience: "3+ years",
    description: "Join our frontend squad to build premium, fast React components. You will refine our drag-and-drop file pipelines, design real-time dashboard visualization layers, and enhance user verification animations.",
    requirements: [
      "Expert knowledge of React, TypeScript, and modern state architectures.",
      "Proficient in Framer Motion, Tailwind CSS, and headless UI primitives.",
      "Experience optimizing client-side performance, chunked file readers, and rendering profiles.",
      "Obsessive attention to UI detail and smooth transitions."
    ]
  },
  {
    id: "job3",
    title: "Lead Product Designer",
    department: "Design",
    location: "Bengaluru, India (Hybrid)",
    experience: "4+ years",
    description: "Define the visual signature of QuickNet. You will run user studies, draft interactive design layouts, shape our web dashboard systems, and champion aesthetic details throughout the product lifecycle.",
    requirements: [
      "Portfolio showcasing highly polished, interactive SaaS product designs.",
      "Strong skills in typography, grid spacing, visual hierarchy, and animation prototype design.",
      "Deep understanding of design systems and Figma component engineering.",
      "Ability to translate complex developer API structures into friendly dashboards."
    ]
  },
  {
    id: "job4",
    title: "Technical Support Engineer",
    department: "Support",
    location: "Remote (India)",
    experience: "1+ years",
    description: "Help our growing developer and business community succeed. You will debug API uploads, assist with subscription inquiries, respond to infrastructure alerts, and build documentation updates.",
    requirements: [
      "Basic understanding of REST APIs, HTTP protocols, and cURL requests.",
      "Strong written communication skills and high empathy for technical users.",
      "Ability to write basic code examples (JavaScript, Python, or Go).",
      "Familiarity with ticket systems and debugging tools."
    ]
  }
];

export default function CareersPage() {
  useScrollTop();
  const [selectedDept, setSelectedDept] = useState("All");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<JobOpening | null>(null);

  // Form State
  const [appName, setAppName] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [appResume, setAppResume] = useState("");
  const [appCover, setAppCover] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = ["All", "Engineering", "Design", "Support"];

  const filteredJobs = JOBS.filter(
    (job) => selectedDept === "All" || job.department === selectedDept
  );

  const toggleExpand = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName || !appEmail || !appResume) {
      toast.error("Please fill in all required fields!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Application submitted successfully! Our talent team will review it.");
      setApplyJob(null);
      setAppName("");
      setAppEmail("");
      setAppResume("");
      setAppCover("");
    }, 1500);
  };

  const benefits = [
    { icon: Globe, title: "Remote-First Flex", desc: "Work from anywhere in India, or join our hybrid collaborative hub in Koramangala, Bengaluru." },
    { icon: Heart, title: "Wellness & Health", desc: "Comprehensive health insurance for you and your dependents, plus mental health support plans." },
    { icon: BookOpen, title: "Growth Budget", desc: "₹50,000 annual education stipend for courses, workshops, technical books, and certifications." },
    { icon: Coffee, title: "Workstation Setup", desc: "We provide M3 Macbook Pros, 4K monitors, ergonomic chairs, and monthly high-speed internet subsidies." }
  ];

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
            Join the Mission
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-6">
            Shape the Future of <span className="text-mint">File Transfer</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Help us build performance-obsessed infrastructure that empowers millions of professionals worldwide to share their files effortlessly.
          </p>
        </div>
      </section>

      {/* Culture & Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-4">
              Team Culture
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy">
              Why You'll Love QuickNet
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              We value deep focus, structural simplicity, execution speed, and respectful team dynamics.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <h4 className="font-display font-bold text-navy text-lg mb-2">{b.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-navy/8 text-navy text-sm font-semibold mb-4">
              Opportunities
            </span>
            <h2 className="font-display text-3xl font-bold text-navy">
              Current Open Roles
            </h2>
          </div>

          {/* Department Filter */}
          <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  selectedDept === dept
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Openings List */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                const isExpanded = expandedJob === job.id;
                return (
                  <div key={job.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all">
                    {/* Job Header */}
                    <button
                      onClick={() => toggleExpand(job.id)}
                      className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-mint bg-navy px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {job.department}
                        </span>
                        <h3 className="font-display font-bold text-navy text-lg sm:text-xl">{job.title}</h3>
                        <div className="flex gap-4 text-xs text-gray-400 font-semibold">
                          <span>Location: {job.location}</span>
                          <span>Experience: {job.experience}</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    {/* Job Details Expansion */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-gray-50 bg-gray-50/20"
                        >
                          <div className="p-6 md:p-8 space-y-6">
                            <div>
                              <h4 className="text-navy font-bold text-sm uppercase tracking-wider mb-2">Role Overview</h4>
                              <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
                            </div>

                            <div>
                              <h4 className="text-navy font-bold text-sm uppercase tracking-wider mb-3">Key Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx} className="flex gap-2 text-gray-600 text-sm leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2 flex-shrink-0" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-4">
                              <button
                                onClick={() => setApplyJob(job)}
                                className="px-6 py-3 bg-navy text-white hover:bg-navy-light rounded-xl font-bold text-sm transition-colors"
                              >
                                Apply for this role
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl border border-gray-100">
                <p className="text-gray-400">No active job listings found for this department.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      <AnimatePresence>
        {applyJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden flex flex-col border border-gray-100 shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h3 className="font-display font-bold text-navy text-lg">Apply for Job</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{applyJob.title}</p>
                </div>
                <button
                  onClick={() => setApplyJob(null)}
                  className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-navy transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={appEmail}
                    onChange={(e) => setAppEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Resume URL *</label>
                  <input
                    type="url"
                    required
                    value={appResume}
                    onChange={(e) => setAppResume(e.target.value)}
                    placeholder="Link to PDF, Google Drive, or Notion Resume"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Cover Letter or Note (Optional)</label>
                  <textarea
                    rows={4}
                    value={appCover}
                    onChange={(e) => setAppCover(e.target.value)}
                    placeholder="Tell us why you want to join QuickNet..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:bg-white transition-all text-navy resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-navy text-white hover:bg-navy-light font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
