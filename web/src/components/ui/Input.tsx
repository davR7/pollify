import type { InputHTMLAttributes } from "react";

type InputGroupProps = InputHTMLAttributes<HTMLInputElement> & {
  input: string;
  error?: string;
};

export function Input({ input, className, error, ...props }: InputGroupProps) {
  return (
    <>
      <input
        {...props}
        id={`${input}-input`}
        className={`h-14 w-full rounded-lg border border-gray-300 
      bg-white px-4 text-sm text-zinc-900
        outline-none transition placeholder:text-gray-400
      hover:border-[#bfcbd5] focus:border-primary-500
        focus:ring-4 focus:ring-primary-500/10
        ${className ?? ""}
      ${
        error
          ? "border-red-500 focus:ring-red-100"
          : "border-gray-300 focus:border-primary-500 focus:ring-primary-500/10 "
      }`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </>
  );
}
