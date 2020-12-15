import {delAdminRole, patchAdminRole} from "@/api/system/role";
import {formatDate} from '@/utils/common'
import {TableColumn} from "@/types/tableColumn";
import {useFormModal} from "@/hooks/useFormModal";
import {getFormSchema} from "./form-schema";

export const columns: TableColumn[] = [ // 角色列表
    {
        title: '角色名称',
        dataIndex: 'title'
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
                text: '删除',
                permission: { // 权限
                    action: 'delete',
                    effect: 'disabled'
                },
                props: {
                  type: 'danger'
                },
                func: async ({record}, refreshTableData) => await delAdminRole(record.id).then(() => refreshTableData()),
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
                func: ({record}, refreshTableData) => useFormModal({
                    title: '编辑角色',
                    fields: record,
                    formSchema: getFormSchema(),
                    handleOk: async (modelRef, state) => {
                        const {description, title, accessIdsList} = modelRef

                        const params = {
                            description, title,
                            accessIdsList: accessIdsList.toString()
                        }
                        return await patchAdminRole(record.id, params).then(() => refreshTableData())
                    }
                })
            }
        ]
    },
]
