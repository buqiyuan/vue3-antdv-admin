import { ref, defineComponent } from 'vue';
import { Tag, Image } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import router from '@/router';

const AvatarRender = defineComponent({
  props: { record: Object },
  setup(props) {
    const visible = ref(false);
    return () => (
      <>
        <Image
          src={props.record?.avatar}
          preview={{ visible: false }}
          onClick={() => (visible.value = true)}
        />
        <div hidden>
          <Image.PreviewGroup
            preview={{ visible: visible.value, onVisibleChange: (vis) => (visible.value = vis) }}
          >
            {props.record?.posters.map((item) => <Image src={item} key={item} />)}
          </Image.PreviewGroup>
        </div>
      </>
    );
  },
});

export const columns: TableColumn[] = [
  {
    title: '头像',
    width: 100,
    hideInSearch: true,
    dataIndex: 'avatar',
    customRender: ({ record }) => <AvatarRender record={record} key={record.avatar} />,
  },
  {
    title: '英雄名称',
    dataIndex: 'title',
  },
  {
    title: '英雄称号',
    dataIndex: 'name',
  },
  {
    title: '定位',
    dataIndex: 'roles',
    customRender: ({ record }) => (
      <div>
        {record.roles?.map((name) => (
          <Tag color={'blue'} key={name}>
            {name}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: '操作',
    width: 120,
    dataIndex: 'ACTION',
    actions: ({ record }) => [
      {
        label: '查看详情',
        onClick: () => router.push({ name: 'demos-table-lol-info', params: { id: record.heroId } }),
      },
    ],
  },
];
