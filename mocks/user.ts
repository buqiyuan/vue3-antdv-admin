import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker/locale/zh_CN';

export default [
  http.get('/mock-api/user/:id', async () => {
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
  http.get('/mock-api/login', async () => {
    await delay(1000);
    return HttpResponse.json({
      code: 200,
      data: '登录成功',
    });
  }),
];
