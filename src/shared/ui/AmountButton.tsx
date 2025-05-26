import Image from "next/image";

interface AmountButtonProps {
  amount: number;
  token: string;
  isSelected: boolean;
  onClick: () => void;
}

export function AmountButton({ amount, token, isSelected, onClick }: AmountButtonProps) {
  return (
    <button
      className={`flex justify-between items-center gap-[11px] px-[7px] py-6 pr-[35px] w-[229px] h-[66px] rounded-[159px] transition-all duration-300 ${isSelected ? "ring-2 ring-white" : ""}`}
      style={{
        background: 'linear-gradient(90deg, #150515 0%, #431040 100%)',
        border: '1px solid transparent',
        backgroundImage: 'linear-gradient(90deg, #150515 0%, #431040 100%), linear-gradient(180deg, rgba(117, 39, 208, 0.7) 0%, rgba(97, 42, 161, 0) 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        boxShadow: 'inset 0px 0px 45px 0px rgba(157, 95, 229, 0.4)',
      }}
      onClick={onClick}
    >
      {/* solana_logo_4x 1 */}
      <div className="w-[54px] h-[54px] relative">
        <Image
          src="/assets/solana_logo_4x.png"
          alt="Solana Logo"
          fill
          className="object-cover"
        />
      </div>
      {/* Amount Text */}
      <div className="text-[30px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.02em] leading-[118%] text-center">
        {amount} {token}
      </div>
    </button>
  );
} 