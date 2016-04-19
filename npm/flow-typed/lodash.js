declare module "lodash/fp" {
  declare function map<T, A>(fn: (i: T) => A, iteratee: Array<T>): Array<A>;
  declare function compact<T>(iteratee: Array<?T>): Array<T>;
}
