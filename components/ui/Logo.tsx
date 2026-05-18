type Props = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  size?: "sm" | "lg";
};

const containerSize = {
  sm: "mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A87A]",
  lg: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C9A87A]",
};

const iconSize = {
  sm: "h-6 w-6 text-[#0A0A0A]",
  lg: "h-8 w-8 text-[#0A0A0A]",
};

const titleSize = {
  sm: "font-[family-name:var(--font-barlow-condensed)] text-2xl font-black text-[#F0EBE3]",
  lg: "font-[family-name:var(--font-barlow-condensed)] text-3xl font-black text-[#F0EBE3]",
};

export function Logo({ title, subtitle, icon, size = "sm" }: Props) {
  return (
    <div className="text-center">
      <div className={containerSize[size]}>
        {icon ?? <div className={iconSize[size]} />}
      </div>
      <h1 className={`mt-4 ${titleSize[size]}`}>{title}</h1>
      {subtitle && <p className="mt-2 text-sm text-[#888480]">{subtitle}</p>}
    </div>
  );
}
