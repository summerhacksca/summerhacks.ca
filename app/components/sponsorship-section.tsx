/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";

const sponspackage = "/sponspackage.svg";
const sponspackagePdf = "/sponspackage.pdf";
const oranges = {
	orange1: "/orange.svg",
	orange2: "/orangespot.svg",
	orange3: "/orangeleafup.svg",
	orange4: "/orangespotalt.svg",
};
const download = "/download.svg";

export default function SponsorshipSection() {
	return (
		<section
			id="sponsorship"
			className="bg-white h-auto md:h-screen w-full flex p-3 flex-col items-start self-stretch overflow-hidden box-border"
		>
			<div className="h-full w-full flex flex-col items-start px-2 py-9 md:p-9 gap-9 self-stretch box-border overflow-hidden">
				{/* page label */}
				<div className="flex items-center gap-9">
					<span className="text-[16px] font-medium text-[#2a2a2a] tracking-[-0.64px]">
						3
					</span>
					<div className="flex items-center gap-[12px]">
						<span className="block w-[16px] h-[16px] rounded-full bg-[#FDB869]" />
						<span className="text-[16px] font-medium text-[#2a2a2a] tracking-[-0.64px]">
							Partners
						</span>
					</div>
				</div>
				<div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-19 self-stretch min-w-0 flex-1 min-h-0">
					<InfoRows className="order-1 md:order-2" />
					<a
						href={sponspackagePdf}
						target="_blank"
						rel="noopener noreferrer"
						className="order-2 md:order-1 flex-1 min-w-0 max-w-full self-stretch min-h-0 flex items-center justify-center"
					>
						<img
							alt=""
							className="block w-auto h-auto max-w-full max-h-full border-[3px] border-white bg-[#d3d3d3] shadow-[0_10px_20px_2px_rgba(0,0,0,0.05)]"
							src={sponspackage}
						/>
					</a>
				</div>
			</div>
		</section>
	);
}

function OrangeRow({ className = "" }: { className?: string }) {
	const [shuffledIndices, setShuffledIndices] = useState<number[]>([
		0, 1, 2, 3,
	]);
	const orangeBaseRotations = [0, -8, 6, -4];
	const [rotations, setRotations] = useState<number[]>(orangeBaseRotations);
	const hoveredRef = useRef<boolean[]>([false, false, false, false]);
	const speedsRef = useRef<number[]>([0, 0, 0, 0]);
	const rotationsRef = useRef<number[]>(orangeBaseRotations);

	useEffect(() => {
		const frameId = requestAnimationFrame(() => {
			setShuffledIndices([0, 1, 2, 3].sort(() => Math.random() - 0.5));
		});

		return () => cancelAnimationFrame(frameId);
	}, []);

	useEffect(() => {
		let animationFrameId = 0;

		const animate = () => {
			const maxSpeed = 10;
			const easing = 0.025;

			for (let i = 0; i < 4; i += 1) {
				const targetSpeed = hoveredRef.current[i] ? maxSpeed : 0;
				speedsRef.current[i] +=
					(targetSpeed - speedsRef.current[i]) * easing;
				rotationsRef.current[i] += speedsRef.current[i];
			}

			setRotations([...rotationsRef.current]);
			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrameId);
	}, []);

	const orangeKeys = Object.keys(oranges) as (keyof typeof oranges)[];
	return (
		<div className={`flex gap-4 md:gap-7.5 ${className}`}>
			{shuffledIndices.map((index) => {
				const currentRotation =
					rotations[index] ?? orangeBaseRotations[index] ?? 0;

				return (
					<div
						key={index}
						className="flex-1 min-w-0 flex justify-center"
					>
						<img
							alt=""
							className="block w-auto h-auto max-w-full object-contain"
							onMouseEnter={() => {
								hoveredRef.current[index] = true;
							}}
							onMouseLeave={() => {
								hoveredRef.current[index] = false;
							}}
							src={oranges[orangeKeys[index]]}
							style={{
								transform: `rotate(${currentRotation}deg)`,
							}}
						/>
					</div>
				);
			})}
		</div>
	);
}

function InfoRows({ className = "" }: { className?: string }) {
	return (
		<div
			className={`flex flex-col items-start justify-center self-stretch flex-1 min-w-0 gap-7 ${className}`}
		>
			<OrangeRow />
			<div className="flex flex-col items-start gap-7">
				{/* oranges */}
				<h1 className="text-[32px] font-normal text-[#2a2a2a] font-['Maison Neue'] leading-[100%] tracking-[-0.64px]">
					Join us under the sun
				</h1>

				<p className="text-[12px] font-light text-black font-['Maison Neue'] leading-[130%] tracking-[-0.24px] max-w-[359px]">
					Help us create a space to innovate under open skies. Hosted
					outdoors with overnight camping, SummerHacks pushes
					creativity beyond traditional walls and encourages students
					to think differently about the world they are building, and
					the environment we live in. As our debut event, partner
					support plays a critical role in bringing this vision to
					life!
				</p>

				<p className="text-[14px] font-light text-[#B07f46] font-['Maison Neue Book'] leading-[130%] tracking-[-0.28px] max-w-[395px]">
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
			<OrangeRow className="hidden md:flex" />
		</div>
	);
}
