/* eslint-disable @next/next/no-img-element */
"use client";

import { Icon } from "@iconify/react";

const logo = "/logos/white-nobg.svg";
const bagWhite = "/graphics/bag-white.svg";
const whiteOrange = "/graphics/whiteorange.svg";

export default function Footer() {
	return (
		<div id="team" className="relative w-full bg-[#BD3C3C] -z-20">
			<div className="flex items-start p-3 w-full">
				<div className="flex flex-col p-3 md:p-9 w-full gap-9 items-start self-stretch">
					{/* Label row */}
					<div className="flex items-center gap-[36px]">
						<span className="text-[16px] font-medium text-white tracking-[-0.64px]">
							6
						</span>
						<div className="flex items-center gap-[12px]">
							<img src={logo} alt="Logo" width={17} height={17} />
							<span className="text-[16px] font-medium text-white tracking-[-0.64px]">
								Orange you glad you visited?
							</span>
						</div>
					</div>

					<p className="text-white font-['Maison Neue:Book',sans-serif] leading-[normal] relative shrink-0 text-[16px]">
						Copyright © SummerHacks 2026
					</p>

					<div className="flex gap-7">
						<Icon
							icon="mdi:linkedin"
							width="24"
							height="24"
							color="#ffffff"
						/>
						<Icon
							icon="prime:twitter"
							width="24"
							height="24"
							color="#ffffff"
						/>
						<Icon
							icon="mdi:instagram"
							width="24"
							height="24"
							color="#ffffff"
						/>
					</div>

					<img
						src={bagWhite}
						alt="Bag"
						className="hidden md:block absolute bottom-0 right-0 -z-10"
						width={292}
					/>

					<img
						src={whiteOrange}
						alt=""
						className="hidden md:block absolute bottom-30 right-100 -z-10"
					/>

					<img
						src={whiteOrange}
						alt=""
						className="hidden md:block absolute bottom-45 right-75 -z-10 rotate-55"
					/>
				</div>
			</div>
		</div>
	);
}
