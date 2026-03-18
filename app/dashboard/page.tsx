export default function DashboardPage() {
  return (
    <div className="text-white">

      {/* Headline + Tagline */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,0,255,0.35)]">
          Welcome to the Vybe Hub.
        </h1>
        <p className="mt-2 text-white/70 leading-relaxed drop-shadow-[0_0_6px_rgba(0,200,255,0.25)]">
          We’re crafting the next wave of tools designed to amplify your artistry.
        </p>
      </div>

      {/* Quick Actions Row */}
      <div className="flex flex-wrap gap-4 mb-10">
        <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-700 text-white font-semibold shadow-[0_0_12px_rgba(255,0,255,0.4)] hover:shadow-[0_0_18px_rgba(255,0,255,0.6)] transition-all">
          Upload Music
        </button>

        <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-[0_0_12px_rgba(0,200,255,0.4)] hover:shadow-[0_0_18px_rgba(0,200,255,0.6)] transition-all">
          View Library
        </button>

        <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-[0_0_12px_rgba(150,0,255,0.4)] hover:shadow-[0_0_18px_rgba(150,0,255,0.6)] transition-all">
          Edit Profile
        </button>

        <button className="px-5 py-3 rounded-lg bg-gray-800 text-gray-500 font-semibold border border-gray-700 cursor-not-allowed opacity-60">
          Coming Soon
        </button>
      </div>

      {/* ⭐ Neon Divider */}
      <div className="w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-60 rounded-full mb-10"></div>

      {/* Dashboard Card */}
      <div className="mt-6 bg-[#0f0f1a] border border-white/10 rounded-xl p-6 shadow-[0_0_15px_rgba(255,0,255,0.15)] hover:shadow-[0_0_25px_rgba(255,0,255,0.25)] transition-all">
        <h2 className="text-xl font-semibold text-white mb-3">
          Your Latest Uploads
        </h2>

        <p className="text-white/60">
          You haven’t uploaded any tracks yet. Once you do, your latest music will appear here.
        </p>
      </div>

    </div>
  );
}