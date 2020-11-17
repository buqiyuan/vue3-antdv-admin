
import { Modal } from 'ant-design-vue'

/**
 * 确认提示框装饰器
 * @param {*} message 提示信息
 * @param {*} title 标题
 * @param {*} cancelFn 取消回调函数
 */
export function confirm(content: string, title = '提示', cancelFn?: (err: any) => {}) {
    return function(target: any, name: string, descriptor: PropertyDescriptor) {
        const originFn = descriptor.value
        descriptor.value = async function(...rest: any[]) {
            try {
                await Modal.confirm({
                    content,
                    title: title
                })
                originFn.apply(this, rest)
            } catch (error) {
                cancelFn && cancelFn(error)
            }
        }
    }
}

/**
 * 提示框装饰器
 * @param {*} message 提示信息
 * @param {*} title 提示标题
 */
export function alert(content: any, title = '提示') {
    return function(target: any, name: string, descriptor: PropertyDescriptor) {
        const originFn = descriptor.value
        descriptor.value = async function(...rest: any[]) {
            await Modal.confirm({
                content,
                title: title
            })
            originFn.apply(this, rest)
        }
    }
}
