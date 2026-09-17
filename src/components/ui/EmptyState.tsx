import type { LucideIcon } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Icon size={40} className="text-white/20 mb-4" />
      <p className="font-poppins font-semibold text-white/60 mb-1">{title}</p>
      <p className="font-inter text-sm text-white/35">{subtitle}</p>
    </div>
  );
}
