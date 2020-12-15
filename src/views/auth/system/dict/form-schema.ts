import {FormSchema} from "@/types/schema";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchema = (): FormSchema => ({
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
})


