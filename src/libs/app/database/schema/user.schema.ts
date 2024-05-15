import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  isGoogle: Boolean,
  uid: String,
  profilePicture: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);

export { User };
