import { catchAsync } from '../../common/utils/errorHandler.js';
import AppError from '../../common/utils/appError.js';
import { ImageModel } from './image.schema.js';
import { FaceModel } from './face.schema.js';
import { uploadFile } from '../../common/utils/cloudinary.js';
import { AppResponse } from '../../common/utils/appResponse.js';
import { getFaceDetails } from '../../common/utils/helper.js';

export const createFace = catchAsync(async (req, res) => {
  const { faceRegion, faceName, imageId } = req.body;
  const { face } = req.file;
  if (!face) {
    throw new AppError('Please provide a face image', 400);
  }
  if (!(faceRegion && faceName && imageId))
    throw new AppError('Please provide the required fields', 400);

  const currentImage = await ImageModel.findById(imageId);
  if (!currentImage) throw new AppError('Image with the. not found', 404);
  const { url } = await uploadFile(currentImage.id, face);
  if (!url) throw new AppError('Error in uploading the face image', 500);

  const newFace = new FaceModel({
    faceRegion: faceRegion,
    faceName: faceName,
    image: imageId,
    imageUrl: url
  });
  await newFace.save();
  if (!newFace) throw new AppError('Error in storing face', 500);

  currentImage.faces.push(newFace);
  await currentImage.save();

  return AppResponse(res, 201, newFace, 'Face stored successfully');
});

export const getFaceById = catchAsync(async (req, res) => {
  const { faceId } = req.params;
  if (!faceId) {
    throw new AppError('Please provide an Face id', 400);
  }
  const face = await FaceModel.findById(faceId);
  if (!face) {
    throw new AppError('face not found', 404);
  }
  const faceDetails = await getFaceDetails(face.imageUrl);
  if (!faceDetails) {
    throw new AppError('No face details found', 404);
  }
  face.details = faceDetails;
  await face.save()
  return AppResponse(res, 200, face, 'face data fetched successfully');
});
