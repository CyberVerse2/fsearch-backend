import { Router } from 'express';
import { getImageFaces, createNewImage, getImageById } from './image.controller.js';
import { protect } from '../../common/middlewares/protect.js';


export const imageRouter = Router();

imageRouter.use(protect);

imageRouter.get('/faces', getImageFaces)
imageRouter.get('/:id', getImageById);
imageRouter.post('/new', createNewImage);

