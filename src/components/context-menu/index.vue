<script lang="tsx">
import {defineComponent, nextTick, onMounted, reactive, computed, ref,unref,VNode, onUnmounted,} from 'vue';
import { Menu, Divider } from 'ant-design-vue';
import { props } from './props';
import { Props, ContextMenuItem } from './types';

export default defineComponent({
  name: 'ContextMenu',
  props,
  setup(props) {
    const selectedKeys = ref([])
    const prefixCls = 'content-menu'
    const wrapRef = ref<HTMLDivElement | null>(null);
    const state = reactive({
      show: false,
    });
    onMounted(() => {
      nextTick(() => {
        state.show = true;
      });
    });
    onUnmounted(() => {
      const el = unref(wrapRef);
      el && document.body.removeChild(el);
    });
    const getStyle = computed(() => {
      const { axis, items, styles, width } = props;
      const { x, y } = axis || { x: 0, y: 0 };
      const menuHeight = (items || []).length * 40;
      const menuWidth = width;
      const body = document.body;
      return {
        ...styles,
        width: `${width}px`,
        left: (body.clientWidth < x + menuWidth ? x - menuWidth : x) + 'px',
        top: (body.clientHeight < y + menuHeight ? y - menuHeight : y) + 'px',
      };
    });
    function handleAction(item: ContextMenuItem, e: MouseEvent) {
      // e.stopPropagation();
      const { handler, disabled, children } = item;
      if (disabled || children) {
        e.preventDefault()
        e.stopPropagation();
        return;
      }
      state.show = true;
      handler && handler(item);
    }
    function renderContent(item: ContextMenuItem) {
      const { icon, label } = item;

      const { showIcon } = props;
      return (
          <span style="display: inline-block; width: 100%;" onClick={handleAction.bind(null, item)}>
            {showIcon && icon && <div class="mr-2" />}
            <span>{label}</span>
          </span>
      );
    }
    function renderMenuItem(items: ContextMenuItem[]) {
      return items.map((item, index) => {
        const { disabled, label, children, divider = true } = item;

        const DividerComp = divider ? <Divider key={`d-${index}`} /> : null;
        if (!children || children.length === 0) {
          return [
            <Menu.Item disabled={disabled} key={label}>
              {renderContent(item)}
            </Menu.Item>,
            DividerComp,
          ];
        }
        return ([
            <Menu.SubMenu key={label} title={item.label} popupClassName={`${prefixCls}__sub_menu`}>
              {renderMenuItem(children)}
            </Menu.SubMenu>,
          DividerComp,
        ]);
      });
    }
    return () => {
      const { items } = props;
      return (
          <div ref={wrapRef} class="content-menu">
            <Menu
                v-model_selectedKeys={selectedKeys}
                inlineIndent={12}
                mode="vertical"
                v-show={state.show}
                style={unref(getStyle)}
            >
              {renderMenuItem(items as ContextMenuItem[])}
            </Menu>
          </div>
      );
    };
  },
});
</script>
<style lang="scss">
.content-menu{

   .ant-menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
    display: block;
    width: 156px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
    user-select: none;

    .ant-menu-item {
      height: 36px;
      margin-bottom: 0 !important;
      line-height: 36px;

      &:hover:not(.ant-menu-item-disabled) {
        color: inherit;
        cursor: pointer;
        background: fade-in(#e6f7ff, 0.5%);
      }
    }
  }
   .ant-divider {
    margin: 0 0;
     &:last-of-type {
       height: 0;
     }
  }
  &__sub_menu {
     .ant-menu-item {
      margin-bottom: 4px!important;
    }
    .ant-divider {
      margin: 0 0;
      &:last-of-type {
        height: 0;
      }
    }
  }
}

</style>
