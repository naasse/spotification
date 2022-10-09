import axios, { AxiosRequestConfig, AxiosError } from "axios";

const baseConfig: AxiosRequestConfig = {
  baseURL: "https://api.spotify.com/v1",
};

export class Spotify {
  private token: string;
  public abortController: AbortController;

  constructor(accessToken: string) {
    this.token = accessToken;
    this.abortController = new AbortController();
  }

  protected get<T>(route: string): Promise<T> {
    return axios
      .get(route, {
        ...baseConfig,
        signal: this.abortController.signal,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => resp.data);
  }

  public abort() {
    this.abortController.abort();
  }

  public defaultErrorHandler(err: AxiosError) {
    if (!axios.isCancel(err)) {
      console.error(err);
    }

    // TODO - redirect on 401? Other error handling?
  }
}
