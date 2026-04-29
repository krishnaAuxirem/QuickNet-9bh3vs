export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "business" | "admin";
  avatar?: string;
  phone?: string;
  plan: "free" | "pro" | "enterprise";
  storageUsed: number; // in MB
  storageLimit: number; // in MB
  joinedAt: string;
}

export interface FileRecord {
  id: string;
  name: string;
  originalSize: number; // bytes
  compressedSize: number; // bytes
  compressionLevel: "high" | "medium" | "low";
  uploadedAt: string;
  downloadUrl: string;
  status: "completed" | "processing" | "failed";
  sharedWith?: string[];
  password?: string;
  expiryDate?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  status: "published" | "draft";
  tags: string[];
  coverImage?: string;
}

export interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error";
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: "INR";
  interval: "monthly" | "yearly";
  features: string[];
  highlighted?: boolean;
  storageGB: number;
  transferGB: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface AnalyticsStat {
  label: string;
  value: string;
  change: number;
  icon: string;
}
