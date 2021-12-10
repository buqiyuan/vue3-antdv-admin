import type { CascaderProps } from 'ant-design-vue';

export type CascaderOptionType = NonNullable<CascaderProps['options']>[number];
export type Key = string | number;

// 设置选中父节点
export const setParentChecked = (target: CascaderOptionType) => {
  const children = target?.children;
  const length = children?.length;
  // 如果子节点全选了的话
  const isCheckedAll = !!length && !children.some((item) => !item.checked);
  // 如果是选中了部份
  const isSomeChecked = !!length && children.some((item) => item.checked || item.indeterminate);
  target.checked = isCheckedAll;

  target.indeterminate = isCheckedAll ? false : isSomeChecked;
  if (target.parent) {
    setParentChecked(target.parent);
  }
};

// 设置选中子节点
export const setChildrenChecked = (children: CascaderOptionType[], isCheck) => {
  children?.forEach((item) => {
    item.checked = isCheck;
    item.indeterminate = false;
    if (item.children?.length) {
      setChildrenChecked(item.children, isCheck);
    }
  });
};

// 更新节点选中状态
export const updateNodeCheckStatus = (isCheck: boolean, item: CascaderOptionType) => {
  console.log('isCheck', isCheck);
  item.checked = isCheck;
  item.indeterminate = false;
  if (Array.isArray(item.children) && item.children?.length) {
    setChildrenChecked(item.children, isCheck);
  }
  item.parent && setParentChecked(item.parent);
};
