export default function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-gold-500/10">
      <div className="absolute inset-0 pattern-dense opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full bg-emerald-glow/8 blur-[110px]" />
      <div className="absolute top-6 right-10 w-24 h-24 border border-gold-500/20 rotate-45 hidden md:block" />
      <div className="absolute -bottom-10 left-10 w-32 h-32 border border-gold-500/10 rotate-45 hidden md:block" />
      <div className="relative max-w-7xl mx-auto px-4 py-14 text-center">
        <h1 className="font-kufi text-4xl md:text-5xl font-bold gold-text text-glow-gold">
          {title}
        </h1>
        <p className="mt-4 text-cream-300/80 max-w-2xl mx-auto leading-8">
          {subtitle}
        </p>
        {children}
      </div>
    </div>
  );
}
