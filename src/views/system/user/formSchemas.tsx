import AvatarUpload from './AvatarUpload.vue';
import type { FormSchema } from '@/components/core/schema-form/';
import Api from '@/api/';

export const userSchemas: FormSchema<API.UserDto>[] = [
  {
    field: 'avatar',
    component: () => AvatarUpload,
    label: '头像',
  },
  {
    field: 'deptId',
    component: 'TreeSelect',
    label: '所属部门',
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'roleIds',
    component: 'Select',
    label: '所属角色',
    rules: [{ required: true, type: 'array' }],
    componentProps: {
      mode: 'multiple',
      request: async () => {
        const { items = [] } = await Api.systemRole.roleList({});
        return items.map((n) => ({ label: n.name, value: n.id }));
      },
    },
  },
  {
    field: 'username',
    component: 'Input',
    label: '用户名',
    rules: [{ required: true }],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    componentProps: {
      placeholder: '无需修改请留空',
    },
  },
  {
    field: 'nickname',
    component: 'Input',
    label: '呢称',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '手机',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
  },
  {
    field: 'status',
    component: 'RadioGroup',
    label: '状态',
    defaultValue: 1,
    componentProps: {
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  },
];
/**
 * @description 更新用户密码
 */
export const updatePswSchemas: FormSchema[] = [
  {
    field: 'password',
    component: 'Input',
    label: '新密码',
    rules: [{ required: true, type: 'string' }],
  },
];
/**
 * @description 将用户转移部门
 */
export const transferUserSchemas: FormSchema[] = [
  {
    field: 'departmentId',
    component: 'TreeSelect',
    label: '转移至',
    rules: [{ required: true, type: 'number' }],
  },
];
