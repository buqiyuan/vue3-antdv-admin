import { whiteNameList } from './constant';
import { getRouter } from './navigation';

export function resetRouter() {
  const router = getRouter();
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !whiteNameList.some(n => n === name) && router.hasRoute(name))
      router.removeRoute(name);
  });
}
