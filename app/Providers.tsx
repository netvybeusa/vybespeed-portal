"use client";

import { AuthProvider } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import NowPlayingBar from "./components/NowPlayingBar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PlayerProvider>
        {children}
        <NowPlayingBar />
      </PlayerProvider>
    </AuthProvider>
  );
}