import { Request } from 'express';

import { User } from '../../models/user.model';

type SignInRequestType = Request<
  object,
  object,
  { userName: string; password: string },
  object
>;
type SignUpRequestType = Request<object, object, User, object>;
type RefreshTokenRequestType = Request<
  object,
  object,
  { refreshToken: string },
  object
>;
type ResetPasswordRequestType = Request<
  object,
  object,
  { userName: string; newPassword: string },
  object
>;

export type {
  SignInRequestType,
  SignUpRequestType,
  RefreshTokenRequestType,
  ResetPasswordRequestType,
};
