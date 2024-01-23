import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  profilePicture: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  phone: String,
  password: String,
});

export const UserModel = mongoose.model("User", userSchema);
