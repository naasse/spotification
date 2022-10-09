import { Spotify } from "./Spotify";
import { User } from "./types";

export class SpotifyUsers extends Spotify {
  constructor(accessToken: string) {
    super(accessToken);
  }

  public getMe(): Promise<User> {
    return this.get<User>("me");
  }
}
