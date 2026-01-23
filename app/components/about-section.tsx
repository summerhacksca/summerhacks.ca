"use client";

import { splitText } from "animejs";
import { useRef, useEffect, useState } from "react";

const imgBgFlowers = "/chat-gpt-image.png";
const imgOrangeSun = "/orange-sun.svg";
const imgArrowUp = "/arrow-up.svg";

const paragraphs = [
  "Building feels different in summer.",
  "Time moves more slowly. Ideas have space to breathe. Conversation stretches beyond the screen. SummerHacks is a thoughtfully designed hackathon that takes place outdoors, shaped by the rhythm and openness of the season.",
  "At its core, SummerHacks is about creating something lasting. Not only the projects that are built, but the memory of building them. Outdoors, together, during a fleeting moment of summer.",
  "Let's build in golden hours.",
];

export default function AboutSection() {
  const [paragraphHeights, setParagraphHeights] = useState<number[]>([]);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const textWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const heights = paragraphRefs.current.map(ref => ref?.offsetHeight || 0);
    setParagraphHeights(heights);
    console.log('First paragraph height:', heights[2]);
    const textWidth = textWrapperRef.current?.clientWidth || 0;
    console.log('Text wrapper width:', textWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const height = paragraphRefs.current[2]?.offsetHeight || 0;
      const textWidth = textWrapperRef.current?.clientWidth || 0;
      console.log('First paragraph height on resize:', height);
      console.log('Text wrapper width on resize:', textWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div id="about" className="relative w-full" style={{ height: 'calc(100vh + 3600px)' }}>
      <div className="sticky top-0 content-stretch flex flex-col items-start p-[12px] shrink-0 w-full h-screen z-[3]">
        <div className="bg-[#fffbf6] content-stretch flex flex-col gap-[64px] items-center justify-center overflow-clip pb-[128px] pt-[164px] px-[128px] relative shrink-0 w-full h-[calc(100dvh-24px)]">
        <BackgroundImages />
        
        <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
          <div ref={textWrapperRef} className="flex flex-col font-['Maison_Neue:Medium',sans-serif] justify-end leading-[1.2] min-w-full not-italic relative shrink-0 text-[#ffcf98] text-[32px] text-justify tracking-[-0.64px] w-[min-content]">
            {/* paragraph 0 */}
            <p ref={el => { paragraphRefs.current[0] = el }} className="mb-0 text-[#2a2a2a]">Building feels different in summer. </p>
            <p className="mb-0">&nbsp;</p>
            {/* paragraph 1 */}
            <p ref={el => { paragraphRefs.current[1] = el }} className="font-['Maison_Neue:Book',sans-serif] mb-0">
              <span className="text-[#ffcf98]">Time moves more slowly. Ideas have space to breathe. Conversation stretches beyond the screen. SummerHacks is a thoughtfully designed hackathon that takes place outdoors, shaped by the rhythm and openness of the season.</span>
            </p>
            {/* paragraph 2 */}
            <p className="mb-0">&nbsp;</p>
            <p ref={el => { paragraphRefs.current[2] = el }} className="font-['Maison_Neue:Book',sans-serif]">At its core, SummerHacks is about creating something lasting. Not only the projects that are built, but the memory of building them. Outdoors, together, during a fleeting moment of summer.</p>
            {/* paragraph 3 */}
            <p className="mb-0">&nbsp;</p>
            <p ref={el => { paragraphRefs.current[3] = el }} className="leading-[1.2]">Let's build in golden hours.<span className="text-4xl text-[#FDB869]">●</span></p>
          </div>
        </div>
        
        <ContinueButton />
        </div>
      </div>
    </div>
  );
}

function BackgroundImages() {
  return (
    <>
      <div className="absolute flex items-center justify-center left-[-297px] size-[717px] top-[-388px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="relative size-[717px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-30 pointer-events-none size-full" src={imgBgFlowers} />
          </div>
        </div>
      </div>
      <div className="absolute right-[-77px] size-[717px] top-[-287px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-30 pointer-events-none size-full" src={imgBgFlowers} />
      </div>
      <div className="absolute flex items-center justify-center right-[-311px] size-[717px] top-[644px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="relative size-[717px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-30 pointer-events-none size-full" src={imgBgFlowers} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-503px] flex items-center justify-center left-[-380px] size-[717px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="relative size-[717px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-30 pointer-events-none size-full" src={imgBgFlowers} />
          </div>
        </div>
      </div>
    </>
  );
}

function ContinueButton() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative shrink-0">
      <a href="#info" className="backdrop-blur-[1px] backdrop-filter bg-[#ffefdd] content-stretch flex gap-[10px] h-[52px] items-center overflow-clip px-[16px] py-0 relative rounded-[100px] shrink-0">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-[180deg]">
            <div className="relative size-[20px]">
              <img alt="" className="block max-w-none size-full" src={imgArrowUp} />
            </div>
          </div>
        </div>
        <p className="font-['Maison_Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#b07f46] text-[14px] text-center text-nowrap tracking-[-0.28px]">
          Continue
        </p>
      </a>
    </div>
  );
}
