import { HttpResponse, delay, http } from 'msw';
import { getQuery, resultPageSuccess, resultSuccess, serverApi } from '../../_util';
import heroListJson from './_heroList.json';
import heroLoLListJson from './_lolHeroList.json';

export default [
  http.get(serverApi('/demo/wzry/hero_list'), async ({ request }) => {
    await delay(500);
    const { page = 1, pageSize = 10, cname = '', title = '' } = getQuery(request);

    const filterResult = heroListJson.filter((n) => {
      return n.cname.includes(cname) && n.title.includes(title);
    });

    return HttpResponse.json(resultPageSuccess(page, pageSize, filterResult));
  }),
  http.get(serverApi('/demo/lol/hero_list'), async ({ request }) => {
    // 接口地址: https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js
    await delay(500);

    const { page = 1, pageSize = 10, title = '', name = '' } = getQuery(request);

    const filterResult = heroLoLListJson.filter((n) => {
      return n.title.includes(title) && n.name.includes(name);
    });

    return HttpResponse.json(resultPageSuccess(page, pageSize, filterResult));
  }),
  http.get(serverApi('/demo/lol/hero_info/:id'), async ({ params }) => {
    await delay(300);
    const { id } = params;

    const result = heroLoLListJson.find((n) => n.heroId == id);

    return HttpResponse.json(resultSuccess(result));
  }),
];
