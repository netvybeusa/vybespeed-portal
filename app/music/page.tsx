"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import UploadModal from "./uploadmodal";
import SongCard from "./SongCard";

type SongDoc = {
  id: string;
  title: string;
  genre?: string | null;
  url: string;
  coverUrl?: string | null;
  createdAt?: { seconds: number; nanoseconds: number } | null;
};

export default function MusicPage() {
  const [songs, setSongs] = useState<SongDoc[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "songs"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data: SongDoc[] = snapshot.docs.map((doc) => {
        const d = doc.data() as any;
        return {
          id: doc.id,
          title: d.title,
          genre: d.genre ?? null,
          url: d.url,
          coverUrl: d.coverUrl ?? null,
          createdAt: d.createdAt ?? null,
        };
      });
      setSongs(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Net Vybe Music Library
          </h1>
          <p className="text-sm text-[var(--nv-text-muted)] mt-1">
            Upload tracks, manage submissions, and preview the vibe.
          </p>
        </div>

        <button
          onClick={() => setShowUpload(true)}
          className="px-5 py-2.5 bg-[var(--nv-purple)] hover:bg-[var(--nv-blue)] rounded-full text-sm font-semibold shadow-[var(--nv-glow-purple)] hover:shadow-[var(--nv-glow-blue)] transition"
        >
          Upload music
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}

        {songs.length === 0 && (
          <div className="col-span-full text-sm text-[var(--nv-text-muted)]">
            No tracks yet. Click <span className="font-semibold">Upload music</span> to add your first one.
          </div>
        )}
      </div>

      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} />
      )}
    </div>
  );
}