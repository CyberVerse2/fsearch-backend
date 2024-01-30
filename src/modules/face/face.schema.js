import { Schema, model } from 'mongoose';

const faceSchema = new Schema({
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  faceName: String,
  imageRegion: {
    type: [Number],
    required: true
  },
  facesUrl: {
    type: String
  },
  details: {
    required: true
  }
});

export const FaceModel = model('Face', faceSchema);
