<script lang="tsx">
  import { defineComponent, computed, ref, unref } from 'vue';
  import { Menu, Dropdown } from 'ant-design-vue';
  import type { ContextMenuItem, ItemContentProps, Axis } from './typing';
  import type { FunctionalComponent, CSSProperties, PropType } from 'vue';
  import { IconFont } from '@/components/basic/icon';

  const props = {
    width: { type: Number, default: 156 },
    customEvent: { type: Object as PropType<Event>, default: null },
    styles: { type: Object as PropType<CSSProperties> },
    showIcon: { type: Boolean, default: true },
    axis: {
      // The position of the right mouse button click
      type: Object as PropType<Axis>,
      default() {
        return { x: 0, y: 0 };
      },
    },
    items: {
      // The most important list, if not, will not be displayed
      type: Array as PropType<ContextMenuItem[]>,
      default() {
        return [];
      },
    },
  };

  const ItemContent: FunctionalComponent<ItemContentProps> = (props) => {
    const { item } = props;
    return (
      <span
        style="display: inline-block; width: 100%; "
        class="px-4"
        onClick={props.handler.bind(null, item)}
      >
        {props.showIcon && item.icon && <IconFont class="mr-2" type={item.icon} />}
        <span>{item.label}</span>
      </span>
    );
  };

  export default defineComponent({
    name: 'ContextMenu',
    props,
    setup(props, { expose }) {
      const open = ref(true);

      const getStyle = computed((): CSSProperties => {
        const { axis, items, styles, width } = props;
        const { x, y } = axis || { x: 0, y: 0 };
        const menuHeight = (items || []).length * 40;
        const menuWidth = width;
        const body = document.body;

        const left = body.clientWidth < x + menuWidth ? x - menuWidth : x;
        const top = body.clientHeight < y + menuHeight ? y - menuHeight : y;
        return {
          position: 'absolute',
          width: `${width}px`,
          left: `${left + 1}px`,
          top: `${top + 1}px`,
          ...styles,
        };
      });

      const close = () => {
        open.value = false;
      };

      function handleAction(item: ContextMenuItem, e: MouseEvent) {
        const { handler, disabled } = item;
        if (disabled) {
          return;
        }
        e?.stopPropagation();
        e?.preventDefault();
        handler?.();
        close();
      }

      function renderMenuItem(items: ContextMenuItem[]) {
        const visibleItems = items.filter((item) => !item.hidden);
        return visibleItems.map((item) => {
          const { disabled, label, children, divider = false } = item;

          const contentProps = {
            item,
            handler: handleAction,
            showIcon: props.showIcon,
          };

          if (!children || children.length === 0) {
            return (
              <>
                <Menu.Item disabled={disabled} key={label}>
                  <ItemContent {...contentProps} />
                </Menu.Item>
                {divider ? <Menu.Divider key={`d-${label}`} /> : null}
              </>
            );
          }

          return (
            <Menu.SubMenu key={label} disabled={disabled}>
              {{
                title: () => <ItemContent {...contentProps} />,
                default: () => renderMenuItem(children),
              }}
            </Menu.SubMenu>
          );
        });
      }

      expose({
        close,
      });

      return () => {
        const { items } = props;
        return (
          <Dropdown open={open.value}>
            {{
              default: () => <div style={unref(getStyle)}></div>,
              overlay: () => (
                <Menu inlineIndent={12} mode="vertical">
                  {renderMenuItem(items)}
                </Menu>
              ),
            }}
          </Dropdown>
        );
      };
    },
  });
</script>
