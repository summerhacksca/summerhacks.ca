"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { imgOrangeSun, INITIAL_FORM_DATA, slides } from "./constants";
import { ActionButton } from "./components/action-button";
import { LeftPanelContent } from "./components/left-panel-content";
import { RightPanelContent } from "./components/right-panel-content";
import type { ApplicationFormData, SlideId } from "./types";

export default function ApplicationSlides({
  userEmail,
}: {
  userEmail: string;
}) {
  void userEmail;
  const [currentStep, setCurrentStep] = useState<SlideId>(1);
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const slide = slides[currentStep - 1];
  const router = useRouter();

  const handleFieldChange = (
    field: keyof ApplicationFormData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError("");
    setSubmitSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/application/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          applicationData: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to submit application");
      }

      setSubmitSuccess("Application submitted successfully.");
      router.replace("/thank-you");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit application",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="h-dvh overflow-hidden bg-white p-3">
      <form
        onSubmit={handleSubmit}
        className="flex h-[calc(100dvh-24px)] w-full flex-col overflow-clip bg-white shadow-[0px_24px_60px_rgba(176,127,70,0.08)] md:flex-row"
      >
        <div
          className={`flex min-h-[48dvh] w-full flex-col p-6 md:min-h-full md:basis-0 md:grow md:p-9 ${currentStep === 3 ? "bg-white" : "bg-[#fffbf6]"}`}
        >
          <div className="content-stretch flex gap-9 items-center relative shrink-0">
            <p className="font-['Maison Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap tracking-[-0.64px] text-[#2a2a2a]">
              {slide.numberLabel}
            </p>
            <div className="content-stretch flex gap-3 items-center relative shrink-0">
              <div className="relative shrink-0 size-4">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src={imgOrangeSun}
                  width={16}
                  height={16}
                />
              </div>
              <p className="font-['Maison Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap tracking-[-0.64px] text-[#2a2a2a]">
                {slide.title}
              </p>
            </div>
          </div>

          <div className="flex flex-col align-middle self-stretch flex-1 min-h-0">
            <LeftPanelContent
              step={currentStep}
              formData={formData}
              onFieldChange={handleFieldChange}
            />
          </div>

          {currentStep === 3 ? (
            <div className="mt-8 flex items-end justify-end gap-3 max-md:flex-col max-md:items-stretch">
              <ActionButton
                label="Back"
                direction="left"
                disabled={isSubmitting}
                onClick={() =>
                  setCurrentStep((step) => (step - 1) as SlideId)
                }
              />
              <ActionButton
                label={isSubmitting ? "Submitting..." : "Submit"}
                direction="right"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          ) : null}

          {submitError ? (
            <p className="mt-3 text-sm text-red-500">{submitError}</p>
          ) : null}
          {submitSuccess ? (
            <p className="mt-3 text-sm text-green-700">{submitSuccess}</p>
          ) : null}
        </div>

        <div
          className={`flex min-h-[44dvh] w-full flex-col justify-between p-6 md:min-h-full md:basis-0 md:grow md:p-9 ${currentStep === 3 ? "bg-[#fffbf6]" : "bg-white"}`}
        >
          <div className="flex h-full flex-1 flex-col items-end justify-between self-stretch gap-8 overflow-hidden md:gap-10">
            <RightPanelContent
              step={currentStep}
              formData={formData}
              onFieldChange={handleFieldChange}
            />

            {currentStep === 1 ? (
              <div className="flex items-center justify-between self-stretch gap-4 max-md:flex-col max-md:items-stretch">
                <p className="font-['Maison Neue',sans-serif] text-[14px] leading-[130%] tracking-[-0.28px] text-[#2a2a2a]/70">
                  Make sure details are correct
                </p>
                <ActionButton
                  label="Continue"
                  direction="right"
                  variant="primary"
                  onClick={() =>
                    setCurrentStep((step) => (step + 1) as SlideId)
                  }
                />
              </div>
            ) : currentStep === 2 ? (
              <div className="flex items-end justify-end gap-3 max-md:flex-col max-md:items-stretch">
                <ActionButton
                  label="Back"
                  direction="left"
                  disabled={isSubmitting}
                  onClick={() =>
                    setCurrentStep((step) => (step - 1) as SlideId)
                  }
                />

                <ActionButton
                  label="Continue"
                  direction="right"
                  variant="primary"
                  disabled={isSubmitting}
                  onClick={() =>
                    setCurrentStep((step) => (step + 1) as SlideId)
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </main>
  );
}
