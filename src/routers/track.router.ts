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
trackRouter.post('/', authenticationMiddleware, trackController.createTrack);
trackRouter.patch(
  '/:id',
  authenticationMiddleware,
  trackController.updateTrack,
);
trackRouter.delete(
  '/:id',
  authenticationMiddleware,
  trackController.deleteTrack,
);

export default trackRouter;
