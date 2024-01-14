import { Request } from 'express';

import { User } from '../../models/user.model';

type GetUserRequestType = Request<{ id: string }, object, object, object>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetUsersRequestType = Request<object, object, object, Map<string, any>>;
type ChangePasswordRequestType = Request<
  { id: string },
  object,
  { newPassword: string; oldPassword: string },
  object
>;
type UpdateUserRequestType = Request<
  { id: string },
  object,
  Partial<User>,
  object
>;
type DeleteUserRequestType = Request<{ id: string }, object, object, object>;

export type {
  GetUserRequestType,
  GetUsersRequestType,
  ChangePasswordRequestType,
  UpdateUserRequestType,
  DeleteUserRequestType,
};
