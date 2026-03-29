"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const [artistName, setArtistName] = useState<string | null>(null);

  // 🔐 Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // 🎤 Fetch artist name (by UID - correct approach)
  useEffect(() => {
    const fetchArtistName = async () => {
      if (!user?.uid) return;

      try {
        const q = query(
          collection(db, "submissions"),
          where("uid", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const docs = snapshot.docs.map((doc) => doc.data());

          const latest = docs.sort(
            (a, b) =>
              (b.timestamp?.seconds || 0) -
              (a.timestamp?.seconds || 0)
          )[0];

          setArtistName(latest.artistName || "");
        } else {
          setArtistName("");
        }
      } catch (error) {
        console.error("Error fetching artist name:", error);
      }
    };

    fetchArtistName();
  }, [user]);

  // ⏳ Loading state
  if (loading || artistName === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f1a] text-purple-300 text-lg">
        Loading your artist hub...
      </div>
    );
  }

  if (!user) return null;

  // 🎤 Final display name logic
  const displayName =
    artistName ||
    user.displayName ||
    user.email?.split("@")[0] ||
    "Artist";

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white px-6 py-8 space-y-10">

      {/* 🌟 HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-purple-900/40 via-black/40 to-purple-800/30 border border-purple-700/40 shadow-[0_0_40px_rgba(139,92,246,0.35)]">

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_purple,_transparent_60%)]" />

        <h1 className="text-4xl font-extrabold text-purple-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
          Welcome, {displayName} 🎤
        </h1>

        <p className="text-purple-200 mt-3 text-lg max-w-xl">
          Your artist hub is live. Upload music, grow your presence, and manage your Vybe.
        </p>
      </div>

      {/* ⚡ QUICK ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div
          onClick={() => router.push("/music/upload")}
          className="cursor-pointer rounded-2xl p-6 bg-black/40 border border-purple-700/40 hover:border-purple-400 transition-all duration-200 shadow-[0_0_25px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:scale-[1.03]"
        >
          <h3 className="text-xl font-semibold text-purple-300 mb-2">
            Upload Music
          </h3>
          <p className="text-gray-400 text-sm">
            Share your latest track with the platform.
          </p>
        </div>

        <div
          onClick={() => router.push("/profile")}
          className="cursor-pointer rounded-2xl p-6 bg-black/40 border border-purple-700/40 hover:border-purple-400 transition-all duration-200 shadow-[0_0_25px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:scale-[1.03]"
        >
          <h3 className="text-xl font-semibold text-purple-300 mb-2">
            Edit Profile
          </h3>
          <p className="text-gray-400 text-sm">
            Update your artist identity and branding.
          </p>
        </div>

        <div
          onClick={() => router.push("/music")}
          className="cursor-pointer rounded-2xl p-6 bg-black/40 border border-purple-700/40 hover:border-purple-400 transition-all duration-200 shadow-[0_0_25px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:scale-[1.03]"
        >
          <h3 className="text-xl font-semibold text-purple-300 mb-2">
            View Library
          </h3>
          <p className="text-gray-400 text-sm">
            Browse your uploaded music and submissions.
          </p>
        </div>

      </div>

      {/* 🟣 DASHBOARD PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-2xl p-6 bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">
            Recent Uploads
          </h2>
          <p className="text-gray-400 text-sm">
            Your latest tracks will appear here once uploaded.
          </p>
        </div>

        <div className="rounded-2xl p-6 bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">
            Profile Status
          </h2>
          <p className="text-gray-400 text-sm">
            Keep your artist profile complete and up to date.
          </p>
        </div>

        <div className="rounded-2xl p-6 bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">
            Platform Insights
          </h2>
          <p className="text-gray-400 text-sm">
            Analytics and engagement tools coming soon.
          </p>
        </div>

      </div>

      {/* 🔐 LOGOUT */}
      <div className="pt-6">
        <button
          onClick={async () => {
            await signOut();
            router.push("/login");
          }}
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition shadow-[0_0_20px_rgba(239,68,68,0.6)]"
        >
          Logout
        </button>
      </div>

    </div>
  );
}