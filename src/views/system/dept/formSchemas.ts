import type { FormSchema } from '@/components/core/schema-form/';
import Api from '@/api/';
import { findPath } from '@/utils/common';

export const roleSchemas: FormSchema<API.DeptDto>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '部门名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'parentId',
    component: 'TreeSelect',
    label: '上级部门',
    componentProps: {
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
      request: async ({ schema, formModel }) => {
        const deptTree = await Api.systemDept.deptList({});
        schema.componentProps.treeDefaultExpandedKeys = findPath(deptTree, formModel['parentId']);
        return deptTree;
      },
    },
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
    componentProps: {
      style: { width: '100%' },
    },
  },
];
