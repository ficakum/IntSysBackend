import { Router } from 'express';

import queryMiddleware from '../middlewares/query.middleware';
import userController from '../controllers/user.controller';
import authenticationMiddleware from '../middlewares/jwt.middleware';

const userRouter: Router = Router();

userRouter.get('/:id', authenticationMiddleware, userController.getUser);
userRouter.get(
  '/',
  authenticationMiddleware,
  queryMiddleware,
  userController.getUsers,
);
userRouter.post(
  '/:id',
  authenticationMiddleware,
  userController.changePassword,
);
userRouter.patch('/:id', authenticationMiddleware, userController.updateUser);
userRouter.delete('/:id', authenticationMiddleware, userController.deleteUser);

export default userRouter;
