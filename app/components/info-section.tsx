"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "@/app/data/faqs.json";

const imgOrangeSun = "logos/orange-nobg.svg";
const imgBlueSun = "logos/blue-nobg.svg";
const imgFrame70 = "/frame-70.png";
const imgArrowUp = "/arrow-up.svg";

export default function InfoSection() {
	return (
		<div
			id="info"
			className="bg-white content-stretch flex flex-col md:flex-row items-start overflow-visible md:overflow-clip pb-0 p-3 md:p-3 relative shrink-0 w-full h-auto md:h-screen z-[2]"
		>
			<LeftPanel />
			<RightPanel />
		</div>
	);
}

function LeftPanel() {
	return (
		<div className="w-full md:basis-0 content-stretch flex flex-col md:grow items-start min-h-px min-w-px overflow-clip p-[12px] md:p-[36px] relative self-stretch justify-between shrink-0">
			{/* General Info Header */}
			<div className="content-stretch flex gap-[36px] items-center relative shrink-0">
				<p className="font-['Maison Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-[#2a2a2a] text-nowrap tracking-[-0.64px]">
					1
				</p>
				<div className="content-stretch flex gap-[12px] items-center relative shrink-0">
					<div className="relative shrink-0 size-[16px]">
						<img
							alt=""
							className="block max-w-none size-full"
							src={imgOrangeSun}
						/>
					</div>
					<p className="font-['Maison Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-[#2a2a2a] text-nowrap tracking-[-0.64px]">
						General info
					</p>
				</div>
			</div>

			<AboutSection />
			<video
				className="w-full rounded-md md:mt-18"
				controls
				playsInline
				preload="metadata"
				poster="/first_frame.jpg"
			>
				<source src="/SUMMERHACKS.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			{/* <FAQSection faqs={faqs} /> */}
		</div>
	);
}

function AboutSection() {
	return (
		<div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full">
			<div className="flex flex-col font-['Maison Neue',sans-serif] font-normal justify-end leading-none not-italic relative shrink-0 text-[32px] text-[#2a2a2a] tracking-[-0.64px] whitespace-nowrap">
				<p className="leading-none mb-0">About</p>
			</div>
			<div className="font-['Maison Neue',sans-serif] font-normal leading-normal not-italic relative shrink-0 text-[14px] text-[#2a2a2a]">
				<p className="leading-normal mb-0">
					Participants will spend a weekend building projects under
					open skies, surrounded by greenery, camp-like activities,
					and a close-knit community.
				</p>
				<p className="leading-normal mb-0">&nbsp;</p>
				<p className="mb-0">
					<span className="leading-normal">
						Coming soon. Join our waitlist for early updates and
						news.
					</span>
				</p>
			</div>
			<div className="hidden content-stretch md:flex flex-col items-start justify-end relative shrink-0">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
					className="backdrop-blur-[1px] bg-[#ffefdd] content-stretch flex gap-[10px] h-[52px] items-center overflow-clip px-[16px] relative rounded-[100px] shrink-0 cursor-pointer hover:bg-[#ffe5cd] transition-colors"
				>
					<div className="relative shrink-0 size-[20px]">
						<img
							alt=""
							className="block max-w-none size-full"
							src={imgArrowUp}
						/>
					</div>
					<p className="font-['Maison Neue',sans-serif] font-medium leading-normal not-italic relative shrink-0 text-[#b07f46] text-[14px] text-center tracking-[-0.28px]">
						Join the waitlist
					</p>
				</button>
			</div>
		</div>
	);
}

function RightPanel() {
	return (
		<div className="w-full md:basis-0 content-stretch flex flex-col h-[100dvh] md:grow md:h-full items-start justify-between min-h-px min-w-px overflow-clip p-9 relative self-stretch shrink-0">
			<div
				aria-hidden="true"
				className="absolute inset-0 pointer-events-none"
			>
				<div className="absolute inset-0 overflow-hidden">
					<img
						alt=""
						className="absolute inset-0 w-full h-full object-cover"
						src={imgFrame70}
					/>
				</div>
				<div className="absolute inset-0 bg-black/20" />
			</div>

			<div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0">
				<div className="content-stretch flex gap-[36px] items-center relative shrink-0">
					<p className="font-['Maison Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-[#daf6ff] text-nowrap tracking-[-0.64px]">
						2
					</p>
					<div className="content-stretch flex gap-[12px] items-center relative shrink-0">
						<div className="relative shrink-0 size-[16px]">
							<img
								alt=""
								className="block max-w-none size-full"
								src={imgBlueSun}
							/>
						</div>
						<p className="font-['Maison Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-[#daf6ff] text-nowrap tracking-[-0.64px]">
							Let&apos;s touch grass
						</p>
					</div>
				</div>
				<p className="font-['Maison Neue',sans-serif] font-normal leading-[normal] not-italic relative  text-[14px] text-white max-w-[324px]">
					Stepping outside changes how you think. Fresh air slows the
					noise, sunlight sharpens focus, and ideas feel lighter when
					they&apos;re not trapped on a screen.
				</p>
			</div>

			<p className="font-['Maison Neue',sans-serif] font-normal leading-[normal] not-italic relative text-[14px] text-white max-w-[372px]">
				Sometimes, the best way to build better things is to unplug for
				a moment and let the world around you do the rest.
			</p>
		</div>
	);
}
