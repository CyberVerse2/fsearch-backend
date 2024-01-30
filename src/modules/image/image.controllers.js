import { faceRecognition } from "../../common/utils/faceRecognition.js";
import { ImageModel } from "./image.schema.js";
import { AppResponse } from "../../common/utils/appResponse.js";
import AppError from "../../common/utils/appError.js";
import { catchAsync } from "../../common/utils/errorHandler.js";


export const getFacesRegion = catchAsync(async (req, res) => {
  const { user } = req;
  const { imageUrl } = req.params;
  if (!imageUrl) {
    throw new AppError('Please provide an image url', 400);
  }
  const faces = await faceRecognition(imageUrl);
  if (!faces) {
    throw new AppError('No faces found', 404);
  }
  const newImage = await ImageModel.create({
    imageRegions: faces,
    baseImageUrl: imageUrl
  });
  await newImage.save();

  return AppResponse(res, 200, newImage, 'Face region data fetched successfully');
});

export const getFaceById = catchAsync(async (req, res) => {
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

export const storeFaces = catchAsync(async (req, res) => {
  const { facesUrl } = req.body
  if(!Array.isArray(facesUrl)) throw new AppError('Please provide an array of faces url', 400);
});

