import mongoose from "mongoose";
import { ErrorResponse } from "../error/errorResponse.js";

export const connectDb = async (uri) => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    throw new ErrorResponse(500, "Failed to connect to database");
  }
};
