/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUp } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const logo = "/logos/fullwhite-nobg.svg";

export default function HeroSection() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [useGifFallback, setUseGifFallback] = useState(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const attemptAutoplay = async () => {
			try {
				const playPromise = video.play();
				if (playPromise) {
					await playPromise;
				}
			} catch {
				// iOS Low Power Mode commonly blocks autoplay.
				setUseGifFallback(true);
			}
		};

		attemptAutoplay();
	}, []);

	return (
		<div className="content-stretch flex flex-col items-start p-3 relative shrink-0 w-full z-4">
			<div className="content-stretch flex flex-col h-[calc(100dvh-24px)] items-center justify-center overflow-clip p-9 max-sm:p-5 relative shrink-0 w-full">
				<div
					aria-hidden="true"
					className="absolute inset-0 pointer-events-none"
				>
					{useGifFallback ? (
						<img
							alt=""
							className="absolute max-w-none object-50%-50% object-cover size-full"
							src="/videofallback.gif"
						/>
					) : (
						<video
							ref={videoRef}
							className="absolute max-w-none object-50%-50% object-cover size-full"
							autoPlay
							muted
							loop
							playsInline
							preload="auto"
							disablePictureInPicture
							onError={() => setUseGifFallback(true)}
						>
							<source src="/video.mp4" type="video/mp4" />
						</video>
					)}
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
				<p className="hidden md:block font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-(--text\/on-dark,white) text-nowrap text-right tracking-[-0.28px]">
					Summer 2026 - 2 days
				</p>
				<div className="relative shrink-0">
					<img
						alt=""
						className="md:hidden block max-w-[40vw] size-full"
						src={logo}
					/>
				</div>
			</div>
			<div className="content-stretch flex gap-[5.842px] items-center justify-center relative shrink-0 hidden md:block">
				<div className="relative shrink-0">
					<img
						alt=""
						className="block max-w-none size-full"
						src={logo}
					/>
				</div>
			</div>
			<div className="basis-0 content-stretch flex grow items-center justify-end min-h-px min-w-px relative shrink-0">
				<div className="flex flex-col gap-1">
					<p className="font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-(--text\/on-dark,white) text-nowrap text-right tracking-[-0.28px]">
						Outdoor hackathon
					</p>
					<p className="block md:hidden font-['Maison Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-(--text\/on-dark,white) text-nowrap tracking-[-0.28px]">
						Summer 2026 - 2 days
					</p>
				</div>
			</div>
		</div>
	);
}

function MainContent() {
	return (
		<div className="basis-0 content-stretch flex flex-col gap-12 grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
			<div className="content-stretch flex flex-col gap-12 items-center not-italic relative shrink-0 text-(--text\/on-dark,white) text-center w-full">
				<div className="flex flex-col items-center gap-2 self-stretch">
					<p className="font-['Maison Neue:Book',sans-serif] leading-[normal] relative shrink-0 text-[16px] text-nowrap text-shadow-[0px_0px_20px_rgba(0,0,0,0.25)]">
						This summer
					</p>
					<div className="flex flex-col font-['Maison Neue:Medium',sans-serif] font-medium justify-end leading-0 min-w-full relative shrink-0 text-[32px] text-shadow-[0px_0px_30px_rgba(0,0,0,0.25)] tracking-[-0.64px] w-min">
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
	const router = useRouter();

	return (
		<div
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
					Applications open. Start now.
				</p>
			</div>
			<div className="content-stretch flex gap-0.5 h-full items-center relative shrink-0 max-sm:h-13.5 max-sm:w-full">
				<button
					type="button"
					onClick={() => router.push("/apply")}
					className="bg-(--primary\/sun\/100,#ffefdd) text-[#B07F46] inline-flex h-full items-center justify-center overflow-clip px-4 rounded-[100px] shrink-0 hover:bg-(--primary\/sun\/200,#fde4c8) transition-colors disabled:opacity-50 cursor-pointer max-sm:h-13.5 max-sm:w-full"
				>
					<div className="flex items-center justify-center gap-2 relative shrink-0">
						APPLY
						<div className="flex-none rotate-90">
							<div className="relative size-5">
								<ArrowUp size={20} weight="bold" className="block max-w-none size-full" />
							</div>
						</div>
					</div>
				</button>
			</div>
		</div>
	);
}

function ScrollIndicator() {
    

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
									<ArrowUp size={20} weight="bold" className="block max-w-none size-full" />
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
