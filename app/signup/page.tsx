"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupFormData } from "@/types/SignupForm";

// Firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";

// Steps
import StepArtistInfo, { requiredFields as artistRequired } from "@/components/signup/StepArtistInfo";
import StepTrackInfo from "@/components/signup/StepTrackInfo";
import StepProfile from "@/components/signup/StepProfile";
import StepConsent from "@/components/signup/StepConsent";
import StepNavigation from "@/components/signup/StepNavigation";

export default function SignupPage(): any {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  // Success screen state
  const [isSuccess, setIsSuccess] = useState(false);

  // Global form data
  const [formData, setFormData] = useState<SignupFormData>({
    artistName: "",
    stageName: "",
    email: "",
    phone: "",
    genre: "",
    trackTitle: "",
    trackFile: null,
    trackLink: "",
    bio: "",
    socialHandle: "",
    notes: "",
    consentTerms: false,
    consentContact: false,
  });

  // Validation errors
  const [errors, setErrors] = useState<string[]>([]);

  // Submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules per step
  const validationRules = [
    artistRequired, // Step 1
    [],             // Step 2
    [],             // Step 3
    ["consentTerms"] // Step 4
  ];

  // Submit handler
  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const storage = getStorage(app);
      const db = getFirestore(app);

      let trackUrl = "";

      // Upload track file if provided
      if (formData.trackFile) {
        const storageRef = ref(
          storage,
          `tracks/${formData.artistName}/${formData.trackFile.name}`
        );

        await uploadBytes(storageRef, formData.trackFile);
        trackUrl = await getDownloadURL(storageRef);
      }

      // Build Firestore-safe payload (remove File object)
      const { trackFile, ...safeData } = formData;

      // Save submission to Firestore
      await addDoc(collection(db, "submissions"), {
        ...safeData,
        trackUrl,
        timestamp: serverTimestamp(),
        status: "Under Review",
      });

      // Show success screen
      setIsSuccess(true);

      // Fade out before redirect
      setTimeout(() => {
        document.body.classList.add("fade-out");
      }, 1500);

      // Redirect after fade-out
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an issue submitting your track.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Steps in order
  const steps = [
    <StepArtistInfo
      formData={formData}
      setFormData={setFormData}
      errors={errors}
    />,

    <StepTrackInfo
      formData={formData}
      setFormData={(data) => setFormData({ ...formData, ...data })}
    />,

    <StepProfile
      formData={formData}
      setFormData={setFormData}
    />,

    <StepConsent
      formData={formData}
      setFormData={(data) => setFormData({ ...formData, ...data })}
    />,
  ];

  return (
    <div className="min-h-screen w-full bg-[var(--nv-bg)] overflow-hidden">

      {/* Onboarding Header */}
      <div className="w-full text-center py-6 bg-transparent">
        <h2 className="text-2xl font-bold text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]">
          Let’s start building your Vybe.
        </h2>
      </div>

      {/* Success Screen */}
      {isSuccess && (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 animate-fadeIn opacity-0">
          <h2 className="text-2xl font-bold text-purple-300 mb-4 drop-shadow-[0_0_18px_rgba(168,85,247,0.55)]">
            Submission Received
          </h2>
          <p className="text-purple-200 max-w-md leading-relaxed drop-shadow-[0_0_10px_rgba(168,85,247,0.35)]">
            Thank you for submitting your artist details with Net Vybe Music. Our team will review your submission and follow up soon.
          </p>
        </div>
      )}

      {/* Form UI (only shows when NOT successful) */}
      {!isSuccess && (
        <>
          {/* Slide Wrapper */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeStep * 100}%)` }}
          >
            {steps.map((step, index) => (
              <div key={index} className="w-full flex-shrink-0">
                {step}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <StepNavigation
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            totalSteps={steps.length}
            onSubmit={onSubmit}
            formData={formData}
            validationRules={validationRules}
            setErrors={setErrors}
            isSubmitting={isSubmitting}
          />
        </>
      )}
    </div>
  );
}