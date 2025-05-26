import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
  className?: string;
}

export function MobileFrame({ children, className = "" }: MobileFrameProps) {
  return (
    <div className={`relative overflow-hidden mx-auto w-full max-w-[402px] min-h-screen ${className}`}>
      {/* iPhone 16 Pro Frame */}
      <div className="w-[402px] h-[874px] bg-gradient-to-b from-[#050505] to-[#6B6B6B]">
        {/* 1st Screen instance */}
        <div className="flex flex-row overflow-x-auto items-center gap-[10px] w-[402px] h-[874px]">
          {/* screen content */}
          <div className="flex flex-col overflow-y-auto items-center gap-[442px] pt-[184px] pb-[88px] w-[402px] h-[874px] scrollbar-hide" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 