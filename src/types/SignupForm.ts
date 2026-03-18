export type SignupFormData = {
  artistName: string;
  stageName: string;
  email: string;
  phone: string;
  genre: string;
  trackTitle: string;
  trackFile: File | null;
  trackLink: string;

  // StepProfile fields
  bio: string;
  socialHandle: string;
  notes: string;

  // StepConsent fields
  consentTerms: boolean;
  consentContact: boolean;
};