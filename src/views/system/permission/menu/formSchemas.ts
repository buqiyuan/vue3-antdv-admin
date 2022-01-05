import { shallowRef } from 'vue';
import type { FormItemSchema } from '@/components/core/schema-form/types/form';
import IconsSelect from '@/components/basic/icons-select/index.vue';
import MultipleCascader from './components/multiple-cascader/index.vue';
import { constantRouterComponents } from '@/router/asyncModules';

export const menuSchemas: FormItemSchema<API.MenuAddParams>[] = [
  {
    field: 'type',
    component: 'RadioGroup',
    label: '菜单类型',
    defaultValue: 0,
    rules: [{ required: true, type: 'number' }],
    componentProps: {
      options: [
        {
          label: '目录',
          value: 0,
        },
        {
          label: '菜单',
          value: 1,
        },
        {
          label: '权限',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '节点名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'parentId',
    component: 'TreeSelect',
    label: '上级节点',
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
    field: 'router',
    component: 'Input',
    label: '节点路由',
    vIf: ({ formModel }) => formModel['type'] !== 2,
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'perms',
    component: shallowRef(MultipleCascader),
    label: '权限',
    vIf: ({ formModel }) => formModel['type'] === 2,
    rules: [{ required: true, type: 'array', message: '请选择权限' }],
  },
  {
    field: 'icon',
    component: shallowRef(IconsSelect),
    label: '节点图标',
    vIf: ({ formModel }) => formModel['type'] !== 2,
  },
  {
    field: 'viewPath',
    component: 'Select',
    label: '节点路径',
    vIf: ({ formModel }) => formModel['type'] === 1,
    componentProps: {
      options: Object.keys(constantRouterComponents).map((n) => ({ label: n, value: n })),
    },
  },
  {
    field: 'keepalive',
    component: 'Switch',
    label: '是否缓存',
    defaultValue: true,
    vIf: ({ formModel }) => formModel['type'] === 1,
  },
  {
    field: 'isShow',
    component: 'Switch',
    label: '是否显示',
    defaultValue: true,
    vIf: ({ formModel }) => formModel['type'] !== 2,
  },
  {
    field: 'orderNum',
    component: 'InputNumber',
    label: '排序号',
    defaultValue: 255,
    componentProps: {
      style: {
        width: '100%',
      },
    },
  },
];
