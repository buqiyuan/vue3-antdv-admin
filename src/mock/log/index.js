const data = require('./reqLog');
const { resultPageSuccess } = require('../utils');

module.exports = [
  // 获取请求日志
  {
    url: '/sys/log/req/page',
    type: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const { page = 1, limit = 10 } = query;
      return resultPageSuccess(page, limit, data);
    },
  },
];
