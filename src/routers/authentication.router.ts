import { Router } from 'express';

import authenticationController from '../controllers/authentication.controller';

const authRouter: Router = Router();

authRouter.get('/refresh-token', authenticationController.refreshToken);
authRouter.post('/signin', authenticationController.signIn);
authRouter.post('/signup', authenticationController.signUp);
authRouter.put('/reset-password', authenticationController.resetPassword);

export default authRouter;
