"use client";

import { useRouter, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { app } from "@/firebase/firebaseConfig";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `px-4 py-2 rounded-lg transition-all ${
      pathname.startsWith(path)
        ? "text-white bg-white/10 shadow-[0_0_12px_rgba(255,0,255,0.4)]"
        : "text-white/60 hover:text-white hover:bg-white/5"
    }`;

  const handleLogout = async () => {
    try {
      // ⭐ Load Firebase Auth on the client only
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth(app);

      await signOut(auth);

      // Clear any cookies you set manually
      document.cookie = "authToken=; Max-Age=0; path=/;";

      router.push("/login");
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0b0b14]/80 backdrop-blur-md border-b border-white/10 shadow-[0_0_20px_rgba(255,0,255,0.15)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <div
          className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,0,255,0.4)] cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          Net Vybe
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center gap-4">

          <button className={linkClasses("/dashboard")} onClick={() => router.push("/dashboard")}>
            Dashboard
          </button>

          <button className={linkClasses("/music")} onClick={() => router.push("/music")}>
            Music
          </button>

          <button className={linkClasses("/profile")} onClick={() => router.push("/profile")}>
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
