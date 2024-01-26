import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { EventAuthenticationMiddlewareRequestType } from './requestTypes/middleware.request.types';
import UnauthorizedException from '../exceptions/unauthorized.exception';
import userService from '../services/user.service';
import { User } from '../models/user.model';

const eventAuthMiddleware = async (
  req: EventAuthenticationMiddlewareRequestType,
  _res: Response,
  next: NextFunction,
) => {
  const {
    query: { token },
  } = req;
  try {
    const payload = jwt.decode(token);

    if (!payload || typeof payload === 'string' || !payload.exp) {
      throw new UnauthorizedException('Invalid token');
    }

    if (payload.exp < Date.now() / 1000) {
      console.log('here');
      throw new UnauthorizedException('Access token expired');
    }

    const user: User = await userService.getUser(payload.id);

    req.user = user;

    next();
  } catch (err: unknown) {
    next(err);
  }
};

export default eventAuthMiddleware;
