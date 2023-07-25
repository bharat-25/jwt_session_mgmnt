import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  generateAuthToken: () => string;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1h",
  });
  return token;
};

const User = mongoose.model<User>("User", userSchema);

export default User;
