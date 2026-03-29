"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // 🔐 Protect route (SAFE)
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // ⏳ Wait for Firebase
  if (loading) {
    return (
      <div className="text-white text-center mt-10">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  // 🎤 Artist name (temporary from email)
  const artistName = user.email?.split("@")[0];

  return (
    <div className="flex flex-col gap-8 p-6 text-white min-h-screen bg-[#0f0f1a]">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]">
          Welcome, {artistName} 🎤
        </h1>
        <p className="text-gray-300 mt-1">
          Manage your music, profile, and artist tools all in one place.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <button
          onClick={() => router.push("/music")}
          className="bg-purple-700/40 border border-purple-700/40 rounded-xl p-4 hover:bg-purple-700 transition shadow-[0_0_25px_rgba(139,92,246,0.35)]"
        >
          Upload Music
        </button>

        <button
          onClick={() => router.push("/profile")}
          className="bg-purple-700/40 border border-purple-700/40 rounded-xl p-4 hover:bg-purple-700 transition shadow-[0_0_25px_rgba(139,92,246,0.35)]"
        >
          Edit Profile
        </button>

        <button
          onClick={() => router.push("/music")}
          className="bg-purple-700/40 border border-purple-700/40 rounded-xl p-4 hover:bg-purple-700 transition shadow-[0_0_25px_rgba(139,92,246,0.35)]"
        >
          View Library
        </button>

      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-black/40 border border-purple-700/40 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.35)]">
          <h2 className="text-xl font-semibold text-purple-300 mb-2">
            Recent Uploads
          </h2>
          <p className="text-gray-400">
            Your latest tracks will appear here.
          </p>
        </div>

        <div className="bg-black/40 border border-purple-700/40 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.35)]">
          <h2 className="text-xl font-semibold text-purple-300 mb-2">
            Profile Status
          </h2>
          <p className="text-gray-400">
            Keep your artist profile up to date.
          </p>
        </div>

        <div className="bg-black/40 border border-purple-700/40 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.35)]">
          <h2 className="text-xl font-semibold text-purple-300 mb-2">
            Platform Insights
          </h2>
          <p className="text-gray-400">
            Analytics and engagement coming soon.
          </p>
        </div>

      </div>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={async () => {
            await signOut();
            router.replace("/login");
          }}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition shadow-[0_0_15px_rgba(239,68,68,0.6)]"
        >
          Logout
        </button>
      </div>

    </div>
  );
}