import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js';
import { catchAsync } from '../../common/utils/errorHandler.js';
import { compareData } from '../../common/utils/helper.js';
import { UserModel } from '../user/user.schema.js';

// Signup route
export const httpSignUp = catchAsync(async (req, res) => {
  // Extract user data from request body
  const { username, profilePic, email, password } = req.body;

  // Validate user data
  if (!username || !profilePic || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists in the database
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 409);
  }

  // Create a new user object
  const newUser = await UserModel.create({
    username,
    profilePic,
    email,
    password
  });
  await newUser.save();

  // Return success response
  return AppResponse(res, 201, null, 'Signup successful');
});

export const httpLogin = catchAsync(async (req, res) => {
  // Extract user data from request body
  const { email, password } = req.body;

  // Validate user data
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists in the database
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    throw new AppError('User does not exist', 404);
  }

  // Check if password is correct
  const isPasswordCorrect = await compareData(password, existingUser.password);
  if (!isPasswordCorrect) {
    throw new AppError('Invalid credentials', 401);
  }

  // Return success response
  return AppResponse(res, 200, null, 'Login successful');
});
