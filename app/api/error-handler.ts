import { StatusCodes } from 'http-status-codes';

import { type Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { ZodError } from 'zod';

export async function errorHandlerMiddleware(err: Error, c: Context) {
  const { error, statusCode } = makeError(err);
  console.error(error.message, error);
  return c.json(error, { status: statusCode as ContentfulStatusCode });
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.message = message;
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.message = message;
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.message = message;
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.message = message;
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
    this.message = message;
  }
}

export function makeError<TError extends Error>(error: TError) {
  const defaultError = {
    name: error.name,
    message: error.message,
  };

  /* Custom Errors */
  if (error.message.includes('Malformed JSON')) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { name: 'BadRequestError', message: error.message },
    };
  }

  if (error instanceof BadRequestError) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: defaultError,
    };
  }

  if (error instanceof UnauthorizedError) {
    return {
      statusCode: StatusCodes.UNAUTHORIZED,
      error: defaultError,
    };
  }

  if (error instanceof ForbiddenError) {
    return {
      statusCode: StatusCodes.FORBIDDEN,
      error: defaultError,
    };
  }

  if (error instanceof NotFoundError) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      error: defaultError,
    };
  }

  if (error instanceof ConflictError) {
    return {
      statusCode: StatusCodes.CONFLICT,
      error: defaultError,
    };
  }

  /* Library Errors */
  if (error instanceof ZodError) {
    /* Mostly for Controller's Payload Validation */
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: {
        ...defaultError,
        issues: error.issues.map((i) => i.message),
      },
    };
  }

  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    error: defaultError,
  };
}
