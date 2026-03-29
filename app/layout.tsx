"use client";

export const dynamic = "force-dynamic";

import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import NowPlayingBar from "./components/NowPlayingBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PlayerProvider>

            {children}

            <NowPlayingBar />

          </PlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
