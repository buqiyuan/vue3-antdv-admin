import heroListJson from './_heroList.json';
import { resultPageSuccess } from '../../_util';
import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/mock-api/demos/hero/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, limit = 10 } = query;
      const filterResult = heroListJson.filter((n) => n.cname.includes(query.cname || ''));
      return resultPageSuccess(page, limit, filterResult);
    },
  },
] as MockMethod[];
