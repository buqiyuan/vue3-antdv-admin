import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker/locale/zh_CN';
import { serverApi } from './_util';

export default [
  http.get(serverApi('/user/:id'), async () => {
    await delay(1000);
    return HttpResponse.json(
      Array.from({ length: 10 }).map(() => ({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        address: faker.location.streetAddress(),
      })),
    );
  }),
  http.get(serverApi('/login'), async () => {
    await delay(1000);
    return HttpResponse.json({
      code: 200,
      data: '登录成功',
    });
  }),
];
