"use client";

import { useEffect, useState } from "react";

type Props = {
  email: string;
};

export function Greeting({ email }: Props) {
  const [greeting, setGreeting] = useState("");
  const name = email.split("@")[0];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  if (!greeting) return null;

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#888480] font-[family-name:var(--font-figtree)]">{greeting}</p>
      <h1 className="font-[family-name:var(--font-barlow-condensed)] text-[30px] font-black tracking-[-0.3px] text-[#F0EBE3] capitalize">{name}</h1>
    </div>
  );
}
