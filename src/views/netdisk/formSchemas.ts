import type { FormSchema } from '@/components/core/schema-form/';
import type { TableListItem } from './columns';

export const getRenameSchemas = (row: TableListItem): FormSchema<API.RenameDto>[] => [
  {
    field: 'toName',
    component: 'Input',
    label: `${row.type === 'dir' ? '文件夹' : '文件'}名称`,
    defaultValue: row.name,
    rules: [
      {
        required: true,
        type: 'string',
        validator: (_, value) => {
          if (value && value === row.name) {
            return Promise.reject('修改前后名称一致');
          } else if (value && !value.includes('/')) {
            return Promise.resolve();
          } else {
            return Promise.reject(`请输入合法${row.type === 'dir' ? '文件夹' : '文件'}的名称`);
          }
        },
      },
    ],
    componentProps: {
      placeholder: '输入重命名后的名称',
    },
  },
];

export const mkdirSchemas: FormSchema<API.MKDirDto>[] = [
  {
    field: 'dirName',
    component: 'Input',
    label: `文件夹名称`,
    rules: [
      {
        required: true,
        type: 'string',
        validator: (_, value) => {
          // 不可同时存在 // 此种路径
          if (value && !value.includes('/')) {
            return Promise.resolve();
          } else {
            return Promise.reject('请输入合法的文件夹路径');
          }
        },
      },
    ],
    componentProps: {
      placeholder: '请输入文件夹名称',
    },
  },
];

export const searchSchemas: FormSchema<API.NetDiskManageListParams>[] = [
  {
    field: 'key',
    component: 'Input',
    label: `关键字`,
    defaultValue: '',
    rules: [
      {
        required: true,
        type: 'string',
        validator: (_, value) => {
          // 不可同时存在 // 此种路径
          if (value && !value.includes('/')) {
            return Promise.resolve();
          } else {
            return Promise.reject('请输入合法的名称');
          }
        },
      },
    ],
    componentProps: {
      placeholder: '请输入搜索关键字',
    },
  },
];
