import type { PermissionType } from '@/core/permission/modules/types';

// declare module '*.vue' {
//     import * as vue from 'vue';
//     export declare const render: vue.RootRenderFunction<Element | DocumentFragment>
// }

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $auth: (perm: PermissionType) => boolean;
    Reflect: Reflect;
  }
}

declare type Nullable<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T;

declare type Indexable<T> = {
  [key: string]: T;
};
