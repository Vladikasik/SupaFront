interface SectionHeaderProps {
  subtitle: string;
  title: string;
  width?: string;
  height?: string;
}

export function SectionHeader({ 
  subtitle, 
  title, 
  width = "w-[134px]", 
  height = "h-[72px]" 
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-center ${width} ${height}`}>
      <div className="text-[17px] text-[#919191] opacity-90 font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[135%] text-center w-full">
        {subtitle}
      </div>
      <div className="text-[35px] text-white font-['Sequel_Sans'] font-[112] tracking-[0.01em] leading-[118%] lowercase text-center w-full">
        {title}
      </div>
    </div>
  );
} 