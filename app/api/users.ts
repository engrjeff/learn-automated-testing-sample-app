// users.ts
import { Hono } from 'hono';

const app = new Hono();

app
  .get('/', (c) => c.json('list users'))
  .post('/', (c) => c.json('create a user', 201))
  .get('/:id', (c) => c.json(`get user ${c.req.param('id')}`))
  .patch('/:id', (c) => c.json(`update user ${c.req.param('id')}`))
  .delete('/:id', (c) => c.json(`delete user ${c.req.param('id')}`));

export default app;
