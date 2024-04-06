/**
 * @author Puppeteer
 * @description - Borrowed from puppeteer, allows users to create frontend only functions as event listeners
 */

export declare abstract class JSHandle<T = unknown> {};

export type HandleFor<T> = JSHandle<T>;

export type Awaitable<T> = T | PromiseLike<T>;

export type HandleOr<T> = HandleFor<T> | JSHandle<T> | T;

export type FlattenHandle<T> = T extends HandleOr<infer U> ? U : never;

export type InnerParams<T extends unknown[]> = {
    [K in keyof T]: FlattenHandle<T[K]>;
  };

export type EvaluateFunc<T extends unknown[]> = (
    ...params: InnerParams<T>
  ) => Awaitable<unknown>;