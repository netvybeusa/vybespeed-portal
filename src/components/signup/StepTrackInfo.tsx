"use client";

import React from "react";
import { SignupFormData } from "@/types/SignupForm";

type StepTrackInfoProps = {
  formData: SignupFormData;
  setFormData: (data: Partial<SignupFormData>) => void;
};

export default function StepTrackInfo({ formData, setFormData }: StepTrackInfoProps) {
  return (
    <div className="w-full flex justify-center px-4 py-10 bg-[var(--nv-bg)]">

      {/* Glowing Card */}
      <div
        className="
          w-full max-w-xl 
          bg-[rgba(20,20,20,0.85)]
          rounded-2xl 
          p-8 
          shadow-[0_0_25px_rgba(139,92,246,0.35)]
          border border-purple-700/30
          backdrop-blur-md
        "
      >
        {/* Title */}
        <h3 className="text-xl font-semibold text-purple-300 mb-6 text-center drop-shadow-[0_0_10px_rgba(168,85,247,0.45)]">
          Track Information
        </h3>

        {/* Form Fields */}
        <div className="space-y-5">

          {/* Track Title */}
          <div>
            <label className="block text-purple-200 mb-1">Track Title</label>
            <input
              type="text"
              value={formData.trackTitle}
              onChange={(e) => setFormData({ trackTitle: e.target.value })}
              className="
                w-full max-w-md mx-auto block
                bg-black/40 border border-purple-700/40 rounded-lg px-4 py-2 text-white
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          {/* Track File Upload */}
          <div>
            <label className="block text-purple-200 mb-1">Upload Track File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) =>
                setFormData({ trackFile: e.target.files?.[0] || null })
              }
              className="
                w-full max-w-md mx-auto block
                bg-black/40 border border-purple-700/40 rounded-lg px-4 py-2 text-white
                file:bg-purple-700 file:text-white file:border-none file:px-4 file:py-2
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          {/* Optional Track Link */}
          <div>
            <label className="block text-purple-200 mb-1">Track Link (optional)</label>
            <input
              type="text"
              value={formData.trackLink}
              onChange={(e) => setFormData({ trackLink: e.target.value })}
              className="
                w-full max-w-md mx-auto block
                bg-black/40 border border-purple-700/40 rounded-lg px-4 py-2 text-white
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

        </div>
      </div>
    </div>
  );
}