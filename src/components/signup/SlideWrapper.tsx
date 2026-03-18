"use client";

import React, { ReactNode } from "react";

interface SlideWrapperProps {
  activeStep: number;
  children: ReactNode;
}

export default function SlideWrapper({ activeStep, children }: SlideWrapperProps) {
  return (
    <div
      className="flex transition-transform duration-500 ease-in-out w-full h-full"
      style={{ transform: `translateX(-${activeStep * 100}%)` }}
    >
      {children}
    </div>
  );
}