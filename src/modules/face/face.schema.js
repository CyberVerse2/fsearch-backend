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
  imageUrl: {
    type: String
  },
  details: {
    required: false
  }
});

export const FaceModel = model('Face', faceSchema);
