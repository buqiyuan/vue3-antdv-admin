import { http, HttpResponse, delay } from 'msw';
import { getQuery, resultSuccess, serverApi } from '../_util';

const getDictData = (dictType: string) => {
  if (dictType === 'gender') {
    return [
      {
        label: '男',
        value: 1,
      },
      {
        label: '女',
        value: 0,
      },
    ];
  } else if (dictType === 'sell_status') {
    return [
      {
        label: '已售罄',
        value: 0,
      },
      {
        label: '热卖中',
        value: 1,
      },
    ];
  }
  return [];
};

export default [
  http.get(serverApi('/dict/data'), async ({ request }) => {
    await delay(1800);
    const { type } = getQuery(request);
    return HttpResponse.json(resultSuccess(getDictData(type)));
  }),
];
