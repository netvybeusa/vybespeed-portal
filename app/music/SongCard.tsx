"use client";

import Image from "next/image";
import { format } from "date-fns";
import AudioPlayer from "@/components/AudioPlayer";

type Song = {
  id: string;
  title: string;
  genre?: string | null;
  url: string;
  coverUrl?: string | null;
  createdAt?: { seconds: number; nanoseconds: number } | null;
};

type SongCardProps = {
  song: Song;
};

export default function SongCard({ song }: SongCardProps) {
  const createdDate =
    song.createdAt?.seconds
      ? new Date(song.createdAt.seconds * 1000)
      : null;

  const displayDate = createdDate
    ? format(createdDate, "MMM d, yyyy")
    : "Just now";

  const coverSrc = song.coverUrl || "/nvm-placeholder.png";

  return (
    <div className="group bg-[#11121A] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_30px_rgba(162,89,255,0.4)] transition">
      
      {/* Cover Art */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={coverSrc}
          alt={song.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Old Play Button (optional to remove later) */}
        <button
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 text-xs font-semibold border border-[rgba(255,255,255,0.2)] hover:bg-black/90 transition"
          onClick={() => {
            const audio = new Audio(song.url);
            audio.play().catch(console.error);
          }}
        >
          Play
        </button>
      </div>

      {/* Text + Player */}
      <div className="p-3">
        <div className="text-sm font-semibold truncate">
          {song.title}
        </div>

        {song.genre && (
          <div className="text-[11px] text-[var(--nv-text-muted)] mt-0.5">
            {song.genre}
          </div>
        )}

        <div className="text-[10px] text-[var(--nv-text-muted)] mt-1">
          {displayDate}
        </div>

        {/* Audio Player */}
        <div className="mt-3">
          <AudioPlayer url={song.url} />
        </div>
      </div>
    </div>
  );
}