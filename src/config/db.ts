import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString: string = process.env.MONGODB_URL || "";

const connectDb = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to the Auth database");
  } catch (error) {
    console.error("Error connecting to the Auth database");
    process.exit(1);
  }
};

export default connectDb;
