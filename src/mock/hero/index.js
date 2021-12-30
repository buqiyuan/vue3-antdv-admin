const heroListJson = require('./heroList.json');
const heroLoLListJson = require('./lolHeroList.json');
const { resultPageSuccess, resultSuccess } = require('../utils');

module.exports = [
  // 获取请求日志
  {
    url: '/demos/wzry/hero_list',
    type: 'get',
    timeout: 700,
    response: ({ query }) => {
      const { page = 1, limit = 10 } = query;
      const filterResult = heroListJson.filter((n) => n.cname.includes(query.cname || ''));
      return resultPageSuccess(page, limit, filterResult);
    },
  },
  {
    url: '/demos/lol/hero_list',
    type: 'get',
    timeout: 700,
    response: ({ query }) => {
      const { page = 1, limit = 10 } = query;
      const filterResult = heroLoLListJson.filter((n) => n.title.includes(query.title || ''));
      return resultPageSuccess(page, limit, filterResult);
    },
  },
  {
    url: '/demos/lol/hero_info',
    type: 'get',
    timeout: 200,
    response: ({ query }) => {
      const result = heroLoLListJson.find((n) => n.heroId == query.id);
      return resultSuccess(result);
    },
  },
];
