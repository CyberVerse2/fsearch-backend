import { Router } from 'express';
import { httpSignUp, httpLogin } from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/signup', httpSignUp);
authRouter.post('/login', httpLogin);