import { resultPageSuccess, resultSuccess } from '../../_util';
import heroListJson from './_heroList.json';
import heroLoLListJson from './_lolHeroList.json';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  // 获取请求日志
  {
    url: '/mock-api/demos/wzry/hero_list',
    method: 'get',
    timeout: 700,
    response: ({ query }) => {
      const { page = 1, limit = 10 } = query;
      const filterResult = heroListJson.filter((n) => n.cname.includes(query.cname || ''));
      return resultPageSuccess(page, limit, filterResult);
    },
  },
  {
    url: '/mock-api/demos/lol/hero_list',
    method: 'get',
    timeout: 700,
    response: ({ query }) => {
      const { page = 1, limit = 10 } = query;
      const filterResult = heroLoLListJson.filter((n) => n.title.includes(query.title || ''));
      return resultPageSuccess(page, limit, filterResult);
    },
  },
  {
    url: '/mock-api/demos/lol/hero_info',
    method: 'get',
    timeout: 200,
    response: ({ query }) => {
      const result = heroLoLListJson.find((n) => n.heroId == query.id);
      return resultSuccess(result);
    },
  },
] as MockMethod[];
