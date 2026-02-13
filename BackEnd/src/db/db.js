import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    const Connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected: ", Connection.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}