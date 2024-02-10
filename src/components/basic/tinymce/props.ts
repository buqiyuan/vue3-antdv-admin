import {
  editorProps,
  type IPropTypes,
} from '@tinymce/tinymce-vue/lib/es2015/main/ts/components/EditorPropTypes';
import { plugins as defaultPlugins, toolbar as defaultToolbar } from './constants';
import type { Editor, Events } from 'tinymce';

export interface TinymceProps extends Partial<IPropTypes> {
  height?: string | number;
  width?: string | number;
  showImageUpload?: boolean;
}

export const tinymceProps = {
  ...editorProps,
  init: Object as PropType<IPropTypes['init']>,
  toolbar: {
    type: Array as PropType<IPropTypes['toolbar']>,
    default: defaultToolbar,
  },
  plugins: {
    type: Array as PropType<IPropTypes['plugins']>,
    default: defaultPlugins,
  },
  height: {
    type: [Number, String] as PropType<string | number>,
    required: false,
    default: 400,
  },
  width: {
    type: [Number, String] as PropType<string | number>,
    required: false,
    default: 'auto',
  },
};

// https://www.tiny.cloud/docs/integrations/vue/#eventbinding
type __TinymceEvents = {
  [K in keyof Events.EditorEventMap as Uncapitalize<K>]: [
    event: Events.EditorEventMap[K],
    editor: Editor,
  ];
};

/**
 * 这里为什么这样写？因为 vue 编译器不支持复杂类型，需要用 @vue-ignore 注释显示跳过编译，否则会报错，但是这样 vue 就不会帮我们生成 emits 定义了
 * 详见：https://github.com/vuejs/core/issues/8286
 */
export interface TinymceEvents extends /** @vue-ignore */ __TinymceEvents {}
