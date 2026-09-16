import { ReactNode } from 'react';
import { Sparkles } from 'lucide-react'; // Using Lucide icon as a placeholder for the guiding star SVG

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeader({ title, subtitle, align = 'center', className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'} mb-12 ${className}`}>
      {/* Guiding Star / Sparkle */}
      <div className="text-[#F6B51B] mb-4 dhruvam-guiding-star">
        <Sparkles size={24} strokeWidth={1.5} />
      </div>
      
      {/* Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FBFAFF] to-[#93A6C6] uppercase">
        {title}
      </h2>
      
      {/* Gold Divider Line */}
      <div className="flex items-center my-4 space-x-2">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#F6B51B]/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#F6B51B]" />
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#F6B51B]/50" />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="max-w-2xl text-[#E3E9F3] text-lg font-poppins">
          {subtitle}
        </p>
      )}
    </div>
  );
}
