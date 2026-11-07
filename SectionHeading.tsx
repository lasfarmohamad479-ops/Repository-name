import type { LucideIcon } from "lucide-react";

export default function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  center = false,
}: {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <div
        className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}
      >
        {Icon && (
          <span className="w-11 h-11 rounded-xl grid place-items-center bg-gold-500/10 border border-gold-500/25 text-gold-400">
            <Icon size={20} />
          </span>
        )}
        <h2 className="font-kufi text-3xl md:text-4xl font-bold gold-text">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          className={`mt-3 text-cream-300/75 leading-8 text-[15px] ${
            center ? "max-w-2xl mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className={`ornament-divider mt-5 ${center ? "max-w-md mx-auto" : ""}`}>
        <span className="text-gold-500 text-lg">﴿﴾</span>
      </div>
    </div>
  );
}
