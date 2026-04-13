import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅MongoDB Connected");
  } catch (error) {
    console.log ("Failed to connect MongoDB:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

export default connectDB;