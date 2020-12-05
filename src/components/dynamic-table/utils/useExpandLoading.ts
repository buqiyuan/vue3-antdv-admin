import {createVNode, nextTick, render} from "vue";
import {LoadingOutlined} from "@ant-design/icons-vue";

/**
 * 点击展开图标loading子数据
 * @param expanded
 * @param record
 * @param expandItemEl
 * @param asyncFunc 异步方法
 * @param params API参数
 */
export default async ({expanded, record, expandItemEl, asyncFunc,params}) => {
    // 如果是第一次展开
    if (expanded && record.children && !Array.isArray(record.children)) {
        const iconEle = expandItemEl.closest('td').querySelector('.ant-table-row-expand-icon')
        render(createVNode(LoadingOutlined), iconEle)
        await nextTick()
        iconEle.classList.add('loading-icon')
        return asyncFunc(params).finally(async () => {
            render(null, iconEle)
            await nextTick()
            iconEle.classList.remove('loading-icon')
        })
    }
}
