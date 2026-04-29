import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function formatMB(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb.toFixed(0)} MB`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getCompressionRatio(original: number, compressed: number): string {
  const ratio = ((original - compressed) / original) * 100;
  return `${ratio.toFixed(1)}%`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + "..." : str;
}

export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toUpperCase() || "FILE";
}

export function getFileTypeColor(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const colorMap: Record<string, string> = {
    pdf: "text-red-500",
    doc: "text-blue-500",
    docx: "text-blue-500",
    xls: "text-green-500",
    xlsx: "text-green-500",
    jpg: "text-yellow-500",
    jpeg: "text-yellow-500",
    png: "text-purple-500",
    mp4: "text-pink-500",
    zip: "text-orange-500",
    rar: "text-orange-500",
  };
  return colorMap[ext || ""] || "text-gray-500";
}

export function simulateCompression(originalSize: number, level: "high" | "medium" | "low"): number {
  const ratios = { high: 0.3, medium: 0.55, low: 0.75 };
  return Math.floor(originalSize * ratios[level]);
}
