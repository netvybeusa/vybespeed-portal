"use client";

import { SignupFormData } from "@/types/SignupForm";

type StepNavigationProps = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  totalSteps: number;
  onSubmit: () => void;
  formData: SignupFormData;
  validationRules: string[][];
  setErrors: (fields: string[]) => void;
  isSubmitting: boolean;
};

export default function StepNavigation({
  activeStep,
  setActiveStep,
  totalSteps,
  onSubmit,
  formData,
  validationRules,
  setErrors,
  isSubmitting
}: StepNavigationProps) {
  const isFirst = activeStep === 0;
  const isLast = activeStep === totalSteps - 1;

  return (
    <div className="w-full flex justify-between items-center px-6 py-6">

      {/* Back Button */}
      <button
        onClick={() => {
          if (!isFirst) setActiveStep(activeStep - 1);
        }}
        disabled={isFirst || isSubmitting}
        className={`
  px-6 py-2 rounded-full transition-all
  ${isFirst || isSubmitting
    ? "opacity-30 cursor-not-allowed bg-black/20 border border-purple-700/20 text-purple-300/40"
    : "bg-black/60 border border-purple-500/60 text-purple-200 shadow-[0_0_8px_rgba(168,85,247,0.35)] hover:bg-black/70 hover:border-purple-400 hover:shadow-[0_0_12px_rgba(168,85,247,0.55)]"
  }
`}
      >
        Back
      </button>

      {/* Next or Submit */}
      <button
        onClick={() => {
          if (isSubmitting) return;

          const required = validationRules[activeStep];
          const missing = required.filter(
            (field) => !formData[field as keyof SignupFormData]
          );

          if (missing.length > 0) {
            setErrors(missing);
            return;
          }

          setErrors([]);

          if (!isLast) {
            setActiveStep(activeStep + 1);
          } else {
            onSubmit();
          }
        }}
        disabled={isSubmitting}
        className={`
          px-8 py-2 rounded-full text-white flex items-center justify-center transition-all
          ${isSubmitting
            ? "bg-purple-400 cursor-not-allowed"
            : "bg-purple-600 shadow-[0_0_12px_rgba(168,85,247,0.45)] hover:bg-purple-700 hover:shadow-[0_0_18px_rgba(168,85,247,0.65)]"
          }
        `}
      >
        {isSubmitting
          ? "Submitting…"
          : isLast
          ? "Submit"
          : "Next"}

        {isSubmitting && (
          <span className="ml-2 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
        )}
      </button>

    </div>
  );
}