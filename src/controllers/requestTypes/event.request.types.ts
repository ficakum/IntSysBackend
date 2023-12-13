import { Request } from 'express';

type EventRequest = Request<{ groupId: string }, object, object, object>;

export type { EventRequest };
