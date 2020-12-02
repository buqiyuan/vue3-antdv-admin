import {useCreateModal} from "@/hooks";
import EditModal from './edit-modal.vue'
import {delAdminAccount} from "@/api/system/account";
import {formatDate} from '@/utils/common'
import {TableColumn} from "@/types/tableColumn";

export const columns: TableColumn[] = [ // 进程策略
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'label值',
        dataIndex: 'label',
    },
    {
        title: '分类',
        dataIndex: 'category',
    },
    {
        title: '描述',
        dataIndex: 'description',
    },
    {
        title: '创建时间',
        dataIndex: 'updatedAt',
        slots: {
            customRender: 'createdAt'
        },
        slotsType: 'format',
        slotsFunc: (val) => formatDate(val)
    },
    {
        title: '最后更新时间',
        dataIndex: 'updatedAt',
        slots: {
            customRender: 'updatedAt'
        },
        slotsType: 'format',
        slotsFunc: (val) => formatDate(val)
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 200,
        slots: {
            customRender: 'action'
        },
        actions: [
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                text: '删除',
                permission: { // 权限
                    action: 'delete',
                    effect: 'disabled'
                },
                props: {
                  type: 'danger'
                },
                func: async ({record}, callback) => {
                    await delAdminAccount(record.id)
                    callback()
                },
            },
            {
                type: 'button', // 控制类型，默认为a,可选： select | button | text
                text: '编辑',
                permission: { // 权限
                    action: 'update',
                    effect: 'disabled'
                },
                props: {
                    type: 'warning'
                },
                func: ({record}, callback) => useCreateModal(EditModal, {
                    fields: record,
                    callback
                }),
            }
        ]
    },
]
