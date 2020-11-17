import {FormItem, FormSchema, OptionItem} from "@/types/schema";
import {getAdminAccessModule} from '@/api/system/access'
import {getCurrentInstance} from 'vue'

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
            type: "select",
            label: "类别",
            field: "type",
            value: '1',
            props: {
                placeholder: "请输入请选择类型"
            },
            rules: [
                {
                    required: true,
                    message: "请选择类型不能为空"
                }
            ],
            options: [
                {
                    label: '模块',
                    value: '1'
                },
                {
                    label: '菜单',
                    value: '2'
                }
            ],
            eventObject: {
                change: async (formItems, value ) => {
                   const formItem: FormItem = formItems.find(item => ['moduleName', 'moduleId'].includes(item.field))!
                    if (value == 1) {
                        formItem.type = 'input'
                        formItem.value = ''
                        formItem.field = 'moduleName'
                        formItem.props!.placeholder = '请输入模块名称'
                    } else if (value == 2) {
                        formItem.type = 'select'
                        formItem.field = 'moduleId'
                        formItem.props!.placeholder = '请选择模块'
                        const data = await getAdminAccessModule()
                        formItem.options = data.map(item => ({
                            label: item.moduleName,
                            value: item.id + ''
                        }))
                        formItem.value = data[0].id + ''
                    }
                }
            }
        },
        {
            type: "input",
            label: "模块名称",
            field: "moduleName",
            value: "",
            props: {
                placeholder: "请输入模块名称"
            },
            rules: [
                {
                    "required": true,
                    "message": "密码不能为空"
                }
            ]
        },
        {
            type: "checkbox",
            label: "角色",
            field: "roles",
            value: [],
            options: [],
        }
    ]
}


