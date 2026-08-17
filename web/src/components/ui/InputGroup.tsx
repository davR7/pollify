import type { InputHTMLAttributes } from "react";

type InputGroupProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  input: string;
  error?: string;
};

export function InputGroup({ label, input, className, error, ...props }: InputGroupProps) {
  return (
    <div>
      <label htmlFor={`${input}-input`} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        id={`${input}-input`}
        className={`h-14 w-full rounded-lg border border-gray-300 
      bg-white px-4 text-sm text-zinc-900
        outline-none transition placeholder:text-gray-400
      hover:border-[#bfcbd5] focus:border-primary-500
        focus:ring-4 focus:ring-primary-500/10"
        ${className ?? ""}
      ${
        error
          ? "border-red-500 focus:ring-red-100"
          : "border-gray-300 focus:border-primary-500 focus:ring-primary-500/10 "
      }`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
