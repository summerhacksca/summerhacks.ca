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

const slides: Slide[] = [
	{ step: 1, title: "Application", numberLabel: "1" },
	{ step: 2, title: "About you", numberLabel: "2" },
	{ step: 3, title: "Review", numberLabel: "3" },
];

const genderOptions = [
	"Woman",
	"Man",
	"Non-binary",
	"Another identity",
	"Prefer not to say",
];

const ethnicityOptions = [
	"Asian",
	"Black",
	"Indigenous",
	"Latinx",
	"Middle Eastern / North African",
	"White",
	"Mixed / Multiple",
	"Prefer not to say",
	"Self-describe",
];

const tshirtSizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const imgOrangeSun = "/logos/orange-nobg.svg";

function AppComboBox({items, placeholder}: { items: string[], placeholder: string }) {
	return (
		<Combobox items={items} >
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

function ApplicationTextField({ placeholder }: { placeholder: string }) {
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
				className="w-full bg-transparent outline-none placeholder:text-[#b07f46]/60"
			/>
		</div>
	);
}

function LeftPanelContent({ step }: { step: SlideId }) {
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
					<ApplicationTextField placeholder="Answer (500 words)" />
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
					<ApplicationTextField placeholder="Answer (500 words)" />
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							What do you hope to get out of SummerHacks?
						</p>
					</div>
					<ApplicationTextField placeholder="Answer (500 words)" />
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
					<ApplicationTextField placeholder="N/A if none" />
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							Do you require any accessibility accommodations to
							fully enjoy the event?
						</p>
					</div>
					<ApplicationTextField placeholder="Answer" />
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<div className="flex flex-col">
						<p className="text-md font-bold text-black">
							What is your t-shirt size?
						</p>
					</div>
					<div className="flex">
						<AppComboBox items={tshirtSizeOptions} placeholder="Select a t-shirt size" />
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

function RightPanelContent({ step }: { step: SlideId }) {
	if (step === 1) {
		return (
			<>
				<div className="flex flex-col items-start self-stretch gap-5">
					<p className="text-md font-bold text-black">
						Basic Details
					</p>
					<div className="flex flex-col items-start gap-4 self-stretch">
						<div className="flex items-start gap-4 self-stretch">
							<ApplicationTextField placeholder="First Name (Legal)" />
							<ApplicationTextField placeholder="Last Name (Legal)" />
						</div>
						<div className="flex items-start gap-4 self-stretch">
							<ApplicationTextField placeholder="Preferred Name" />
							<ApplicationTextField placeholder="Age" />
						</div>
						<div className="flex items-start gap-4 self-stretch">
							<AppComboBox items={genderOptions} placeholder="Gender" />
							<AppComboBox items={genderOptions} placeholder="Ethnicity" />
						</div>
						<div className="flex items-start gap-4 self-stretch">
							<ApplicationTextField placeholder="Post Secondary Institution Name" />
							<ApplicationTextField placeholder="Year" />
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start self-stretch gap-5">
					<p className="text-md font-bold text-black">Your Links</p>
					<div className="flex flex-col items-start gap-4 self-stretch">
						<ApplicationTextField placeholder="LinkedIn" />
						<ApplicationTextField placeholder="GitHub" />
						<ApplicationTextField placeholder="Resume (link)" />
						<ApplicationTextField placeholder="Portfolio (link)" />
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
					<ApplicationTextField placeholder="Answer (500 words)" />
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<p className="text-md text-black">
						Would you rather fight a bear with sharks for arms or
						not be able to tell the difference between a muffin and
						a baby? Answer honestly and thoroughly.
					</p>
					<ApplicationTextField placeholder="Answer (500 words)" />
				</div>
				<div className="flex flex-col items-start self-stretch gap-4">
					<p className="text-md text-black">
						Tell us about your offline self. Who are you outside of
						the tech world?
					</p>
					<ApplicationTextField placeholder="Answer (500 words)" />
				</div>
			</div>
		);
	}
}

export default function ApplicationSlides({
	userEmail,
}: {
	userEmail: string;
}) {
	void userEmail;
	const [currentStep, setCurrentStep] = useState<SlideId>(1);
	const slide = slides[currentStep - 1];

	return (
		<main className="h-dvh overflow-hidden bg-white p-3">
			<form
				onSubmit={(event) => event.preventDefault()}
				className="flex h-[calc(100dvh-24px)] w-full flex-col overflow-clip bg-white shadow-[0px_24px_60px_rgba(176,127,70,0.08)] md:flex-row"
			>
				<div className="flex min-h-[48dvh] w-full flex-col bg-[#fffbf6] p-6 md:min-h-full md:basis-0 md:grow md:p-9">
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
						<LeftPanelContent step={currentStep} />
					</div>
				</div>

				<div className="flex min-h-[44dvh] w-full flex-col justify-between bg-white p-6 md:min-h-full md:basis-0 md:grow md:p-9">
					<div className="flex h-full flex-1 flex-col items-end justify-between self-stretch gap-8 overflow-hidden md:gap-10">
						<RightPanelContent step={currentStep} />

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
						) : (
							<div className="flex items-end justify-end gap-3 max-md:flex-col max-md:items-stretch">
								{currentStep > 1 ? (
									<ActionButton
										label="Back"
										direction="left"
										onClick={() =>
											setCurrentStep(
												(step) => (step - 1) as SlideId,
											)
										}
									/>
								) : null}

								{currentStep < 3 ? (
									<ActionButton
										label="Continue"
										direction="right"
										onClick={() =>
											setCurrentStep(
												(step) => (step + 1) as SlideId,
											)
										}
									/>
								) : (
									<ActionButton
										label="Submit"
										direction="right"
										type="submit"
									/>
								)}
							</div>
						)}
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
	type = "button",
}: {
	label: string;
	direction: "left" | "right";
	onClick?: () => void;
	type?: "button" | "submit";
}) {
	return (
		<button
			type={type}
			onClick={onClick}
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
