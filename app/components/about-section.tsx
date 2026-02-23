"use client";

import { useRef, useEffect, useState, useId, type MutableRefObject, memo } from "react";
import Image from "next/image";

const imgBgFlowers = "/chat-gpt-image.png";
const imgArrowUp = "/arrow-up.svg";

const OverlayMask = memo(function OverlayMask({
  maskId,
  textWidth,
  textHeight,
  maskRects,
}: {
  maskId: string;
  textWidth: number;
  textHeight: number;
  maskRects: Array<{ x: number; y: number; width: number; height: number }>;
}) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10"
      style={{ willChange: 'mask-image' }}
      width={textWidth}
      height={textHeight}
      viewBox={`0 0 ${textWidth} ${textHeight}`}
      preserveAspectRatio="none"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width={textWidth} height={textHeight} fill="black" />
          {maskRects.map((rect, idx) => (
            <rect
              key={`${rect.x}-${rect.y}-${idx}`}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill="white"
            />
          ))}
        </mask>
      </defs>
      <foreignObject x="0" y="0" width={textWidth} height={textHeight} mask={`url(#${maskId})`}>
        <div className="flex flex-col font-['Maison Neue:Medium',sans-serif] justify-end leading-[1.2] min-w-full not-italic text-black text-[20px] md:text-[32px] text-left md:!text-justify tracking-[-0.64px] w-[min-content]">
          <TextParagraphs textColorClass="text-black" dotColorClass="text-black" />
        </div>
      </foreignObject>
    </svg>
  );
});


export default function AboutSection() {
  const [paragraphHeights, setParagraphHeights] = useState<number[]>([]);
  const [paragraphOffsets, setParagraphOffsets] = useState<number[]>([]);
  const [textWidth, setTextWidth] = useState<number>(0);
  const [textHeight, setTextHeight] = useState<number>(0);
  const [overlayProgress, setOverlayProgress] = useState<number>(0);
  const [flowersVisible, setFlowersVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const textWrapperRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const maskId = useId();

  const measureLayout = () => { 
    const heights = paragraphRefs.current.map(ref => ref?.offsetHeight || 0);
    const wrapperRect = textWrapperRef.current?.getBoundingClientRect();
    const offsets = paragraphRefs.current.map(ref => {
      if (!ref || !wrapperRect) return 0;
      const rect = ref.getBoundingClientRect();
      return rect.top - wrapperRect.top;
    });
    const width = textWrapperRef.current?.clientWidth || 0;
    const height = textWrapperRef.current?.clientHeight || 0;

    setParagraphHeights(heights);
    setParagraphOffsets(offsets);
    setTextWidth(width);
    setTextHeight(height);

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
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;
      
      frameId = requestAnimationFrame(() => {
        if (!aboutRef.current) {
          frameId = null;
          return;
        }
        const rect = aboutRef.current.getBoundingClientRect();
        const sectionScroll = Math.max(0, -rect.top);
        setFlowersVisible(sectionScroll >= 120);
        const denom = Math.max(1, rect.height - window.innerHeight);
        const raw = (0 - rect.top) / denom;
        setOverlayProgress(clamp(raw, 0, 1));
        frameId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);
  const segmentUnit = isMobile ? 24 : 38.4;
  const paragraphSegments = paragraphHeights.map(height =>
    height ? Math.max(1, Math.round(height / segmentUnit)) : 0
  );
  const paragraphWidths = paragraphSegments.map(segments => segments * textWidth);
  const totalWidth = paragraphWidths.reduce((sum, width) => sum + width, 0);
  const progressWidth = overlayProgress * totalWidth;
  let runningWidth = 0;
  const maskRects: Array<{ x: number; y: number; width: number; height: number }> = [];

  paragraphHeights.forEach((height, idx) => {
    if (!height) {
      runningWidth += paragraphWidths[idx] || 0;
      return;
    }
    const segments = paragraphSegments[idx];
    const segmentHeight = height / Math.max(1, segments);
    const topBase = paragraphOffsets[idx] ?? 0;
    const paragraphWidth = paragraphWidths[idx] || 0;
    const localProgressWidth = Math.min(
      paragraphWidth,
      Math.max(0, progressWidth - runningWidth)
    );
    runningWidth += paragraphWidth;

    for (let segmentIdx = 0; segmentIdx < segments; segmentIdx += 1) {
      const filledWidth = Math.min(
        textWidth,
        Math.max(0, localProgressWidth - segmentIdx * textWidth)
      );
      if (filledWidth <= 0) continue;
      maskRects.push({
        x: 0,
        y: topBase + segmentHeight * segmentIdx,
        width: filledWidth,
        height: segmentHeight,
      });
    }
  });

  return (
    <div ref={aboutRef} id="about" className="relative w-full" style={{ height: 'calc(100vh + 3600px)' }}>
      <div className="sticky top-0 content-stretch flex flex-col items-start p-[12px] shrink-0 w-full h-screen z-[3]">
        <div className="bg-[#fffbf6] content-stretch flex flex-col gap-16 items-center justify-center overflow-clip pb-16 md:pb-32 pt-24 md:pt-41 px-6 md:px-32 relative shrink-0 w-full h-[calc(100dvh-24px)]">
        <BackgroundImages visible={flowersVisible} />
        <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
          <div ref={textWrapperRef} className="flex flex-col font-['Maison Neue:Medium',sans-serif] justify-end leading-[1.2] min-w-full not-italic relative shrink-0 text-[#ffcf98] text-[20px] md:text-[32px] text-left md:!text-justify tracking-[-0.64px] w-[min-content]" style={{ willChange: 'contents' }}>
            <TextParagraphs
              textColorClass="text-[#ffcf98]"
              dotColorClass="text-[#FDB869]"
              paragraphRefs={paragraphRefs}
              useRefs
            />
            {textWidth > 0 && textHeight > 0 && (
              <OverlayMask
                maskId={maskId}
                textWidth={textWidth}
                textHeight={textHeight}
                maskRects={maskRects}
              />
            )}
          </div>
        </div>
        
        <ContinueButton />
        </div>
      </div>
    </div>
  );
}

function TextParagraphs({
  textColorClass,
  dotColorClass,
  paragraphRefs,
  useRefs = false,
}: {
  textColorClass: string;
  dotColorClass: string;
  paragraphRefs?: MutableRefObject<(HTMLParagraphElement | null)[]>;
  useRefs?: boolean;
}) {
  const bindRef = (index: number) =>
    useRefs && paragraphRefs
      ? (el: HTMLParagraphElement | null) => {
          paragraphRefs.current[index] = el;
        }
      : undefined;

  return (
    <>
      {/* paragraph 0 */}
      <p ref={bindRef(0)} className="mb-0">Building feels different in summer. </p>
      <p className="mb-0">&nbsp;</p>
      {/* paragraph 1 */}
      <p ref={bindRef(1)} className="font-['Maison Neue:Book',sans-serif] mb-0">
        <span className={textColorClass}>
          Time moves more slowly. Ideas have space to breathe. Conversation stretches beyond the
          screen. SummerHacks is a thoughtfully designed hackathon that takes place outdoors,
          shaped by the rhythm and openness of the season.
        </span>
      </p>
      {/* paragraph 2 */}
      <p className="mb-0">&nbsp;</p>
      <p ref={bindRef(2)} className="font-['Maison Neue:Book',sans-serif]">
        At its core, SummerHacks is about creating something lasting. Not only the projects that
        are built, but the memory of building them. Outdoors, together, during a fleeting moment of
        summer.
      </p>
      {/* paragraph 3 */}
      <p className="mb-0">&nbsp;</p>
      <p ref={bindRef(3)} className="leading-[1.2] font-['Maison Neue:Book',sans-serif]">
        Let&apos;s build in golden hours.<span className={`text-2xl ${dotColorClass}`}>●</span>
      </p>
    </>
  );
}

function BackgroundImages({ visible }: { visible: boolean }) {
  return (
    <div className={`pointer-events-none transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div className="absolute flex items-center justify-center left-[-297px] size-[717px] top-[-388px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="relative size-[717px]">
            <Image alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-30 pointer-events-none size-full" src={imgBgFlowers} fill />
          </div>
        </div>
      </div>
      <div className="absolute right-[-77px] size-[717px] top-[-287px]">
        <Image alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-30 pointer-events-none size-full" src={imgBgFlowers} fill />
      </div>
      <div className="absolute flex items-center justify-center right-[-311px] size-[717px] top-[644px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="relative size-[717px]">
            <Image alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-30 pointer-events-none size-full" src={imgBgFlowers} fill />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-503px] flex items-center justify-center left-[-380px] size-[717px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="relative size-[717px]">
            <Image alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-30 pointer-events-none size-full" src={imgBgFlowers} fill />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContinueButton() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative shrink-0">
      <a href="#info" className="backdrop-blur-[1px] backdrop-filter bg-[#ffefdd] content-stretch flex gap-[10px] h-[52px] items-center overflow-clip px-[16px] py-0 relative rounded-[100px] shrink-0">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-[180deg]">
              <div className="relative size-[20px]">
                <Image alt="" className="block max-w-none size-full" src={imgArrowUp} fill />
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
