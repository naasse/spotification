import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { isEmpty, isNil } from "lodash";

const baseConfig: AxiosRequestConfig = {
  baseURL: "https://api.spotify.com/v1",
};

export class Spotify {
  private token: string;
  private abortControllers: AbortController[];

  constructor(accessToken: string) {
    this.token = accessToken;
    this.abortControllers = [];
  }

  protected get<T>(route: string): Promise<T> {
    const abortController = new AbortController();
    this.abortControllers.push(abortController);

    return axios
      .get(route, {
        ...baseConfig,
        signal: abortController.signal,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => resp.data);
  }

  public abortCount(count: number) {
    for (let i = 0; i < count && !isEmpty(this.abortControllers); i++) {
      this.abortLast();
    }
  }

  public abortLast() {
    const abortController = this.abortControllers.pop();
    if (!isNil(abortController)) {
      abortController.abort();
    }
  }

  public abortAll() {
    while (!isEmpty(this.abortControllers)) {
      this.abortLast();
    }
  }

  public defaultErrorHandler(err: AxiosError) {
    if (!axios.isCancel(err)) {
      console.error(err);
    }

    // TODO - redirect on 401? Other error handling?
  }
}
