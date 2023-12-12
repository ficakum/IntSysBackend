import { Request, Response, NextFunction } from 'express';

import Logger from '../utils/winston.logger';
import HttpException from '../exceptions/http.exception';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof HttpException) {
    Logger.error(err.message);
    res.status(err.status).json(err.message);
  } else {
    Logger.error(err.message);
    res.status(500).json(err.message);
  }
  next();
};

export default errorHandler;
