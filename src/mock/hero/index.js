const heroListJson = require('./heroList.json');
const { resultPageSuccess } = require('../utils');

module.exports = [
  // 获取请求日志
  {
    url: '/demos/hero/list',
    type: 'get',
    timeout: 700,
    response: ({ query }) => {
      const { page = 1, limit = 10 } = query;
      const filterResult = heroListJson.filter((n) => n.cname.includes(query.cname || ''));
      return resultPageSuccess(page, limit, filterResult);
    },
  },
];
