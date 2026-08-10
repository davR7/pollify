import { FiBarChart2, FiHome, FiPlusCircle } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { SignOut } from "./SignOut";

export function Menu() {
  return (
    <nav className="flex items-center gap-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 text-sm font-medium transition-colors ${
            isActive ? "text-primary-700" : "text-primary-700/70 hover:text-primary-800"
          }`
        }
      >
        <FiHome className="size-5" />
        <span>Minhas enquetes</span>
      </NavLink>
      <NavLink
        to="/polls"
        end
        className={({ isActive }) =>
          `flex items-center gap-2 text-sm font-medium transition-colors ${
            isActive ? "text-primary-700" : "text-primary-700/70 hover:text-primary-800"
          }`
        }
      >
        <FiBarChart2 className="size-5" />
        <span>Enquetes</span>
      </NavLink>
      <NavLink
        to="/polls/new"
        end
        className={({ isActive }) =>
          `flex items-center gap-2 text-sm font-medium transition-colors ${
            isActive ? "text-primary-700" : "text-primary-700/70 hover:text-primary-800"
          }`
        }
      >
        <FiPlusCircle className="size-5" />
        <span>Nova enquete</span>
      </NavLink>
      <SignOut />
    </nav>
  );
}
