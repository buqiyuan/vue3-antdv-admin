<template>
  <a-spin :spinning="spinning">
    <a-tree
        style="min-height: 40px"
        checkable
        checkStrictly
        :selectable="false"
        :tree-data="treeData"
        :replace-fields="replaceFields"
        v-model:checkedKeys="checkedKeys"
        @check="onCheck"
    >
    </a-tree>
  </a-spin>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, computed, onMounted} from 'vue'
import {Tree, Spin} from 'ant-design-vue'
import {getAdminRoleAccess} from '@/api/system/role'

export default defineComponent({
  name: "access-tree",
  components: {[Tree.name]: Tree, [Spin.name]: Spin},
  emits: ['update:value'], // 双向数据绑定
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  setup(props, {emit}) {
    const state = reactive({
      treeData: [],
      spinning: false,
      replaceFields: {
        key: 'id'
      },
    })

    // 列表转树
    const list2tree = (items, parent = -1) => {
      return items.filter(item => item.moduleId == parent).map(item => ({
        ...item,
        title: item.moduleName || item.actionName,
        children: list2tree(items, item.id)
      }))
    }

    // 已勾选的节点
    const checkedKeys = computed({
      get: () => props.value,
      set: (val: any) => emit('update:value', Array.isArray(val) ? val : val.checked),
    })

    onMounted(async () => {
      // 获取权限资源列表
      state.spinning = true
      const data = await getAdminRoleAccess().finally(() => state.spinning = false)
      state.treeData = list2tree(data)
    })

    // 获取所有父节点的key
    const getParentsKey = (treeNode, arr: number[] = []) => {
      if (treeNode.eventKey) {
        arr.push(treeNode.eventKey)
        return getParentsKey(treeNode.vcTreeNode, arr)
      }
      return arr
    }

    // 获取所有子节点的key
    const getChildrenKeys = (treeNode, arr: number[] = []) => {
      if (treeNode?.children.length > 0) {
        console.log(treeNode.children, 'children')
        return treeNode.children.reduce((prev, curr) => {
          if (curr.children.length > 0) {
            prev.push(...getChildrenKeys(curr, prev), [])
          }
          return prev.concat([curr.id])
        }, arr)
      }
      return arr
    }

    // 勾选事件处理函数
    const onCheck = (keys, {node, checked}) => {
      let tempKeys: number[] = checkedKeys.value
      // 子节点选中，父节点必然要选中
      if (checked) {
        tempKeys = [...new Set([...checkedKeys.value, ...keys.checked, ...getParentsKey(node.vcTreeNode), ...getChildrenKeys(node.dataRef)])]
      } else {
        const childrenKeys = getChildrenKeys(node.dataRef)
        console.log(childrenKeys, 'childrenKeys')
        if (childrenKeys.length > 0) {
          tempKeys = keys.checked.filter(item => !childrenKeys.includes(item))
        } else {
          tempKeys = keys.checked
        }
        // 获取所有同级节点
        const children = node.vcTreeNode?.dataRef?.children?.map(item => item.id) || []
        // 如果当前所有选中的节点中没有包含任何一个直属子节点
        if (!children.some(item => tempKeys.includes(item))) {
          tempKeys = tempKeys.filter(item => item != node.vcTreeNode?.eventKey)
        }
      }
      checkedKeys.value = tempKeys
    }

    return {
      ...toRefs(state),
      checkedKeys,
      onCheck
    }
  }
})
</script>

<style scoped>

</style>
