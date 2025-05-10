// tasks.ts
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { BadRequestError, NotFoundError } from './error-handler';
// schema
const tasksQuerySchema = z.object({
  completed: z
    .enum(['true', 'false'], { message: 'Invalid value for completed.' })
    .transform((value) => value === 'true')
    .optional(),
});

const taskSchema = z.object({
  title: z.string().nonempty({ message: 'Task title is required.' }),
});

const app = new Hono();

let tasks = [
  {
    id: 1,
    title: 'Learn Web Fundamentals',
    completed: true,
  },
  {
    id: 2,
    title: 'Learn JavaScript',
    completed: false,
  },
  {
    id: 3,
    title: 'Read software testing concepts',
    completed: false,
  },
  {
    id: 4,
    title: 'Practice Cypress.io E2E testing',
    completed: false,
  },
  {
    id: 5,
    title: 'Learn API testing',
    completed: false,
  },
];

app
  .get('/', zValidator('query', tasksQuerySchema), (c) => {
    const { completed } = c.req.valid('query');

    return completed === undefined
      ? c.json(tasks)
      : c.json(tasks.filter((task) => task.completed === completed));
  })
  .post(
    '/',
    zValidator('json', taskSchema, (result) => {
      if (!result.success) {
        throw new BadRequestError(result.error.issues.at(0)?.message as string);
      }
    }),
    async (c) => {
      const body = await c.req.json();

      const newTask = {
        id: tasks.length + 1,
        title: body.title,
        completed: false,
      };

      tasks.push(newTask);

      return c.json(newTask, 201);
    }
  )
  .get('/:id', (c) => {
    const id = Number(c.req.param('id'));

    const task = tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundError('Task not found');

    return c.json(task);
  })
  .patch('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();

    const task = tasks.find((t) => t.id === id);

    if (!task) return c.json({ message: 'Task not found' }, 404);

    const updatedTask = {
      ...task,
      ...body,
    };

    tasks = tasks.map((t) => (t.id === id ? updatedTask : t));

    return c.json(updatedTask);
  })
  .delete('/:id', (c) => {
    const id = Number(c.req.param('id'));

    const task = tasks.find((t) => t.id === id);

    if (!task) return c.json({ message: 'Task not found' }, 404);

    tasks = tasks.filter((t) => t.id !== id);

    return c.body(null, 204);
  });

export default app;
