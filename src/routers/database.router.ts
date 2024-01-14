import { Router } from 'express';

import databaseController from '../controllers/database.controller';
import authenticationMiddleware from '../middlewares/jwt.middleware';

const databaseRouter: Router = Router();

databaseRouter.post(
  '/seedData',
  authenticationMiddleware,
  databaseController.seedData,
);
databaseRouter.post(
  '/seedUsers',
  authenticationMiddleware,
  databaseController.seedUsers,
);
databaseRouter.post(
  '/seedGroups',
  authenticationMiddleware,
  databaseController.seedGroups,
);

export default databaseRouter;
