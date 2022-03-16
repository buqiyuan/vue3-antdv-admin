const { resultSuccess } = require('../utils');

const demoList = (keyword, count = 20) => {
  const result = {
    list: [],
  };
  for (let index = 0; index < count; index++) {
    result.list.push({
      name: `${keyword ?? ''}选项${index}`,
      id: `${index}`,
    });
  }
  return result;
};

module.exports = [
  {
    url: '/select/getDemoOptions',
    type: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const { keyword, count } = query;
      return resultSuccess(demoList(keyword, count));
    },
  },
];
