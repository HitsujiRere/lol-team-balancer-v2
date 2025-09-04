type MaybePromise<T> = T | Promise<T>;

/**
 * DIコンテナ。
 */
export class Dependency<Service> {
  constructor(private serviceInitializer: () => MaybePromise<Service>) {}

  /**
   * サービスを解決する。
   * @returns サービス。
   */
  async resolve(): Promise<Service> {
    return await this.serviceInitializer();
  }
}
