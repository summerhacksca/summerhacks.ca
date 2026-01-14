const imgOrangeSun = "/orange-sun.svg";
const imgBlueSun = "/blue-sun.svg";
const imgBlueberries = "/blueberries.png";
const imgFrame70 = "/frame-70.png";

export default function InfoSection() {
  return (
    <div className="bg-white content-stretch flex items-start overflow-clip p-[12px] relative shrink-0 w-full z-[2]">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

function LeftPanel() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[36px] grow items-start min-h-px min-w-px overflow-clip p-[36px] relative self-stretch shrink-0">
      <div className="content-stretch flex gap-[36px] items-center relative shrink-0">
        <p className="font-['Maison_Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--text-on-light,#2a2a2a)] text-nowrap tracking-[-0.64px]">
          1
        </p>
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[16px]">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(253, 184, 105, 1)" } as React.CSSProperties}>
              <img alt="" className="block max-w-none size-full" src={imgOrangeSun} />
            </div>
          </div>
          <p className="font-['Maison_Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--text-on-light,#2a2a2a)] text-nowrap tracking-[-0.64px]">
            General info
          </p>
        </div>
      </div>
      
      <div className="content-stretch flex flex-col font-['Maison_Neue:Book',sans-serif] gap-[36px] items-start not-italic relative shrink-0 text-[color:var(--text-on-light,#2a2a2a)] w-full">
        <p className="leading-[normal] relative shrink-0 text-[14px] w-[324px]">
          Stepping outside changes how you think. Fresh air slows the noise, sunlight sharpens focus, and ideas feel lighter when they're not trapped on a screen.
        </p>
        <div className="flex flex-col justify-end leading-[0] relative shrink-0 text-[32px] text-nowrap tracking-[-0.64px]">
          <p className="leading-none">36 hours</p>
        </div>
        <div className="flex flex-col justify-end leading-[0] relative shrink-0 text-[32px] text-nowrap tracking-[-0.64px]">
          <p className="leading-none">36 hours</p>
        </div>
        <div className="flex flex-col justify-end leading-[0] relative shrink-0 text-[32px] text-nowrap tracking-[-0.64px]">
          <p className="leading-none">36 hours</p>
        </div>
      </div>
      
      <div className="absolute flex items-center justify-center left-[-221px] size-[720.378px] top-[383px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[51.243deg]">
          <div className="relative size-[512.423px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBlueberries} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[805px] items-start justify-between min-h-px min-w-px overflow-clip p-[36px] relative shrink-0">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-54.42%] max-w-none top-0 w-[170.18%]" src={imgFrame70} />
        </div>
        <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0.2)] inset-0 to-[38.509%] to-[rgba(0,0,0,0)]" />
      </div>
      
      <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0">
        <div className="content-stretch flex gap-[36px] items-center relative shrink-0">
          <p className="font-['Maison_Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--primary-sky-100,#daf6ff)] text-nowrap tracking-[-0.64px]">
            2
          </p>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <div className="absolute inset-0" style={{ "--fill-0": "rgba(218, 246, 255, 1)" } as React.CSSProperties}>
                <img alt="" className="block max-w-none size-full" src={imgBlueSun} />
              </div>
            </div>
            <p className="font-['Maison_Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--primary-sky-100,#daf6ff)] text-nowrap tracking-[-0.64px]">
              Let's touch grass
            </p>
          </div>
        </div>
        <p className="font-['Maison_Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--text-on-dark,white)] w-[324px]">
          Stepping outside changes how you think. Fresh air slows the noise, sunlight sharpens focus, and ideas feel lighter when they're not trapped on a screen.
        </p>
      </div>
      
      <p className="font-['Maison_Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--text-on-dark,white)] w-[372px]">
        Sometimes, the best way to build better things is to unplug for a moment and let the world around you do the rest.
      </p>
    </div>
  );
}
