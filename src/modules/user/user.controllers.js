import { catchAsync } from '../../common/utils/errorHandler.js';
import { UserModel } from './schemas/user.schema.js';
import { AppResponse } from '../../common/utils/appResponse.js';
import AppError from '../../common/utils/appError.js';
import { faceRecognition } from '../../common/utils/faceRecognition.js';
import { ImageModel } from './schemas/image.schema.js';

export const httpGetCurrentUser = catchAsync(async (req, res) => {
  const { user } = req;
  const currentUser = await UserModel.findById(user.id);
  if (!currentUser) {
    throw new AppError('User not found', 404);
  }
  return AppResponse(res, 200, currentUser, 'User fetched successfully');
});

export const httpUpdateUser = catchAsync(async (req, res) => {
  const { user } = req;
  const { username, profilePic } = req.body;
  if (!username || !profilePic) {
    throw new AppError('All fields are required', 400);
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    user.id,
    {
      username,
      profilePic
    },
    { new: true }
  );
  if (!updatedUser) {
    throw new AppError('User not found', 404);
  }
  return AppResponse(res, 200, updatedUser, 'User updated successfully');
});

export const getPictureFaces = catchAsync(async (req, res) => {
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
    baseImageUrl: imageUrl,
    
  });

  return AppResponse(res, 200, faces, 'Face region data fetched successfully');
});


export const getFaceDetails = catchAsync(async (req, res) => { })