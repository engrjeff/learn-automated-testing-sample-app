// index.ts
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { errorHandlerMiddleware } from './error-handler';

import tasks from './tasks';
import users from './users';

const app = new OpenAPIHono().basePath('/api');

app.onError(errorHandlerMiddleware);

app.route('/tasks', tasks);
app.route('/users', users);

// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Tasks API - A playground',
    description: 'An API playground for learning automated API testing.',
    contact: {
      email: 'jeffsegoviadev@gmail.com',
      name: 'Jeff Segovia',
      url: 'https://jeffsegovide.dev',
    },
  },
});

// Use the middleware to serve Swagger UI at /ui
app.get('/ui', swaggerUI({ url: '/api/doc' }));

export default app;
