import {FormSchema} from "@/types/schema";

export const editSchema: FormSchema = {
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
            options: []
        }
    ]
}

