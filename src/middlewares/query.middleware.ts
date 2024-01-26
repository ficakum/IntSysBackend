import { NextFunction, Response } from 'express';

import { QueryMiddlewareRequestType } from './requestTypes/middleware.request.types';

const queryMiddleware: (
  req: QueryMiddlewareRequestType,
  _res: Response,
  next: NextFunction,
) => void = (
  req: QueryMiddlewareRequestType,
  _res: Response,
  next: NextFunction,
): void => {
  const { query } = req;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newQuery: Map<string, any> = new Map<string, any>([
    ['searchQuery', {}],
  ]);

  Object.keys(query).forEach((key): void => {
    switch (key) {
      case '$page':
      case '$limit': {
        newQuery.set(key, Number(query[key]));
        break;
      }
      default: {
        newQuery.set('searchQuery', {
          ...newQuery.get('searchQuery'),
          [key]: query[key],
        });
      }
    }
  });

  if (!newQuery.has('$page')) {
    newQuery.set('$page', 1);
  }

  if (!newQuery.has('$limit')) {
    newQuery.set('$limit', 0);
  }

  req.query = newQuery;

  next();
};

export default queryMiddleware;
