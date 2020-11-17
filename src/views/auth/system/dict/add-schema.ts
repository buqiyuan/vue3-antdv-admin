import {FormSchema} from "@/types/schema";
import {getAdminRole, getAdminRoleAccess} from "@/api/system/role";

export const addSchema: FormSchema = {
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
            label: "label值",
            field: "label",
            value: '',
            props: {
                placeholder: "请输入label值"
            },
            rules: [
                {
                    required: true,
                    message: "label值不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "分类",
            field: "category",
            value: "",
            props: {
                placeholder: "请输入分类"
            },
            rules: [
                {
                    "required": true,
                    "message": "分类不能为空"
                }
            ]
        },
        {
            type: "textarea",
            label: "描述",
            field: "description",
            value: "",
            props: {
                placeholder: "描述信息"
            }
        },
    ]
}


