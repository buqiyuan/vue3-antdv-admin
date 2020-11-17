export const drag = {
    mounted(el, binding) {
        console.log(el, '安装了')
    },
    beforeUnmount(el, binding) {
        console.log(el, '卸载了')
    }
}
