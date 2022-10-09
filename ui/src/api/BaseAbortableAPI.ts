import axios, { AxiosRequestConfig, AxiosError, Method } from "axios";
import { Abortable } from "./Abortable";
import { merge } from "lodash";

export class BaseAbortableAPI extends Abortable {
  private baseConfig: AxiosRequestConfig;

  constructor(baseConfig: AxiosRequestConfig) {
    super();
    this.baseConfig = baseConfig;
  }

  protected request<T>(
    url: string,
    method: Method,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const abortController = new AbortController();
    this.abortControllers.push(abortController);

    return axios({
      url,
      method,
      signal: abortController.signal,
      ...merge(this.baseConfig, config),
    }).then((resp) => resp.data);
  }

  protected get<T>(url: string): Promise<T> {
    return this.request<T>(url, "GET");
  }

  protected post<T>(url: string): Promise<T> {
    return this.request<T>(url, "POST");
  }

  protected put<T>(url: string): Promise<T> {
    return this.request<T>(url, "PUT");
  }

  protected delete<T>(url: string): Promise<T> {
    return this.request<T>(url, "DELETE");
  }

  public defaultErrorHandler(err: AxiosError) {
    if (!axios.isCancel(err)) {
      console.error(err);
    }

    // TODO - redirect on 401? Other error handling?
  }
}
