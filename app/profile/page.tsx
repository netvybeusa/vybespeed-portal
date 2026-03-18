"use client";

import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }

    if (user) {
      setName(user.displayName || "");
    }
  }, [user, loading, router]);

  if (loading) return <div className="p-8">Loading...</div>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    alert("Profile saved! (Database hook goes here.)");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">

      {/* PROFILE HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-indigo-200 flex items-center justify-center text-3xl font-semibold text-indigo-700">
          {name ? name[0] : user?.email?.[0]?.toUpperCase()}

        </div>

        <div>
          <h1 className="text-2xl font-bold text-indigo-700">My Profile</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Profile Details</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-left font-semibold mb-1">Artist Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-200"
              placeholder="Your artist or stage name"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-left font-semibold mb-1">Genre</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-200"
              placeholder="Ex: Hip-Hop, R&B, Pop"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-left font-semibold mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border rounded h-28 focus:ring focus:ring-indigo-200"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
