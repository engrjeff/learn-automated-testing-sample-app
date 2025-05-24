import { http, HttpResponse } from 'msw';
import { db } from './db';

export const handlers = [
  http.get('/tasks', () => {
    return HttpResponse.json(db.task.getAll());
  }),
  http.get('/products', () => {
    return HttpResponse.json(db.product.getAll());
  }),
  http.post('/products', async ({ request }) => {
    const body = await request.json();
    // @ts-expect-error nah
    const product = db.product.create(body);
    return HttpResponse.json(product, { status: 201 });
  }),
];
