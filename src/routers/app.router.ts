import { Router } from 'express';

import roomRouter from './group.router';
import userRouter from './user.router';
import trackUnitsRouter from './track.router';
import eventRouter from './event.router';
import authenticationRouter from './authentication.router';

const router: Router = Router();

router.use('/groups', roomRouter);
router.use('/users', userRouter);
router.use('/trackUnits', trackUnitsRouter);
router.use('/subscribe', eventRouter);
router.use('/authentication', authenticationRouter);

export default router;
