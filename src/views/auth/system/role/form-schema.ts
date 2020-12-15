import {createVNode} from 'vue'
import AccessTree from './components/access-tree.vue'
import {FormSchema} from "@/types/schema";
import {getAdminRoleAccess} from "@/api/system/role";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchema = (): FormSchema => ({
    style: {
        width: "auto"
    },
    formItemLayout: {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    },
    formItem: [
        {
            type: "input",
            label: "角色名称",
            field: "title",
            value: '',
            props: {
                placeholder: "请输入角色名称"
            },
            rules: [
                {
                    required: true,
                    message: "角色名称不能为空"
                }
            ]
        },
        {
            type: "textarea",
            label: "描述",
            field: "description",
            value: "",
            props: {
                placeholder: "角色描述"
            }
        },
        {
            type: createVNode(AccessTree),
            label: "资源",
            field: "accessIdsList",
            value: [],
            asyncValue: async (currentValue, formInstance) => {
                const {id} = formInstance?.props.fields as any
                // 获取角色列表
                const data = await getAdminRoleAccess(id)
                // 设置角色复选框选项
                return data.map(item => item.accessId)
            }
        }
    ]
})

