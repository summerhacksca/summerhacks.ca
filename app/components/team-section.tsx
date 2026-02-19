'use client'

import Image from 'next/image';
import { teamMembers } from '../data/team-members';

export default function TeamSection() {
  return (
    <div id="team" className="relative w-full bg-[#fffbf6]">
      <div className="flex flex-col items-start p-[12px] w-full">
        <div className="flex flex-col items-start gap-[36px] p-[36px] flex-1 self-stretch box-border bg-[#fffbf6]">
          {/* Section header */}
        <div className="flex flex-col gap-[24px] w-full">
          {/* Label row */}
          <div className="flex items-center gap-[36px]">
              <span className="text-[16px] font-medium text-[#2a2a2a] tracking-[-0.64px]">
              3
            </span>
            <div className="flex items-center gap-[12px]">
              <span className="block w-[16px] h-[16px] rounded-full bg-[#FDB869]" />
              <span className="text-[16px] font-medium text-[#2a2a2a] tracking-[-0.64px]">
                The team
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-[372px] font-['Maison_Neue',sans-serif] text-[14px] font-normal leading-normal text-[#2A2A2A]">
            We’re organizing a hackathon designed to be genuinely unique — by your friends at SummerHacks.
          </p>  

            {/* Team Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols small desktop, 4 cols medium, 5 cols large */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[24px] sm:gap-[28px] md:gap-[32px] lg:gap-[36px] w-full">
              {teamMembers.map((member, index) => (
                <div key={index} className="content-stretch flex flex-col gap-4 items-start relative shrink-0">
                  <div className="relative w-full aspect-square bg-[#f0f0f0] overflow-hidden">
                    {member.image ? (
                      <Image 
                        alt={member.name} 
                        className="block max-w-none size-full object-cover" 
                        src={member.image}
                        fill
                      />
                    ) : (
                      <div className="flex items-center justify-center size-full bg-gradient-to-br from-[#ffcf98] to-[#fdb869]">
                        <p className="text-[#2a2a2a] text-[32px] font-medium">{member.name.charAt(0)}</p>
                      </div>
                    )}
                  </div>
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
                    <p className="font-['Maison_Neue:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[#2a2a2a] tracking-[-0.32px]">
                      {member.name}
                    </p>
                    <p className="font-['Maison_Neue:Book',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[#666666] tracking-[-0.28px]">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}