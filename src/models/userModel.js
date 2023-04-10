import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minLength: [4, 'Name is too short!'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
