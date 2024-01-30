import mongoose from 'mongoose';
import { hashData } from '../../common/utils/helper.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    profilePic: {
      type: String,
      required: true,
      unique: false
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],

    password: {
      type: String,
      required: true,
      unique: false
    },

    isTermsAccepted: {
      type: Boolean,
      required: true,
      unique: false
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await hashData(this.password);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Use pre-update hook to hash the password before updating the document
userSchema.pre(/^update/, async function (next) {
  // 'this' refers to the query being executed (e.g., findOneAndUpdate)
  if (this._update.password) {
    try {
      const hashedPassword = await hashData(this._update.password);
      this._update.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    // If password is not being updated, proceed to the next middleware
    next();
  }
});

export const UserModel = mongoose.model('User', userSchema);
