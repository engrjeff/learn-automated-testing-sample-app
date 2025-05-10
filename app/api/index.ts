// index.ts
import { Hono } from 'hono';
import { errorHandlerMiddleware } from './error-handler';
import tasks from './tasks';
import users from './users';

const app = new Hono().basePath('/api');

app.onError(errorHandlerMiddleware);

app.route('/tasks', tasks);
app.route('/users', users);

export default app;
