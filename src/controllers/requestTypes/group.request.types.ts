import { Request } from 'express';

import { Group } from '../../models/group.model';

type GetGroupRequestType = Request<{ id: string }, object, object, object>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetGroupsRequestType = Request<object, object, object, Map<string, any>>;
type CreateGroupRequestType = Request<object, object, Partial<Group>, object>;
type UpdateGroupRequestType = Request<
  { id: string },
  object,
  Partial<Group>,
  object
>;
type DeleteGroupRequestType = Request<{ id: string }, object, object, object>;
type JoinGroupRequestType = Request<{ id: string }, object, object, object>;
type LeaveGroupRequestType = Request<{ id: string }, object, object, object>;

export type {
  GetGroupRequestType,
  GetGroupsRequestType,
  CreateGroupRequestType,
  UpdateGroupRequestType,
  DeleteGroupRequestType,
  JoinGroupRequestType,
  LeaveGroupRequestType,
};
