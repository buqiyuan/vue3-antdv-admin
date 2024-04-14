import { h } from 'vue';
import type { FormSchema } from '@/components/core/schema-form/';
import { IconPicker, Icon } from '@/components/basic/icon';
import { asyncRoutes } from '@/router/asyncModules';
import Api from '@/api/';
import { findPath, str2tree } from '@/utils/common';

/** 菜单类型 0: 目录 | 1: 菜单 | 2: 按钮 */
const isDir = (type: API.MenuDto['type']) => type === 0;
const isMenu = (type: API.MenuDto['type']) => type === 1;
const isButton = (type: API.MenuDto['type']) => type === 2;

export const useMenuSchemas = (): FormSchema<API.MenuDto>[] => [
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
    label: ({ formModel }) => (isButton(formModel['type']) ? '权限名称' : '节点名称'),
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
      request: async ({ schema, formModel }) => {
        const menuTree = await Api.systemMenu.menuList({});
        const treeDefaultExpandedKeys = [-1].concat(
          findPath(menuTree, formModel['parentId']) || [],
        );
        schema.value.componentProps.treeDefaultExpandedKeys = treeDefaultExpandedKeys;
        return [{ id: -1, name: '根目录', children: menuTree }];
      },
      getPopupContainer: () => document.body,
    },
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'path',
    component: 'Input',
    label: '路由地址',
    vIf: ({ formModel }) => !isButton(formModel['type']),
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'permission',
    component: 'Input',
    label: '权限',
    helpMessage: `对应控制器中定义的权限字符，如：@Perm('system:menu:list'))`,
    vIf: ({ formModel }) => !isDir(formModel['type']),
    required: ({ formModel }) => isButton(formModel.type),
    afterSlot: ({ schema, formInstance, formModel }) => {
      if (schema.value.component === 'Input') {
        return h(Icon, {
          icon: 'ant-design:folder-open-outlined',
          title: '选择权限',
          class: 'ml-[12px] cursor-pointer',
          onclick: async () => {
            const data = await Api.systemMenu.menuGetPermissions();
            if (typeof formModel['permission'] === 'string') {
              // @ts-ignore
              formModel['permission'] = formModel['permission'].split(':');
            }
            formInstance.updateSchema({
              field: 'permission',
              component: 'Cascader',
              componentProps: {
                displayRender: ({ labels }) => labels.join(':'),
                options: data.reduce((prev, curr) => (str2tree(curr, prev, ':'), prev), []),
              },
            });
          },
        });
      } else {
        return h(Icon, {
          icon: 'ant-design:edit-outlined',
          title: '手动输入',
          class: 'ml-[12px] cursor-pointer',
          onclick: () => {
            if (Array.isArray(formModel['permission'])) {
              formModel['permission'] = formModel['permission'].join(':');
            }
            formInstance.updateSchema({
              field: 'permission',
              component: 'Input',
            });
          },
        });
      }
    },
  },
  {
    field: 'component',
    component: 'Cascader',
    label: '文件路径',
    vIf: ({ formModel }) => isMenu(formModel['type']) && !formModel['isExt'],
    componentProps: {
      options: Object.keys(asyncRoutes).reduce(
        (prev, curr) => (str2tree(curr, prev, '/'), prev),
        [],
      ),
    },
    rules: [{ required: true, type: 'array' }],
  },
  {
    field: 'icon',
    component: () => IconPicker,
    label: '节点图标',
    vIf: ({ formModel }) => !isButton(formModel['type']),
  },
  {
    field: 'orderNo',
    component: 'InputNumber',
    label: '排序号',
    defaultValue: 255,
    componentProps: {
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'isExt',
    component: 'RadioGroup',
    label: '是否外链',
    defaultValue: false,
    helpMessage: '选择是外链则路由地址需要以`http(s)://`开头',
    colProps: {
      span: 12,
    },
    componentProps: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    vIf: ({ formModel }) => !isButton(formModel['type']),
  },
  {
    field: 'extOpenMode',
    component: 'RadioGroup',
    label: '打开方式',
    defaultValue: 1,
    vIf: ({ formModel }) => !isButton(formModel['type']) && formModel['isExt'],
    colProps: {
      span: 12,
    },
    componentProps: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        {
          label: '新窗口打开',
          value: 1,
        },
        {
          label: '内嵌页打开',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'keepAlive',
    component: 'RadioGroup',
    label: '是否缓存',
    defaultValue: 0,
    vIf: ({ formModel }) => isMenu(formModel['type']),
    colProps: {
      span: 12,
    },
    componentProps: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
  },
  {
    field: 'show',
    component: 'RadioGroup',
    label: '是否显示',
    defaultValue: 1,
    colProps: {
      span: 12,
    },
    helpMessage: '会生成路由,但左侧菜单不可见',
    componentProps: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    vIf: ({ formModel }) => !isButton(formModel['type']),
  },
  {
    field: 'activeMenu',
    component: 'Input',
    label: '高亮菜单项',
    colProps: {
      span: 12,
    },
    helpMessage: '值为某个的节点的路由地址(可设置当前路由高亮的菜单项，多用于详情页)',
    componentProps: {
      placeholder: '需要高亮的菜单项(节点名称)',
    },
    vIf: ({ formModel }) => !formModel['show'] && !isButton(formModel['type']),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: 1,
    helpMessage: '不会生成路由,同时左侧菜单不可见',
    componentProps: {
      optionType: 'button',
      buttonStyle: 'solid',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
];
