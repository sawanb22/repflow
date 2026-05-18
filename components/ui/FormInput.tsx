import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegisterReturn;
};

export function FormInput({ label, name, type = "text", placeholder, error, register }: Props) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[#888480]">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register}
        className="mt-1 block w-full h-11 bg-[#141414] border border-[rgba(255,255,255,0.055)] rounded-[10px] px-[14px] text-sm text-[#F0EBE3] placeholder:text-[#484542] transition-colors duration-200 focus:border-[rgba(201,168,122,0.30)] focus:outline-none"
        placeholder={placeholder}
        autoComplete={type === "password" ? "new-password" : undefined}
      />
      {error && <p className="mt-1 text-xs text-[#E06560]">{error}</p>}
    </div>
  );
}
