"use client";

import { useState } from "react";

import { ActionButton } from "./action-button";
import { LeftPanelContent } from "./left-panel-content";
import { RightPanelContent } from "./right-panel-content";
import type { ApplicationFormData, FieldChangeHandler, SlideId } from "../types";

type MobileApplicationFlowProps = {
  currentStep: SlideId;
  setCurrentStep: (step: SlideId | ((step: SlideId) => SlideId)) => void;
  formData: ApplicationFormData;
  onFieldChange: FieldChangeHandler;
  isSubmitting: boolean;
  submitError: string;
  submitSuccess: string;
};

export function MobileApplicationFlow({
  currentStep,
  setCurrentStep,
  formData,
  onFieldChange,
  isSubmitting,
  submitError,
  submitSuccess,
}: MobileApplicationFlowProps) {
  const [mobilePanel, setMobilePanel] = useState<0 | 1 | 2 | 3 | 4>(0);

  const goBack = () => {
    if (currentStep === 1 && mobilePanel === 0) {
      return;
    }

    if (currentStep === 2 && mobilePanel === 1) {
      setCurrentStep(1);
      setMobilePanel(0);
      return;
    }

    if (currentStep === 2 && mobilePanel === 2) {
      setMobilePanel(1);
      return;
    }

    if (currentStep === 3 && mobilePanel === 3) {
      setCurrentStep(2);
      setMobilePanel(2);
      return;
    }
  };

  const goForward = () => {
    if (currentStep === 1 && mobilePanel === 0) {
      setCurrentStep(2);
      setMobilePanel(1);
      return;
    }

    if (currentStep === 2 && mobilePanel === 1) {
      setMobilePanel(2);
      return;
    }

    if (currentStep === 2 && mobilePanel === 2) {
      setCurrentStep(3);
      setMobilePanel(3);
      return;
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-24px)] w-full flex-col bg-[#fffbf6] p-6 md:hidden">
      <div className="flex flex-1 flex-col gap-6 overflow-auto">
        {currentStep === 1 ? (
          <RightPanelContent
            step={1}
            formData={formData}
            onFieldChange={onFieldChange}
          />
        ) : currentStep === 2 && mobilePanel === 1 ? (
          <LeftPanelContent
            step={2}
            formData={formData}
            onFieldChange={onFieldChange}
          />
        ) : currentStep === 2 && mobilePanel === 2 ? (
          <RightPanelContent
            step={2}
            formData={formData}
            onFieldChange={onFieldChange}
          />
        ) : currentStep === 3 && mobilePanel === 3 ? (
          <LeftPanelContent
            step={3}
            formData={formData}
            onFieldChange={onFieldChange}
          />
        ) : (
          <div className="flex flex-1 flex-col justify-center gap-4">
            <p className="font-['Maison Neue',sans-serif] text-sm font-medium uppercase tracking-[0.28em] text-[#b07f46]/80">
              Review
            </p>
            <h2 className="font-['Maison Neue',sans-serif] text-3xl font-medium text-[#2a2a2a]">
              Review and submit
            </h2>
            <p className="max-w-xl text-base leading-7 text-[#2a2a2a]/75">
              Double-check your answers before submitting. This is the last
              step before your application is sent.
            </p>
          </div>
        )}
      </div>

      {submitError ? (
        <p className="mt-4 text-sm text-red-500">{submitError}</p>
      ) : null}
      {submitSuccess ? (
        <p className="mt-4 text-sm text-green-700">{submitSuccess}</p>
      ) : null}

      <div className="mt-6 flex items-end justify-between gap-3 max-md:flex-col max-md:items-stretch">
        <ActionButton
          label="Back"
          direction="left"
          disabled={isSubmitting || (currentStep === 1 && mobilePanel === 0)}
          onClick={goBack}
        />
        {currentStep === 3 && mobilePanel === 3 ? (
          <ActionButton
            label={isSubmitting ? "Submitting..." : "Submit"}
            direction="right"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          />
        ) : (
          <ActionButton
            label="Continue"
            direction="right"
            variant="primary"
            disabled={isSubmitting}
            onClick={goForward}
          />
        )}
      </div>
    </div>
  );
}
