import { Router } from 'express';
import { getImageById, createNewImage, createFace } from './image.controllers.js';
import { protect } from '../../common/middlewares/protect.js';


export const imageRouter = Router();

imageRouter.use(protect)

imageRouter.get('/:id', getImageById);
imageRouter.post('/new', createNewImage);
imageRouter.post('/faces/new', createFace)
