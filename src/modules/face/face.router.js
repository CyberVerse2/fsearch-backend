import { Router } from "express";
import { protect } from "../../common/middlewares/protect";
import upload from '../../common/utils/multer.js';
import { createFace, getFaceById } from "./face.controller.js";

export const faceRouter = Router();

faceRouter.use(protect)
faceRouter.post('/faces/new', upload.single('face'), createFace);
faceRouter.get('/:id', getFaceById)
