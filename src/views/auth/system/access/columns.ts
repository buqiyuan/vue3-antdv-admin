import {useCreateModal} from "@/hooks";
import AddModal from './add-modal.vue'
import {delAdminAccess} from "@/api/system/access";
import {formatDate} from '@/utils/common'
import {TableColumn} from "@/types/tableColumn";
import {message} from "ant-design-vue";
import {IconFont} from '@/components/iconfont'
import {createVNode} from 'vue'

export const columns: TableColumn[] = [ // 进程策略
    {
        title: '名称',
        dataIndex: 'moduleName',
        slots: {
            customRender: 'moduleName'
        }
    },
    {
        title: 'url地址',
        dataIndex: 'url',
    },
    {
        title: 'icon图标',
        dataIndex: 'icon',
        slots: {
            customRender: 'icon'
        },
        slotsType: 'component',
        slotsFunc: (record) => createVNode(IconFont, {type: record.icon}) // 动态创建图标
    },
    {
        title: '排序',
        dataIndex: 'sort',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        slots: {
            customRender: 'createdAt'
        },
        slotsType: 'format',
        slotsFunc: (val) => formatDate(val) // 格式化时间
    },
    {
        title: '最后更新时间',
        dataIndex: 'updatedAt',
        slots: {
            customRender: 'updatedAt'
        },
        slotsType: 'format',
        slotsFunc: (val) => formatDate(val) // 格式化时间
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
                    action: 'delete', // 删除权限
                    effect: 'disabled' // 没有权限时禁用按钮，不传effect则不显示按钮
                },
                props: {
                  type: 'danger' // 按钮类型
                },
                func: async ({record}, callback) => { // 点击删除的回调
                    if (record.id < 6) {
                        return message.warn('系统预置菜单，不能删除！')
                    }
                    await delAdminAccess(record.id)
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
                    type: 'warning' // 按钮类型
                },
                func: ({record}, callback) => useCreateModal(AddModal, { // 点击删除的回调
                    fields: record,
                    callback
                }),
            }
        ]
    },
]
