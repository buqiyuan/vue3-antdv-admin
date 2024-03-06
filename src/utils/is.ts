import { isFunction } from 'lodash-es';

export {
  isArguments,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBuffer,
  isBoolean,
  isDate,
  isElement,
  isEmpty,
  isEqual,
  isEqualWith,
  isError,
  isFunction,
  isFinite,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNative,
  isNil,
  isNumber,
  isNull,
  isObjectLike,
  isPlainObject,
  isRegExp,
  isSafeInteger,
  isSet,
  isString,
  isSymbol,
  isTypedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
  isArray,
} from 'lodash-es';

const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    is(val, 'Promise') &&
    val instanceof Promise &&
    [val.then, val.catch, val.finally].every(isFunction)
  );
}

export function isAsyncFunction(val: unknown): val is Function {
  return is(val, 'AsyncFunction');
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export function isHttpUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(path);
}

export function isPascalCase(str: string): boolean {
  const regex = /^[A-Z][A-Za-z]*$/;
  return regex.test(str);
}
