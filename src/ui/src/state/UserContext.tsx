import { createContext } from "react";
import { PrivateUser } from "spotify-web-api-ts/types/types/SpotifyObjects";

export type UserContextType = {
  user?: PrivateUser;
  token?: string | null;
};

export const UserContext = createContext<UserContextType>({});
