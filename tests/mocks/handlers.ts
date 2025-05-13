import { http, HttpResponse } from 'msw';
import { db } from './db';

export const handlers = [
  http.get('/tasks', () => {
    return HttpResponse.json(db.task.getAll());
  }),
  // ...db.task.toHandlers('rest', 'http://localhost:3001/api/'),
  ...db.product.toHandlers('rest'),
];
