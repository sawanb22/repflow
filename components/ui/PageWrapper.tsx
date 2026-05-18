type Props = {
  children: React.ReactNode;
  wide?: boolean;
};

export function PageWrapper({ children, wide }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      <div className={`w-full ${wide ? "max-w-md" : "max-w-sm"}`}>
        {children}
      </div>
    </div>
  );
}
