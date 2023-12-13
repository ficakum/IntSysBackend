import { Router } from 'express';

import queryMiddleware from '../middlewares/query.middleware';
import groupController from '../controllers/group.controller';
import authenticationMiddleware from '../middlewares/jwt.middleware';

const groupRouter: Router = Router();

groupRouter.get('/:id', authenticationMiddleware, groupController.getGroup);
groupRouter.get(
  '/',
  authenticationMiddleware,
  queryMiddleware,
  groupController.getGroups,
);
groupRouter.post(
  '/:id/join',
  authenticationMiddleware,
  groupController.joinGroup,
);
groupRouter.post(
  '/:id/leave',
  authenticationMiddleware,
  groupController.leaveGroup,
);
groupRouter.post('/', authenticationMiddleware, groupController.createGroup);
groupRouter.patch(
  '/:id',
  authenticationMiddleware,
  groupController.updateGroup,
);
groupRouter.delete(
  '/:id',
  authenticationMiddleware,
  groupController.deleteGroup,
);

export default groupRouter;
