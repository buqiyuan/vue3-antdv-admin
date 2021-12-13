declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

declare module 'mitt' {
  import mitt from 'mitt';
  export default mitt;
}

declare module 'blueimp-md5' {
  import md5 from 'blueimp-md5';
  export default md5;
}

declare module 'virtual:*' {
  const result: any;
  export default result;
}
