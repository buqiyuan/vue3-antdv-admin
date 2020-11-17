import { throttle } from 'lodash'

/**
 * 函数节流装饰器
 * @param {number} wait 节流的毫秒
 * @param {Object} options 节流选项对象
 * [options.leading=true] (boolean): 指定调用在节流开始前。
 * [options.trailing=true] (boolean): 指定调用在节流结束后。
 */
export default function(wait: number, options = {}) {
    return function(target: Function, name: string, descriptor: PropertyDescriptor) {
        descriptor.value = throttle(descriptor.value, wait, options)
    }
}
