import type { FormSchema } from '@/components/core/schema-form/';
import type { IPropTypes } from '@tinymce/tinymce-vue/lib/es2015/main/ts/components/EditorPropTypes';
import TinymceEditor from '@/components/basic/tinymce';
import Api from '@/api/';

const initOptions: IPropTypes['init'] = {
  images_upload_handler: async (blobInfo) => {
    const data = await Api.toolsUpload.uploadUpload({ file: blobInfo.blob() });
    return data.filename;
  },
};

export const sendSchemas: FormSchema<API.EmailSendDto>[] = [
  {
    field: 'subject',
    component: 'Input',
    label: '邮件标题',
    required: true,
    colProps: { md: 18 },
  },
  {
    field: 'to',
    component: 'Input',
    label: '收件邮箱',
    helpMessage: '多个地址英文逗号,隔开',
    componentProps: {
      placeholder: '请输入邮箱地址,多个地址英文逗号,隔开',
    },
    colProps: { md: 18 },
    rules: [{ type: 'email', required: true, message: '请输入有效的邮箱地址' }],
  },
  {
    field: 'content',
    component: () => {
      return <TinymceEditor init={initOptions} />;
    },
    label: '正文',
    colProps: { md: 18 },
  },
];
