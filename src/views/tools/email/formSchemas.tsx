import type { FormSchema } from '@/components/core/schema-form/';
import TinymceEditor from '@/components/basic/tinymce';

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
    required: true,
    colProps: { md: 18 },
  },
  {
    field: 'content',
    component: ({ formModel }) => {
      return <TinymceEditor v-model={formModel.content} />;
    },
    label: '正文',
    colProps: { md: 18 },
  },
];
