import {adminMenus} from '@/api/system/menu'
import {constantRouterComponents} from './constantRouterComponents'
import router from "@/router/index";
import {routes} from "@/router/index";
import {notFound} from '@/router/modules/error'
import {Empty} from 'ant-design-vue'

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
    list.forEach(item => {
        // 判断是否为父级菜单
        if (item.parentId === parentId) {
            const child = {
                ...item,
                key: item.key || item.name,
                children: []
            }
            // 迭代 list， 找到当前菜单相符合的所有子菜单
            listToTree(list, child.children, item.id)
            // 删掉不存在 children 值的属性
            if (child.children.length <= 0) {
                delete child.children
            }
            // 加入到树中
            tree.push(child)
        }
    })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent?: any) => {
    return routerMap.map(item => {
        const {title, show, hideChildren, hiddenHeaderContent, target, icon} = item || {}
        const currentRouter: any = {
            // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
            path: `${parent && parent.url || ''}/${item.url || '/'}`,
            // 路由名称，建议唯一
            name: item.url || '',
            // 该路由对应页面的 组件 :方案1
            // component: constantRouterComponents[item.component || item.key],
            // 该路由对应页面的 组件 :方案2 (动态加载)
            component: (constantRouterComponents[item.url]) || (() => import('@/views/shared/error/404.vue')),
            props: true,
            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                title: title,
                icon: icon || undefined,
                hiddenHeaderContent: hiddenHeaderContent,
                target: target,
                permission: item.actions || []
            }
        }
        // 是否设置了隐藏菜单
        if (show === false) {
            currentRouter.hidden = true
        }
        // 是否设置了隐藏子菜单
        if (hideChildren) {
            currentRouter.hideChildrenInMenu = true
        }
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        if (!currentRouter.path.startsWith('http')) {
            currentRouter.path = currentRouter.path.replace('//', '')
        }
        // 重定向
        item.redirect && (currentRouter.redirect = item.redirect)
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentRouter.children = generator(item.children, currentRouter)
        }
        router.addRoute(currentRouter)
        return currentRouter
    })
}

/**
 * 异步生成菜单树， 方案二
 * @param dataList
 */
const list2tree = (items, parentId = -1, arr = []) => {
    return items.filter(item => item.parentId == parentId).map((item: any) => {
        const {icon, id, name, parentId, sort, meta, url} = item

        const path = url.startsWith('/') ? url : '/' + url

        return {
            path: path,
            // 路由名称，建议唯一
            name: path || '',
            children: list2tree(items, item.id, []),
            // 该路由对应页面的 组件 (动态加载)
            component: (constantRouterComponents[path]) || Empty || (() => import('@/views/shared/error/404.vue')),
            props: true,
            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                title: meta?.title || name,
                icon: icon || 'icon-zhuomian',
                // hiddenHeaderContent: hiddenHeaderContent,
                // permission: item.actions || []
            }
        }
    })
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
    return new Promise((resolve, reject) => {
        adminMenus().then(result => {
            console.log('result', result)
            const menuNav: any = []
            const childrenNav = []
            //      后端数据, 根级树数组,  根级 PID
            // listToTree(data, childrenNav, 0)
            // rootRouter.children = childrenNav
            menuNav.push(childrenNav)
            const routeList = list2tree(result)
            console.log(routeList, '生成的路由')
            routeList.forEach(item => {
                // 设置模块重定向到菜单
                if (item.children?.length > 0 && !item.redirect) {
                    item.redirect = {name: item.children[0].name}
                }
            })
            // routers.push(notFoundRouter)
            routes[0].children?.push(...routeList)
            router.addRoute(routes[0])
            router.addRoute(notFound)
            resolve(routeList)
        }).catch(err => {
            reject(err)
        })
    })
}
