import { Router } from 'express';
import { getFaceById, getFacesRegion } from './image.controllers.js';
import { protect } from '../../common/middlewares/protect.js';


export const imageRouter = Router();

imageRouter.use(protect)

imageRouter.get('/regions/:imageUrl', getFacesRegion);
imageRouter.get('/:id', getFaceById);
