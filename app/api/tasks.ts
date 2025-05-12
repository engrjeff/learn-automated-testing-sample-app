// tasks.ts
import { OpenAPIHono, z } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';
import { BadRequestError, NotFoundError } from './error-handler';
// schema
const tasksQuerySchema = z
  .object({
    completed: z
      .enum(['true', 'false'], { message: 'Invalid value for completed.' })
      .transform((value) => value === 'true')
      .optional()
      .openapi({
        description: 'whether the task is already completed or not',
        example: 'true',
      }),
  })
  .openapi('TasksQuery');

const taskSchema = z
  .object({
    id: z.coerce
      .number({ message: 'Invalid id' })
      .openapi({ description: 'The unique ID of the task.', example: 1 }),
    title: z
      .string()
      .nonempty({ message: 'Task title is required.' })
      .openapi({ description: 'The task title.', example: 'Task 1' }),
    completed: z.boolean({ message: 'Invalid value for completed.' }).openapi({
      description: 'whether the task is already completed or not',
      example: true,
    }),
  })
  .strict({ message: 'Invalid field(s) provided.' })
  .openapi('Task');

type Task = z.infer<typeof taskSchema>;

const idParamsSchema = taskSchema.pick({ id: true }).openapi({
  param: {
    name: 'id',
    in: 'path',
  },
});

const createTaskSchema = taskSchema
  .omit({ id: true, completed: true })
  .openapi('CreateTask');

const updateTaskSchema = taskSchema
  .partial()
  .omit({ id: true })
  .openapi('UpdateTask');

const app = new OpenAPIHono();

let tasks: Task[] = [
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

import { createRoute } from '@hono/zod-openapi';

const getTasksRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Task'],
  request: {
    query: tasksQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(taskSchema),
        },
      },
      description: 'Gets the list of tasks',
    },
  },
  middleware: [
    zValidator('query', tasksQuerySchema, (result) => {
      if (!result.success) {
        throw new BadRequestError(result.error.issues.at(0)?.message as string);
      }
    }),
  ],
});

const createTaskRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Task'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createTaskSchema,
        },
      },
    },
  },
  responses: {
    400: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.literal('BadRequestError'),
            message: z.literal('Invalid value for completed.'),
          }),
        },
      },
      description: 'Bad request',
    },
    201: {
      content: {
        'application/json': {
          schema: taskSchema,
        },
      },
      description: 'The newly created task',
    },
  },
  middleware: [
    zValidator('json', createTaskSchema, (result) => {
      if (!result.success) {
        throw new BadRequestError(result.error.issues.at(0)?.message as string);
      }
    }),
  ],
});

const getTaskRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Task'],
  request: {
    params: idParamsSchema,
  },
  responses: {
    400: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.literal('BadRequestError'),
            message: z.literal('Invalid id'),
          }),
        },
      },
      description: 'Bad request',
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.literal('NotFoundError'),
            message: z.literal('Task not found'),
          }),
        },
      },
      description: 'Bad request',
    },
    200: {
      content: {
        'application/json': {
          schema: taskSchema,
        },
      },
      description: 'The task with the given id.',
    },
  },
  middleware: [
    zValidator('param', idParamsSchema, (result) => {
      if (!result.success) {
        throw new BadRequestError(result.error.issues.at(0)?.message as string);
      }
    }),
  ],
});

const updateTaskRoute = createRoute({
  method: 'patch',
  path: '/{id}',
  tags: ['Task'],
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateTaskSchema,
        },
      },
    },
  },
  responses: {
    400: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.literal('BadRequestError'),
            message: z.literal('Invalid value for completed.'),
          }),
        },
      },
      description: 'Bad request',
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.literal('NotFoundError'),
            message: z.literal('Task not found'),
          }),
        },
      },
      description: 'Bad request',
    },
    200: {
      content: {
        'application/json': {
          schema: taskSchema,
        },
      },
      description: 'The updated task.',
    },
  },
  middleware: [
    zValidator('param', idParamsSchema, (result) => {
      if (!result.success) {
        throw new BadRequestError(result.error.issues.at(0)?.message as string);
      }
    }),
    zValidator('json', updateTaskSchema, (result) => {
      if (!result.success) {
        throw new BadRequestError(result.error.issues.at(0)?.message as string);
      }
    }),
  ],
});

const deleteTaskRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['Task'],
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateTaskSchema,
        },
      },
    },
  },
  responses: {
    400: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.literal('BadRequestError'),
            message: z.literal('Invalid value for completed.'),
          }),
        },
      },
      description: 'Bad request',
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.literal('NotFoundError'),
            message: z.literal('Task not found'),
          }),
        },
      },
      description: 'Bad request',
    },
    204: {
      description: 'The task was deleted successfully.',
    },
  },
  middleware: [
    zValidator('param', idParamsSchema, (result) => {
      if (!result.success) {
        throw new BadRequestError(result.error.issues.at(0)?.message as string);
      }
    }),
  ],
});

app
  .openapi(getTasksRoute, (c) => {
    const { completed } = c.req.valid('query');

    return completed === undefined
      ? c.json(tasks, 200)
      : c.json(
          tasks.filter((task) => task.completed === completed),
          200
        );
  })
  .openapi(createTaskRoute, async (c) => {
    const body = await c.req.json();

    const newTask = {
      id: tasks.length + 1,
      title: body.title,
      completed: false,
    };

    tasks.push(newTask);

    return c.json(newTask, 201);
  })
  .openapi(getTaskRoute, (c) => {
    const { id } = c.req.valid('param');

    const task = tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundError('Task not found');

    return c.json(task, 200);
  })
  .openapi(updateTaskRoute, async (c) => {
    const { id } = c.req.valid('param');
    const { completed, title } = c.req.valid('json');

    const task = tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundError('Task not found');

    const updatedTask = {
      id,
      title: title ?? task.title,
      completed: completed !== undefined ? completed : task.completed,
    };

    tasks = tasks.map((t) => (t.id === id ? updatedTask : t));

    return c.json(updatedTask, 200);
  })
  .openapi(deleteTaskRoute, (c) => {
    const { id } = c.req.valid('param');

    const task = tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundError('Task not found');

    tasks = tasks.filter((t) => t.id !== id);

    return c.body(null, 204);
  });

export default app;
