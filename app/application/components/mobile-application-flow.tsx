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
  onSubmitApplication: () => void;
};

export function MobileApplicationFlow({
  currentStep,
  setCurrentStep,
  formData,
  onFieldChange,
  isSubmitting,
  submitError,
  submitSuccess,
  onSubmitApplication,
}: MobileApplicationFlowProps) {
  const [mobilePanel, setMobilePanel] = useState<1 | 2 | 3 | 4>(1);

  const syncDesktopStep = (nextPanel: 1 | 2 | 3 | 4) => {
    if (nextPanel === 1) {
      setCurrentStep(1);
      return;
    }

    if (nextPanel === 2 || nextPanel === 3) {
      setCurrentStep(2);
      return;
    }

    setCurrentStep(3);
  };

  const goBack = () => {
    if (mobilePanel === 1) {
      return;
    }

    if (mobilePanel === 2) {
      setMobilePanel(1);
      syncDesktopStep(1);
      return;
    }

    if (mobilePanel === 3) {
      setMobilePanel(2);
      syncDesktopStep(2);
      return;
    }

    if (mobilePanel === 4) {
      setMobilePanel(3);
      syncDesktopStep(2);
    }
  };

  const goForward = () => {
    if (mobilePanel === 1) {
      setMobilePanel(2);
      syncDesktopStep(2);
      return;
    }

    if (mobilePanel === 2) {
      setMobilePanel(3);
      syncDesktopStep(2);
      return;
    }

    if (mobilePanel === 3) {
      setMobilePanel(4);
      syncDesktopStep(3);
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-24px)] w-full flex-col bg-[#fffbf6] p-6 md:hidden">
      <div className="flex flex-1 flex-col gap-6 overflow-auto">
        {mobilePanel === 1 ? (
          <RightPanelContent
            step={1}
            formData={formData}
            onFieldChange={onFieldChange}
          />
        ) : mobilePanel === 2 ? (
          <LeftPanelContent
            step={2}
            formData={formData}
            onFieldChange={onFieldChange}
          />
        ) : mobilePanel === 3 ? (
          <RightPanelContent
            step={2}
            formData={formData}
            onFieldChange={onFieldChange}
          />
        ) : (
          <LeftPanelContent
            step={3}
            formData={formData}
            onFieldChange={onFieldChange}
          />
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
          type="button"
          disabled={isSubmitting || mobilePanel === 1}
          onClick={goBack}
        />
        {mobilePanel === 4 ? (
          <ActionButton
            label={isSubmitting ? "Submitting..." : "Submit"}
            direction="right"
            variant="primary"
            type="button"
            disabled={isSubmitting}
            onClick={onSubmitApplication}
          />
        ) : (
          <ActionButton
            label="Continue"
            direction="right"
            variant="primary"
            type="button"
            disabled={isSubmitting}
            onClick={goForward}
          />
        )}
      </div>
    </div>
  );
}
