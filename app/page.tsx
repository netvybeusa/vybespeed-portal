"use client";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[var(--nv-bg)] overflow-hidden">

      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(162,89,255,0.25),transparent_70%)]"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-8">

        {/* Neon Ring + Logo */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          
          {/* Outer Neon Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--nv-purple)] to-[var(--nv-blue)] p-1 shadow-[var(--nv-glow-purple)]"></div>

          {/* Inner Dark Circle */}
          <div className="absolute inset-0 rounded-full bg-[var(--nv-bg)]"></div>

          {/* Logo */}
          <img
            src="/logo.png"
            alt="Net Vybe Logo"
            className="w-50 h-50 drop-shadow-[var(--nv-glow-blue)]"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white drop-shadow-[var(--nv-glow-purple)]">
          The Net Vybe Music Portal
                </h1>

        {/* Headline */}
<h1 className="text-4xl font-bold text-white drop-shadow-[var(--nv-glow-purple)]">
  Welcome to the Vybe.
</h1>

{/* Tagline */}
<p className="text-white font-semibold max-w-md leading-relaxed">
  Your journey starts here — let’s get you set up.
</p>

{/* Get Started Button */}
<a
  href="/signup"
  className="px-10 py-3 rounded-full bg-[var(--nv-purple)] text-white font-semibold shadow-[var(--nv-glow-purple)] hover:bg-[var(--nv-blue)] hover:shadow-[var(--nv-glow-blue)] transition-all"
>
  Get Started
</a>

{/* Sign In Link */}
<p className="text-white font-semibold max-w-md leading-relaxed">
  Already part of the Vybe?{" "}
  <a
    href="/login"
    className="text-[var(--nv-blue)] underline hover:text-[var(--nv-purple)] transition font-bold"
  >
    Sign in here
  </a>
</p>
        {/* Login Button */}
        <a
          href="/login"
          className="px-10 py-3 rounded-full bg-[var(--nv-purple)] text-white font-semibold shadow-[var(--nv-glow-purple)] hover:bg-[var(--nv-blue)] hover:shadow-[var(--nv-glow-blue)] transition-all"
        >
          Login
        </a>
      </div>
    </main>
  );
}