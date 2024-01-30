import { catchAsync } from '../../common/utils/errorHandler.js';
import { UserModel } from './user.schema.js';
import { AppResponse } from '../../common/utils/appResponse.js';
import AppError from '../../common/utils/appError.js';

export const httpGetCurrentUser = catchAsync(async (req, res) => {
  const { user } = req;
  const currentUser = await UserModel.findById(user.id).populate('images').sort({ createdAt: -1 });
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

export const getUserImages = catchAsync(async (req, res) => {
  const { user } = req;
  const currentUser = await UserModel.findById(user.id).populate('images');
  if (!currentUser) {
    throw new AppError('User not found', 404);
  }
  return AppResponse(res, 200, currentUser, 'Images fetched successfully');
});
