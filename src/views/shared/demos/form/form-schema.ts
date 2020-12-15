import {FormSchema} from "@/types/schema";

export const getFormSchema = (dynamicForm): FormSchema => ({
    formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
    },
    formItem: [
        {
            type: "input",
            label: "密码",
            field: "password",
            value: '',
            props: {
                'has-feedback': true,
                placeholder: "请输入密码"
            },
            rules: [
                {
                    required: true,
                    message: "密码不能为空",
                    validator: async (rule, value) => {
                        // 获取二次确认密码
                        const {confirmPassword,password} = dynamicForm.value.modelRef
                        if (password === '') {
                            return Promise.reject('请输入密码');
                        } else {
                            // if (confirmPassword !== '') {
                            //     dynamicForm.value.validateField('confirmPassword');
                            // }
                            return Promise.resolve();
                        }
                    }
                }
            ]
        },
        {
            type: "input",
            label: "确认密码",
            field: "confirmPassword",
            value: "",
            props: {
                'has-feedback': true,
                placeholder: "请输入确认密码"
            },
            rules: [
                {
                    required: true,
                    validator: async (rule, value, callback, source, options) => {
                        // 获取第一个密码
                        const {confirmPassword, password} = dynamicForm.value.modelRef
                        console.log(confirmPassword, password)
                        if (confirmPassword === '') {
                            return Promise.reject('请重新输入密码');
                        } else if (confirmPassword !== password) {
                            return Promise.reject("两次输入的密码不匹配!");
                        } else {
                            return Promise.resolve();
                        }
                    }
                }
            ]
        },
    ]
})


