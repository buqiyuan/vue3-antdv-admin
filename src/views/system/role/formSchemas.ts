import type { FormSchema } from '@/components/core/schema-form/';

export const roleSchemas: FormSchema<API.RoleDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '角色名称',
    rules: [{ required: true, type: 'string' }],
    colProps: {
      span: 12,
    },
  },
  {
    field: 'value',
    component: 'Input',
    label: '角色值',
    rules: [{ required: true, type: 'string' }],
    colProps: {
      span: 12,
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
  },
  {
    field: 'menuIds',
    component: 'Tree',
    label: '菜单权限',
    componentProps: {
      checkable: true,
      vModelKey: 'checkedKeys',
      fieldNames: {
        title: 'name',
        key: 'id',
      },
      style: {
        height: '350px',
        paddingTop: '5px',
        overflow: 'auto',
        borderRadius: '6px',
        border: '1px solid #dcdfe6',
        resize: 'vertical',
      },
    },
  },
];
