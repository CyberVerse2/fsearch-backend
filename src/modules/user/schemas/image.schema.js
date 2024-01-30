import { Schema, model } from 'mongoose';

const ImageSchema = new Schema({
  imageRegions: {
    type: [[Number]],
    required: true
  },
  baseImageUrl: {
    type: String,
    required: true
  },
  facesUrl: {
    type: [String],
  },
  details: {
    type: String,
    required: true
  }
});

export const ImageModel = model('Image', ImageSchema);
