import { Link, type LinkProps } from "react-router-dom";
import { buttonVariants } from "./Button";

type LinkButtonProps = LinkProps & {
  variant?: keyof typeof buttonVariants;
  className?: string;
  children: React.ReactNode;
};

export function LinkButton({
  children,
  className,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={`
        inline-flex h-11 items-center 
        rounded-lg px-6 text-sm font-semibold 
        transition focus:outline-none focus:ring-4 
        active:scale-[0.99] cursor-pointer 
        ${className ?? ""} ${buttonVariants[variant]}`}
    >
      {children}
    </Link>
  );
}
