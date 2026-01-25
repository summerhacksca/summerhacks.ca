'use client';

import { useState } from 'react';

const imgOrangeSun = "/orange-sun.svg";
const imgBlueSun = "/blue-sun.svg";
const imgFrame70 = "/frame-70.png";
const imgArrowUp = "/arrow-up.svg";

export default function InfoSection() {
  return (
    <div id="info" className="bg-white content-stretch flex items-start overflow-clip p-[12px] relative shrink-0 w-full z-[2]">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

function LeftPanel() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How many tents are there?",
      answer: "Bring your own tent cuzzo. Don't be lazy. Bring your own tent cuzzo. Don't be lazy. Bring your own tent cuzzo. Don't be lazy. Bring your own tent cuzzo. Don't be lazy. Bring your own tent cuzzo. Don't be lazy."
    },
    {
      question: "Can I eat grass?",
      answer: "Temp text"
    },
    {
      question: "Can I eat grass?",
      answer: "Temp text"
    }
  ];

  return (
    <div className="basis-0 content-stretch flex flex-col gap-[48px] grow items-start min-h-px min-w-px overflow-clip p-[36px] relative self-stretch shrink-0">
      {/* General Info Header */}
      <div className="content-stretch flex gap-[36px] items-center relative shrink-0">
        <p className="font-['Maison_Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-[#2a2a2a] text-nowrap tracking-[-0.64px]">
          1
        </p>
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[16px]">
            <img alt="" className="block max-w-none size-full" src={imgOrangeSun} />
          </div>
          <p className="font-['Maison_Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-[#2a2a2a] text-nowrap tracking-[-0.64px]">
            General info
          </p>
        </div>
      </div>

      <AboutSection />
      <FAQSection faqs={faqs} openIndex={openIndex} setOpenIndex={setOpenIndex} />
    </div>
  );
}

function AboutSection() {
  return (
    <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Maison_Neue',sans-serif] font-normal justify-end leading-none not-italic relative shrink-0 text-[32px] text-[#2a2a2a] tracking-[-0.64px] whitespace-nowrap">
        <p className="leading-none mb-0">About</p>
      </div>
      <div className="font-['Maison_Neue',sans-serif] font-normal leading-normal not-italic relative shrink-0 text-[14px] text-[#2a2a2a]">
        <p className="leading-normal mb-0">Participants will spend a weekend in mid-June building projects under open skies, surrounded by greenery, camp-like activities, and a close-knit community.</p>
        <p className="leading-normal mb-0">&nbsp;</p>
        <p className="mb-0">
          <span className="leading-normal">We are looking to admit</span>
          <span className="font-semibold leading-normal">{` ~150 hackers.`}</span>
          <span className="leading-normal">{` Make sure to reserve a spot on the waitlist.`}</span>
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start justify-end relative shrink-0">
        <button className="backdrop-blur-[1px] bg-[#ffefdd] content-stretch flex gap-[10px] h-[52px] items-center overflow-clip px-[16px] relative rounded-[100px] shrink-0 cursor-pointer hover:bg-[#ffe5cd] transition-colors">
          <div className="relative shrink-0 size-[20px]">
            <img alt="" className="block max-w-none size-full" src={imgArrowUp} />
          </div>
          <p className="font-['Maison_Neue',sans-serif] font-medium leading-normal not-italic relative shrink-0 text-[#b07f46] text-[14px] text-center tracking-[-0.28px]">
            Join the waitlist
          </p>
        </button>
      </div>
    </div>
  );
}

function FAQSection({ faqs, openIndex, setOpenIndex }: { 
  faqs: Array<{ question: string; answer: string }>; 
  openIndex: number | null; 
  setOpenIndex: (index: number | null) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Maison_Neue',sans-serif] font-normal justify-end leading-none not-italic relative shrink-0 text-[32px] text-[#2a2a2a] tracking-[-0.64px]">
        <p className="leading-none mb-0">Frequently Asked Questions</p>
      </div>

      {/* FAQ Items */}
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
        {faqs.map((faq, index) => (
          <div key={index} className="content-stretch flex flex-col border-b border-[#e5e5e5] pb-[16px] relative shrink-0 w-full">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="content-stretch flex items-center justify-between relative shrink-0 w-full cursor-pointer bg-transparent border-none p-0 text-left"
            >
              <p className="font-['Maison_Neue',sans-serif] font-normal leading-normal not-italic text-[16px] text-[#2a2a2a]">
                {faq.question}
              </p>
              <span className="text-[24px] text-[#2a2a2a] shrink-0">
                {openIndex === index ? '×' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="mt-[12px] font-['Maison_Neue',sans-serif] font-normal leading-normal not-italic text-[14px] text-[#2a2a2a]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[805px] items-start justify-between min-h-px min-w-px overflow-clip p-[36px] relative shrink-0">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgFrame70} />
        </div>
        <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0.2)] inset-0 to-[38.509%] to-[rgba(0,0,0,0)]" />
      </div>
      
      <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0">
        <div className="content-stretch flex gap-[36px] items-center relative shrink-0">
          <p className="font-['Maison_Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-[#daf6ff] text-nowrap tracking-[-0.64px]">
            2
          </p>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <img alt="" className="block max-w-none size-full" src={imgBlueSun} />
            </div>
            <p className="font-['Maison_Neue',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-[#daf6ff] text-nowrap tracking-[-0.64px]">
              Let&apos;s touch grass
            </p>
          </div>
        </div>
        <p className="font-['Maison_Neue',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white w-[324px]">
          Stepping outside changes how you think. Fresh air slows the noise, sunlight sharpens focus, and ideas feel lighter when they&apos;re not trapped on a screen.
        </p>
      </div>
      
      <p className="font-['Maison_Neue',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white w-[372px]">
        Sometimes, the best way to build better things is to unplug for a moment and let the world around you do the rest.
      </p>
    </div>
  );
}
