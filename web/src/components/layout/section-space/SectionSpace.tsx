import type { HTMLAttributes } from "react";

export function SectionSpace({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={`py-2 sm:py-4 lg:py-6 ${className}`}
      {...props}
    />
  );
}