// create-api.ts
import {App, createVNode, render, mergeProps, Component, ComponentOptions} from 'vue'

interface ModalInstance {
    remove(): void;

    $updateProps(props: any): void;
}

interface Options {
    callback?: (...rest) => any;

    [key: string]: any;
}

export const useCreateModal = (component: Component, options?: Options, app?: App): ModalInstance => {
    // 单例模式
    let _instance: any = null
    // if (!_instance) {
    // const container = document.createDocumentFragment()
    const container = document.createElement('div')
    // 移除组件
    const remove = () => {
        render(null, container)
        _instance = null
        container.remove()
    }
    // 点击body移除组件
    // document.body.addEventListener('click', remove)
    // 直接根据组件生成 VNode
    _instance = createVNode(component)
    // Vue3 的 props 是扁平化的，事件直接 onMethods 即可；和 React props 类似，合并属性更轻松
    _instance.props = mergeProps(_instance.props, {
        remove,
        ...options
    })
    // 渲染组件，并插入 body 之中
    render(_instance, container)
    // document.body.appendChild(container)
    // 在组件添加一个 remove 方法用来销毁组件
    _instance.component.ctx.remove = remove
    console.log(component, '组件')
    console.log(_instance, '组件_instance')
    // _instance.appContext = mainApp._context
    // 暴露一个 updateprops 的方法
    _instance.component.ctx.$updateProps = function (props: any) {
        props && Object.keys(props).forEach(k => {
            _instance.component.props[k] = props[k]
        })
    }
    // }
    // 将组件直接暴露出去
    return _instance.component.ctx
}
// 暴露一个插件 API
const install = (app: App, Component: ComponentOptions) => {
    // 在 this 上挂载一个贯穿方法，用 provider 也行
    app.config.globalProperties[`$create${Component.name}`] = useCreateModal(Component, app)
}
export default install
