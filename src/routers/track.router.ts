import { Router } from 'express';

import queryMiddleware from '../middlewares/query.middleware';
import trackController from '../controllers/track.controller';
import authenticationMiddleware from '../middlewares/jwt.middleware';

const trackRouter: Router = Router();

trackRouter.get('/:id', authenticationMiddleware, trackController.getTrack);
trackRouter.get(
  '/',
  authenticationMiddleware,
  queryMiddleware,
  trackController.getTracks,
);
trackRouter.post(
  '/track',
  authenticationMiddleware,
  trackController.createTrack,
);
trackRouter.post(
  '/trackinfo',
  authenticationMiddleware,
  trackController.createTrackInfo,
);
trackRouter.patch(
  '/track/:id',
  authenticationMiddleware,
  trackController.updateTrack,
);
trackRouter.patch(
  '/trackinfo/:id',
  authenticationMiddleware,
  trackController.updateTrackInfo,
);
trackRouter.delete(
  '/track/:id',
  authenticationMiddleware,
  trackController.deleteTrack,
);
trackRouter.delete(
  '/trackinfo/:id',
  authenticationMiddleware,
  trackController.deleteTrackInfo,
);

export default trackRouter;
