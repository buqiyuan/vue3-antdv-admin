import { debounce } from 'lodash-es';
import { Tag, message } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

import {
  fetchStatusMapData,
  getClothesByGender,
  tableData,
} from '@/views/demos/tables/search-table/columns';

export { tableData };

// 数据项类型
export type ListItemType = typeof tableData[number];
// 使用TableColumn<ListItemType> 将会限制dataIndex的类型，但换来的是dataIndex有类型提示
export const columns: TableColumn<ListItemType>[] = [
  {
    title: '姓名',
    align: 'center',
    dataIndex: 'name',
    sorter: true,
    formItemProps: {
      rules: [{ required: true, message: '请选择姓名' }],
    },
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'gender',
    editFormItemProps: {
      component: 'Select',
      rules: [{ required: true, type: 'number', message: '请选择性别' }],
      componentProps: ({ formInstance, formModel, tableRowKey }) => ({
        options: [
          {
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 0,
          },
        ],
        onChange() {
          console.log('formModel', formModel);

          // 根据当前选择的性别，更新衣服可选项
          formInstance?.updateSchema({
            field: `${tableRowKey}.clothes`,
            componentProps: {
              options: getClothesByGender(formModel.gender),
            },
          });
          formModel['clothes'] = undefined;
        },
      }),
    },
    customRender: ({ record }) => ['女', '男'][record.gender],
  },
  {
    title: '衣服',
    align: 'center',
    dataIndex: 'clothes',
    formItemProps: {
      component: 'Select',
    },
  },
  {
    title: '价格',
    align: 'center',
    dataIndex: 'price',
    editFormItemProps: {
      component: 'InputNumber',
      rules: [{ required: true, message: '请输入价格！' }],
    },
    customRender: ({ record }) => `${record.price}元`,
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    editFormItemProps: {
      component: 'Select',
      rules: [{ required: true, type: 'number', message: '请选择状态' }],
      componentProps: ({ formInstance, schema }) => ({
        showSearch: true,
        filterOption: false,
        request: () => {
          return fetchStatusMapData();
        },
        onSearch: debounce(async (keyword) => {
          schema.loading = true;
          const newSchema = {
            field: schema.field,
            componentProps: {
              options: [] as LabelValueOptions,
            },
          };
          formInstance?.updateSchema([newSchema]);
          const result = await fetchStatusMapData(keyword).finally(() => (schema.loading = false));
          console.log('onSearch keyword', keyword, formInstance, newSchema);
          newSchema.componentProps.options = result;
          formInstance?.updateSchema([newSchema]);
        }, 500),
        onChange(value: string) {
          console.log('onChange', value);
        },
      }),
    },
    customRender: ({ record }) => (
      <Tag color={record.status == 1 ? 'red' : 'default'}>
        {['已售罄', '热卖中'][record.status]}
      </Tag>
    ),
  },
  {
    title: '操作',
    align: 'center',
    width: 200,
    dataIndex: 'ACTION',
    actions: ({ record }, action) => {
      const { startEditable, cancelEditable, isEditable, getEditFormModel, validateRow } = action;

      return isEditable(record.id)
        ? [
            {
              label: '保存',
              onClick: async () => {
                const result = await validateRow(record.id);
                message.loading({ content: '保存中...', key: record.id });
                console.log('result', result);
                console.log('保存', getEditFormModel(record.id));
                setTimeout(() => {
                  cancelEditable(record.id);
                  message.success({ content: '保存成功!', key: record.id, duration: 2 });
                }, 1500);
              },
            },
            {
              label: '取消',
              onClick: () => {
                cancelEditable(record.id);
              },
            },
          ]
        : [
            {
              label: '编辑',
              onClick: () => {
                startEditable(record.id, record);
              },
            },
          ];
    },
  },
];
