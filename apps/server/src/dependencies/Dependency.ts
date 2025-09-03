export class Dependency<T> {
  createInfrastructure: () => T;

  constructor(createInfrastructure: () => T) {
    this.createInfrastructure = createInfrastructure;
  }

  resolve(): T {
    return this.createInfrastructure();
  }
}
