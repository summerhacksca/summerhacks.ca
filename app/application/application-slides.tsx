"use client";

import { useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import Image from "next/image";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type SlideId = 1 | 2 | 3;

type Slide = {
	step: SlideId;
	title: string;
	numberLabel: string;
};

type ApplicationFormData = {
	firstNameLegal: string;
	lastNameLegal: string;
	preferredName: string;
	age: string;
	gender: string;
	ethnicity: string;
	institutionName: string;
	year: string;
	linkedin: string;
	github: string;
	resumeLink: string;
	portfolioLink: string;
	proudProject: string;
	chooseOneAnswer: string;
	summerHacksGoal: string;
	rambleTopic: string;
	bearOrMuffin: string;
	offlineSelf: string;
	dietaryRestrictions: string;
	accessibilityNeeds: string;
	tshirtSize: string;
};

const INITIAL_FORM_DATA: ApplicationFormData = {
	firstNameLegal: "",
	lastNameLegal: "",
	preferredName: "",
	age: "",
	gender: "",
	ethnicity: "",
	institutionName: "",
	year: "",
	linkedin: "",
	github: "",
	resumeLink: "",
	portfolioLink: "",
	proudProject: "",
	chooseOneAnswer: "",
	summerHacksGoal: "",
	rambleTopic: "",
	bearOrMuffin: "",
	offlineSelf: "",
	dietaryRestrictions: "",
	accessibilityNeeds: "",
	tshirtSize: "",
};

const slides: Slide[] = [
	{ step: 1, title: "Application", numberLabel: "1" },
	{ step: 2, title: "About you", numberLabel: "2" },
	{ step: 3, title: "Review", numberLabel: "3" },
];

const genderOptions = [
	"Female",
	"Male",
	"Non-binary",
	"Another identity",
	"Prefer not to say",
];

const ethnicityOptions = [
	"Asian",
	"Black",
	"Indigenous",
	"Latin American",
	"Middle Eastern / North African",
	"White",
	"Mixed / Multiple",
	"Prefer not to say",
	"Self-describe",
];

const tshirtSizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const imgOrangeSun = "/logos/orange-nobg.svg";

function AppComboBox({
	items,
	placeholder,
	value,
	onValueChange,
}: {
	items: string[];
	placeholder: string;
	value: string;
	onValueChange: (value: string | null) => void;
}) {
	return (
		<Combobox items={items} value={value} onValueChange={onValueChange}>
			<ComboboxInput placeholder={placeholder} />
			<ComboboxContent>
				<ComboboxEmpty>No items found.</ComboboxEmpty>
				<ComboboxList>
					{(item) => (
						<ComboboxItem key={item} value={item}>
							{item}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}

function ApplicationTextField({
	placeholder,
	value,
	onChange,
}: {
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div
			className="w-full border-b border-[#FFEFDD] bg-[#FFEFDD]"
			style={{
				display: "flex",
				padding: 16,
				flexDirection: "column",
				alignItems: "flex-end",
				gap: 24,
				flex: "1 0 0",
				borderRadius: 4,
				backdropFilter: "blur(25px)",
			}}
		>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="w-full bg-transparent outline-none placeholder:text-[#b07f46]/60"
			/>
		</div>
	);
}

function LeftPanelContent({
	step,
	formData,
	onFieldChange,
}: {
	step: SlideId;
	formData: ApplicationFormData;
	onFieldChange: (field: keyof ApplicationFormData, value: string) => void;
}) {
	if (step === 1) {
		return (
			<div className="flex flex-1 items-end">
				<div className="max-w-md">
					<p className="font-['Maison Neue',sans-serif] text-[14px] font-medium uppercase tracking-[0.28em] text-[#b07f46]/70">
						Start here
					</p>
					<h3 className="mt-3 font-['Maison Neue',sans-serif] text-[18px] font-medium text-[#2a2a2a]">
						Build your profile
					</h3>
					<p className="mt-2 font-['Maison Neue',sans-serif] text-[15px] leading-[130%] tracking-[-0.32px] text-[#2a2a2a]/80">
						This slide collects the basics and your public links so
						we can place the rest of your application in context.
					</p>
					<ul className="mt-4 space-y-2 font-['Maison Neue',sans-serif] text-[14px] leading-[130%] tracking-[-0.28px] text-[#2a2a2a]/70">
						<li>
							Legal and preferred names, age, and school details.
						</li>
						<li>LinkedIn, GitHub, resume, and portfolio links.</li>
					</ul>
				</div>
			</div>
		);
	}

	if (step === 2) {
		return (
			<div className="flex flex-col items-start self-stretch justify-between h-full py-17.5">
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Tell us about a project you are proud of!
						</p>
						<p>
							While it doesn’t have to specifically be technical,
							please include your role in the project, challenges
							you faced, and lessons you learned.
						</p>
					</div>
					<ApplicationTextField
						placeholder="Answer (500 words)"
						value={formData.proudProject}
						onChange={(value) => onFieldChange("proudProject", value)}
					/>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Choose one of the following to answer:
						</p>
						<ol type="1">
							<li>
								1. What is an issue you come across in your day
								to day life, and how would you solve it?
							</li>
							<li>
								2. How would you define “creativity” in the
								present day with tools like generative AI? Do
								you think AI diminishes the value of human art,
								or does it enable more people to express
								themselves freely?
							</li>
						</ol>
					</div>
					<ApplicationTextField
						placeholder="Answer (500 words)"
						value={formData.chooseOneAnswer}
						onChange={(value) => onFieldChange("chooseOneAnswer", value)}
					/>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							What do you hope to get out of SummerHacks?
						</p>
					</div>
					<ApplicationTextField
						placeholder="Answer (500 words)"
						value={formData.summerHacksGoal}
						onChange={(value) => onFieldChange("summerHacksGoal", value)}
					/>
				</div>
			</div>
		);
	}

	if (step === 3) {
		return (
			<div className="flex flex-col items-start self-stretch gap-16 h-full py-17.5">
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Any dietary restrictions and/or allergies?
						</p>
					</div>
					<ApplicationTextField
						placeholder="N/A if none"
						value={formData.dietaryRestrictions}
						onChange={(value) => onFieldChange("dietaryRestrictions", value)}
					/>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Do you require any accessibility accommodations to
							fully enjoy the event?
						</p>
					</div>
					<ApplicationTextField
						placeholder="Answer"
						value={formData.accessibilityNeeds}
						onChange={(value) => onFieldChange("accessibilityNeeds", value)}
					/>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							What is your t-shirt size?
						</p>
					</div>
					<div className="flex w-full">
						<AppComboBox
							items={tshirtSizeOptions}
							placeholder="Select a t-shirt size"
							value={formData.tshirtSize}
							onValueChange={(value) =>
								onFieldChange("tshirtSize", value ?? "")
							}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-1 items-end">
				<div className="max-w-md">
					<p className="font-['Maison Neue',sans-serif] text-[14px] font-medium uppercase tracking-[0.28em] text-[#b07f46]/70">
						Final pass
					</p>
					<h3 className="mt-3 font-['Maison Neue',sans-serif] text-[18px] font-medium text-[#2a2a2a]">
						Review and submit
					</h3>
					<p className="mt-2 font-['Maison Neue',sans-serif] text-[15px] leading-[130%] tracking-[-0.32px] text-[#2a2a2a]/80">
						Double-check your answers before submitting. This is the
						last chance to update anything before your application
						is
					</p>
					<ul className="mt-4 space-y-2 font-['Maison Neue',sans-serif] text-[14px] leading-[130%] tracking-[-0.28px] text-[#2a2a2a]/70">
						<li>Confirm every field is accurate and complete.</li>
						<li>Make sure your links open correctly.</li>
					</ul>
				</div>
			</div>
		</>
	);
}

function RightPanelContent({
	step,
	formData,
	onFieldChange,
}: {
	step: SlideId;
	formData: ApplicationFormData;
	onFieldChange: (field: keyof ApplicationFormData, value: string) => void;
}) {
	if (step === 1) {
		return (
			<>
				<div className="flex flex-col items-start self-stretch gap-5">
					<p className="text-md font-bold text-black">
						Basic Details
					</p>
					<div className="flex flex-col items-start gap-4 self-stretch">
						<div className="flex items-start gap-4 self-stretch">
							<ApplicationTextField
								placeholder="First Name (Legal)"
								value={formData.firstNameLegal}
								onChange={(value) => onFieldChange("firstNameLegal", value)}
							/>
							<ApplicationTextField
								placeholder="Last Name (Legal)"
								value={formData.lastNameLegal}
								onChange={(value) => onFieldChange("lastNameLegal", value)}
							/>
						</div>
						<div className="flex items-start gap-4 self-stretch">
							<ApplicationTextField
								placeholder="Preferred Name"
								value={formData.preferredName}
								onChange={(value) => onFieldChange("preferredName", value)}
							/>
							<ApplicationTextField
								placeholder="Age"
								value={formData.age}
								onChange={(value) => onFieldChange("age", value)}
							/>
						</div>
						<div className="flex items-start gap-4 self-stretch">
							<AppComboBox
								items={genderOptions}
								placeholder="Gender"
								value={formData.gender}
								onValueChange={(value) =>
									onFieldChange("gender", value ?? "")
								}
							/>
							<AppComboBox
								items={ethnicityOptions}
								placeholder="Ethnicity"
								value={formData.ethnicity}
								onValueChange={(value) =>
									onFieldChange("ethnicity", value ?? "")
								}
							/>
						</div>
						<div className="flex items-start gap-4 self-stretch">
							<ApplicationTextField
								placeholder="Post Secondary Institution Name"
								value={formData.institutionName}
								onChange={(value) => onFieldChange("institutionName", value)}
							/>
							<ApplicationTextField
								placeholder="Year"
								value={formData.year}
								onChange={(value) => onFieldChange("year", value)}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start self-stretch gap-5">
					<p className="text-md font-bold text-black">Your Links</p>
					<div className="flex flex-col items-start gap-4 self-stretch">
						<ApplicationTextField
							placeholder="LinkedIn"
							value={formData.linkedin}
							onChange={(value) => onFieldChange("linkedin", value)}
						/>
						<ApplicationTextField
							placeholder="GitHub"
							value={formData.github}
							onChange={(value) => onFieldChange("github", value)}
						/>
						<ApplicationTextField
							placeholder="Resume (link)"
							value={formData.resumeLink}
							onChange={(value) => onFieldChange("resumeLink", value)}
						/>
						<ApplicationTextField
							placeholder="Portfolio (link)"
							value={formData.portfolioLink}
							onChange={(value) => onFieldChange("portfolioLink", value)}
						/>
					</div>
				</div>
			</>
		);
	}

	if (step === 2) {
		return (
			<div className="flex flex-col items-start self-stretch justify-between h-full py-8">
				<div className="flex flex-col items-start self-stretch gap-4">
					<p className="text-md text-black">
						What is a random topic you could ramble on and on about?
					</p>
					<ApplicationTextField
						placeholder="Answer (500 words)"
						value={formData.rambleTopic}
						onChange={(value) => onFieldChange("rambleTopic", value)}
					/>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<p className="text-md text-black">
						Would you rather fight a bear with sharks for arms or
						not be able to tell the difference between a muffin and
						a baby? Answer honestly and thoroughly.
					</p>
					<ApplicationTextField
						placeholder="Answer (500 words)"
						value={formData.bearOrMuffin}
						onChange={(value) => onFieldChange("bearOrMuffin", value)}
					/>
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<p className="text-md text-black">
						Tell us about your offline self. Who are you outside of
						the tech world?
					</p>
					<ApplicationTextField
						placeholder="Answer (500 words)"
						value={formData.offlineSelf}
						onChange={(value) => onFieldChange("offlineSelf", value)}
					/>
				</div>
			</div>
		);
	}

	return null;
}

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

	const handleFieldChange = (
		field: keyof ApplicationFormData,
		value: string,
	) => {
		setFormData((previous) => ({
			...previous,
			[field]: value,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
		} catch (error) {
			setSubmitError(
				error instanceof Error ? error.message : "Failed to submit application",
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

					<div className="flex flex-col align-middle self-stretch h-full">
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
									disabled={isSubmitting}
									onClick={() =>
										setCurrentStep((step) => (step - 1) as SlideId)
									}
								/>

								<ActionButton
									label="Continue"
									direction="right"
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

function ActionButton({
	label,
	direction,
	onClick,
	disabled = false,
	type = "button",
}: {
	label: string;
	direction: "left" | "right";
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit";
}) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className="bg-(--primary\/sun\/100,#ffefdd) text-[#B07F46] inline-flex h-14 items-center justify-center overflow-clip px-4 rounded-[100px] shrink-0 hover:bg-(--primary\/sun\/200,#fde4c8) transition-colors disabled:opacity-50 cursor-pointer max-md:w-full"
		>
			<div className="flex items-center justify-center gap-2 relative shrink-0">
				{label}
				<div
					className={
						direction === "left"
							? "flex-none -rotate-90"
							: "flex-none rotate-90"
					}
				>
					<ArrowUp
						size={20}
						weight="bold"
						className="block max-w-none size-full"
					/>
				</div>
			</div>
		</button>
	);
}
