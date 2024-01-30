import { faceRecognition } from '../../common/utils/faceRecognition.js';
import { ImageModel } from './image.schema.js';
import { AppResponse } from '../../common/utils/appResponse.js';
import AppError from '../../common/utils/appError.js';
import { catchAsync } from '../../common/utils/errorHandler.js';
import { FaceModel } from './face.schema.js';
import { UserModel } from '../user/user.schema.js';

export const createNewImage = catchAsync(async (req, res) => {
  const { user } = req;
  const { imageUrl } = req.query;
  if (!imageUrl) {
    throw new AppError('Please provide an image url', 400);
  }
  const currentUser = await UserModel.findById(user.id);
  if (!currentUser) {
    throw new AppError('User not found', 404);
  }
  const faces = await faceRecognition(imageUrl);
  if (!faces) {
    throw new AppError('No faces found', 404);
  }

  const newImage = new ImageModel({
    baseImageUrl: imageUrl,
    imageRegions: faces
  });
  await newImage.save();
  if (!newImage) throw new AppError('Error in creating new image', 500);

  currentUser.images.push(newImage);
  await currentUser.save();

  return AppResponse(res, 200, newImage, 'Face region data fetched successfully');
});

export const getImageById = catchAsync(async (req, res) => {
  const { imageId } = req.params;
  if (!imageId) {
    throw new AppError('Please provide an image id', 400);
  }
  const image = await ImageModel.findById(imageId);
  if (!image) {
    throw new AppError('Image not found', 404);
  }
  return AppResponse(res, 200, image, 'Image data fetched successfully');
});

export const createFace = catchAsync(async (req, res) => {
  const { faceRegion, faceName, imageId } = req.body;

  if (!(faceRegion && faceName && imageId))
    throw new AppError('Please provide the required fields', 400);
  const currentImage = await ImageModel.findById(imageId);
  if (!currentImage) throw new AppError('Image not found', 404);
  const newFace = new FaceModel({
    faceRegion: faceRegion,
    faceName: faceName,
    image: imageId
  });
  await newFace.save();
  if (!newFace) throw new AppError('Error in storing face', 500);

  currentImage.faces.push(newFace);
  await currentImage.save();

  return AppResponse(res, 201, newFace, 'Face stored successfully');
});
