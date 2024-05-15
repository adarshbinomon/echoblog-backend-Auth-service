import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  Phone: String,
  password: String,
});

const Admin = mongoose.model("Admin", adminSchema);

export { Admin };
