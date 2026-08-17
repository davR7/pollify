import type { ButtonHTMLAttributes } from "react";

export const buttonVariants = {
  primary: `bg-primary-600 hover:bg-primary-600 text-white focus:ring-4 focus:ring-primary-600/20 shadow-sm`,
  ghost: `text-gray-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-400/20`,
  static: "text-gray-600",
} as const;

export const buttonSize = {
  block: "w-full",
  default: "",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "static";
  size?: "block" | "default";
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex h-12 items-center justify-center 
        rounded-lg px-6 text-sm font-semibold transition
        focus:outline-none active:scale-[0.99] cursor-pointer 
        ${className ?? ""} ${buttonVariants[variant]}
        ${buttonSize[size]}
      `}
    >
      {children}
    </button>
  );
}
