import { ChevronRight, type LucideIcon } from "lucide-react";

export type Section = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Props = Section & {
  highlighted: boolean;
  comingSoon: boolean;
};

export function SectionCard({ icon: Icon, title, description, highlighted, comingSoon }: Props) {
  return (
    <div
      className={`group flex items-center gap-4 border px-4 py-4 transition-colors duration-200 ${
        highlighted
          ? "border-[rgba(201,168,122,0.25)] bg-[rgba(201,168,122,0.05)]"
          : "border-[rgba(255,255,255,0.055)] bg-[#141414] hover:border-[rgba(255,255,255,0.10)]"
      }`}
      style={{ borderRadius: "16px" }}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          highlighted ? "bg-[rgba(201,168,122,0.12)] text-[#C9A87A]" : "bg-[#1C1C1C] text-[#888480]"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-[#F0EBE3]">{title}</h3>
        <p className="text-xs text-[#888480]">{description}</p>
      </div>
      {comingSoon && (
        <span className="shrink-0 border border-[rgba(255,255,255,0.10)] px-2 py-0.5 text-[10px] font-semibold text-[#484542] uppercase" style={{ borderRadius: "6px" }}>
          Soon
        </span>
      )}
      <ChevronRight className="h-4 w-4 shrink-0 text-[#484542] group-hover:text-[#888480] transition-colors" />
    </div>
  );
}
