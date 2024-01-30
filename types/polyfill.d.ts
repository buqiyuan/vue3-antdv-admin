// 此文件用于声明 typescript 尚未支持的 ES 提案中的新特性的类型

// @TODO 等 typescript 5.4 稳定版发布就可以删掉了
interface PromiseWithResolvers<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

interface PromiseConstructor {
  /**
   * Creates a new Promise and returns it in an object, along with its resolve and reject functions.
   * @returns An object with the properties `promise`, `resolve`, and `reject`.
   *
   * ```ts
   * const { promise, resolve, reject } = Promise.withResolvers<T>();
   * ```
   */
  withResolvers<T>(): PromiseWithResolvers<T>;
}
