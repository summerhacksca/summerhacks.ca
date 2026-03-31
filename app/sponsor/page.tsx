
/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { GoogleDriveLogoIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";


const logo = "/logos/fullwhite-nobg.svg";

export default function Sponsor() {
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
							className="sponsor-bg-video absolute max-w-none object-50%-50% object-cover size-full"
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
                <p className="z-10 text-[20px] text-white font-medium font-['Maison Neue:Medium', sans-serif] tracking-[-0.64px]">Build under open skies</p>
			</div>
		</div>
	);
}

function Header() {
	return (
		<div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
			<div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
				<div className="relative shrink-0">
					<img
						alt=""
						className="md:hidden block max-w-[40vw] size-full"
						src={logo}
					/>
				</div>
			</div>
			<div className="content-stretch hidden md:flex gap-[5.842px] items-center justify-center relative shrink-0">
				<div className="relative shrink-0">
					<img
						alt=""
						className="block max-w-none size-full"
						src={logo}
					/>
				</div>
			</div>
			<div className="basis-0 content-stretch flex grow items-center justify-end min-h-px min-w-px relative shrink-0">
			</div>
		</div>
	);
}

function MainContent() {
	return (
		<div className="basis-0 content-stretch flex flex-col gap-12 grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
			<div className="content-stretch flex flex-col gap-12 items-center not-italic relative shrink-0 text-(--text\/on-dark,white) text-center w-full">
				<div className="flex flex-col items-center gap-2 self-stretch">
					<div className="flex flex-col font-['Maison Neue:Medium',sans-serif] font-bold justify-end leading-0 min-w-full relative shrink-0 text-3xl md:text-5xl text-shadow-[0px_0px_30px_rgba(0,0,0,0.25)] tracking-[-0.64px] w-min">
						<p className="leading-none">Thank you for your <br />interest in sponsoring.</p>
					</div>
				</div>
			</div>

			<EmailSignup />
		</div>
	);
}

function EmailSignup() {
	const imgOrangeSun = "/orange-sun.svg";

	return (
		<div
			className="bg-(--base\/0,white) content-stretch flex gap-6 h-14 items-center overflow-clip pl-4 pr-0.5 py-0.5 relative rounded-lg shadow-[0px_20px_50px_0px_rgba(0,0,0,0.25)] shrink-0 max-sm:flex-col max-sm:h-auto max-sm:items-start max-sm:gap-3.5 max-sm:p-4 max-sm:w-full max-sm:max-w-82.5"
		>
            <a href="https://drive.google.com/file/d/1BgZAcUphJN6mjg_9d9F6q0lL9YAhKydP/view?usp=sharing" target="_blank" rel="noopener noreferrer">
				<div className="content-stretch flex gap-2 items-center relative shrink-0">
					<div className="relative shrink-0 size-2.5">
						<div
							className="absolute inset-0"
							style={
							{
								"--fill-0": "rgba(253, 184, 105, 1)",
							} as React.CSSProperties
						}>
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
                    <p className="font-['Maison Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] pr-3 text-(--base\/800,#2a2a2a) text-nowrap tracking-[-0.64px]">
                        Get sponsorship package
                    </p>

                    <div className="flex items-center p-4 bg-[#FFEFDD] rounded-[100px] self-stretch justify-between">
                        <GoogleDriveLogoIcon size={20} weight="regular" color="#B07F46" />
                    </div>
			    </div>
            </a>
		</div>
	);
}
