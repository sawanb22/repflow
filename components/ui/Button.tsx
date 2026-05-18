import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg" | "icon";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-[#C9A87A] text-[#0A0A0A] hover:opacity-90 active:opacity-80 active:scale-[0.98] disabled:opacity-35",
  secondary: "border border-[rgba(255,255,255,0.10)] bg-transparent text-[#888480] hover:bg-[#141414] hover:border-[rgba(255,255,255,0.18)] hover:text-[#F0EBE3]",
  ghost: "text-[#888480] hover:text-[#F0EBE3]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-[22px] py-[11px]",
  lg: "px-8 py-3.5 text-lg",
  icon: "p-2",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  loading,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`font-[family-name:var(--font-barlow-condensed)] font-extrabold uppercase tracking-[0.8px] transition-all duration-200 inline-flex items-center justify-center gap-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
