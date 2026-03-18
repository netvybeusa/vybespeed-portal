"use client";

import { useState } from "react";
import { storage, db } from "@/lib/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

type UploadModalProps = {
  onClose: () => void;
};

export default function UploadModal({ onClose }: UploadModalProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!audioFile || !title.trim()) return;

    setUploading(true);

    try {
      // 1) Upload audio
      const audioRef = ref(storage, `songs/${Date.now()}-${audioFile.name}`);
      const audioTask = uploadBytesResumable(audioRef, audioFile);

      await new Promise<void>((resolve, reject) => {
        audioTask.on(
          "state_changed",
          undefined,
          reject,
          () => resolve()
        );
      });

      const audioUrl = await getDownloadURL(audioTask.snapshot.ref);

      // 2) Upload cover (optional)
      let coverUrl: string | null = null;

      if (coverFile) {
        const coverRef = ref(
          storage,
          `covers/${Date.now()}-${coverFile.name}`
        );
        const coverTask = uploadBytesResumable(coverRef, coverFile);

        await new Promise<void>((resolve, reject) => {
          coverTask.on(
            "state_changed",
            undefined,
            reject,
            () => resolve()
          );
        });

        coverUrl = await getDownloadURL(coverTask.snapshot.ref);
      }

      // 3) Save metadata in Firestore
      await addDoc(collection(db, "songs"), {
        title: title.trim(),
        genre: genre.trim() || null,
        url: audioUrl,
        coverUrl: coverUrl, // can be null
        createdAt: serverTimestamp(),
      });

      onClose();
    } catch (err) {
      console.error("Upload failed:", err);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#11121A] p-8 rounded-xl w-[420px] border border-[rgba(255,255,255,0.08)] shadow-[0_0_30px_rgba(162,89,255,0.4)]">
        <h2 className="text-xl font-semibold mb-6">
          Upload Track
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-[var(--nv-text-muted)]">
              Audio file *
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) =>
                setAudioFile(e.target.files?.[0] ?? null)
              }
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[var(--nv-text-muted)]">
              Cover art (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setCoverFile(e.target.files?.[0] ?? null)
              }
              className="w-full text-sm"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Track title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Genre (optional)"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
             className="w-full p-2.5 rounded-lg bg-black/40 border border-blue-500/40 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading || !audioFile || !title.trim()}
          className="w-full mt-6 py-3 rounded-lg bg-[var(--nv-purple)] hover:bg-[var(--nv-blue)] disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm shadow-[var(--nv-glow-purple)] hover:shadow-[var(--nv-glow-blue)] transition"
        >
          {uploading ? "Uploading..." : "Upload track"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-xs text-[var(--nv-text-muted)] hover:text-white transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}