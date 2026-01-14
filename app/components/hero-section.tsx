// to be replaced with videos
const imgFrame53 = "/frame-53.png";
const imgFrame54 = "/frame-54.png";
const imgOrangeSun = "/orange-sun.svg";
const imgArrowUp = "/arrow-up.svg";

export default function HeroSection() {
  return (
    <div className="content-stretch flex flex-col items-start p-[12px] relative shrink-0 w-full z-[4]">
      <div className="content-stretch flex flex-col h-[calc(100dvh-24px)] items-center justify-center overflow-clip p-[36px] relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgFrame53} />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgFrame54} />
          <div className="absolute inset-0 object-cover" />
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
        <p className="font-['Maison_Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--text\/on-dark,white)] text-nowrap tracking-[-0.28px]">
          June 2026 - 3 days
        </p>
      </div>
      <div className="content-stretch flex gap-[5.842px] items-center justify-center relative shrink-0">
        <div className="relative shrink-0 size-[17px]">
          <img alt="" className="block max-w-none size-full" src={imgOrangeSun} />
        </div>
        <p className="font-['Maison_Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-nowrap text-white tracking-[-0.8px]">
          SummerHacks
        </p>
      </div>
      <div className="basis-0 content-stretch flex grow items-center justify-end min-h-px min-w-px relative shrink-0">
        <p className="font-['Maison_Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--text\/on-dark,white)] text-nowrap text-right tracking-[-0.28px]">
          Outdoor hackathon
        </p>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[48px] grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-2 items-center not-italic relative shrink-0 text-[color:var(--text\/on-dark,white)] text-center w-full">
        <p className="font-['Maison_Neue:Book',sans-serif] leading-[normal] relative shrink-0 text-[16px] text-nowrap text-shadow-[0px_0px_20px_rgba(0,0,0,0.25)]">
          This June
        </p>
        <div className="flex flex-col font-['Maison_Neue:Medium',sans-serif] justify-end leading-0 min-w-full relative shrink-0 text-[32px] text-shadow-[0px_0px_30px_rgba(0,0,0,0.25)] tracking-[-0.64px] w-[min-content]">
          <p className="leading-none">Build under open skies</p>
        </div>
      </div>

      <EmailSignup />
    </div>
  );
}

function EmailSignup() {
  const imgOrangeSun = "/orange-sun.svg";
  const imgArrowUp = "/arrow-up.svg";

  return (
    <div className="bg-[var(--base\/0,white)] content-stretch flex gap-[24px] h-[56px] items-center overflow-clip pl-[16px] pr-[2px] py-[2px] relative rounded-[4px] shadow-[0px_20px_50px_0px_rgba(0,0,0,0.25)] shrink-0">
      <div className="content-stretch flex gap-2 items-center relative shrink-0">
        <div className="relative shrink-0 size-2.5">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(253, 184, 105, 1)" } as React.CSSProperties}>
            <img alt="" className="block max-w-none size-full" src={imgOrangeSun} />
          </div>
        </div>
        <p className="font-['Maison_Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--base\/800,#2a2a2a)] text-nowrap tracking-[-0.64px]">
          Waitlist open. Limited spots.
        </p>
      </div>
      <div className="content-stretch flex gap-0.5 h-full items-center relative shrink-0">
        <div className="border border-[var(--primary\/sun\/100,#ffefdd)] border-solid content-stretch flex h-full items-center overflow-clip px-[20px] py-0 relative rounded-[100px] shrink-0 w-[290px]">
          <p className="font-['Maison_Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--primary\/sun\/300,#fdb869)] text-nowrap tracking-[-0.56px]">
            your email...
          </p>
        </div>
        <div className="aspect-[54/54] bg-[var(--primary\/sun\/100,#ffefdd)] content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[100px] shrink-0">
          <div className="flex items-center justify-center relative shrink-0 size-[20px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-[90deg]">
              <div className="relative size-[20px]">
                <img alt="" className="block max-w-none size-full" src={imgArrowUp} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollIndicator() {
  const imgArrowUp = "/arrow-up.svg";

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-end pb-[16px] pt-0 px-0 relative shrink-0 w-full">
      <button 
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="backdrop-blur-[2.5px] backdrop-filter bg-[rgba(255,239,218,0.2)] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[52px] cursor-pointer hover:bg-[rgba(255,239,218,0.3)] transition-colors"
      >
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-[180deg]">
            <div className="relative size-[20px]" style={{ filter: "brightness(0) invert(1)" }}>
              <img alt="" className="block max-w-none size-full" src={imgArrowUp} />
            </div>
          </div>
        </div>
      </button>
      <p className="font-['Maison_Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#ffefda] text-[14px] text-center text-nowrap tracking-[-0.28px]">
        Scroll down and discover
      </p>
    </div>
  );
}
