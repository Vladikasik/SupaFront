"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useSenderFlow } from "@/features/sender-flow/context";
import { AmountButton } from "@/shared/ui/AmountButton";
import { GiftTypeCard } from "@/shared/ui/GiftTypeCard";
import { MobileFrame } from "@/shared/ui/MobileFrame";
import { AppHeader } from "@/shared/ui/AppHeader";
import { SectionHeader } from "@/shared/ui/SectionHeader";

const AMOUNT_OPTIONS = [
  { amount: 0.2, token: "SOL" },
  { amount: 0.5, token: "SOL" },
  { amount: 0.7, token: "SOL" },
];

const GIFT_TYPE_OPTIONS = [
  {
    type: "token" as const,
    title: "just tokens",
    description: ["solana, usdc, bonk, jup, pengu", "amount: 75 usdc"],
    imageSrc: "/assets/tokens-card-image.png",
  },
  {
    type: "staking" as const,
    title: "uncontrolled\nstakes",
    description: ["claimable right now"],
    imageSrc: "/assets/uncontrolled-stakes-image.png",
  },
  {
    type: "staking" as const,
    title: "controlled\nstakes",
    description: ["locked for 1 year [+6-8% APY]"],
    imageSrc: "/assets/controlled-stakes-image.png",
  },
  {
    type: "nft" as const,
    title: "nft's",
    description: ["picture, image, audio,", "dao, pfp"],
    imageSrc: "/assets/nft-image.png",
  },
];

export default function ChooseAmountPage() {
  const { state, setState } = useSenderFlow();
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
    <MobileFrame>
      {/* Meet + Amount + Custom */}
      <div className="flex flex-col items-center gap-12">
        {/* Heading + Subheading */}
        <AppHeader subtitle="meet" title="supa gift" />

        {/* text + buttons */}
        <div className="flex flex-col items-center gap-2 w-[229px]">
          {/* set your budget text */}
          <div className="text-[17px] text-white opacity-90 font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center w-full">
            set your budget
          </div>
          
          {/* Buttons pack */}
          <div className="flex flex-col justify-center items-center gap-2 w-[229px]">
            {/* Amount Options */}
            {AMOUNT_OPTIONS.map((option) => (
              <AmountButton
                key={`${option.amount}-${option.token}`}
                amount={option.amount}
                token={option.token}
                isSelected={selectedOption === `${option.amount} ${option.token}`}
                onClick={() => handleOptionSelect(option.amount, option.token)}
              />
            ))}

            {/* CUSTOM INPUT AMOUNT button */}
            <input
              type="text"
              placeholder="enter amount in usd"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="flex flex-col justify-between items-center gap-[14px] px-[33px] py-[9px] w-[229px] h-[67px] rounded-[120px] bg-transparent text-[20px] text-white opacity-60 font-['Sequel_Sans'] font-[158] tracking-[0.01em] leading-[135%] text-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0px 4px 34px 0px rgba(0, 0, 0, 0.55)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Gift Type */}
      <div ref={giftTypesRef} className="flex flex-col items-center gap-12">
        {/* Gift Type Heading */}
        <SectionHeader subtitle="choose" title="gift type" />

        {/* Gift SlideRoll */}
        <div className="flex overflow-x-auto items-center gap-[23px] px-10 py-10 w-[355px] scrollbar-hide" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {GIFT_TYPE_OPTIONS.map((option, index) => (
            <GiftTypeCard
              key={`${option.type}-${index}`}
              type={option.type}
              title={option.title}
              description={option.description}
              imageSrc={option.imageSrc}
              isSelected={selectedGiftType === option.type}
              onClick={() => handleGiftTypeSelect(option.type)}
              amountUsd={state.amountUsd}
            />
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}
