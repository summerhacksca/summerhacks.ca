import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#ffefda] flex flex-col gap-3 items-start p-3 h-screen w-full relative">
      {/* Background Decorative Images */}
      <div className="absolute right-[782px] w-[526px] h-[526px] top-[-270px] pointer-events-none">
        <Image
          alt=""
          className="w-full h-full object-cover"
          src="/assets/chatgpt-image.png"
          width={526}
          height={526}
        />
      </div>
      <div className="absolute left-0 w-[526px] h-[526px] top-[-282px] flex items-center justify-center pointer-events-none">
        <div className="rotate-180">
          <Image
            alt=""
            className="w-[526px] h-[526px] object-cover opacity-30"
            src="/assets/chatgpt-image.png"
            width={526}
            height={526}
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between overflow-clip p-6 w-full relative z-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4.5 items-center">
            <div className="relative w-13.25 h-13.25">
              <Image
                alt="SummerHacks Logo"
                className="block"
                src="/assets/ellipse-400.svg"
                width={53}
                height={53}
              />
            </div>
            <p className="font-medium text-[64px] text-[#2a2a2a] tracking-[-2.56px] leading-normal">
              SummerHacks
            </p>
          </div>
          <div className="flex flex-col text-right font-medium text-[16px] text-[#b07f46] tracking-[-0.64px] leading-none [text-shadow:0px_0px_20px_rgba(0,0,0,0.25)]">
            <p>June 2026</p>
            <p>Outdoor Hackathon</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="flex-1 relative w-full overflow-hidden flex flex-col items-center justify-center px-0 py-6"
        style={{
          backgroundImage: `url('/assets/frame-53.png')`,
          backgroundPosition: '50%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'lightgray',
        }}
      >
        <div className="flex flex-col gap-12 items-center justify-center w-full flex-1 relative z-20">
          {/* Main Content */}
          <div className="flex flex-col gap-2 items-center text-center w-full [text-shadow:0px_0px_20px_rgba(0,0,0,0.25)]">
            <p className="font-normal text-[16px] text-white tracking-normal leading-normal whitespace-nowrap">
              This June
            </p>
            <h1 className="font-medium text-[32px] text-white tracking-[-0.64px] leading-none">
              Build under open skies
            </h1>
          </div>

          {/* Waitlist Card */}
          <div className="bg-white flex gap-6 h-14 items-center overflow-clip pl-4 pr-0.5 py-0.5 rounded shadow-[0px_20px_50px_0px_rgba(0,0,0,0.25)]">
            <div className="flex gap-2 items-center">
              <div className="relative w-[10px] h-[10px]">
                <Image
                  alt=""
                  className="block"
                  src="/assets/ellipse-403.svg"
                  width={10}
                  height={10}
                />
              </div>
              <p className="font-medium text-[#414141] text-[16px] tracking-[-0.64px] leading-normal whitespace-nowrap">
                Waitlist open. Limited spots.
              </p>
            </div>
            <div className="flex gap-0.5 h-full items-center">
              <div className="border border-[#ffefda] border-solid flex h-full items-center overflow-clip px-5 py-0 rounded-full w-[290px]">
                <input
                  type="email"
                  placeholder="your email..."
                  className="font-normal text-[#fdb869] text-[14px] tracking-[-0.56px] leading-normal bg-transparent border-none outline-none w-full placeholder:text-[#fdb869]"
                />
              </div>
              <button className="aspect-square bg-[#ffefda] flex h-full items-center justify-center overflow-clip p-[17px] rounded-full">
                <div className="flex items-center justify-center w-5 h-5">
                  <div className="rotate-90">
                    <div className="relative w-5 h-5">
                      <Image
                        alt="Submit"
                        className="block"
                        src="/assets/arrow-up-1.svg"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Down */}
        <div className="flex flex-col gap-3 items-center justify-end pb-10 w-full relative z-20">
          <div className="backdrop-blur-[1px] bg-[rgba(255,239,218,0.2)] flex items-center overflow-clip p-[17px] rounded-full">
            <div className="flex items-center justify-center">
              <div className="rotate-180">
                <div className="relative w-5 h-5">
                  <Image
                    alt="Scroll down"
                    className="block"
                    src="/assets/arrow-up.svg"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="font-normal text-[#ffefda] text-[16px] text-center tracking-[-0.64px] leading-normal whitespace-nowrap">
            Scroll down and discover
          </p>
        </div>
      </div>
    </div>
  );
}
