export default {
  'views/demos/form/rule-form.vue': () => import('@/views/demos/form/rule-form/index.vue'), // 验证表单
  'views/demos/icons/Iconfont.vue': () => import('@/views/demos/icons/Iconfont.vue'), // 自定义图标
  'views/demos/tables/lol-table/index.vue': () =>
    import('@/views/demos/tables/lol-table/index.vue'), // lol
  'views/demos/tables/wzry-table/index.vue': () =>
    import('@/views/demos/tables/wzry-table/index.vue'), // wzry
  'views/demos/tables/search-table/index.vue': () =>
    import('@/views/demos/tables/search-table/index.vue'), // search-table
  'views/demos/button.vue': () => import('@/views/demos/button.vue'), // 自定义按钮
  'views/demos/custom-modal.vue': () => import('@/views/demos/custom-modal.vue'), // 自定义模态框
};
