import { Router } from 'express';

import eventController from '../controllers/event.controller';
import eventAuthMiddleware from '../middlewares/event.jwt.middleware';

const eventRouter: Router = Router();

eventRouter.get(
  '/groups/:groupId/playlist',
  eventAuthMiddleware,
  eventController.subscribeToPlaylist,
);
eventRouter.get(
  '/groups/:groupId/track',
  eventAuthMiddleware,
  eventController.subscribeToCurrentTrackUnit,
);

export default eventRouter;
