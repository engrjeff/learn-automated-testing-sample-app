import { db } from './mocks/db';

describe('main', () => {
  it('should pass', async () => {
    db.product.create();
    db.product.create();
    db.product.create();

    const data = db.product.getAll();

    console.log(data);

    expect(data.length).toBe(3);
  });
});
