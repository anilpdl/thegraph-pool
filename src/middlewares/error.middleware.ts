import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { HttpException } from '@/exceptions/HttpException';

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status = httpStatus.INTERNAL_SERVER_ERROR, message } = err;
  res.locals.errorMessage = message;

  const response = {
    code: status,
    message,
    errors: err.errors,
    stack: err.stack
  };

  if (process.env.NODE_ENV !== 'development') {
    delete response.stack;
  }
  res.status(status).send(response);
};

const errorConverter = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let convertedError: HttpException = null;

  if (err instanceof HttpException) {
    convertedError = err;
  } else {
    convertedError = new HttpException(
      httpStatus.INTERNAL_SERVER_ERROR,
      err.message,
      err.stack
    );
  }

  return errorHandler(convertedError, req, res, next);
};

export { errorHandler, errorConverter };
