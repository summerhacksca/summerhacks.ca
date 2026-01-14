'use client';

import HeroSection from './components/hero-section';
import AboutSection from './components/about-section';
import InfoCard from './components/info-card';

const imgOrangeSun = "/orange-sun.svg";
const imgEllipse404 = "/ellipse-404.svg";

export default function Home() {
  const cardData = {
    leftContent: {
      number: "1",
      icon: imgOrangeSun,
      title: "General info",
      description: "Stepping outside changes how you think. Fresh air slows the noise, sunlight sharpens focus, and ideas feel lighter when they're not trapped on a screen.",
      items: ["36 hours", "36 hours", "36 hours"]
    },
    rightContent: {
      number: "2",
      icon: imgEllipse404,
      title: "Let's touch grass",
      description: "Stepping outside changes how you think. Fresh air slows the noise, sunlight sharpens focus, and ideas feel lighter when they're not trapped on a screen.",
      bottomText: "Sometimes, the best way to build better things is to unplug for a moment and let the world around you do the rest."
    }
  };

  return (
    <div className="bg-[#fffbf6] content-stretch flex flex-col isolate items-start relative size-full" data-name="MacBook Air - 11">
      <HeroSection />
      <AboutSection />
      <InfoCard {...cardData} />
      <InfoCard {...cardData} />
    </div>
  );
}
