"use client";

import { useState } from "react";
import Image from "next/image";

const imgOrangeSun = "/orange-sun.svg";

export default function HeroSection() {
	return (
		<div className="content-stretch flex flex-col items-start p-3 relative shrink-0 w-full z-4">
			<div className="content-stretch flex flex-col h-[calc(100dvh-24px)] items-center justify-center overflow-clip p-9 max-sm:p-5 relative shrink-0 w-full">
				<div
					aria-hidden="true"
					className="absolute inset-0 pointer-events-none"
				>
					<video
						className="absolute max-w-none object-50%-50% object-cover size-full"
						autoPlay
						muted
						loop
						playsInline
					>
						<source src="/video.mp4" type="video/mp4" />
					</video>
					<div className="absolute inset-0 bg-black/20 object-cover" />
				</div>

				<Header />
				<MainContent />
				<ScrollIndicator />
			</div>
		</div>
	);
}

function Header() {
	return (
		<div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
			<div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
				<p className="font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-(--text\/on-dark,white) text-nowrap tracking-[-0.28px]">
					August 2026 - 3 days
				</p>
			</div>
			<div className="content-stretch flex gap-[5.842px] items-center justify-center relative shrink-0 max-sm:hidden">
				<div className="relative shrink-0 size-4.25">
					<Image
						alt=""
						className="block max-w-none size-full"
						src={imgOrangeSun}
						width={17}
						height={17}
						quality={100}
					/>
				</div>
				<p className="font-['Maison Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-nowrap text-white tracking-[-0.8px]">
					SummerHacks
				</p>
			</div>
			<div className="basis-0 content-stretch flex grow items-center justify-end min-h-px min-w-px relative shrink-0">
				<p className="font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-(--text\/on-dark,white) text-nowrap text-right tracking-[-0.28px]">
					Outdoor hackathon
				</p>
			</div>
		</div>
	);
}

function MainContent() {
	return (
		<div className="basis-0 content-stretch flex flex-col gap-12 grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
			<div className="content-stretch flex flex-col gap-12 items-center not-italic relative shrink-0 text-(--text\/on-dark,white) text-center w-full">
				<div className="hidden max-sm:flex content-stretch gap-2 items-center justify-center relative shrink-0">
					<div className="relative shrink-0 size-4.25">
						<Image
							alt=""
							className="block max-w-none size-full"
							src={imgOrangeSun}
							width={17}
							height={17}
							quality={100}
						/>
					</div>
					<p className="font-['Maison Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-nowrap text-white tracking-[-0.8px]">
						SummerHacks
					</p>
				</div>
				<div className="flex flex-col items-center gap-2 self-stretch">
					<p className="font-['Maison Neue:Book',sans-serif] leading-[normal] relative shrink-0 text-[16px] text-nowrap text-shadow-[0px_0px_20px_rgba(0,0,0,0.25)]">
						This June
					</p>
					<div className="flex flex-col font-['Maison Neue:Medium',sans-serif] justify-end leading-0 min-w-full relative shrink-0 text-[32px] text-shadow-[0px_0px_30px_rgba(0,0,0,0.25)] tracking-[-0.64px] w-min">
						<p className="leading-none">Build under open skies</p>
					</div>
				</div>
			</div>

			<EmailSignup />
		</div>
	);
}

function EmailSignup() {
	const imgOrangeSun = "/orange-sun.svg";
	const imgArrowUp = "/arrow-up.svg";

	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");

	const getPlaceholder = () => {
		switch (status) {
			case "success":
				return "saved!";
			case "error":
				return "error, try again...";
			case "loading":
				return "saving...";
			default:
				return "your email...";
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			setStatus("error");
			return;
		}

		setStatus("loading");

		try {
			const response = await fetch("/api/email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (response.ok) {
				setStatus("success");
				setEmail("");
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-(--base\/0,white) content-stretch flex gap-6 h-14 items-center overflow-clip pl-4 pr-0.5 py-0.5 relative rounded-lg shadow-[0px_20px_50px_0px_rgba(0,0,0,0.25)] shrink-0 max-sm:flex-col max-sm:h-auto max-sm:items-start max-sm:gap-3.5 max-sm:p-4 max-sm:w-full max-sm:max-w-82.5"
		>
			<div className="content-stretch flex gap-2 items-center relative shrink-0">
				<div className="relative shrink-0 size-2.5">
					<div
						className="absolute inset-0"
						style={
							{
								"--fill-0": "rgba(253, 184, 105, 1)",
							} as React.CSSProperties
						}
					>
						<Image
							alt=""
							className="block max-w-none size-full"
							src={imgOrangeSun}
							width={10}
							height={10}
							quality={100}
						/>
					</div>
				</div>
				<p className="font-['Maison Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-(--base\/800,#2a2a2a) text-nowrap tracking-[-0.64px]">
					Waitlist open. Limited spots.
				</p>
			</div>
			<div className="content-stretch flex gap-0.5 h-full items-center relative shrink-0 max-sm:h-13.5 max-sm:w-full">
				<div className="border border-(--primary\/sun\/100,#ffefdd) border-solid content-stretch flex h-full items-center overflow-clip px-5 py-0 relative rounded-[100px] shrink-0 w-72.5 max-sm:w-auto max-sm:grow">
					{status === "success" ? (
						<p className="font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic text-[14px] text-[#fdb869] tracking-[-0.56px]">
							added to waitlist!
						</p>
					) : (
						<input
							type="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								if (status === "error") setStatus("idle");
							}}
							placeholder={getPlaceholder()}
							disabled={status === "loading"}
							className={`font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic w-full bg-transparent outline-none text-[14px] text-[#fdb869] tracking-[-0.56px] disabled:opacity-50 ${
								status === "error"
									? "placeholder:text-red-400"
									: "placeholder:text-[#fdb869]"
							}`}
						/>
					)}
				</div>
				<button
					type="submit"
					disabled={status === "loading"}
					className="aspect-54/54 bg-(--primary\/sun\/100,#ffefdd) content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[100px] shrink-0 hover:bg-(--primary\/sun\/200,#fde4c8) transition-colors disabled:opacity-50 cursor-pointer"
				>
					<div
						className="flex items-center justify-center relative shrink-0 size-5"
						style={
							{
								"--transform-inner-width": "0",
								"--transform-inner-height": "0",
							} as React.CSSProperties
						}
					>
						<div className="flex-none rotate-90">
							<div className="relative size-5">
								<Image
									alt=""
									className="block max-w-none size-full"
									src={imgArrowUp}
									width={20}
									height={20}
									quality={100}
								/>
							</div>
						</div>
					</div>
				</button>
			</div>
		</form>
	);
}

function ScrollIndicator() {
	const imgArrowUp = "/arrow-up.svg";

	return (
		<div className="content-stretch flex flex-col gap-3 items-center justify-end pb-4 pt-0 px-0 relative shrink-0 w-full">
			<button
				onClick={() =>
					document
						.getElementById("about")
						?.scrollIntoView({ behavior: "smooth" })
				}
				className="backdrop-blur-[2.5px] backdrop-filter bg-[rgba(255,239,218,0.2)] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-13 cursor-pointer hover:bg-[rgba(255,239,218,0.3)] transition-colors"
			>
				<div className="flex items-center justify-center relative shrink-0">
					<div className="flex-none rotate-180">
						<div
							className="relative size-5"
							style={{ filter: "brightness(0) invert(1)" }}
						>
							<Image
								alt=""
								className="block max-w-none size-full"
								src={imgArrowUp}
								width={20}
								height={20}
								quality={100}
							/>
						</div>
					</div>
				</div>
			</button>
			<p className="font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ffefda] text-[14px] text-center text-nowrap tracking-[-0.28px]">
				Scroll down and discover
			</p>
		</div>
	);
}
