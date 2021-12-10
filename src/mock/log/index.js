const reqLogJson = require('./reqLog');

module.exports = [
  // 获取请求日志
  {
    url: '/sys/log/req/page',
    type: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const { page = 1, limit = 10 } = query;
      const list = reqLogJson.data.list;
      return {
        ...reqLogJson,
        data: {
          list: list.slice((page - 1) * limit, limit * page),
          pagination: { total: list.length, size: limit, page: page },
        },
      };
    },
  },
];
