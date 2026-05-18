import Link from "next/link";

type Props = {
  text: string;
  linkText: string;
  href: string;
};

export function AuthLink({ text, linkText, href }: Props) {
  return (
    <p className="text-center text-sm text-[#888480]">
      {text}{" "}
      <Link href={href} className="font-medium text-[#C9A87A] hover:opacity-80 transition-opacity">
        {linkText}
      </Link>
    </p>
  );
}
