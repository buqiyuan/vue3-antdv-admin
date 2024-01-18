import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker/locale/zh_CN';

export default [
  http.get('/api/list', async () => {
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
  http.get('/api/list', async () => {
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
];
