import axios, { AxiosError } from "axios";
import { SPOTIFY_BASE_API_URL } from "../constants/constants";
import { BaseAbortableAPI } from "./BaseAbortableAPI";

export class Spotify extends BaseAbortableAPI {
  constructor(accessToken: string) {
    super({
      baseURL: SPOTIFY_BASE_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  public defaultErrorHandler(err: AxiosError) {
    if (!axios.isCancel(err)) {
      console.error(err);
    }

    // TODO - redirect on 401? Other error handling?
  }
}
