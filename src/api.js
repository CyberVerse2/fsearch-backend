import { Router } from 'express';
import { authRouter } from './modules/auth/auth.router.js';
import { imageRouter } from './modules/image/image.router.js';
import { userRouter } from './modules/user/user.router.js';

export const apiRoutes = Router();

apiRoutes.use('/auth', authRouter);
apiRoutes.use('/user', userRouter);
apiRoutes.use('/images', imageRouter);
