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
  const [paragraphOffsets, setParagraphOffsets] = useState<number[]>([]);
  const [textWidth, setTextWidth] = useState<number>(0);
  const [overlayProgress, setOverlayProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const textWrapperRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const rainbowColors = [
    '#ff0000', // red
    '#ff7f00', // orange
    '#ffff00', // yellow
    '#00ff00', // green
    '#0000ff', // blue
    '#4b0082', // indigo
    '#8b00ff', // violet
  ];

  const measureLayout = () => {
    const heights = paragraphRefs.current.map(ref => ref?.offsetHeight || 0);
    const wrapperRect = textWrapperRef.current?.getBoundingClientRect();
    const offsets = paragraphRefs.current.map(ref => {
      if (!ref || !wrapperRect) return 0;
      const rect = ref.getBoundingClientRect();
      return rect.top - wrapperRect.top;
    });
    const width = textWrapperRef.current?.clientWidth || 0;

    setParagraphHeights(heights);
    setParagraphOffsets(offsets);
    setTextWidth(width);

    console.log('First paragraph height:', heights[0]);
    console.log('Text wrapper width:', width);
  };

  useEffect(() => {
    measureLayout();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      measureLayout();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

    const handleScroll = () => {
      if (!aboutRef.current) return;
      const sectionTop = aboutRef.current.offsetTop;
      const sectionHeight = aboutRef.current.offsetHeight;
      const start = sectionTop - window.innerHeight;
      const end = sectionTop + sectionHeight;
      const raw = (window.scrollY - start) / (end - start);
      setOverlayProgress(clamp(raw, 0, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div ref={aboutRef} id="about" className="relative w-full" style={{ height: 'calc(100vh + 3600px)' }}>
      <div className="sticky top-0 content-stretch flex flex-col items-start p-[12px] shrink-0 w-full h-screen z-[3]">
        <div className="bg-[#fffbf6] content-stretch flex flex-col gap-16 items-center justify-center overflow-clip pb-32 pt-41 px-6 md:px-32 relative shrink-0 w-full h-[calc(100dvh-24px)]">
        <BackgroundImages />
        
        <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
          <div ref={textWrapperRef} className="flex flex-col font-['Maison Neue:Medium',sans-serif] justify-end leading-[1.2] min-w-full not-italic px-[24px] md:px-0 relative shrink-0 text-[#ffcf98] text-[24px] md:text-[32px] text-justify tracking-[-0.64px] w-[min-content]">
            {/* paragraph 0 */}
            <p ref={el => { paragraphRefs.current[0] = el }} className="mb-0 text-[#2a2a2a]">Building feels different in summer. </p>
            <p className="mb-0">&nbsp;</p>
            {/* paragraph 1 */}
            <p ref={el => { paragraphRefs.current[1] = el }} className="font-['Maison Neue:Book',sans-serif] mb-0">
              <span className="text-[#ffcf98]">Time moves more slowly. Ideas have space to breathe. Conversation stretches beyond the screen. SummerHacks is a thoughtfully designed hackathon that takes place outdoors, shaped by the rhythm and openness of the season.</span>
            </p>
            {/* paragraph 2 */}
            <p className="mb-0">&nbsp;</p>
            <p ref={el => { paragraphRefs.current[2] = el }} className="font-['Maison Neue:Book',sans-serif]">At its core, SummerHacks is about creating something lasting. Not only the projects that are built, but the memory of building them. Outdoors, together, during a fleeting moment of summer.</p>
            {/* paragraph 3 */}
            <p className="mb-0">&nbsp;</p>
            <p ref={el => { paragraphRefs.current[3] = el }} className="leading-[1.2]">Let&apos;s build in golden hours.<span className="text-4xl text-[#FDB869]">●</span></p>

            <div className="pointer-events-none absolute inset-0 z-10">
              {(() => {
                const segmentUnit = isMobile ? 29 : 38.4;
                const paragraphSegments = paragraphHeights.map(height =>
                  height ? Math.max(1, Math.round(height / segmentUnit)) : 0
                );
                const paragraphWidths = paragraphSegments.map(segments => segments * textWidth);
                const totalWidth = paragraphWidths.reduce((sum, width) => sum + width, 0);
                const progressWidth = overlayProgress * totalWidth;
                let runningWidth = 0;

                return paragraphHeights.map((height, idx) => {
                  if (!height) return null;
                  const segments = paragraphSegments[idx];
                  const segmentHeight = height / segments;
                  const topBase = paragraphOffsets[idx] ?? 0;
                  const paragraphWidth = paragraphWidths[idx];
                  const localProgressWidth = Math.min(
                    paragraphWidth,
                    Math.max(0, progressWidth - runningWidth)
                  );
                  runningWidth += paragraphWidth;

                  return Array.from({ length: segments }).map((_, segmentIdx) => {
                    const filledWidth = Math.min(
                      textWidth,
                      Math.max(0, localProgressWidth - segmentIdx * textWidth)
                    );
                    return (
                      <div
                        key={`${idx}-${segmentIdx}`}
                        style={{
                          position: 'absolute',
                          left: 0,
                          width: `${filledWidth}px`,
                          height: `${segmentHeight}px`,
                          top: `${topBase + segmentHeight * segmentIdx}px`,
                          backgroundColor: rainbowColors[(idx + segmentIdx) % rainbowColors.length],
                          transition: 'width 120ms linear',
                        }}
                      />
                    );
                  });
                });
              })()}
            </div>
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
        <p className="font-['Maison Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#b07f46] text-[14px] text-center text-nowrap tracking-[-0.28px]">
          Continue
        </p>
      </a>
    </div>
  );
}
