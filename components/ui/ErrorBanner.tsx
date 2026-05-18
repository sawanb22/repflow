type Props = {
  message: string;
};

export function ErrorBanner({ message }: Props) {
  return (
    <div className="rounded-lg border border-[rgba(224,101,96,0.20)] bg-[rgba(224,101,96,0.08)] px-4 py-3">
      <p className="text-sm text-[#E06560]">{message}</p>
    </div>
  );
}
