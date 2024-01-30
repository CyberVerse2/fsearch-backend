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
  faces: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Face'
    }
  ]
});

export const ImageModel = model('Image', ImageSchema);
