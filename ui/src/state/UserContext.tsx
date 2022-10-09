import { createContext } from "react";
import { User } from "../api/types";

export type UserContextType = {
  user?: User;
  token?: string | null;
};

export const UserContext = createContext<UserContextType>({});
