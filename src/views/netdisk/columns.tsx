import { computed, ref } from 'vue';
import { isEmpty } from 'lodash-es';
import type { TableColumn } from '@/components/core/dynamic-table';
// import { Avatar, Space, Tag } from 'ant-design-vue';
import { formatSizeUnits } from '@/utils';
import { hasPermission } from '@/permission';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.SFileInfo;
export type TableColumnItem = TableColumn<TableListItem>;

const formatSize = (size: string) => {
  if (size) {
    return formatSizeUnits(size);
  }
  return '-';
};

export const useColumns = () => {
  const currentPathList = ref<string[]>([]);
  const localSearchKey = ref('');
  const isSearching = computed(() => !isEmpty(localSearchKey.value));

  const columns = computed<TableColumnItem[]>(() => [
    {
      title: '文件名',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '大小',
      width: 120,
      align: 'center',
      dataIndex: 'fsize',
      customRender: ({ record }) => <span>{formatSize(record.fsize)}</span>,
    },
    {
      title: '上传时间',
      dataIndex: 'putTime',
      align: 'center',
      width: 220,
      customRender({ text }) {
        return formatToDateTime(text);
      },
    },
    {
      title: '所属目录',
      dataIndex: 'belongTo',
      align: 'center',
      width: 220,
      hideInTable: !isSearching.value,
      customRender: ({ record }) => (
        <a-button
          type="link"
          disabled={record.type === 'file' && hasPermission('netdisk:manage:info')}
          onClick={() => handleClickBelong(record)}
        >
          {record.belongTo ? record.belongTo : '根目录'}
        </a-button>
      ),
    },
  ]);

  const handleClickBelong = (row) => {
    // clear search key
    localSearchKey.value = '';
    if (isEmpty(row.belongTo)) {
      // root
      currentPathList.value = [];
    } else {
      currentPathList.value = row.belongTo.split('/');
    }
  };

  return {
    columns,
    currentPathList,
    localSearchKey,
    isSearching,
  };
};
