import Image from "next/image";

interface GiftTypeCardProps {
  type: "token" | "staking" | "nft";
  title: string;
  description: string[];
  imageSrc: string;
  isSelected: boolean;
  onClick: () => void;
  amountUsd?: number;
}

export function GiftTypeCard({ 
  type, 
  title, 
  description, 
  imageSrc, 
  isSelected, 
  onClick,
  amountUsd 
}: GiftTypeCardProps) {
  const getCardName = () => {
    switch (type) {
      case "token":
        return "Just tokens card";
      case "staking":
        return title.includes("uncontrolled") ? "uncontrolled staking card" : "controlled staking card";
      case "nft":
        return "NFTS";
      default:
        return "Gift card";
    }
  };

  const getTextCardName = () => {
    switch (type) {
      case "token":
        return "Text card";
      case "staking":
        return "text card";
      case "nft":
        return "card text";
      default:
        return "text card";
    }
  };

  const getHeadingClass = () => {
    if (type === "token" || type === "nft") {
      return "text-[36px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center";
    }
    return "text-[36px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[104%] text-center";
  };

  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex flex-col items-center gap-[10px] pt-6 pb-[3px] w-[268px] h-[402px] bg-[#353535] rounded-[20px] snap-center transition-all duration-300 ${isSelected ? "ring-2 ring-white" : ""}`}
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
          src={imageSrc}
          alt={title}
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
        {/* heading */}
        <div className={getHeadingClass()}>
          {title}
        </div>
        
        {/* text description */}
        <div className="flex flex-col items-center gap-[3px]">
          {description.map((line, index) => (
            <div 
              key={index}
              className="text-[17px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center"
            >
              {line === "amount: 75 usdc" && amountUsd ? `amount: ${amountUsd} usdc` : line}
            </div>
          ))}
        </div>
      </div>
    </button>
  );
} 