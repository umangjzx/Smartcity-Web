'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DhruvamCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function DhruvamCard({ children, className = '', hoverEffect = true }: DhruvamCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -8, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        relative overflow-hidden
        bg-[#082747]/60 backdrop-blur-md
        border border-[#FBFAFF]/10
        rounded-2xl p-6
        shadow-[0_8px_32px_rgba(2,11,28,0.4)]
        group
        ${className}
      `}
    >
      {/* Subtle Aurora reflection inside the card */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4DD9E3]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2FBFA6]/5 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />
      
      {/* Hover Gold Accent Border */}
      {hoverEffect && (
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#F6B51B]/30 rounded-2xl transition-colors duration-500 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
