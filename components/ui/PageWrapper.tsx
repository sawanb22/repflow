type Props = {
  children: React.ReactNode;
  wide?: boolean;
};

export function PageWrapper({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
