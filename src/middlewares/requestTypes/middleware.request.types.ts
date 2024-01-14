import { Request } from 'express';

type QueryMiddlewareRequestType = Request<
  object,
  object,
  object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any>
>;
type AuthenticationMiddlewareRequestType = Request<
  object,
  object,
  object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any>
>;
type EventAuthenticationMiddlewareRequestType = Request<
  object,
  object,
  object,
  { token: string }
>;

export type {
  QueryMiddlewareRequestType,
  AuthenticationMiddlewareRequestType,
  EventAuthenticationMiddlewareRequestType,
};
