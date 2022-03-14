import type { FormSchema } from '@/components/core/schema-form/';

export const roleSchemas: FormSchema<API.CreateRoleParams>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    rules: [{ required: true, type: 'string' }],
    colProps: {
      span: 12,
    },
  },
  {
    field: 'label',
    component: 'Input',
    label: '标识',
    rules: [{ required: true, type: 'string' }],
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
    field: 'menus',
    component: 'Tree',
    label: '菜单权限',
    colProps: {
      span: 12,
    },
    componentProps: {
      checkable: true,
      vModelKey: 'checkedKeys',
      style: {
        height: '350px',
        paddingTop: '5px',
        overflow: 'auto',
        borderRadius: '6px',
        border: '1px solid #dcdfe6',
      },
    },
  },
  {
    field: 'depts',
    component: 'Tree',
    label: '部门权限',
    colProps: {
      span: 12,
    },
    componentProps: {
      checkable: true,
      vModelKey: 'checkedKeys',
      style: {
        height: '350px',
        paddingTop: '5px',
        overflow: 'auto',
        borderRadius: '6px',
        border: '1px solid #dcdfe6',
      },
    },
  },
];
