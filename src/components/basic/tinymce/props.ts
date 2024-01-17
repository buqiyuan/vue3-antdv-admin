import {
  editorProps,
  type IPropTypes,
} from '@tinymce/tinymce-vue/lib/es2015/main/ts/components/EditorPropTypes';
import { plugins as defaultPlugins, toolbar as defaultToolbar } from './constants';

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
