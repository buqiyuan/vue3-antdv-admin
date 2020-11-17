import Vue, { VNode } from "vue"

declare module '*.tsx' {
  import Vue from 'compatible-vue';
  export default Vue;
}

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
