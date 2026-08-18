import { NavLink } from "react-router-dom";
import { SignOut } from "../sign-out";
import { navigation } from "./navigation";

export function AppNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white md:bg-transparent md:static md:border-t-0 md:border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-around px-2 md:h-16 md:justify-start md:gap-8 md:px-6">
        {navigation.map(({ to, label, end, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `
              flex h-full min-w-16 flex-col items-center justify-center
              gap-1 rounded-lg px-3
              text-xs font-medium transition
              md:flex-row md:gap-2 md:text-sm

              ${isActive ? "text-primary-600" : "text-slate-500 md:hover:text-primary-500"}
            `}
          >
            <Icon className="text-xl md:text-lg" />
            <span>{label}</span>
          </NavLink>
        ))}
        <SignOut />
      </div>
    </nav>
  );
}
