// @vitest-environment happy-dom
import { createApp, defineComponent, h, nextTick, ref } from 'vue';
import { afterEach, describe, expect, it } from 'vitest';
import TableAction from '@/components/core/dynamic-table/src/components/table-action.vue';
import { setupI18n } from '@/locales';
import { setupAntd } from '@/plugins/antd';
import { useUserStore } from '@/store/modules/user';
import { store } from '@/store';

/**
 * 用户管理操作列：编辑按钮的 onClick 是异步的（打开弹窗）。
 * TableAction 会因此切换 loading 并重渲染。图标 vnode 若在 computed 里创建并复用，
 * 这次重渲染会把该行的操作图标卸掉。
 */
describe('table action icons', () => {
  const cleanups: Array<() => void> = [];

  afterEach(() => {
    cleanups.splice(0).forEach((fn) => fn());
    document.body.innerHTML = '';
  });

  async function mountRow(onEdit: () => unknown) {
    const actions = ref([
      {
        icon: 'ant-design:edit-outlined',
        tooltip: '编辑用户资料',
        auth: {
          perm: 'system:user:update' as const,
          effect: 'disable' as const,
        },
        onClick: () => onEdit(),
      },
      {
        icon: 'ant-design:delete-outlined',
        tooltip: '删除此账号',
        auth: 'system:user:delete' as const,
        popConfirm: {
          title: '你确定要删除吗？',
          onConfirm: () => undefined,
        },
      },
    ]);

    const Host = defineComponent({
      name: 'TableActionHost',
      setup() {
        return () => h(TableAction, { actions: actions.value, rowKey: 1 });
      },
    });

    const container = document.createElement('div');
    document.body.appendChild(container);
    const app = createApp(Host);
    app.use(store);
    setupAntd(app);
    app.config.warnHandler = () => {};
    useUserStore().perms = ['system:user:update', 'system:user:delete'];
    await setupI18n(app);
    app.mount(container);
    await nextTick();
    cleanups.push(() => app.unmount());
    return { container, actions };
  }

  function iconCount(container: ParentNode) {
    return container.querySelectorAll('.anticon').length;
  }

  it('keeps both action icons after an async edit click settles', async () => {
    let release: () => void = () => {};
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    const { container } = await mountRow(() => pending);
    expect(iconCount(container)).toBe(2);

    const editButton = container.querySelector('button');
    expect(editButton).toBeTruthy();
    editButton!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();

    release();
    await pending;
    await nextTick();
    await nextTick();

    expect(iconCount(container)).toBe(2);
    expect(container.textContent).not.toContain('ant-design:edit-outlined');
  });

  it('keeps icons when permission state refreshes without a new actions array', async () => {
    let release: () => void = () => {};
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    const { container } = await mountRow(() => pending);
    expect(iconCount(container)).toBe(2);

    useUserStore().perms = ['system:user:update', 'system:user:delete'];
    await nextTick();

    expect(iconCount(container)).toBe(2);
    expect(container.querySelectorAll('button svg').length).toBeGreaterThan(0);
    release();
    await pending;
  });

  it('keeps action icons when the row actions array is replaced', async () => {
    const { container, actions } = await mountRow(() => undefined);
    expect(iconCount(container)).toBe(2);

    actions.value = actions.value.map((item) => ({ ...item }));
    await nextTick();

    expect(iconCount(container)).toBe(2);
  });
});
