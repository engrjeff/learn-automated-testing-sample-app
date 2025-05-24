// tasks.ts
import { OpenAPIHono, z } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';
import { BadRequestError, NotFoundError } from './error-handler';

const productSchema = z
  .object({
    id: z.coerce
      .number({ message: 'Invalid id' })
      .openapi({ description: 'The unique ID of the product.', example: 1 }),
    name: z
      .string()
      .nonempty({ message: 'Product name is required.' })
      .max(255, { message: 'Must not be longer than 255 characters.' })
      .openapi({
        description: 'The product name.',
        example: 'iPhone 16 Pro Max',
      }),
    price: z.coerce
      .number({ message: 'Price is required.' })
      .gt(0, { message: 'Price must be greater than 0.' })
      .openapi({
        description: 'The product price.',
        example: 1200,
      }),
    color: z
      .string({ required_error: 'Color is required.' })
      .nonempty({ message: 'Color is required.' })
      .openapi({
        description: 'The color of the product.',
        example: 'Space Black',
      }),
  })
  .strict({ message: 'Invalid field(s) provided.' })
  .openapi('Product');

type Product = z.infer<typeof productSchema>;

const idParamsSchema = productSchema.pick({ id: true }).openapi({
  param: {
    name: 'id',
    in: 'path',
  },
});

const createProductSchema = productSchema
  .omit({ id: true })
  .openapi('CreateProduct');

const app = new OpenAPIHono();

const products: Product[] = [
  {
    id: 1,
    name: 'Macbook Pro Gold',
    price: 1200,
    color: 'Rose Gold',
  },
  {
    id: 2,
    name: 'Macbook Pro Gray',
    price: 1250,
    color: 'Space Gray',
  },
  {
    id: 3,
    name: 'Macbook Pro Silver',
    price: 1150,
    color: 'Silver',
  },
];

import { createRoute } from '@hono/zod-openapi';

const getProductsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Product'],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(productSchema),
        },
      },
      description: 'Gets the list of products',
    },
  },
});

const createProductRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Product'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createProductSchema,
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
            message: z.literal('Product name is required.'),
          }),
        },
      },
      description: 'Bad request',
    },
    201: {
      content: {
        'application/json': {
          schema: productSchema,
        },
      },
      description: 'The newly created product',
    },
  },
  middleware: [
    zValidator('json', createProductSchema, (result) => {
      if (!result.success) {
        throw new BadRequestError(result.error.issues.at(0)?.message as string);
      }
    }),
  ],
});

const getProductRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Product'],
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
            message: z.literal('Product not found'),
          }),
        },
      },
      description: 'Bad request',
    },
    200: {
      content: {
        'application/json': {
          schema: productSchema,
        },
      },
      description: 'The product with the given id.',
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
  .openapi(getProductsRoute, (c) => {
    return c.json(products);
  })
  .openapi(createProductRoute, async (c) => {
    const data = c.req.valid('json');

    const newProduct = {
      ...data,
      id: products.length + 1,
    };

    products.push(newProduct);

    return c.json(newProduct, 201);
  })
  .openapi(getProductRoute, (c) => {
    const { id } = c.req.valid('param');

    const task = products.find((t) => t.id === id);

    if (!task) throw new NotFoundError('Product not found');

    return c.json(task, 200);
  });

export default app;
