import {useCreateModal} from "@/hooks";
import EditModal from './edit-modal.vue'
import {delAdminRole} from "@/api/system/role";
import {formatDate} from '@/utils/common'
import {TableColumn} from "@/types/tableColumn";

export const columns: TableColumn[] = [ // 进程策略
    {
        title: '角色名称',
        dataIndex: 'title',
    },
    {
        title: '描述',
        dataIndex: 'description',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
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
                key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                text: '删除',
                permission: { // 权限
                    action: 'delete',
                    effect: 'disabled'
                },
                props: {
                  type: 'danger'
                },
                func: async ({record}, callback) => {
                    await delAdminRole(record.id)
                    callback()
                },
            },
            {
                type: 'button', // 控制类型，默认为a,可选： select | button | text
                key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
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
