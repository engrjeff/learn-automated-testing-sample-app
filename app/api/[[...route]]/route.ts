import { handle } from 'hono/vercel';
import app from '../index';

export const runtime = 'edge';

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  });
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
