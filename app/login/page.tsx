"use client";

export const dynamic = "force-dynamic";
export const revalidate = false;

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { app } from "@/firebase/firebaseConfig";

export default function LoginPage() {
  const router = useRouter();

  // Auth context values
  const { user, loading } = useAuth();

  // Local UI state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);

  // Redirect when user is authenticated
  useEffect(() => {
    if (!loading && user) {
      console.log("🔁 User detected, redirecting...");
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  // Email validation
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // LOGIN
  const handleLogin = async () => {
    console.log("🔥 LOGIN CLICKED");

    setError("");
    setSuccess("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setButtonLoading(true);

    try {
      console.log("🚀 Loading Firebase Auth…");

      // ⭐ IMPORT FIREBASE AUTH ON THE CLIENT ONLY
      const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth");

      const auth = getAuth(app);

      console.log("🚀 Attempting Firebase login...");
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ LOGIN SUCCESS");

      // Clear inputs
      setEmail("");
      setPassword("");

      // Redirect handled by useEffect
    } catch (err: any) {
      console.error("❌ LOGIN ERROR:", err);

      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setButtonLoading(false);
    }
  };

  // PASSWORD RESET
  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Enter your email to reset password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email address first.");
      return;
    }

    try {
      // ⭐ IMPORT FIREBASE AUTH ON THE CLIENT ONLY
      const { getAuth, sendPasswordResetEmail } = await import("firebase/auth");

      const auth = getAuth(app);

      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent!");
    } catch (err: any) {
      console.error(err);
      setError("Could not send reset email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f1a] px-4">
      <div className="w-full max-w-md bg-[#11121A]/80 p-8 rounded-2xl shadow-[0_0_25px_rgba(139,92,246,0.35)] border border-purple-700/40 backdrop-blur-md">

        <h2 className="text-center text-2xl font-bold text-purple-300 mb-6">
          Welcome Back
        </h2>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}
        {success && <p className="text-green-400 text-center mb-3">{success}</p>}

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-purple-200 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-purple-700/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-2">
          <label className="block text-purple-200 mb-1">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-purple-700/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* RESET PASSWORD */}
        <div className="text-right mb-6">
          <button
            type="button"
            onClick={handleResetPassword}
            className="text-sm text-purple-400 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="button"
          onClick={handleLogin}
          disabled={buttonLoading}
          className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all disabled:opacity-50"
        >
          {buttonLoading ? "Logging in..." : "Log In"}
        </button>

        {/* SIGNUP */}
        <p className="text-center text-purple-200 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-400 underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
