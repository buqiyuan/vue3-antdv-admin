import {FormSchema} from "@/types/schema";
import {getAdminRole} from "@/api/system/role";

export const editSchema: FormSchema = {
    formItem: [
        {
            type: "input",
            label: "用户名",
            field: "username",
            value: '',
            props: {
                disabled: true,
                placeholder: "请输入用户名"
            },
            rules: [
                {
                    required: true,
                    message: "用户名不能为空"
                }
            ]
        },
        {
            type: "checkbox",
            label: "角色",
            field: "roles",
            value: [],
            options: [],
            asyncOptions: async () => {
                // 获取角色列表
                const {data} = await getAdminRole({})
                return data.map(item => ({
                    label: item.title,
                    value: item.id
                }))
            }
        }
    ]
}

