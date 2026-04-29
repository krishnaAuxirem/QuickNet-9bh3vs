import type { PricingPlan, Testimonial, FAQ } from "@/types";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Starter",
    price: 0,
    currency: "INR",
    interval: "monthly",
    storageGB: 2,
    transferGB: 5,
    features: [
      "2 GB Storage",
      "5 GB Monthly Transfer",
      "Basic Compression",
      "Email Support",
      "Max file size: 100 MB",
      "3 Active Links",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 799,
    currency: "INR",
    interval: "monthly",
    storageGB: 100,
    transferGB: 500,
    highlighted: true,
    features: [
      "100 GB Storage",
      "500 GB Monthly Transfer",
      "Advanced Compression",
      "Priority Support",
      "Max file size: 5 GB",
      "Unlimited Active Links",
      "Password Protection",
      "Link Expiry Control",
      "Analytics Dashboard",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 2999,
    currency: "INR",
    interval: "monthly",
    storageGB: 1000,
    transferGB: 5000,
    features: [
      "1 TB Storage",
      "5 TB Monthly Transfer",
      "AI-Powered Compression",
      "24/7 Dedicated Support",
      "Max file size: 50 GB",
      "Unlimited Active Links",
      "Password & Expiry Control",
      "Advanced Analytics",
      "Team Collaboration",
      "Custom Domain",
      "API Access",
      "SLA Guarantee",
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rahul Sharma",
    role: "CTO",
    company: "TechVentures India",
    content:
      "QuickNet reduced our file transfer time by 80%. The compression is absolutely incredible — what took 20 minutes now takes under 4 minutes. Our team is blown away.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Priya Menon",
    role: "Creative Director",
    company: "PixelForge Studios",
    content:
      "We deal with massive design files daily. QuickNet's high-compression mode saves us gigabytes every day. The UI is stunning and the transfer speeds are unreal.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Aditya Patel",
    role: "Software Engineer",
    company: "InnovateSoft",
    content:
      "The drag-and-drop interface is smooth, the download links work perfectly, and the analytics give us exactly the insights we need. Best file platform I've used.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Sneha Kulkarni",
    role: "Operations Manager",
    company: "GlobalFreight Co.",
    content:
      "Managing large document workflows was a nightmare before QuickNet. Now we share encrypted files with partners across 12 countries effortlessly.",
    rating: 4,
  },
  {
    id: "t5",
    name: "Vikram Singh",
    role: "Founder",
    company: "MediaBlast Agency",
    content:
      "The Business Dashboard is a game-changer. Real-time analytics, team sharing, and security controls all in one place. Worth every rupee of the Enterprise plan.",
    rating: 5,
  },
];

export const FAQS: FAQ[] = [
  {
    id: "faq1",
    question: "How fast is QuickNet's file transfer?",
    answer:
      "QuickNet uses a globally distributed CDN with 50+ edge nodes across India and worldwide. Transfer speeds can reach up to 10 Gbps depending on your network connection. Most users experience 5–10× faster transfers compared to traditional methods.",
  },
  {
    id: "faq2",
    question: "How does the compression work?",
    answer:
      "We use a proprietary multi-algorithm compression engine. High compression can reduce file sizes by up to 70%, Medium by 45%, and Low by 25%. The algorithm intelligently chooses between zstd, brotli, and lz4 based on file type.",
  },
  {
    id: "faq3",
    question: "Is my data secure on QuickNet?",
    answer:
      "Absolutely. All files are encrypted with AES-256 encryption at rest and TLS 1.3 in transit. You can additionally protect download links with custom passwords and set expiry dates. We are ISO 27001 certified.",
  },
  {
    id: "faq4",
    question: "Can I share files with people who don't have an account?",
    answer:
      "Yes! You can generate shareable links that anyone can access without an account. Pro and Enterprise users can add password protection and expiry dates to these links.",
  },
  {
    id: "faq5",
    question: "What file types are supported?",
    answer:
      "QuickNet supports all file types — documents (PDF, Word, Excel), images (JPG, PNG, RAW), videos (MP4, MOV, AVI), archives (ZIP, RAR), and more. There are no format restrictions.",
  },
  {
    id: "faq6",
    question: "Is there a free plan available?",
    answer:
      "Yes! Our Starter plan is completely free and includes 2 GB storage and 5 GB monthly transfer with no credit card required. Upgrade anytime to unlock more features.",
  },
  {
    id: "faq7",
    question: "How does team sharing work for businesses?",
    answer:
      "Business and Enterprise users can create teams, invite members via email, set role-based permissions, and share files or folders instantly. Real-time collaboration with transfer status updates is included.",
  },
];

export const FEATURES = [
  {
    icon: "Zap",
    title: "Lightning Fast Transfers",
    description:
      "Transfer files at blazing speeds up to 10 Gbps using our global CDN with 50+ edge nodes across India and the world.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: "Archive",
    title: "Smart Compression",
    description:
      "Reduce file sizes by up to 70% with our AI-powered compression engine. Choose High, Medium, or Low compression levels.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: "Shield",
    title: "Military-Grade Security",
    description:
      "AES-256 encryption, TLS 1.3, password-protected links, and auto-expiry. Your files are always protected.",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: "Users",
    title: "Team Collaboration",
    description:
      "Share with your entire team instantly. Set roles, permissions, and track who accessed what with full audit logs.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: "BarChart3",
    title: "Real-time Analytics",
    description:
      "Track transfer speeds, compression ratios, storage usage, and download counts with interactive dashboards.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: "Globe",
    title: "Global CDN Network",
    description:
      "50+ edge nodes across 30 countries ensure your files reach their destination at maximum speed, every time.",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Upload Your Files",
    description:
      "Drag and drop files into the upload zone or browse your computer. Supports all file types up to 50 GB.",
    icon: "Upload",
  },
  {
    step: 2,
    title: "Choose Compression",
    description:
      "Select High, Medium, or Low compression. Our AI engine instantly compresses while preserving quality.",
    icon: "Sliders",
  },
  {
    step: 3,
    title: "Share & Transfer",
    description:
      "Get a secure shareable link instantly. Set passwords and expiry dates for full control.",
    icon: "Share2",
  },
  {
    step: 4,
    title: "Track Everything",
    description:
      "Monitor download counts, transfer speeds, and storage usage from your real-time analytics dashboard.",
    icon: "BarChart2",
  },
];

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  youtube: "https://youtube.com",
};

export const MOCK_ANALYTICS = {
  weekly: [
    { name: "Mon", transfers: 42, compression: 38, speed: 720 },
    { name: "Tue", transfers: 61, compression: 55, speed: 850 },
    { name: "Wed", transfers: 55, compression: 48, speed: 790 },
    { name: "Thu", transfers: 78, compression: 70, speed: 920 },
    { name: "Fri", transfers: 92, compression: 85, speed: 1100 },
    { name: "Sat", transfers: 48, compression: 42, speed: 680 },
    { name: "Sun", transfers: 35, compression: 30, speed: 590 },
  ],
  monthly: [
    { name: "Jan", transfers: 1200, compression: 1050, speed: 780 },
    { name: "Feb", transfers: 1450, compression: 1300, speed: 820 },
    { name: "Mar", transfers: 1800, compression: 1600, speed: 890 },
    { name: "Apr", transfers: 2100, compression: 1900, speed: 950 },
    { name: "May", transfers: 1950, compression: 1750, speed: 910 },
    { name: "Jun", transfers: 2400, compression: 2200, speed: 1050 },
  ],
};
