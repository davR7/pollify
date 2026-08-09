import type { ReactNode } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

interface ActionPromptProps {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export function ActionPrompt({ to, title, description, icon }: ActionPromptProps) {
  return (
    <Link
      to={to}
      className="flex w-full items-center gap-4 rounded-lg bg-primary-50 px-6 py-4 hover:bg-primary-200 shadow-sm transition active:scale-[0.99]"
    >
      <span className="shrink-0 text-primary-600">{icon}</span>

      <div className="flex flex-1 flex-col">
        <span className="text-sm font-medium text-primary-900">{title}</span>

        <span className="text-base font-medium text-primary-600">{description}</span>
      </div>

      <FiChevronRight className="size-5 shrink-0 text-primary-400" />
    </Link>
  );
}
