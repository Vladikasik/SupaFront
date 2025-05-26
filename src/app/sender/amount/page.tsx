"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useSenderFlow } from "@/features/sender-flow/context";
import Image from "next/image";

export default function ChooseAmountPage() {
  const { setState } = useSenderFlow();
  const router = useRouter();
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedGiftType, setSelectedGiftType] = useState<string | null>(null);
  const giftTypesRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (amount: number, token: string) => {
    setSelectedOption(`${amount} ${token}`);
    setState((prev) => ({
      ...prev,
      amount,
      token,
      amountUsd: amount * 150, // Assuming SOL price for now
    }));

    // Smooth scroll to gift type section after selection
    setTimeout(() => {
      if (giftTypesRef.current) {
        giftTypesRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedOption(null);
    
    // Also scroll to gift types if user enters custom amount
    if (e.target.value) {
      setTimeout(() => {
        if (giftTypesRef.current) {
          giftTypesRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    }
  };

  const handleGiftTypeSelect = (type: "token" | "staking" | "nft") => {
    setSelectedGiftType(type);
    setState((prev) => ({
      ...prev,
      type,
    }));
    
    // Navigate to checkout after selecting gift type
    if (selectedOption || customAmount) {
      if (customAmount && !selectedOption) {
        const amount = parseFloat(customAmount);
        setState((prev) => ({
          ...prev,
          amount,
          token: "USD",
          amountUsd: amount,
          type,
        }));
      }
      router.push("/sender/checkout");
    }
  };

  return (
    <div className="relative overflow-hidden mx-auto w-full max-w-[402px] min-h-screen bg-gradient-to-b from-[#050505] to-[#6B6B6B]">
      {/* Main scrollable content - hide scrollbar */}
      <div className="overflow-y-auto h-screen scrollbar-hide" style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <div className="flex flex-col items-center gap-[442px] pt-[184px] pb-[88px] px-0">
          
          {/* Amount Selection Section */}
          <div className="flex flex-col items-center gap-12">
            {/* Meet Supa Gift Header */}
            <div className="flex flex-col items-center w-[140px]">
              <div className="text-[17px] text-[#919191] opacity-90 font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
                meet
              </div>
              <div className="text-[35px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[118%] lowercase text-center">
                supa gift
              </div>
            </div>

            {/* Set Your Budget Section */}
            <div className="flex flex-col items-center gap-2 w-[229px]">
              <div className="text-[17px] text-white opacity-90 font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
                set your budget
              </div>
              
              {/* Amount Options */}
              <div className="flex flex-col items-center gap-2 w-full">
                {/* 0.2 SOL Option */}
                <button
                  className={`flex justify-between items-center w-[229px] h-[66px] px-[7px] py-6 pr-[35px] rounded-[159px] bg-gradient-to-r from-[#150515] to-[#431040] border border-transparent bg-clip-padding relative ${selectedOption === "0.2 SOL" ? "ring-2 ring-white" : ""}`}
                  style={{
                    background: 'linear-gradient(90deg, #150515 0%, #431040 100%)',
                    boxShadow: 'inset 0px 0px 45px 0px rgba(157, 95, 229, 0.4)',
                  }}
                  onClick={() => handleOptionSelect(0.2, "SOL")}
                >
                  <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center relative">
                    <div className="w-[31px] h-[24px] bg-black opacity-70 rounded-full"></div>
                  </div>
                  <div className="text-[30px] text-white font-['Sequel_Sans'] tracking-[0.02em] leading-[118%] text-center">
                    0.2 SOL
                  </div>
                </button>

                {/* 0.5 SOL Option */}
                <button
                  className={`flex justify-between items-center w-[229px] h-[66px] px-[7px] py-6 pr-[35px] rounded-[159px] bg-gradient-to-r from-[#150515] to-[#431040] border border-transparent bg-clip-padding relative ${selectedOption === "0.5 SOL" ? "ring-2 ring-white" : ""}`}
                  style={{
                    background: 'linear-gradient(90deg, #150515 0%, #431040 100%)',
                    boxShadow: 'inset 0px 0px 45px 0px rgba(157, 95, 229, 0.4)',
                  }}
                  onClick={() => handleOptionSelect(0.5, "SOL")}
                >
                  <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <div className="w-[31px] h-[24px] bg-black opacity-70 rounded-full"></div>
                  </div>
                  <div className="text-[30px] text-white font-['Sequel_Sans'] tracking-[0.02em] leading-[118%] text-center">
                    0.5 SOL
                  </div>
                </button>

                {/* 0.7 SOL Option */}
                <button
                  className={`flex justify-between items-center w-[229px] h-[66px] px-[7px] py-6 pr-[35px] rounded-[159px] bg-gradient-to-r from-[#150515] to-[#431040] border border-transparent bg-clip-padding relative ${selectedOption === "0.7 SOL" ? "ring-2 ring-white" : ""}`}
                  style={{
                    background: 'linear-gradient(90deg, #150515 0%, #431040 100%)',
                    boxShadow: 'inset 0px 0px 45px 0px rgba(157, 95, 229, 0.4)',
                  }}
                  onClick={() => handleOptionSelect(0.7, "SOL")}
                >
                  <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <div className="w-[31px] h-[24px] bg-black opacity-70 rounded-full"></div>
                  </div>
                  <div className="text-[30px] text-white font-['Sequel_Sans'] tracking-[0.02em] leading-[118%] text-center">
                    0.7 SOL
                  </div>
                </button>

                {/* Custom Amount Input */}
                <input
                  type="text"
                  placeholder="enter amount in usd"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-[229px] h-[67px] px-[33px] py-[9px] rounded-[120px] border border-[rgba(255,255,255,0.3)] bg-transparent text-[20px] text-white opacity-60 font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  style={{
                    boxShadow: '0px 4px 34px 0px rgba(0, 0, 0, 0.55)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Gift Type Selection Section */}
          <div ref={giftTypesRef} className="flex flex-col items-center gap-12">
            {/* Choose Gift Type Header */}
            <div className="flex flex-col items-center w-[134px] h-[72px]">
              <div className="text-[17px] text-[#919191] opacity-90 font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
                choose
              </div>
              <div className="text-[35px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[118%] lowercase text-center">
                gift type
              </div>
            </div>

            {/* Gift Type Cards - Horizontal Scroll */}
            <div className="w-[355px] overflow-x-auto scrollbar-hide" style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}>
              <div className="flex gap-[23px] px-10 py-10 snap-x snap-mandatory">
                
                {/* Just Tokens Card */}
                <button
                  onClick={() => handleGiftTypeSelect("token")}
                  className={`flex-shrink-0 w-[268px] h-[402px] bg-[#353535] rounded-[20px] flex flex-col items-center gap-[10px] pt-6 pb-[3px] snap-center transition-all duration-300 ${selectedGiftType === "token" ? "ring-2 ring-white" : ""}`}
                  style={{
                    boxShadow: '0px 4px 54px 0px rgba(0, 0, 0, 0.55), inset 0px 0px 135px 0px rgba(255, 255, 255, 0.7)',
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(#353535, #353535), linear-gradient(180deg, rgba(25, 123, 134, 0.7) 0%, rgba(79, 255, 246, 0.1) 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  <div className="w-[220px] h-[220px] rounded-[12px] relative overflow-hidden">
                    <Image
                      src="/assets/tokens-image.png"
                      alt="Tokens"
                      fill
                      className="object-cover"
                      style={{
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, white 0%, rgba(153, 153, 153, 0.2) 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-[26px] w-[220px]">
                    <div className="text-[36px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
                      just tokens
                    </div>
                    <div className="flex flex-col items-center gap-[3px]">
                      <div className="text-[17px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
                        solana, usdc, bonk, jup, pengu
                      </div>
                      <div className="text-[17px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
                        amount: 75 usdc
                      </div>
                    </div>
                  </div>
                </button>

                {/* Uncontrolled Stakes Card */}
                <button
                  onClick={() => handleGiftTypeSelect("staking")}
                  className={`flex-shrink-0 w-[268px] h-[402px] bg-[#353535] rounded-[20px] flex flex-col items-center gap-[10px] pt-6 pb-[3px] snap-center transition-all duration-300 ${selectedGiftType === "staking" ? "ring-2 ring-white" : ""}`}
                  style={{
                    boxShadow: '0px 4px 54px 0px rgba(0, 0, 0, 0.55), inset 0px 0px 135px 0px rgba(255, 255, 255, 0.7)',
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(#353535, #353535), linear-gradient(180deg, rgba(25, 123, 134, 0.7) 0%, rgba(79, 255, 246, 0.1) 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  <div className="w-[220px] h-[220px] rounded-[12px] relative overflow-hidden">
                    <Image
                      src="/assets/uncontrolled-stakes-image.png"
                      alt="Uncontrolled Stakes"
                      fill
                      className="object-cover"
                      style={{
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, white 0%, rgba(153, 153, 153, 0.2) 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-[26px] w-[220px]">
                    <div className="text-[36px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[104%] text-center">
                      uncontrolled<br/>stakes
                    </div>
                    <div className="flex flex-col items-center gap-[3px]">
                      <div className="text-[17px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
                        claimable right now
                      </div>
                    </div>
                  </div>
                </button>

                {/* Controlled Stakes Card */}
                <button
                  onClick={() => handleGiftTypeSelect("staking")}
                  className={`flex-shrink-0 w-[268px] h-[402px] bg-[#353535] rounded-[20px] flex flex-col items-center gap-[10px] pt-6 pb-[3px] snap-center transition-all duration-300 ${selectedGiftType === "staking" ? "ring-2 ring-white" : ""}`}
                  style={{
                    boxShadow: '0px 4px 54px 0px rgba(0, 0, 0, 0.55), inset 0px 0px 135px 0px rgba(255, 255, 255, 0.7)',
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(#353535, #353535), linear-gradient(180deg, rgba(25, 123, 134, 0.7) 0%, rgba(79, 255, 246, 0.1) 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  <div className="w-[220px] h-[220px] rounded-[12px] relative overflow-hidden">
                    <Image
                      src="/assets/controlled-stakes-image.png"
                      alt="Controlled Stakes"
                      fill
                      className="object-cover"
                      style={{
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, white 0%, rgba(153, 153, 153, 0.2) 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-[26px] w-[220px]">
                    <div className="text-[36px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[104%] text-center">
                      controlled<br/>stakes
                    </div>
                    <div className="flex flex-col items-center gap-[3px]">
                      <div className="text-[17px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
                        locked for 1 year [+6-8% APY]
                      </div>
                    </div>
                  </div>
                </button>

                {/* NFT Card */}
                <button
                  onClick={() => handleGiftTypeSelect("nft")}
                  className={`flex-shrink-0 w-[268px] h-[402px] bg-[#353535] rounded-[20px] flex flex-col items-center gap-[10px] pt-6 pb-[3px] snap-center transition-all duration-300 ${selectedGiftType === "nft" ? "ring-2 ring-white" : ""}`}
                  style={{
                    boxShadow: '0px 4px 54px 0px rgba(0, 0, 0, 0.55), inset 0px 0px 135px 0px rgba(255, 255, 255, 0.7)',
                    border: '1px solid transparent',
                    backgroundImage: 'linear-gradient(#353535, #353535), linear-gradient(180deg, rgba(25, 123, 134, 0.7) 0%, rgba(79, 255, 246, 0.1) 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box'
                  }}
                >
                  <div className="w-[220px] h-[220px] rounded-[12px] relative overflow-hidden">
                    <Image
                      src="/assets/nft-image.png"
                      alt="NFT"
                      fill
                      className="object-cover"
                      style={{
                        border: '1px solid transparent',
                        backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, white 0%, rgba(153, 153, 153, 0.2) 100%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box'
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-[26px] w-[220px]">
                    <div className="text-[36px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
                      nft&apos;s
                    </div>
                    <div className="flex flex-col items-center gap-[3px]">
                      <div className="text-[17px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
                        picture, image, audio,
                      </div>
                      <div className="text-[17px] text-white font-['Sequel_Sans'] tracking-[0.01em] leading-[135%] text-center">
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
