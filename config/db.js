import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING);
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoDB Connected successfully`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
