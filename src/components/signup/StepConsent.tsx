"use client";

import React from "react";
import { SignupFormData } from "@/types/SignupForm";

type StepConsentProps = {
  formData: SignupFormData;
  setFormData: (data: Partial<SignupFormData>) => void;
};

export default function StepConsent({ formData, setFormData }: StepConsentProps) {
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
          Consent & Terms
        </h3>

        <div className="space-y-6 text-purple-200">

          {/* Terms Consent */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentTerms}
              onChange={(e) => setFormData({ consentTerms: e.target.checked })}
              className="
                w-5 h-5 rounded 
                bg-black/40 border border-purple-700/40 
                checked:bg-purple-600 checked:border-purple-500
                focus:ring-purple-500
              "
            />
            <span className="leading-snug">
              I agree to the platform terms and confirm that I have the rights to submit this track.
            </span>
          </label>

          {/* Contact Consent */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentContact}
              onChange={(e) => setFormData({ consentContact: e.target.checked })}
              className="
                w-5 h-5 rounded 
                bg-black/40 border border-purple-700/40 
                checked:bg-purple-600 checked:border-purple-500
                focus:ring-purple-500
              "
            />
            <span className="leading-snug">
              I agree to be contacted by the Net Vybe team regarding my submission.
            </span>
          </label>

        </div>
      </div>
    </div>
  );
}