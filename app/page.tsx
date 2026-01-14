'use client';

import HeroSection from './components/hero-section';
import AboutSection from './components/about-section';
import InfoSection from './components/info-section';

export default function Home() {
  return (
    <div className="bg-[#fffbf6] content-stretch flex flex-col isolate items-start relative size-full" data-name="MacBook Air - 11">
      <HeroSection />
      <AboutSection />
      <InfoSection />
    </div>
  );
}
