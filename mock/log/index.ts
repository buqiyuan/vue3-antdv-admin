import { resultPageSuccess } from '../_util';

import data from './_reqLog.data';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/mock-api/sys/log/req/page',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, limit = 10 } = query;
      return resultPageSuccess(page, limit, data);
    },
  },
] as MockMethod[];
