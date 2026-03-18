"use client";

import { SignupFormData } from "@/types/SignupForm";

type StepProfileProps = {
  formData: SignupFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
};

export default function StepProfile({ formData, setFormData }: StepProfileProps) {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-md bg-[var(--nv-bg-secondary)] rounded-xl p-6 shadow-[0_0_20px_rgba(162,89,255,0.25)] border border-purple-500/20 flex flex-col gap-4">

        <h2 className="text-xl font-semibold text-purple-300 text-center">
          Artist Profile
        </h2>

        {/* Bio */}
        <textarea
          placeholder="Artist Bio"
          value={formData.bio}
          onChange={(e) =>
            setFormData({ ...formData, bio: e.target.value })
          }
          className="p-3 rounded bg-[#1A1A22] text-white h-32 resize-none border border-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
        />

        {/* Social Handle */}
        <input
          type="text"
          placeholder="Instagram / TikTok Handle"
          value={formData.socialHandle}
          onChange={(e) =>
            setFormData({ ...formData, socialHandle: e.target.value })
          }
          className="p-3 rounded bg-[#1A1A22] text-white border border-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
        />

        {/* Notes */}
        <textarea
          placeholder="Additional Notes (optional)"
          value={formData.notes}
          onChange={(e) =>
            setFormData({ ...formData, notes: e.target.value })
          }
          className="p-3 rounded bg-[#1A1A22] text-white h-24 resize-none border border-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
        />
      </div>
    </div>
  );
}