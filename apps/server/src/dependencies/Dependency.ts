/**
 * DIコンテナ。
 */
export class Dependency<Service> {
  constructor(private serviceInitializer: () => Service) {}

  /**
   * サービスを解決する。
   * @returns サービス。
   */
  resolve(): Service {
    return this.serviceInitializer();
  }
}
