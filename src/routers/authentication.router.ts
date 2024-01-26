import { Router } from 'express';

import authenticationController from '../controllers/authentication.controller';
import authenticationMiddleware from '../middlewares/jwt.middleware';

const authRouter: Router = Router();

authRouter.get('/refresh-token', authenticationController.refreshToken);
authRouter.get(
  '/logged-user',
  authenticationMiddleware,
  authenticationController.getLoggedInUser,
);
authRouter.post('/signin', authenticationController.signIn);
authRouter.post('/signup', authenticationController.signUp);
authRouter.put('/reset-password', authenticationController.resetPassword);

export default authRouter;
