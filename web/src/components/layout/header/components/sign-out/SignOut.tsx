import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function SignOut() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  async function handlerSignOut() {
    await signout();
    navigate("/signin");
  }

  return (
    <button
      className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-500 md:hover:text-primary-500 transition-colors"
      type="button"
      onClick={handlerSignOut}
    >
      <FiLogOut className="size-5" />
      <span>Sair</span>
    </button>
  );
}
