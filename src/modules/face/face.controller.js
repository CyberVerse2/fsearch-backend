import { catchAsync } from "../../common/utils/errorHandler.js";
import AppError from "../../common/utils/appError.js";
import { ImageModel } from "./image.schema.js";
import { FaceModel } from "./face.schema.js";
import { uploadFile } from "../../common/utils/cloudinary.js";
import { AppResponse } from "../../common/utils/appResponse.js";


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
    faceImageUrl: url
  });
  await newFace.save();
  if (!newFace) throw new AppError('Error in storing face', 500);

  currentImage.faces.push(newFace);
  await currentImage.save();

  return AppResponse(res, 201, newFace, 'Face stored successfully');
});
