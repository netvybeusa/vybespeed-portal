"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/firebase/firebaseConfig";

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let unsub: any;

    async function loadProfile() {
      try {
        // ⭐ Load Firebase SDKs on the client only
        const { getAuth } = await import("firebase/auth");
        const { getFirestore, doc, getDoc } = await import("firebase/firestore");

        const auth = getAuth(app);
        const db = getFirestore(app);

        const user = auth.currentUser;
        if (!user) {
          router.replace("/login");
          return;
        }

        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          setProfile({});
        }

        setLoading(false);
      } catch (err) {
        console.error("❌ PROFILE LOAD ERROR:", err);
        setError("Failed to load profile.");
        setLoading(false);
      }
    }

    loadProfile();

    return () => unsub && unsub();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const { getAuth } = await import("firebase/auth");
      const { getFirestore, doc, updateDoc } = await import("firebase/firestore");

      const auth = getAuth(app);
      const db = getFirestore(app);

      const user = auth.currentUser;
      if (!user) {
        setError("Not logged in.");
        setSaving(false);
        return;
      }

      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, profile);

      setSaving(false);
    } catch (err) {
      console.error("❌ PROFILE SAVE ERROR:", err);
      setError("Failed to save profile.");
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-white">Loading profile…</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      {error && <p className="text-red-400 mb-3">{error}</p>}

      <input
        type="text"
        placeholder="Display Name"
        value={profile?.displayName || ""}
        onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
        className="w-full mb-4 p-2 bg-white/10 rounded"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
