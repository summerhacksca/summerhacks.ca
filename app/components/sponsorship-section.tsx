/* eslint-disable @next/next/no-img-element */
"use client";

const sponspackage = "/sponspackage.svg";
const sponspackagePdf = "/sponspackage.pdf";
const download = "/download.svg";

// logos
const imgOrangeSun = "logos/orange-nobg.svg";
const codeRabbit = "logos/coderabbit-brown.svg";
const akatos = "logos/akatos-brown.svg";
const nom = "logos/nom-brown.svg";
const gitTrophy = "logos/git-trophy-brown.svg";
const s2dev = "logos/s2dev-brown.svg";
const shopify = "logos/shopify-brown.svg";
const mundane = "logos/mundane-brown.svg";

// graphics
const basketBrown = "graphics/basket-brown.svg";
const bagBrown = "graphics/bag-brown.svg";
const orange = "graphics/orange.svg";
const pear = "graphics/pear.svg";
const apple = "graphics/apple.svg";

export default function SponsorshipSection() {
	return (
		<div
			id="sponsorship"
			className="bg-white content-stretch flex flex-col md:flex-row items-start overflow-visible md:overflow-clip pt-0 p-3 md:p-3 relative shrink-0 w-full h-auto md:h-screen z-[2]"
		>
			<LeftPanel />
			<RightPanel />
		</div>
	);
}

function Logo({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="flex items-center align-middle self-stretch">
			<img
				alt={alt}
				src={src}
				className="max-w-none size-full object-contain min-h-10 max-h-10"
			/>
		</div>
	);
}

function Logos() {
	return (
		<div className="flex flex-col items-center justify-center self-stretch flex-1 min-w-0 gap-9 md:gap-14">
			<div className="flex items-center align-middle self-stretch">
				<img
					alt="CodeRabbit logo"
					src={codeRabbit}
					className="max-w-none size-full object-contain min-h-10 max-h-20"
				/>
			</div>
			<div className="flex px-4 items-center w-full gap-7">
				<div className="flex-1 min-w-0">
					<Logo src={akatos} alt="Akatos logo" />
				</div>
				<div className="flex-1 min-w-0">
					<Logo src={nom} alt="Nom logo" />
				</div>
			</div>
			<div className="flex px-4 items-center w-full gap-7">
				<div className="flex-1 min-w-0">
					<Logo src={gitTrophy} alt="GitTrophy logo" />
				</div>
				<div className="flex-1 min-w-0">
					<Logo src={s2dev} alt="S2Dev logo" />
				</div>
			</div>
			<div className="flex items-center align-middle self-stretch">
				<img
					alt="shopify logo"
					src={shopify}
					className="max-w-none size-full object-contain min-h-10 max-h-20"
				/>
			</div>
			<div className="flex items-center align-middle self-stretch">
				<img
					alt="mundane logo"
					src={mundane}
					className="max-w-none size-full object-contain min-h-10 max-h-20"
				/>
			</div>
		</div>
	);
}

function LeftPanel() {
	return (
		<div className="bg-[#FFFBF6] h-[75dvh] md:h-dvh w-full md:basis-0 content-stretch flex flex-col md:grow items-start min-h-px min-w-px overflow-clip p-[36px] relative self-stretch shrink-0 -z-20">
			<div className="items-center shrink-0 content-stretch flex flex-col gap-[36px] relative">
				<div className="content-stretch flex gap-[36px] items-center relative shrink-0">
					<p className="font-['Maison Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap tracking-[-0.64px]">
						3
					</p>
					<div className="content-stretch flex gap-[12px] items-center relative shrink-0">
						<div className="relative shrink-0 size-[16px]">
							<img
								alt=""
								className="block max-w-none size-full"
								src={imgOrangeSun}
							/>
						</div>
						<p className="font-['Maison Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap tracking-[-0.64px]">
							Sponsors
						</p>
					</div>
				</div>
			</div>
			<Logos />
			<img
				src={basketBrown}
				alt="Bag"
				className="absolute bottom-[-35px] left-[-22px] -z-10"
			/>
			<img
				src={bagBrown}
				alt="Bag"
				className="hidden md:block md:absolute bottom-[-3px] right-[-40px] -z-10"
			/>
		</div>
	);
}

function RightPanel() {
	return (
		<div className="w-full md:basis-0 content-stretch flex flex-col pb-55 gap-9 md:h-dvh md:grow md:h-full items-start justify-between min-h-px min-w-px overflow-clip px-[12px] py-[36px] md:p-[36px] relative self-stretch shrink-0">
			<div className="content-stretch flex gap-[36px] items-center relative shrink-0">
				<p className="font-['Maison Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap tracking-[-0.64px]">
					4
				</p>
				<div className="content-stretch flex gap-[12px] items-center relative shrink-0">
					<div className="relative shrink-0 size-[16px]">
						<img
							alt=""
							className="block max-w-none size-full"
							src={imgOrangeSun}
						/>
					</div>
					<p className="font-['Maison Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap tracking-[-0.64px]">
						Join us
					</p>
				</div>
			</div>
			<InfoRows className="order-1 md:order-2" />
			<img
				src={orange}
				alt="Orange"
				className="absolute left-[10px] bottom-[30px] sm:left-[50px] -z-20"
			/>
			<img
				src={pear}
				alt="Pear"
				className="hidden sm:block absolute bottom-[8px] right-[20vw] md:right-[14.4375vw] -z-20"
			/>
			<img
				src={apple}
				alt="Apple"
				className="absolute bottom-[50px] sm:top-auto sm:bottom-[50px] right-[-15px] -z-20"
			/>
		</div>
	);
}

function InfoRows({ className = "" }: { className?: string }) {
	return (
		<div
			className={`flex flex-col items-start justify-center self-stretch flex-1 min-w-0 gap-7 ${className}`}
		>
			<div className="flex flex-col items-start gap-7">
				<h1 className="text-[32px] font-normal text-[#2a2a2a] font-['Maison Neue'] leading-[100%] tracking-[-0.64px]">
					Join us under the sun
				</h1>

				<p className="text-[14px] font-light text-black font-['Maison Neue'] leading-[130%] tracking-[-0.24px] max-w-[359px]">
					Help us create a space to innovate under open skies. Hosted
					outdoors with overnight camping, SummerHacks pushes
					creativity beyond traditional walls and encourages students
					to think differently about the world they are building, and
					the environment we live in. As our debut event, partner
					support plays a critical role in bringing this vision to
					life!
				</p>

				<p className="text-[14px] font-medium text-[#B07f46] font-['Maison Neue Book'] leading-[130%] tracking-[-0.28px] max-w-[395px]">
					We are seeking sponsors who believe in shaping a greener
					future through community-driven innovation and want to
					meaningfully invest in the next generation of sustainable
					builders.
				</p>

				<div className="flex flex-col content-end items-center gap-3 ">
					<a
						href={sponspackagePdf}
						target="_blank"
						rel="noopener noreferrer"
						className="flex h-13 px-4 items-center gap-2.5 bg-[#ffefdd] py-3 rounded-[100px]"
					>
						<img
							alt=""
							className="max-w-none w-auto h-auto"
							src={download}
						/>
						<span className="text-[14px] font-medium text-[#B07f46] tracking-[-0.28px]">
							See our sponsorship package
						</span>
					</a>
				</div>
			</div>
		</div>
	);
}
