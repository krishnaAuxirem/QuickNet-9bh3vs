import { useState, useCallback } from "react";
import type { FileRecord } from "@/types";
import { generateId, simulateCompression } from "@/lib/utils";

const STORAGE_KEY = "quicknet_files";

function getFiles(): FileRecord[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    // Seed mock data
    const mock: FileRecord[] = [
      {
        id: "f1",
        name: "Project_Proposal_2024.pdf",
        originalSize: 5242880,
        compressedSize: 1572864,
        compressionLevel: "high",
        uploadedAt: "2024-06-01T10:30:00Z",
        downloadUrl: "#",
        status: "completed",
      },
      {
        id: "f2",
        name: "Team_Photos_Collection.zip",
        originalSize: 52428800,
        compressedSize: 28835840,
        compressionLevel: "medium",
        uploadedAt: "2024-06-05T14:20:00Z",
        downloadUrl: "#",
        status: "completed",
      },
      {
        id: "f3",
        name: "Annual_Report_2023.docx",
        originalSize: 2097152,
        compressedSize: 629145,
        compressionLevel: "high",
        uploadedAt: "2024-06-10T09:15:00Z",
        downloadUrl: "#",
        status: "completed",
      },
      {
        id: "f4",
        name: "Product_Demo_Video.mp4",
        originalSize: 209715200,
        compressedSize: 115343360,
        compressionLevel: "medium",
        uploadedAt: "2024-06-12T16:45:00Z",
        downloadUrl: "#",
        status: "completed",
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mock));
    return mock;
  }
  return JSON.parse(raw);
}

export function useFileStore() {
  const [files, setFiles] = useState<FileRecord[]>(getFiles);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = useCallback(
    async (file: File, compressionLevel: "high" | "medium" | "low") => {
      setUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      clearInterval(interval);
      setUploadProgress(100);

      const compressedSize = simulateCompression(file.size, compressionLevel);
      const newFile: FileRecord = {
        id: generateId(),
        name: file.name,
        originalSize: file.size,
        compressedSize,
        compressionLevel,
        uploadedAt: new Date().toISOString(),
        downloadUrl: "#",
        status: "completed",
      };

      const updated = [newFile, ...files];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setFiles(updated);
      setUploading(false);
      setUploadProgress(0);
      return newFile;
    },
    [files]
  );

  const deleteFile = useCallback(
    (id: string) => {
      const updated = files.filter((f) => f.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setFiles(updated);
    },
    [files]
  );

  return { files, uploading, uploadProgress, uploadFile, deleteFile };
}
