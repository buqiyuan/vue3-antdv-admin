import type { PermissionType } from '@/permission/permCode';

// declare module '*.vue' {
//     import * as vue from 'vue';
//     export declare const render: vue.RootRenderFunction<Element | DocumentFragment>
// }
declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: (perm: PermissionType) => boolean;
    // 在 Vue 本身实现相关功能之前，Volar 提供的唯一方法是使用以下方法。
    // 请参阅：https://github.com/vuejs/language-tools/issues/465#issuecomment-1229166260
    // 参见：https://github.com/vuejs/core/pull/3399
    vAuth?: PermissionType;
    Reflect: Reflect;
    suspenseStatus: '' | 'pending' | 'resolve' | 'fallback';
  }
}

declare type Nullable<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T;

declare type Indexable<T> = {
  [key: string]: T;
};
