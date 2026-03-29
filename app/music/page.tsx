"use client";

import { useEffect, useState } from "react";
import { app } from "@/firebase/firebaseConfig";

export default function MusicPage() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: any;

    async function loadMusic() {
      try {
        // ⭐ Load Firebase SDKs on the client only
        const { getAuth } = await import("firebase/auth");
        const { 
          getFirestore, 
          collection, 
          onSnapshot 
        } = await import("firebase/firestore");
        const { getStorage } = await import("firebase/storage");

        const auth = getAuth(app);
        const db = getFirestore(app);
        const storage = getStorage(app);

        // Example: load user tracks
        const colRef = collection(db, "tracks");

        unsubscribe = onSnapshot(colRef, (snapshot) => {
          const items: any = [];
          snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
          setTracks(items);
          setLoading(false);
        });

      } catch (error) {
        console.error("❌ MUSIC PAGE ERROR:", error);
        setLoading(false);
      }
    }

    loadMusic();

    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Music</h1>

      {loading ? (
        <p>Loading...</p>
      ) : tracks.length === 0 ? (
        <p>No tracks found.</p>
      ) : (
        <ul className="space-y-3">
          {tracks.map((track: any) => (
            <li key={track.id} className="p-4 bg-white/5 rounded-lg">
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm text-white/60">{track.artistName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
