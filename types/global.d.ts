import type packageJSON from '../package.json';
import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  SetupContext,
  EmitsOptions,
  ObjectEmitsOptions,
  PropType as VuePropType,
} from 'vue';
import type { TinyMCE } from 'tinymce';

declare global {
  const __APP_INFO__: {
    pkg: typeof packageJSON;
    lastBuildTime: string;
  };
  const tinymce: TinyMCE;

  // declare interface Window {
  //   // Global vue app instance
  //   __APP__: App<Element>;
  // }

  // vue
  declare type PropType<T> = VuePropType<T>;
  declare type VueNode = VNodeChild | JSX.Element;

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };
  type RemoveIndex<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
  };
  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type Objectable<T extends object> = {
    [P in keyof T]: T[P];
  } & Recordable;
  declare type Key = string | number;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  declare type Indexable<T = any> = {
    [key: string]: T;
  };
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  declare interface WheelEvent {
    path?: EventTarget[];
  }
  declare function parseInt(s: string | number, radix?: number): number;

  declare function parseFloat(string: string | number): number;

  declare type EmitFn<E = EmitsOptions> = SetupContext<E>['emit'];
  /** copy from `@vue/runtime-core` */
  declare type EmitsToProps<T extends EmitsOptions> = T extends string[]
    ? {
        [K in `on${Capitalize<T[number]>}`]?: (...args: any[]) => any;
      }
    : T extends ObjectEmitsOptions
      ? {
          [K in `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}`
            ? (
                ...args: T[Uncapitalize<C>] extends (...args: infer P) => any
                  ? P
                  : T[Uncapitalize<C>] extends null
                    ? any[]
                    : never
              ) => any
            : never;
        }
      : {};

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
