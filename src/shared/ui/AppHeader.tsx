interface AppHeaderProps {
  subtitle: string;
  title: string;
}

export function AppHeader({ subtitle, title }: AppHeaderProps) {
  return (
    <div className="flex flex-col items-center w-[140px]">
      <div className="text-[17px] text-[#919191] opacity-90 font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center w-full">
        {subtitle}
      </div>
      <div className="text-[35px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[118%] lowercase text-center w-full">
        {title}
      </div>
    </div>
  );
} 