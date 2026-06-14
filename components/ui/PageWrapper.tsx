type Props = {
  children: React.ReactNode;
  wide?: boolean;
  isAuth?: boolean;
};

export function PageWrapper({ children, wide, isAuth }: Props) {
  if (isAuth) {
    return (
      <div 
        className="flex min-h-screen items-center justify-center bg-[#0A0A0A] bg-cover bg-center bg-no-repeat p-4 sm:p-8"
        style={{ backgroundImage: "url('/bg-auth.png')" }}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        
        {/* Glassmorphism Container */}
        <div className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-white/10 bg-[#141414]/40 p-8 shadow-2xl backdrop-blur-xl">
          {/* Inner subtle glow */}
          <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/5 mix-blend-overlay"></div>
          
          {/* Accent glow behind the card */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[var(--color-accent)] opacity-20 blur-[60px]"></div>
          
          <div className="relative z-10 w-full space-y-8">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
