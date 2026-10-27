import { createMemoryHistory, createRouter } from 'vue-router';
import { describe, expect, it } from 'vitest';
import { replayRegisteredRoute, resolveRedirectTarget } from '@/router/routeLocation';

const Page = { template: '<div />' };

async function bootDynamicRoute(redirect: (to: any) => any) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'Layout', component: Page, children: [] },
      { path: '/:pathMatch(.*)*', name: 'PageNotFound', component: Page },
    ],
  });
  let ready = false;
  router.beforeEach((to) => {
    if (ready) return;
    ready = true;
    router.addRoute('Layout', {
      path: 'system/user',
      name: '/system/user',
      component: Page,
    });
    if (to.name === 'PageNotFound') {
      return redirect(to);
    }
  });
  await router.push('/system/user?deptId=12&kw=a%20b#top');
  return router.currentRoute.value;
}

describe('dynamic route refresh (#200)', () => {
  it('drops the hash when fullPath is reused as path', async () => {
    const route = await bootDynamicRoute((to) => ({
      path: to.fullPath,
      query: to.query,
      replace: true,
    }));
    expect(route.query).toEqual({ deptId: '12', kw: 'a b' });
    expect(route.hash).toBe('');
  });

  it('drops the query when only fullPath is passed as path', async () => {
    const route = await bootDynamicRoute((to) => ({
      path: to.fullPath,
      replace: true,
    }));
    expect(route.fullPath).toBe('/system/user');
    expect(route.query).toEqual({});
    expect(route.hash).toBe('');
  });

  it('keeps query and hash when the registered route is replayed', async () => {
    const route = await bootDynamicRoute((to) => replayRegisteredRoute(to));
    expect(route.name).toBe('/system/user');
    expect(route.query).toEqual({ deptId: '12', kw: 'a b' });
    expect(route.hash).toBe('#top');
    expect(route.fullPath).toBe('/system/user?deptId=12&kw=a+b#top');
  });
});

describe('redirect refresh route (#200)', () => {
  it('keeps query and hash stuffed into the path param', () => {
    const target = resolveRedirectTarget({
      pathParam: '/system/user?id=1&name=a%20b#top',
      query: {},
      hash: '',
    });
    expect(target).toMatchObject({
      path: '/system/user',
      query: { id: '1', name: 'a b' },
      hash: '#top',
    });
  });

  it('prefers an explicit redirect query and hash', () => {
    const target = resolveRedirectTarget({
      pathParam: '/system/user',
      query: { id: '9' },
      hash: '#section',
    });
    expect(target).toMatchObject({
      path: '/system/user',
      query: { id: '9' },
      hash: '#section',
    });
  });
});
