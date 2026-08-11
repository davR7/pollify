import type { HTMLAttributes } from "react";

export function Grid({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={`mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-2 sm:py-4 lg:py-6 ${className}`}
      {...props}
    />
  );
}
