import { debounce } from 'lodash-es';
import { PlusOutlined } from '@ant-design/icons-vue';
import { Tag, Image } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

import {
  fetchStatusMapData,
  getClothesByGender,
  tableData,
} from '@/views/demos/tables/search-table/columns';

export { tableData };

// 数据项类型
export type ListItemType = (typeof tableData)[number];
// 使用TableColumn<ListItemType> 将会限制dataIndex的类型，但换来的是dataIndex有类型提示
export const columns: TableColumn<ListItemType>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: true,
    /** 默认开启编辑, 仅`editableType`为`cell`时有效 */
    defaultEditable: true,
    editable: ({ index }) => {
      // 第一行不允许被编辑
      return index > 0;
    },
    formItemProps: {
      defaultValue: '李白',
      rules: [{ required: true, message: '请输入姓名' }],
    },
    editFormItemProps: {
      /** 不继承于 `formItemProps`的属性 */
      extendSearchFormProps: false,
      rules: [{ required: true, message: '请输入姓名' }],
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    /** 搜索表单配置 */
    formItemProps: {
      component: 'Select',
      componentProps: ({ formInstance, formModel }) => ({
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
            field: `clothes`,
            componentProps: {
              options: getClothesByGender(formModel.gender),
            },
          });
          formModel['clothes'] = '';
        },
      }),
    },
    /** 可编辑行表单配置 */
    editFormItemProps: {
      /** 继承 formItemProps 的属性配置, 默认就是是true，这里为了演示有这个字段开关，所以特别写上 */
      extendSearchFormProps: true,
      rules: [{ required: true, type: 'number', message: '请选择性别' }],
      componentProps: ({ formInstance, formModel, tableRowKey }) => ({
        onChange() {
          // 根据当前选择的性别，更新衣服可选项
          formInstance?.updateSchema({
            field: `${tableRowKey}.clothes`,
            componentProps: {
              options: getClothesByGender(formModel.gender),
            },
          });
          formModel['clothes'] = '';
        },
      }),
    },
    customRender: ({ record }) => ['女', '男'][record.gender],
  },
  {
    title: '衣服',
    dataIndex: 'clothes',
    formItemProps: {
      component: 'Select',
      componentProps: ({ formModel }) => ({
        options: getClothesByGender(formModel.gender),
      }),
    },
  },
  {
    title: '图片',
    dataIndex: 'img',
    hideInSearch: true,
    formItemProps: {
      component: 'Upload',
      defaultValue: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
      componentProps: {
        maxCount: 1,
        listType: 'picture-card',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      },
      componentSlots: ({ formModel }) => ({
        default: () =>
          formModel['img']?.length ? (
            ''
          ) : (
            <div>
              <PlusOutlined />
              <div class="mt-8px">Upload</div>
            </div>
          ),
      }),
    },
    customRender: ({ record }) => <Image width={100} src={record.img}></Image>,
  },
  {
    title: '价格',
    dataIndex: 'price',
    editFormItemProps: {
      component: 'InputNumber',
      rules: [{ required: true, message: '请输入价格！' }],
    },
    customRender: ({ record }) => `${record.price}元`,
  },
  {
    title: '状态',
    dataIndex: 'status',
    formItemProps: {
      component: 'Select',
      componentProps: ({ formInstance, schema }) => ({
        showSearch: true,
        filterOption: false,
        request: () => {
          return fetchStatusMapData();
        },
        onSearch: debounce(async (keyword) => {
          schema.value.loading = true;
          const newSchema = {
            field: schema.value.field,
            componentProps: {
              options: [] as LabelValueOptions,
            },
          };
          formInstance?.updateSchema([newSchema]);
          const result = await fetchStatusMapData(keyword).finally(
            () => (schema.value.loading = false),
          );
          console.log('onSearch keyword', keyword, formInstance, newSchema);
          newSchema.componentProps.options = result;
          formInstance?.updateSchema([newSchema]);
        }, 500),
        onChange(value: string) {
          console.log('onChange', value);
        },
      }),
    },
    editFormItemProps: {
      rules: [{ required: true, type: 'number', message: '请选择状态' }],
    },
    customRender: ({ record }) => (
      <Tag color={record.status == 1 ? 'red' : 'default'}>
        {['已售罄', '热卖中'][record.status]}
      </Tag>
    ),
  },
];
