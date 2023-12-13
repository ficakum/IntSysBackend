import { Router } from 'express';

import eventController from '../controllers/event.controller';
import authenticationMiddleware from '../middlewares/jwt.middleware';

const eventRouter: Router = Router();

eventRouter.get(
  '/groups/:groupId/playlist',
  authenticationMiddleware,
  eventController.subscribeToPlaylist,
);
eventRouter.get(
  '/groups/:groupId/track',
  authenticationMiddleware,
  eventController.subscribeToCurrentTrackUnit,
);

export default eventRouter;
