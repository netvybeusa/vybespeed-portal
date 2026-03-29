"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/firebase/firebaseConfig";

export default function UploadMusicPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // ⭐ Load Firebase SDKs on the client only
      const { getAuth } = await import("firebase/auth");
      const { 
        getStorage, 
        ref, 
        uploadBytesResumable, 
        getDownloadURL 
      } = await import("firebase/storage");
      const { 
        getFirestore, 
        doc, 
        setDoc, 
        serverTimestamp 
      } = await import("firebase/firestore");

      const auth = getAuth(app);
      const storage = getStorage(app);
      const db = getFirestore(app);

      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to upload.");
        setUploading(false);
        return;
      }

      // Upload file
      const storageRef = ref(storage, `tracks/${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (err) => {
          console.error(err);
          setError("Upload failed.");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Save metadata
          await setDoc(doc(db, "tracks", `${user.uid}-${Date.now()}`), {
            uid: user.uid,
            title,
            url: downloadURL,
            timestamp: serverTimestamp(),
          });

          router.push("/music");
        }
      );
    } catch (err) {
      console.error("❌ UPLOAD ERROR:", err);
      setError("Upload failed.");
      setUploading(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Upload Music</h1>

      {error && <p className="text-red-400 mb-3">{error}</p>}

      <input
        type="text"
        placeholder="Track Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 bg-white/10 rounded"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
