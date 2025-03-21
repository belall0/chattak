import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [3, 'Name must be at least 3 characters'],
      maxLength: [50, 'Name must not exceed 50 characters'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters'],
      trim: true,
    },

    avatarUrl: {
      type: String,
      default: '', // Prevents errors if the user hasn't uploaded an avatar
    },

    avatarPublicId: {
      type: String,
      default: '', // Helps in managing the image on Cloudinary
    },
  },
  {
    timestamps: true,
    toJSON: { versionKey: false },
    toObject: { versionKey: false },
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.isPasswordCorrect = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.isPasswordUpdatedAfter = function (JWTTimestamp) {
  if (!this.passwordUpdatedAt) {
    return false;
  }

  const passwordChangedTime = parseInt(this.passwordUpdatedAt.getTime() / 1000); // convert to seconds to match JWTTimestamp
  // If JWT timestamp is less than password changed timestamp, it means password was changed after token was issued
  return JWTTimestamp < passwordChangedTime;
};

const User = mongoose.model('User', userSchema);
export default User;
