// create-api.ts
import {App, createVNode, render, ref, mergeProps , ComponentOptions} from 'vue'
import FormModal from './form-modal.vue'
import {FormSchema} from "@/types/schema";

interface ModalInstance {
    remove(): void;
    $updateProps(props: any): void;
}

interface Options {
    handleOk: (modelRef: any, state) => Promise<any>; // 点击提交表单
    formSchema: FormSchema; // 表单描述属性
    fields?: object; // 字段默认填充值，一般编辑表单是传入
    hiddenFields?: string[]; // 需要隐藏的表单项
    [key: string]: any;
}

/**
 * 创建表单模态框
 * @param modalOptions
 * @param formOptions
 */
export const useFormModal = (options: Options): any => {
    // 组件实例
    let _instance = null
    const container = document.createElement('div')
    // 移除组件
    const remove = () => {
        render(null, container)
        _instance = null
        container.remove()
    }
    const formModal = createVNode(FormModal, {...options,remove})
    render(formModal, container)
    return _instance
}
