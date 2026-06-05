"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { imgOrangeSun, INITIAL_FORM_DATA, slides } from "./constants";
import { ActionButton } from "./components/action-button";
import { MobileApplicationFlow } from "./components/mobile-application-flow";
import { LeftPanelContent } from "./components/left-panel-content";
import { RightPanelContent } from "./components/right-panel-content";
import type { ApplicationFormData, SlideId } from "./types";

const STEP_ONE_FIELDS: (keyof ApplicationFormData)[] = [
	"firstNameLegal",
	"lastNameLegal",
	"age",
	"gender",
	"ethnicity",
	"institutionName",
	"yearOfStudy",
	"linkedin",
	"resumeLink",
];

const STEP_TWO_LEFT_FIELDS: (keyof ApplicationFormData)[] = [
	"proudProject",
	"chooseOneAnswer",
	"summerHacksGoal",
];

const STEP_TWO_RIGHT_FIELDS: (keyof ApplicationFormData)[] = [
	"rambleTopic",
	"bearOrMuffin",
	"offlineSelf",
];

const STEP_THREE_FIELDS: (keyof ApplicationFormData)[] = [
	"dietaryRestrictions",
	"accessibilityNeeds",
	"tshirtSize",
	"travelToDowntownToronto",
];

function isFilled(value: string) {
	return value.trim().length > 0;
}

function areFieldsFilled(
	formData: ApplicationFormData,
	fields: (keyof ApplicationFormData)[],
) {
	return fields.every((field) => isFilled(formData[field]));
}

export default function ApplicationSlides({
	userEmail,
}: {
	userEmail: string;
}) {
	void userEmail;
	const [currentStep, setCurrentStep] = useState<SlideId>(1);
	const [formData, setFormData] =
		useState<ApplicationFormData>(INITIAL_FORM_DATA);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const [submitSuccess, setSubmitSuccess] = useState("");
	const [savedAt, setSavedAt] = useState<string | null>(null);
	const slide = slides[currentStep - 1];
	const router = useRouter();

	const DRAFT_KEY = "application_draft";
	const saveTimer = useRef<number | null>(null);

	useEffect(() => {
		// load draft from localStorage on mount
		try {
			const raw = localStorage.getItem(DRAFT_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				setFormData((prev) => ({ ...prev, ...parsed }));
			}
		} catch (e) {
			// ignore parse errors
		}
	}, []);

	useEffect(() => {
		// debounce save to localStorage
		if (saveTimer.current) {
			clearTimeout(saveTimer.current as unknown as number);
		}

		saveTimer.current = window.setTimeout(() => {
			try {
				localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
				setSavedAt(new Date().toISOString());
			} catch (e) {
				// ignore storage failures
			}
		}, 1000) as unknown as number;

		return () => {
			if (saveTimer.current)
				clearTimeout(saveTimer.current as unknown as number);
		};
	}, [formData]);

	const canProceedFromStepOne = areFieldsFilled(formData, STEP_ONE_FIELDS);
	const canProceedFromStepTwo =
		areFieldsFilled(formData, STEP_TWO_LEFT_FIELDS) &&
		areFieldsFilled(formData, STEP_TWO_RIGHT_FIELDS);
	const canProceedFromStepThree = areFieldsFilled(
		formData,
		STEP_THREE_FIELDS,
	);
	const canSubmitApplication =
		canProceedFromStepOne &&
		canProceedFromStepTwo &&
		canProceedFromStepThree;

	const handleFieldChange = (
		field: keyof ApplicationFormData,
		value: string,
	) => {
		setFormData((previous) => ({
			...previous,
			[field]: value,
		}));
	};

	const submitApplication = async () => {
		setSubmitError("");
		setSubmitSuccess("");

		if (!canSubmitApplication) {
			setSubmitError(
				"Please fill out every required field before submitting.",
			);
			return;
		}

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
			// clear draft and navigate
			try {
				localStorage.removeItem(DRAFT_KEY);
			} catch {}
			setSavedAt(null);
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

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!canSubmitApplication) {
			setSubmitError(
				"Please fill out every required field before submitting.",
			);
			return;
		}

		await submitApplication();
	};

	return (
		<main className="h-dvh overflow-hidden bg-[#fffbf6] p-0 md:bg-white md:p-3">
			<form
				onSubmit={handleSubmit}
				className="flex h-dvh w-full flex-col overflow-clip bg-[#fffbf6] shadow-none md:h-[calc(100dvh-24px)] md:bg-white md:shadow-[0px_24px_60px_rgba(176,127,70,0.08)] md:flex-row"
			>
				<div className="hidden w-full md:flex md:h-full md:flex-row">
					<div
						className={`hidden min-h-[48dvh] w-full flex-col p-6 md:flex md:min-h-full md:basis-0 md:grow md:p-9 ${currentStep === 3 ? "md:bg-white" : "md:bg-[#fffbf6]"}`}
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
									type="button"
									disabled={isSubmitting}
									onClick={() =>
										setCurrentStep(
											(step) => (step - 1) as SlideId,
										)
									}
								/>
								<ActionButton
									label={
										isSubmitting
											? "Submitting..."
											: "Submit"
									}
									direction="right"
									variant="primary"
									type="button"
									disabled={isSubmitting}
									onClick={() => {
										void submitApplication();
									}}
								/>
							</div>
						) : null}

						{submitError ? (
							<p className="mt-3 text-sm text-red-500">
								{submitError}
							</p>
						) : null}
						{submitSuccess ? (
							<p className="mt-3 text-sm text-green-700">
								{submitSuccess}
							</p>
						) : null}
						{savedAt ? (
							<p className="mt-3 text-sm text-gray-500">
								Draft saved{" "}
								{new Date(savedAt).toLocaleTimeString()}
							</p>
						) : null}
					</div>

					<div
						className={`flex min-h-0 w-full flex-1 flex-col justify-between bg-[#fffbf6] p-6 md:min-h-full md:basis-0 md:grow md:p-9 md:${currentStep === 3 ? "bg-[#fffbf6]" : "bg-white"}`}
					>
						<div className="flex flex-1 flex-col items-end justify-between self-stretch gap-8 min-h-0 md:gap-10">
							<div className="flex-1 min-h-0 overflow-y-auto w-full">
								<RightPanelContent
									step={currentStep}
									formData={formData}
									onFieldChange={handleFieldChange}
								/>
							</div>

							{currentStep === 1 ? (
								<div className="flex items-center justify-between self-stretch gap-4 max-md:flex-col max-md:items-stretch">
									<p className="font-['Maison Neue',sans-serif] text-[14px] leading-[130%] tracking-[-0.28px] text-[#2a2a2a]/70">
										Make sure details are correct
									</p>
									<ActionButton
										label="Continue"
										direction="right"
										variant="primary"
										type="button"
										disabled={
											isSubmitting ||
											!canProceedFromStepOne
										}
										onClick={() =>
											setCurrentStep(
												(step) => (step + 1) as SlideId,
											)
										}
									/>
								</div>
							) : currentStep === 2 ? (
								<div className="flex items-end justify-end gap-3 max-md:flex-col max-md:items-stretch">
									<ActionButton
										label="Back"
										direction="left"
										type="button"
										disabled={isSubmitting}
										onClick={() =>
											setCurrentStep(
												(step) => (step - 1) as SlideId,
											)
										}
									/>

									<ActionButton
										label="Continue"
										direction="right"
										variant="primary"
										type="button"
										disabled={
											isSubmitting ||
											!canProceedFromStepTwo
										}
										onClick={() =>
											setCurrentStep(
												(step) => (step + 1) as SlideId,
											)
										}
									/>
								</div>
							) : null}
						</div>
					</div>
				</div>

				<MobileApplicationFlow
					currentStep={currentStep}
					setCurrentStep={setCurrentStep}
					formData={formData}
					onFieldChange={handleFieldChange}
					isSubmitting={isSubmitting}
					submitError={submitError}
					submitSuccess={submitSuccess}
					canProceedFromStepOne={canProceedFromStepOne}
					canProceedFromStepTwoLeft={areFieldsFilled(
						formData,
						STEP_TWO_LEFT_FIELDS,
					)}
					canProceedFromStepTwoRight={areFieldsFilled(
						formData,
						STEP_TWO_RIGHT_FIELDS,
					)}
					canProceedFromStepThree={canProceedFromStepThree}
					onSubmitApplication={() => {
						void submitApplication();
					}}
				/>
			</form>
		</main>
	);
}
