"use client";

type Props = {
  email: string;
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function Greeting({ email }: Props) {
  const greeting = getGreeting();
  const name = email.split("@")[0];

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#888480] font-[family-name:var(--font-figtree)]">{greeting}</p>
      <h1 className="font-[family-name:var(--font-barlow-condensed)] text-[30px] font-black tracking-[-0.3px] text-[#F0EBE3] capitalize">{name}</h1>
    </div>
  );
}
