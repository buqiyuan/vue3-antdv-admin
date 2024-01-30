import { http, HttpResponse, delay } from 'msw';
import { getQuery, resultSuccess, serverApi } from '../_util';

const demoList = (keyword, count = 20) => {
  const result = [] as any[];

  for (let index = 0; index < count; index++) {
    result.push({
      name: `${keyword ?? ''}选项${index}`,
      id: `${index}`,
    });
  }
  return result;
};

export default [
  http.get(serverApi('/select/getDemoOptions'), async ({ request }) => {
    await delay(1000);
    const { keyword, count } = getQuery(request);

    return HttpResponse.json(resultSuccess(demoList(keyword, count)));
  }),
];
