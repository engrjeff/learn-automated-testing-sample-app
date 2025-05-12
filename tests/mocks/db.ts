import { factory, primaryKey } from '@mswjs/data';

import { faker } from '@faker-js/faker';

export const db = factory({
  product: {
    id: primaryKey(faker.number.int),
    name: faker.commerce.product,
    price: () => faker.number.int({ min: 10, max: 100 }),
  },
});
