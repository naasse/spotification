import { isEmpty, isNil } from "lodash";

export class Abortable {
  protected abortControllers: AbortController[];

  constructor() {
    this.abortControllers = [];
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
}
