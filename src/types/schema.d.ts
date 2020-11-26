import {Component, ComponentInternalInstance, HTMLAttributes} from 'vue'

declare interface Rules {
    required?: boolean,
    message?: string;
    validator?: (rule, value, callback) => Promise<any>,
    [key: string]: any;
}

declare interface OptionItem {
    label: string;
    value: string | number;
    [key: string]: any;
}

type Props = {
    [key in keyof HTMLAttributes & any]: any;
}

declare interface FormItem {
    type?: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'input-number' | 'inputRange' | 'switch' | Component;
    label?: string; // 表单标签
    field: string; // 表单字段
    value: any; // 表单默认值
    props?: Props, // 表单属性
    rules?: Rules[], // 表单验证规则
    options?: OptionItem[]; // 可选项
    eventObject?: object; // 事件对象，例如：{ mousedown: doThis, mouseup: doThat } 将会动态绑定为：v-on="{ mousedown: doThis, mouseup: doThat }"
    loading?: boolean; // 异步数据是否加载
    asyncValue?: (formItem: FormItem, formInstance: ComponentInternalInstance | null) => Promise<any>; // 异步数据
    asyncOptions?: (formItem: FormItem, formInstance: ComponentInternalInstance | null) => Promise<any>; // 异步选项的数据
    hidden?: boolean; // 是否隐藏表单项
    placeholder?: string;
    [key: string]: any;
}

declare interface FormSchema {
    style?: object; // 表单样式
    formItemLayout?: object; // 表单布局
    watchKeys?: string[];
    watchCallback?: (watchKeys: string[], {dynamicForm, modelRef}) => any;
    formItem:  FormItem[];
    [key: string]: any;
}
