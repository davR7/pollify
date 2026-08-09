import type { Dispatch, SetStateAction } from "react";
import type { User } from "@/models/user.model";

export type SetUser = Dispatch<SetStateAction<User | null>>;

export interface AuthContextType {
  user: User | null;
  setUser: SetUser;
}
