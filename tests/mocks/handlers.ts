import { db } from './db';

export const handlers = [
  ...db.task.toHandlers('rest', 'http://localhost:3000/api'),
  ...db.product.toHandlers('rest'),
];
