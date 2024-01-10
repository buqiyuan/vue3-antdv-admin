import { HttpResponse, delay, http } from 'msw';
import { getQuery, resultPageSuccess, resultSuccess } from '../../_util';
import heroListJson from './_heroList.json';
import heroLoLListJson from './_lolHeroList.json';

export default [
  http.get('/mock-api/demo/wzry/hero_list', async ({ request }) => {
    await delay(1000);
    const { page = 1, pageSize = 10, cname = '' } = getQuery(request);

    const filterResult = heroListJson.filter((n) => n.cname.includes(cname));

    return HttpResponse.json(resultPageSuccess(page, pageSize, filterResult));
  }),
  http.get('/mock-api/demo/lol/hero_list', async ({ request }) => {
    await delay(1000);

    const { page = 1, pageSize = 10, title = '' } = getQuery(request);

    const filterResult = heroLoLListJson.filter((n) => n.title.includes(title));

    return HttpResponse.json(resultPageSuccess(page, pageSize, filterResult));
  }),
  http.get('/mock-api/demo/lol/hero_info', async ({ request }) => {
    await delay(1000);
    const { id } = getQuery(request);

    const result = heroLoLListJson.filter((n) => n.heroId == id);

    return HttpResponse.json(resultSuccess(result));
  }),
];
