import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");

    console.log("MongoDB is Connected...");
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);
    console.error(message);
    process.exit(1);
  }
};

export default connectDB;
