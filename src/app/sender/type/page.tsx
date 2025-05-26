"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSenderFlow } from "@/features/sender-flow/context";
import Image from "next/image";

export default function GiftTypePage() {
  const { state, setState } = useSenderFlow();
  const router = useRouter();
  const [selectedGiftType, setSelectedGiftType] = useState<string | null>(null);

  const handleGiftTypeSelect = (type: "token" | "staking" | "nft") => {
    setSelectedGiftType(type);
    setState((prev) => ({
      ...prev,
      type,
    }));
    
    // Navigate to checkout after selecting gift type
    setTimeout(() => {
      router.push("/sender/checkout");
    }, 500);
  };

  return (
    <div className="relative overflow-hidden mx-auto w-full max-w-[402px] min-h-screen">
      {/* gift type detailes expanede */}
      <div className="w-[1806px] h-[874px] bg-white">
        {/* 1st Screen instance */}
        <div className="flex flex-row overflow-x-auto items-center gap-[10px] w-[1475px] h-[874px]">
          {/* screen amount, type */}
          <div className="flex flex-col overflow-y-auto justify-end items-center gap-[442px] pt-[184px] pb-[88px] w-[402px] h-[874px] bg-gradient-to-b from-[#050505] to-[#6B6B6B] scrollbar-hide" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            
            {/* Meet + Amount + Custom */}
            <div className="flex flex-col items-center gap-12">
              {/* Frame 2085661967 */}
              <div className="flex flex-col items-center w-[140px]">
                <div className="text-[17px] text-[#919191] opacity-90 font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center w-full">
                  meet
                </div>
                <div className="text-[35px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[118%] lowercase text-center w-full">
                  supa gift
                </div>
              </div>

              {/* Frame 2085661971 */}
              <div className="flex flex-col items-center gap-2 w-[229px]">
                {/* set your budget */}
                <div className="text-[17px] text-white opacity-90 font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center w-full">
                  set your budget
                </div>
                
                {/* Frame 6 */}
                <div className="flex flex-col justify-center items-center gap-2 w-[229px]">
                  {/* Frame 4 */}
                  <div className="flex justify-between items-center gap-[11px] px-[7px] py-6 pr-[35px] w-[229px] h-[66px] rounded-[159px]"
                    style={{
                      background: 'linear-gradient(90deg, #150515 0%, #431040 100%)',
                      border: '1px solid transparent',
                      backgroundImage: 'linear-gradient(90deg, #150515 0%, #431040 100%), linear-gradient(180deg, rgba(117, 39, 208, 0.7) 0%, rgba(97, 42, 161, 0) 100%)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                      boxShadow: 'inset 0px 0px 45px 0px rgba(157, 95, 229, 0.4)',
                    }}
                  >
                    {/* Mobile / 5. Visuals / Tokens */}
                    <div className="w-[54px] h-[54px] bg-white relative">
                      {/* Solana (SOL) */}
                      <div className="w-[54px] h-[54px] bg-black opacity-70 rounded-full absolute top-0 left-0"></div>
                      {/* Solana (SOL) Group */}
                      <div className="absolute top-[14.85px] left-[11.7px] w-[31px] h-[24.3px] bg-white">
                        {/* Solana SVG elements would go here */}
                      </div>
                    </div>
                    {/* 0.2 SOL */}
                    <div className="text-[30px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.02em] leading-[118%] text-center">
                      {state.amount || 0.2} {state.token || "SOL"}
                    </div>
                  </div>

                  {/* Frame 5 */}
                  <div className="flex justify-between items-center gap-[11px] px-[7px] py-6 pr-[35px] w-[229px] h-[66px] rounded-[159px]"
                    style={{
                      background: 'linear-gradient(90deg, #150515 0%, #431040 100%)',
                      border: '1px solid transparent',
                      backgroundImage: 'linear-gradient(90deg, #150515 0%, #431040 100%), linear-gradient(180deg, rgba(117, 39, 208, 0.7) 0%, rgba(97, 42, 161, 0) 100%)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                      boxShadow: 'inset 0px 0px 45px 0px rgba(157, 95, 229, 0.4)',
                    }}
                  >
                    {/* Mobile / 5. Visuals / Tokens */}
                    <div className="w-[54px] h-[54px] bg-white relative">
                      {/* Solana (SOL) */}
                      <div className="w-[54px] h-[54px] bg-black opacity-70 rounded-full absolute top-0 left-0"></div>
                      {/* Solana (SOL) Group */}
                      <div className="absolute top-[14.85px] left-[11.7px] w-[31px] h-[24.3px] bg-white">
                        {/* Solana SVG elements would go here */}
                      </div>
                    </div>
                    {/* 0.5 SOL */}
                    <div className="text-[30px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.02em] leading-[118%] text-center">
                      0.5 SOL
                    </div>
                  </div>

                  {/* Frame 6 */}
                  <div className="flex justify-between items-center gap-[11px] px-[7px] py-6 pr-[35px] w-[229px] h-[66px] rounded-[159px]"
                    style={{
                      background: 'linear-gradient(90deg, #150515 0%, #431040 100%)',
                      border: '1px solid transparent',
                      backgroundImage: 'linear-gradient(90deg, #150515 0%, #431040 100%), linear-gradient(180deg, rgba(117, 39, 208, 0.7) 0%, rgba(97, 42, 161, 0) 100%)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                      boxShadow: 'inset 0px 0px 45px 0px rgba(157, 95, 229, 0.4)',
                    }}
                  >
                    {/* Mobile / 5. Visuals / Tokens */}
                    <div className="w-[54px] h-[54px] bg-white relative">
                      {/* Solana (SOL) */}
                      <div className="w-[54px] h-[54px] bg-black opacity-70 rounded-full absolute top-0 left-0"></div>
                      {/* Solana (SOL) Group */}
                      <div className="absolute top-[14.85px] left-[11.7px] w-[31px] h-[24.3px] bg-white">
                        {/* Solana SVG elements would go here */}
                      </div>
                    </div>
                    {/* 0.7 SOL */}
                    <div className="text-[30px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.02em] leading-[118%] text-center">
                      0.7 SOL
                    </div>
                  </div>

                  {/* Frame 7 */}
                  <div className="flex flex-col justify-between items-center gap-[14px] px-[33px] py-[9px] w-[229px] h-[67px] rounded-[120px] bg-transparent"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0px 4px 34px 0px rgba(0, 0, 0, 0.55)'
                    }}
                  >
                    {/* enter amount in usd */}
                    <div className="text-[20px] text-white opacity-60 font-['Sequel_Sans'] font-[158] tracking-[0.01em] leading-[135%] text-center">
                      enter amount in usd
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gift Type */}
            <div className="flex flex-col items-center gap-12">
              {/* Gift Type Heading */}
              <div className="flex flex-col items-center w-[134px] h-[72px]">
                <div className="text-[17px] text-[#919191] opacity-90 font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center w-full">
                  choose
                </div>
                <div className="text-[35px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[118%] lowercase text-center w-full">
                  gift type
                </div>
              </div>

              {/* Gift SlideRoll */}
              <div className="flex overflow-x-auto items-center gap-[23px] px-10 py-10 w-[355px] scrollbar-hide" style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}>
                
                {/* Just tokens card */}
                <button
                  onClick={() => handleGiftTypeSelect("token")}
                  className={`flex-shrink-0 flex flex-col items-center gap-[10px] pt-6 pb-[3px] w-[268px] h-[402px] bg-[#353535] rounded-[20px] snap-center transition-all duration-300 ${selectedGiftType === "token" ? "ring-2 ring-white" : ""}`}
                  style={{
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(#353535, #353535), linear-gradient(180deg, rgba(25, 123, 134, 0.7) 0%, rgba(79, 255, 246, 0.1) 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    boxShadow: '0px 4px 54px 0px rgba(0, 0, 0, 0.55), inset 0px 0px 135px 0px rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {/* image */}
                  <div className="w-[220px] h-[220px] rounded-[12px] relative">
                    <Image
                      src="/assets/tokens-card-image.png"
                      alt="Just Tokens"
                      fill
                      className="object-cover rounded-[12px]"
                      style={{
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, white 0%, rgba(153, 153, 153, 0.2) 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                      }}
                    />
                  </div>
                  {/* Text card */}
                  <div className="flex flex-col items-center gap-[26px] w-[220px]">
                    {/* heading just tokens */}
                    <div className="text-[36px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center">
                      just tokens
                    </div>
                    {/* text description */}
                    <div className="flex flex-col items-center gap-[3px]">
                      <div className="text-[17px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center">
                        solana, usdc, bonk, jup, pengu
                      </div>
                      <div className="text-[17px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center">
                        amount: {state.amountUsd || 75} usdc
                      </div>
                    </div>
                  </div>
                </button>

                {/* uncontrolled staking card */}
                <button
                  onClick={() => handleGiftTypeSelect("staking")}
                  className={`flex-shrink-0 flex flex-col items-center gap-[10px] pt-6 pb-[3px] w-[268px] h-[402px] bg-[#353535] rounded-[20px] snap-center transition-all duration-300 ${selectedGiftType === "staking" ? "ring-2 ring-white" : ""}`}
                  style={{
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(#353535, #353535), linear-gradient(180deg, rgba(25, 123, 134, 0.7) 0%, rgba(79, 255, 246, 0.1) 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    boxShadow: '0px 4px 54px 0px rgba(0, 0, 0, 0.55), inset 0px 0px 135px 0px rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {/* image */}
                  <div className="w-[220px] h-[220px] rounded-[12px] relative">
                    <Image
                      src="/assets/uncontrolled-stakes-image.png"
                      alt="Uncontrolled Stakes"
                      fill
                      className="object-cover rounded-[12px]"
                      style={{
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, white 0%, rgba(153, 153, 153, 0.2) 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                      }}
                    />
                  </div>
                  {/* text card */}
                  <div className="flex flex-col items-center gap-[26px] w-[220px]">
                    <div className="text-[36px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[104%] text-center">
                      uncontrolled<br/>stakes
                    </div>
                    <div className="flex flex-col items-center gap-[3px]">
                      <div className="text-[17px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center">
                        claimable right now
                      </div>
                    </div>
                  </div>
                </button>

                {/* controlled staking card */}
                <button
                  onClick={() => handleGiftTypeSelect("staking")}
                  className={`flex-shrink-0 flex flex-col items-center gap-[10px] pt-6 pb-[3px] w-[268px] h-[402px] bg-[#353535] rounded-[20px] snap-center transition-all duration-300 ${selectedGiftType === "staking" ? "ring-2 ring-white" : ""}`}
                  style={{
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(#353535, #353535), linear-gradient(180deg, rgba(25, 123, 134, 0.7) 0%, rgba(79, 255, 246, 0.1) 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    boxShadow: '0px 4px 54px 0px rgba(0, 0, 0, 0.55), inset 0px 0px 135px 0px rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {/* image */}
                  <div className="w-[220px] h-[220px] rounded-[12px] relative">
                    <Image
                      src="/assets/controlled-stakes-image.png"
                      alt="Controlled Stakes"
                      fill
                      className="object-cover rounded-[12px]"
                      style={{
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, white 0%, rgba(153, 153, 153, 0.2) 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                      }}
                    />
                  </div>
                  {/* text card */}
                  <div className="flex flex-col items-center gap-[26px] w-[220px]">
                    <div className="text-[36px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[104%] text-center">
                      controlled<br/>stakes
                    </div>
                    <div className="flex flex-col items-center gap-[3px]">
                      <div className="text-[17px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center">
                        locked for 1 year [+6-8% APY]
                      </div>
                    </div>
                  </div>
                </button>

                {/* NFTS */}
                <button
                  onClick={() => handleGiftTypeSelect("nft")}
                  className={`flex-shrink-0 flex flex-col items-center gap-[10px] pt-6 pb-[3px] w-[268px] h-[402px] bg-[#353535] rounded-[20px] snap-center transition-all duration-300 ${selectedGiftType === "nft" ? "ring-2 ring-white" : ""}`}
                  style={{
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(#353535, #353535), linear-gradient(180deg, rgba(25, 123, 134, 0.7) 0%, rgba(79, 255, 246, 0.1) 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    boxShadow: '0px 4px 54px 0px rgba(0, 0, 0, 0.55), inset 0px 0px 135px 0px rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {/* image */}
                  <div className="w-[220px] h-[220px] rounded-[12px] relative">
                    <Image
                      src="/assets/nft-image.png"
                      alt="NFTs"
                      fill
                      className="object-cover rounded-[12px]"
                      style={{
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, white 0%, rgba(153, 153, 153, 0.2) 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                      }}
                    />
                  </div>
                  {/* card text */}
                  <div className="flex flex-col items-center gap-[26px] w-[220px]">
                    <div className="text-[36px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center">
                      nft&apos;s
                    </div>
                    <div className="flex flex-col items-center gap-[3px]">
                      <div className="text-[17px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center">
                        picture, image, audio,
                      </div>
                      <div className="text-[17px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center">
                        dao, pfp
                      </div>
                    </div>
                  </div>
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 